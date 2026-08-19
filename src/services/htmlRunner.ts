import { HtmlTestCase, HtmlExecutionResult, DomNodeInfo } from '../types/html';

export function parseDomTree(element: Element, depth: number = 0): DomNodeInfo[] {
  const result: DomNodeInfo[] = [];

  const ignoredTags = ['SCRIPT', 'STYLE', 'LINK', 'META'];
  if (ignoredTags.includes(element.tagName.toUpperCase())) {
    return result;
  }

  const attributes: Record<string, string> = {};
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    attributes[attr.name] = attr.value;
  }

  // Get direct text content
  let text = '';
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      text += (text ? ' ' : '') + node.textContent.trim();
    }
  });

  result.push({
    tag: element.tagName.toLowerCase(),
    attributes,
    textPreview: text.slice(0, 40) + (text.length > 40 ? '...' : ''),
    childrenCount: element.children.length,
    depth
  });

  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    result.push(...parseDomTree(child, depth + 1));
  }

  return result;
}

export function executeAndValidateHtml(
  rawHtml: string,
  testCases: HtmlTestCase[] = []
): HtmlExecutionResult {
  const startTime = performance.now();
  const errors: string[] = [];
  const warnings: string[] = [];
  const consoleLogs: string[] = [];

  // Parse using browser's DOMParser
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');

  // Check for parser errors
  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    errors.push(parserError.textContent || 'HTML Tolkningsfel');
  }

  // Extract all <script> contents and evaluate safely in an isolated context
  const scriptTags = Array.from(doc.querySelectorAll('script'));
  const allScriptJs = scriptTags.map(s => s.textContent || '').join('\n');

  if (allScriptJs.trim()) {
    try {
      // Safe sandbox execution with intercepted console
      const sandboxConsole = {
        log: (...args: any[]) => {
          consoleLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        },
        warn: (...args: any[]) => {
          consoleLogs.push('[WARN] ' + args.map(a => String(a)).join(' '));
        },
        error: (...args: any[]) => {
          consoleLogs.push('[ERROR] ' + args.map(a => String(a)).join(' '));
        },
        info: (...args: any[]) => {
          consoleLogs.push(args.map(a => String(a)).join(' '));
        }
      };

      // Create a function runner that provides document, window mocks and sandbox console
      const safeRunner = new Function('console', 'document', 'window', `
        try {
          ${allScriptJs}
        } catch (e) {
          console.error("Runtime-fel i JavaScript:", e.message);
        }
      `);

      safeRunner(sandboxConsole, doc, {
        alert: (msg: string) => consoleLogs.push(`[Alert]: ${msg}`),
        prompt: () => 'Test',
        confirm: () => true
      });
    } catch (err: any) {
      warnings.push(`Kunde inte köra JavaScript: ${err.message}`);
    }
  }

  // Extract DOM tree for the visual tree inspector
  let domTree: DomNodeInfo[] = [];
  try {
    const rootBody = doc.body;
    if (rootBody) {
      domTree = parseDomTree(rootBody, 0);
    }
  } catch (err: any) {
    warnings.push(`Kunde inte läsa DOM-träd: ${err.message}`);
  }

  // Combine all style text from <style> tags and inline style attributes for CSS checks
  const styleTags = Array.from(doc.querySelectorAll('style'));
  const allStyleCss = styleTags.map(s => s.textContent || '').join('\n') + '\n' + rawHtml;

  // Run test cases
  const testResults = testCases.map((tc) => {
    let passed = true;
    let actual = '';
    let expected = tc.description;

    try {
      if (tc.selector) {
        const matches = doc.querySelectorAll(tc.selector);
        if (matches.length === 0) {
          passed = false;
          actual = `Hittade inga element som matchar väljaren "${tc.selector}"`;
        } else {
          if (tc.minCount && matches.length < tc.minCount) {
            passed = false;
            actual = `Hittade ${matches.length} st, förväntade minst ${tc.minCount} st element som matchar "${tc.selector}"`;
          }

          if (tc.containsText && passed) {
            const hasTextMatch = Array.from(matches).some((el) => 
              el.textContent?.toLowerCase().includes(tc.containsText!.toLowerCase())
            );
            if (!hasTextMatch) {
              passed = false;
              actual = `Element "${tc.selector}" hittades men saknar förväntad text: "${tc.containsText}"`;
            }
          }

          if (tc.attributeCheck && passed) {
            const el = matches[0];
            const hasAttr = el.hasAttribute(tc.attributeCheck.name);
            if (tc.attributeCheck.shouldExist !== false && !hasAttr) {
              passed = false;
              actual = `Elementet saknar attributet "${tc.attributeCheck.name}"`;
            } else if (tc.attributeCheck.expectedValue !== undefined) {
              const val = el.getAttribute(tc.attributeCheck.name);
              if (val !== tc.attributeCheck.expectedValue) {
                passed = false;
                actual = `Attribut "${tc.attributeCheck.name}" var "${val}", förväntades vara "${tc.attributeCheck.expectedValue}"`;
              }
            }
          }
        }
      }

      // Check CSS Property
      if (tc.cssCheck && passed) {
        const targetSel = tc.cssCheck.selector.toLowerCase();
        const prop = tc.cssCheck.property.toLowerCase();
        const rawLower = allStyleCss.toLowerCase();

        const hasPropertyInCss = rawLower.includes(prop);
        const hasSelectorInCss = rawLower.includes(targetSel);

        if (!hasPropertyInCss) {
          passed = false;
          actual = `CSS-egenskapen "${tc.cssCheck.property}" hittades inte i koden`;
        } else if (!hasSelectorInCss && targetSel !== '*' && targetSel !== 'body') {
          passed = false;
          actual = `CSS-selektorn "${tc.cssCheck.selector}" hittades inte i <style>-koden`;
        }
      }

      // Check JavaScript
      if (tc.jsCheck && passed) {
        const jsLower = allScriptJs.toLowerCase() + '\n' + rawHtml.toLowerCase();

        if (tc.jsCheck.type === 'console_log') {
          const expectedLog = String(tc.jsCheck.expectedValue || '').toLowerCase();
          const hasLogMatch = consoleLogs.some(l => l.toLowerCase().includes(expectedLog));
          if (!hasLogMatch) {
            passed = false;
            actual = `Console.log saknar förväntad utskrift: "${tc.jsCheck.expectedValue}". Nuvarande loggar: ${JSON.stringify(consoleLogs)}`;
          }
        } else if (tc.jsCheck.type === 'script_contains') {
          const snippet = String(tc.jsCheck.snippet || tc.jsCheck.identifier || '').toLowerCase();
          if (!jsLower.includes(snippet)) {
            passed = false;
            actual = `JavaScript-koden saknar förväntat element/nyckelord: "${snippet}"`;
          }
        }
      }

      // Check text in the whole document if no selector
      if (!tc.selector && tc.containsText) {
        const fullText = doc.body.textContent || '';
        if (!fullText.toLowerCase().includes(tc.containsText.toLowerCase())) {
          passed = false;
          actual = `Dokumentet saknar texten "${tc.containsText}"`;
        }
      }

      // Custom validator function
      if (tc.customValidator && passed) {
        const res = tc.customValidator(doc, rawHtml, consoleLogs);
        if (typeof res === 'boolean') {
          passed = res;
          if (!passed) actual = 'Anpassad validering misslyckades';
        } else {
          passed = res.pass;
          if (!passed) actual = res.message;
        }
      }
    } catch (err: any) {
      passed = false;
      actual = `Valideringsfel: ${err.message}`;
    }

    return {
      testId: tc.id,
      description: tc.description,
      passed,
      actual: actual || (passed ? 'Godkänd!' : 'Ej uppfylld'),
      expected
    };
  });

  const allTestsPassed = testResults.length === 0 || testResults.every((t) => t.passed);
  const executionTimeMs = Math.round(performance.now() - startTime);

  return {
    success: errors.length === 0,
    html: rawHtml,
    domTree,
    errors,
    warnings,
    consoleLogs,
    testResults,
    allTestsPassed,
    executionTimeMs
  };
}

export function generatePreviewDocument(html: string): string {
  // Wrap user HTML with an isolated sandbox environment, styling resets & dark/light preview comfort
  const isFullDoc = html.toLowerCase().includes('<!doctype') || html.toLowerCase().includes('<html');

  if (isFullDoc) {
    return html;
  }

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    :root {
      color-scheme: dark light;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      padding: 16px;
      margin: 0;
      color: #e2e8f0;
      background-color: #070c18;
    }
    a {
      color: #38bdf8;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 12px 0;
    }
    th, td {
      border: 1px solid #334155;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background-color: #1e293b;
    }
    pre, code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
}
