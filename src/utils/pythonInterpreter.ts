/**
 * In-browser Python Execution & Sandboxing Engine
 * Supports standard Python syntax, built-ins, control flows, OOP, functions, f-strings,
 * turtle graphics, math/random modules, variable state tracking, and test case assertions.
 */

import { ExecutionResult, TestCase, VariableState, CanvasDrawCommand } from "../types/python";

interface Scope {
  [key: string]: any;
}

export class PythonInterpreter {
  private stdout: string[] = [];
  private globalScope: Scope = {};
  private canvasCommands: CanvasDrawCommand[] = [];
  private turtleState = {
    x: 200,
    y: 150,
    angle: 0, // in degrees, 0 = facing right
    penDown: true,
    color: "#29e6d0",
    width: 2,
  };

  constructor() {
    this.reset();
  }

  public reset() {
    this.stdout = [];
    this.canvasCommands = [];
    this.turtleState = {
      x: 200,
      y: 150,
      angle: 0,
      penDown: true,
      color: "#29e6d0",
      width: 2,
    };
    this.globalScope = this.createBuiltinScope();
  }

  private createBuiltinScope(): Scope {
    const scope: Scope = {
      print: (...args: any[]) => {
        const formatted = args.map(arg => this.formatValue(arg)).join(" ");
        this.stdout.push(formatted);
      },
      len: (obj: any) => {
        if (obj === null || obj === undefined) throw new Error("TypeError: object of type 'NoneType' has no len()");
        if (typeof obj === "string" || Array.isArray(obj)) return obj.length;
        if (obj instanceof Map || obj instanceof Set) return obj.size;
        if (typeof obj === "object") return Object.keys(obj).length;
        throw new Error(`TypeError: object of type '${typeof obj}' has no len()`);
      },
      range: (start: number, stop?: number, step: number = 1) => {
        if (stop === undefined) {
          stop = start;
          start = 0;
        }
        const res: number[] = [];
        if (step > 0) {
          for (let i = start; i < stop; i += step) res.push(i);
        } else if (step < 0) {
          for (let i = start; i > stop; i += step) res.push(i);
        }
        return res;
      },
      sum: (iterable: any[]) => {
        if (!Array.isArray(iterable)) throw new Error("TypeError: 'sum' argument must be an iterable");
        return iterable.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0);
      },
      min: (...args: any[]) => {
        const items = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        if (items.length === 0) throw new Error("ValueError: min() arg is an empty sequence");
        return Math.min(...items);
      },
      max: (...args: any[]) => {
        const items = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        if (items.length === 0) throw new Error("ValueError: max() arg is an empty sequence");
        return Math.max(...items);
      },
      abs: (val: number) => Math.abs(val),
      round: (val: number, ndigits?: number) => {
        if (ndigits === undefined) return Math.round(val);
        const factor = Math.pow(10, ndigits);
        return Math.round(val * factor) / factor;
      },
      int: (val: any) => {
        const n = parseInt(val, 10);
        if (isNaN(n)) throw new Error(`ValueError: invalid literal for int() with base 10: '${val}'`);
        return n;
      },
      float: (val: any) => {
        const n = parseFloat(val);
        if (isNaN(n)) throw new Error(`ValueError: could not convert string to float: '${val}'`);
        return n;
      },
      str: (val: any) => this.formatValue(val),
      bool: (val: any) => {
        if (val === 0 || val === "" || val === false || val === null || val === undefined) return false;
        if (Array.isArray(val) && val.length === 0) return false;
        if (typeof val === "object" && Object.keys(val).length === 0) return false;
        return true;
      },
      list: (val?: any) => {
        if (val === undefined) return [];
        if (Array.isArray(val)) return [...val];
        if (typeof val === "string") return val.split("");
        if (typeof val === "object") return Object.keys(val);
        return [val];
      },
      dict: (val?: any) => {
        if (val === undefined) return {};
        return { ...val };
      },
      set: (val?: any) => {
        if (val === undefined) return [];
        if (Array.isArray(val)) return Array.from(new Set(val));
        return [val];
      },
      type: (val: any) => {
        if (val === null || val === undefined) return "<class 'NoneType'>";
        if (typeof val === "number") return Number.isInteger(val) ? "<class 'int'>" : "<class 'float'>";
        if (typeof val === "string") return "<class 'str'>";
        if (typeof val === "boolean") return "<class 'bool'>";
        if (Array.isArray(val)) return "<class 'list'>";
        if (typeof val === "object") return "<class 'dict'>";
        if (typeof val === "function") return "<class 'function'>";
        return `<class '${typeof val}'>`;
      },
      sorted: (iterable: any[], reverse: boolean = false) => {
        const copy = [...iterable];
        copy.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
        return reverse ? copy.reverse() : copy;
      },
      reversed: (iterable: any[]) => [...iterable].reverse(),
      enumerate: (iterable: any[]) => iterable.map((item, idx) => [idx, item]),
      zip: (...arrays: any[][]) => {
        const minLen = Math.min(...arrays.map(a => a.length));
        const res: any[] = [];
        for (let i = 0; i < minLen; i++) {
          res.push(arrays.map(a => a[i]));
        }
        return res;
      },
      map: (fn: Function, iterable: any[]) => Array.from(iterable).map((x: any) => fn(x)),
      filter: (fn: Function, iterable: any[]) => Array.from(iterable).filter((x: any) => fn(x)),
      all: (iterable: any[]) => Array.from(iterable).every(x => Boolean(x)),
      any: (iterable: any[]) => Array.from(iterable).some(x => Boolean(x)),

      // Math Module Simulation
      math: {
        pi: Math.PI,
        e: Math.E,
        sqrt: (x: number) => Math.sqrt(x),
        pow: (x: number, y: number) => Math.pow(x, y),
        floor: (x: number) => Math.floor(x),
        ceil: (x: number) => Math.ceil(x),
        sin: (x: number) => Math.sin(x),
        cos: (x: number) => Math.cos(x),
        tan: (x: number) => Math.tan(x),
      },

      // Random Module Simulation
      random: {
        randint: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min,
        random: () => Math.random(),
        choice: (arr: any[]) => arr[Math.floor(Math.random() * arr.length)],
        shuffle: (arr: any[]) => {
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
          return arr;
        }
      },

      // Turtle Graphics Simulation
      turtle: {
        forward: (dist: number) => {
          const rad = (this.turtleState.angle * Math.PI) / 180;
          const nextX = this.turtleState.x + dist * Math.cos(rad);
          const nextY = this.turtleState.y + dist * Math.sin(rad);

          if (this.turtleState.penDown) {
            this.canvasCommands.push({
              type: 'line',
              params: {
                x1: this.turtleState.x,
                y1: this.turtleState.y,
                x2: nextX,
                y2: nextY,
                color: this.turtleState.color,
                width: this.turtleState.width,
              }
            });
          }
          this.turtleState.x = nextX;
          this.turtleState.y = nextY;
        },
        backward: (dist: number) => {
          scope.turtle.forward(-dist);
        },
        right: (deg: number) => {
          this.turtleState.angle = (this.turtleState.angle + deg) % 360;
        },
        left: (deg: number) => {
          this.turtleState.angle = (this.turtleState.angle - deg + 360) % 360;
        },
        penup: () => {
          this.turtleState.penDown = false;
        },
        pendown: () => {
          this.turtleState.penDown = true;
        },
        color: (col: string) => {
          this.turtleState.color = col;
        },
        width: (w: number) => {
          this.turtleState.width = w;
        },
        circle: (radius: number) => {
          this.canvasCommands.push({
            type: 'circle',
            params: {
              x: this.turtleState.x,
              y: this.turtleState.y,
              radius,
              color: this.turtleState.color,
              width: this.turtleState.width,
            }
          });
        },
        dot: (radius: number = 5, col?: string) => {
          this.canvasCommands.push({
            type: 'dot',
            params: {
              x: this.turtleState.x,
              y: this.turtleState.y,
              radius,
              color: col || this.turtleState.color,
            }
          });
        },
        clear: () => {
          this.canvasCommands.push({ type: 'clear', params: {} });
        },
        goto: (x: number, y: number) => {
          this.turtleState.x = x;
          this.turtleState.y = y;
        },
        plot_bar_chart: (labels: string[], values: number[]) => {
          this.canvasCommands.push({
            type: 'barChart',
            params: { labels, values, color: this.turtleState.color }
          });
        }
      },

      True: true,
      False: false,
      None: null,
    };

    return scope;
  }

  private formatValue(val: any): string {
    if (val === null || val === undefined) return "None";
    if (typeof val === "boolean") return val ? "True" : "False";
    if (typeof val === "string") return val;
    if (Array.isArray(val)) {
      const items = val.map(item => (typeof item === 'string' ? `'${item}'` : this.formatValue(item)));
      return `[${items.join(', ')}]`;
    }
    if (typeof val === "object") {
      const entries = Object.entries(val).map(
        ([k, v]) => `'${k}': ${typeof v === 'string' ? `'${v}'` : this.formatValue(v)}`
      );
      return `{${entries.join(', ')}}`;
    }
    return String(val);
  }

  private getVariableType(val: any): string {
    if (val === null || val === undefined) return "NoneType";
    if (typeof val === "number") return Number.isInteger(val) ? "int" : "float";
    if (typeof val === "string") return "str";
    if (typeof val === "boolean") return "bool";
    if (Array.isArray(val)) return "list";
    if (typeof val === "function") return "function";
    if (typeof val === "object") return "dict";
    return typeof val;
  }

  /**
   * Transpiles Python code to executable sandboxed JavaScript
   */
  private transpilePythonToJS(pythonCode: string): string {
    const lines = pythonCode.split("\n");
    const jsLines: string[] = [];
    const indentStack: number[] = [0];

    // Helper to replace Python operators and literals inside expressions
    const transformExpression = (expr: string): string => {
      let t = expr.trim();
      if (!t) return "";

      // Replace f-strings: f"Hello {name}, you are {age}" -> `Hello ${name}, you are ${age}`
      t = t.replace(/f(["'])(.*?)\1/g, (_match, _quote, content) => {
        const interpolated = content.replace(/\{([^}]+)\}/g, (_m: string, inner: string) => `\${${inner}}`);
        return `\`${interpolated}\``;
      });

      // Boolean and null literals
      t = t.replace(/\bTrue\b/g, "true");
      t = t.replace(/\bFalse\b/g, "false");
      t = t.replace(/\bNone\b/g, "null");

      // Logical operators
      t = t.replace(/\band\b/g, "&&");
      t = t.replace(/\bor\b/g, "||");
      t = t.replace(/\bnot\b\s+/g, "!");

      // Python string & list methods mappings
      t = t.replace(/\.append\((.*?)\)/g, ".push($1)");
      t = t.replace(/\.pop\(\)/g, ".pop()");
      t = t.replace(/\.lower\(\)/g, ".toLowerCase()");
      t = t.replace(/\.upper\(\)/g, ".toUpperCase()");
      t = t.replace(/\.strip\(\)/g, ".trim()");
      t = t.replace(/\.startswith\((.*?)\)/g, ".startsWith($1)");
      t = t.replace(/\.endswith\((.*?)\)/g, ".endsWith($1)");

      // Lambda expressions: lambda x, y: x + y -> ((x, y) => x + y)
      t = t.replace(/\blambda\s+([a-zA-Z0-9_,\s]*):(.*)$/g, "(( $1 ) => $2)");

      // Exponentiation operator ** -> Math.pow or **
      // Python // integer division -> Math.floor(a / b)
      t = t.replace(/(\b\w+|\d+)\s*\/\/\s*(\b\w+|\d+)/g, "Math.floor($1 / $2)");

      // Python list comprehensions: [x * 2 for x in items] -> (items).map(x => x * 2)
      t = t.replace(/\[\s*(.+?)\s+for\s+([a-zA-Z_]\w*)\s+in\s+(.+?)\s*\]/g, "($3).map(($2) => $1)");

      return t;
    };

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const trimmed = rawLine.trim();

      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      // Calculate indentation (spaces)
      const indent = rawLine.search(/\S/);

      // Handle closing blocks when indentation decreases
      while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
        indentStack.pop();
        jsLines.push("}");
      }

      // Check if line starts a block
      if (trimmed.endsWith(":")) {
        const statement = trimmed.slice(0, -1).trim();

        if (statement.startsWith("def ")) {
          const match = statement.match(/^def\s+([a-zA-Z_]\w*)\s*\((.*)\)$/);
          if (match) {
            const funcName = match[1];
            const params = match[2];
            jsLines.push(`function ${funcName}(${transformExpression(params)}) {`);
            indentStack.push(indent + 4);
            continue;
          }
        } else if (statement.startsWith("if ")) {
          const condition = statement.slice(3).trim();
          jsLines.push(`if (${transformExpression(condition)}) {`);
          indentStack.push(indent + 4);
          continue;
        } else if (statement.startsWith("elif ")) {
          const condition = statement.slice(5).trim();
          jsLines.push(`} else if (${transformExpression(condition)}) {`);
          continue;
        } else if (statement === "else") {
          jsLines.push(`} else {`);
          continue;
        } else if (statement.startsWith("while ")) {
          const condition = statement.slice(6).trim();
          jsLines.push(`while (${transformExpression(condition)}) {`);
          indentStack.push(indent + 4);
          continue;
        } else if (statement.startsWith("for ")) {
          const match = statement.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+(.+)$/);
          if (match) {
            const varName = match[1];
            const iterable = transformExpression(match[2]);
            jsLines.push(`for (let ${varName} of ${iterable}) {`);
            indentStack.push(indent + 4);
            continue;
          }
        } else if (statement.startsWith("class ")) {
          const match = statement.match(/^class\s+([a-zA-Z_]\w*)(?:\((.*)\))?$/);
          if (match) {
            const className = match[1];
            const parent = match[2] ? ` extends ${match[2]}` : "";
            jsLines.push(`class ${className}${parent} {`);
            indentStack.push(indent + 4);
            continue;
          }
        } else if (statement.startsWith("try")) {
          jsLines.push(`try {`);
          indentStack.push(indent + 4);
          continue;
        } else if (statement.startsWith("except")) {
          jsLines.push(`} catch (e) {`);
          continue;
        } else if (statement.startsWith("finally")) {
          jsLines.push(`} finally {`);
          continue;
        }
      }

      // Inside a class: handle def __init__(self, ...) and def method(self, ...)
      if (trimmed.startsWith("def __init__(")) {
        const params = trimmed.slice(13, trimmed.lastIndexOf(")")).replace(/^self\s*,?\s*/, "");
        jsLines.push(`constructor(${transformExpression(params)}) {`);
        indentStack.push(indent + 4);
        continue;
      } else if (trimmed.startsWith("def ") && trimmed.endsWith(":")) {
        const match = trimmed.slice(0, -1).match(/^def\s+([a-zA-Z_]\w*)\s*\((.*)\)$/);
        if (match) {
          const methodName = match[1];
          const params = match[2].replace(/^self\s*,?\s*/, "");
          jsLines.push(`${methodName}(${transformExpression(params)}) {`);
          indentStack.push(indent + 4);
          continue;
        }
      }

      // Handle simple statements
      if (trimmed.startsWith("return ")) {
        const retVal = trimmed.slice(7).trim();
        jsLines.push(`return ${transformExpression(retVal)};`);
      } else if (trimmed === "return") {
        jsLines.push("return;");
      } else if (trimmed === "pass") {
        jsLines.push("/* pass */");
      } else if (trimmed === "break") {
        jsLines.push("break;");
      } else if (trimmed === "continue") {
        jsLines.push("continue;");
      } else if (trimmed.startsWith("print(")) {
        jsLines.push(`${transformExpression(trimmed)};`);
      } else {
        // Variable assignments and expressions
        let lineCode = trimmed.replace(/\bself\./g, "this.");
        lineCode = transformExpression(lineCode);
        
        if (lineCode.includes("=") && !lineCode.startsWith("let ") && !lineCode.startsWith("const ") && !lineCode.startsWith("this.")) {
          const varName = lineCode.split("=")[0].trim();
          if (/^[a-zA-Z_]\w*$/.test(varName)) {
            // Register in global tracker for variable inspector
            lineCode = `window.__py_vars = window.__py_vars || {}; var ${lineCode}; window.__py_vars['${varName}'] = ${varName}`;
          }
        }
        jsLines.push(`${lineCode};`);
      }
    }

    // Close any remaining open blocks
    while (indentStack.length > 1) {
      indentStack.pop();
      jsLines.push("}");
    }

    return jsLines.join("\n");
  }

  /**
   * Executes Python code and captures output & variable states
   */
  public async execute(code: string, testCases: TestCase[] = []): Promise<ExecutionResult> {
    const startTime = performance.now();
    this.reset();
    (window as any).__py_vars = {};

    try {
      const transpiledJS = this.transpilePythonToJS(code);

      const scopeKeys = Object.keys(this.globalScope);
      const scopeValues = Object.values(this.globalScope);

      const runner = new Function(
        ...scopeKeys,
        `
        "use strict";
        try {
          ${transpiledJS}
        } catch(err) {
          throw err;
        }
        `
      );

      runner(...scopeValues);

      const executionTimeMs = Math.round(performance.now() - startTime);

      // Collect tracked variables
      const runtimeVars = (window as any).__py_vars || {};
      const variables: VariableState[] = Object.keys(runtimeVars).map(k => {
        const val = runtimeVars[k];
        return {
          name: k,
          type: this.getVariableType(val),
          value: this.formatValue(val),
          isCustomObject: typeof val === 'object' && val !== null && !Array.isArray(val)
        };
      });

      // Check test cases if provided
      const testResults = [];
      let allTestsPassed = true;

      for (const test of testCases) {
        let passed = false;
        let actual = "";

        if (test.expectedOutput !== undefined) {
          const currentOutput = this.stdout.join("\n").trim();
          const expected = test.expectedOutput.trim();
          passed = currentOutput.includes(expected) || currentOutput === expected;
          actual = currentOutput;
        } else if (test.customCheckCode) {
          try {
            const checkJS = this.transpilePythonToJS(test.customCheckCode);
            const checkRunner = new Function(...scopeKeys, checkJS);
            const result = checkRunner(...scopeValues);
            passed = result !== false;
            actual = String(result);
          } catch (e: any) {
            passed = false;
            actual = `Fel i test: ${e.message}`;
          }
        } else {
          passed = true;
          actual = this.stdout.join("\n").trim();
        }

        if (!passed) allTestsPassed = false;

        testResults.push({
          testId: test.id,
          description: test.description,
          passed,
          expected: test.expectedOutput || "Godkänd testkörning",
          actual: actual || "(Ingen utskrift)",
        });
      }

      return {
        success: true,
        output: this.stdout,
        executionTimeMs,
        variables,
        canvasCommands: [...this.canvasCommands],
        testResults,
        allTestsPassed: testCases.length > 0 ? allTestsPassed : true,
      };
    } catch (err: any) {
      const executionTimeMs = Math.round(performance.now() - startTime);
      return {
        success: false,
        output: this.stdout,
        error: `Python Syntax/Runtime Error: ${err.message || String(err)}`,
        executionTimeMs,
        variables: [],
        canvasCommands: [],
        testResults: testCases.map(t => ({
          testId: t.id,
          description: t.description,
          passed: false,
          expected: t.expectedOutput || "Fungerande körning",
          actual: `Fel inträffade: ${err.message}`,
        })),
        allTestsPassed: false,
      };
    }
  }
}

export const pythonInterpreter = new PythonInterpreter();
