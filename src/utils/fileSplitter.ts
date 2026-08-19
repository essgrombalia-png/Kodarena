/**
 * Utility functions to split an all-in-one HTML document into 3 clean files:
 * 1. index.html (pure markup with link and script tags)
 * 2. style.css (pure CSS rules)
 * 3. script.js (pure JavaScript logic)
 *
 * And to combine 3 separate files back into a single previewable HTML string.
 */

export interface ThreeFilesBundle {
  html: string;
  css: string;
  js: string;
}

/**
 * Splits an all-in-one HTML document into HTML, CSS, and JS components.
 */
export function splitHtmlInto3Files(rawCode: string): ThreeFilesBundle {
  let css = '';
  let js = '';
  let html = rawCode;

  // Extract <style>...</style> contents
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;
  const extractedStyles: string[] = [];
  while ((styleMatch = styleRegex.exec(rawCode)) !== null) {
    if (styleMatch[1]) {
      extractedStyles.push(styleMatch[1].trim());
    }
  }
  if (extractedStyles.length > 0) {
    css = extractedStyles.join('\n\n');
  }

  // Extract <script>...</script> contents (ignoring external scripts with src=)
  const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  const extractedScripts: string[] = [];
  while ((scriptMatch = scriptRegex.exec(rawCode)) !== null) {
    if (scriptMatch[1]) {
      extractedScripts.push(scriptMatch[1].trim());
    }
  }
  if (extractedScripts.length > 0) {
    js = extractedScripts.join('\n\n');
  }

  // Remove <style> and inline <script> tags from the HTML
  let cleanedHtml = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi, '')
    .trim();

  // If the HTML has a <head>, ensure <link rel="stylesheet" href="style.css"> is present or clean
  if (cleanedHtml.includes('</head>')) {
    if (!cleanedHtml.includes('href="style.css"') && !cleanedHtml.includes("href='style.css'")) {
      cleanedHtml = cleanedHtml.replace('</head>', '  <link rel="stylesheet" href="style.css">\n</head>');
    }
  }

  // If the HTML has </body>, ensure <script src="script.js"></script> is present or clean
  if (cleanedHtml.includes('</body>')) {
    if (!cleanedHtml.includes('src="script.js"') && !cleanedHtml.includes("src='script.js'")) {
      cleanedHtml = cleanedHtml.replace('</body>', '  <script src="script.js"></script>\n</body>');
    }
  } else if (!cleanedHtml.includes('<!DOCTYPE') && !cleanedHtml.includes('<html')) {
    // If it's a body snippet
    cleanedHtml = `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mitt Webbprojekt</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${cleanedHtml ? cleanedHtml : '  <h1>Mitt Projekt</h1>'}
  <script src="script.js"></script>
</body>
</html>`;
  }

  return {
    html: cleanedHtml,
    css: css || '/* Skriv dina CSS3-stilar här */\nbody {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n}',
    js: js || '// Skriv din JavaScript ES6+ kod här\nconsole.log("Webbprojektet är laddat!");'
  };
}

/**
 * Combines 3 separate files (HTML, CSS, JS) into a single HTML string for the live preview runner.
 */
export function combine3FilesIntoHtml(html: string, css: string, js: string): string {
  let combined = html;

  // If it's a full HTML document
  if (combined.includes('</head>')) {
    // Remove any dummy <link rel="stylesheet" href="style.css">
    combined = combined.replace(/<link[^>]*href=["']style\.css["'][^>]*>/gi, '');
    // Inject style before </head>
    combined = combined.replace('</head>', `  <style>\n${css}\n  </style>\n</head>`);
  } else if (combined.includes('<!DOCTYPE') || combined.includes('<html')) {
    combined = combined + `\n<style>\n${css}\n</style>`;
  }

  if (combined.includes('</body>')) {
    // Remove any dummy <script src="script.js"></script>
    combined = combined.replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, '');
    // Inject script before </body>
    combined = combined.replace('</body>', `  <script>\n${js}\n  </script>\n</body>`);
  } else {
    // If snippet, wrap cleanly
    if (!combined.includes('<!DOCTYPE')) {
      combined = `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Live Preview</title>
  <style>
${css}
  </style>
</head>
<body>
${combined}
  <script>
${js}
  </script>
</body>
</html>`;
    } else {
      combined = combined + `\n<script>\n${js}\n</script>`;
    }
  }

  return combined;
}

/**
 * Triggers a browser download for a given file content.
 */
export function downloadFile(filename: string, content: string, mimeType: string = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads all 3 files sequentially with a small delay.
 */
export function download3Files(bundle: ThreeFilesBundle) {
  downloadFile('index.html', bundle.html, 'text/html;charset=utf-8');
  setTimeout(() => {
    downloadFile('style.css', bundle.css, 'text/css;charset=utf-8');
  }, 200);
  setTimeout(() => {
    downloadFile('script.js', bundle.js, 'text/javascript;charset=utf-8');
  }, 400);
}
