import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposableToRnStyle = vscode.commands.registerCommand(
    "css-to-rnstyle.convertCssToRnStyle",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document = editor.document;
      const selection = editor.selection;
      const text = document.getText(selection);

      const convertedText = convertCssToRnStyle(text);

      editor.edit((editBuilder) => {
        editBuilder.replace(selection, convertedText);
      });
    }
  );
  let disposableToCss = vscode.commands.registerCommand(
    "css-to-rnstyle.convertRnStyleToCss",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document = editor.document;
      const selection = editor.selection;
      const text = document.getText(selection);

      const convertedText = convertRnStyleToCss(text);

      editor.edit((editBuilder) => {
        editBuilder.replace(selection, convertedText);
      });
    }
  );
  context.subscriptions.push(disposableToRnStyle, disposableToCss);
}

function convertCssToRnStyle(cssText: string): string {
  let result = cssText;
  result = result.replace(/(\d+)px/g, "$1");
  result = result.replace(/(\d+)em/g, "$1");
  result = result.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  result = result.replace(/;/g, ",");
  result = result.replace(/:\s*(.*),/g, (match, str: string) => {
    if (isNaN(Number(str.trim()))) {
      return match.replace(str, `"${str}"`);
    }
    return match;
  });
  return result;
}

/**
 * 默认会将number类型的属性加上px除了这些
 */
const NOT_TRANSFORM_RN_NUM_KEYS = ["opacity", "zIndex", "elevation"];

function convertRnStyleToCss(cssText: string): string {
  let result = cssText;
  result = result.replace(/,/g, ";");
  result = result.replace(
    /(\w+)\s*:\s*(.+);/g,
    (match, p1: string, p2: string) => {
      if (p2.indexOf('"') !== -1) {
        return match.replace(new RegExp('"', "g"), "");
      }
      if (p2.indexOf("'") !== -1) {
        return match.replace(new RegExp("'", "g"), "");
      }
      if (
        !isNaN(Number(p2.trim())) &&
        NOT_TRANSFORM_RN_NUM_KEYS.indexOf(p1.trim()) === -1
      ) {
        return match.replace(p2, `${p2}px`);
      }
      return match;
    }
  );
  result = result.replace(/[a-z]([A-Z])\w+:/g, (match, c) => {
    return match.replace(c, `-${c.toLowerCase()}`);
  });
  return result;
}

export function deactivate() {}
