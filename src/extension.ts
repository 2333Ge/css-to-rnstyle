import * as vscode from "vscode";
import {
  RN_STYLE_KEYS,
  CSS2RN_STR_KEYS,
  RN2CSS_NUM_NOT_PX_KEYS,
} from "./constants";

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
  const deleteIfNotRnKeys = vscode.workspace
    .getConfiguration("css-to-rnstyle")
    .get("delete-if-not-rn-keys", true);

  let result = cssText;
  result = result.replace(/(\d+)px/g, "$1");
  result = result.replace(/(\d+)em/g, "$1");
  result = result.replace(/-(\w)(.*:)/g, (_, p1, p2) => {
    return `${p1.toUpperCase()}${p2}`;
  });
  result = result.replace(/;/g, ",");
  result = result.replace(
    /(\w+)\s*:\s*(.+),/g,
    (match, p1: string, p2: string) => {
      const key = p1.trim();
      const value = p2.trim();
      if (key === "background") {
        if (p2.indexOf(" ") === -1 && p2.indexOf("url") === -1) {
          return match.replace(p1, `backgroundColor`).replace(p2, `"${p2}"`);
        }
      }
      if (deleteIfNotRnKeys && RN_STYLE_KEYS.indexOf(key) === -1) {
        return "";
      }
      if (isNaN(Number(value))) {
        return match.replace(p2, `"${p2}"`);
      }

      if (CSS2RN_STR_KEYS.indexOf(key) !== -1) {
        return match.replace(p2, `"${p2}"`);
      }
      return match;
    }
  );
  return result;
}

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
        RN2CSS_NUM_NOT_PX_KEYS.indexOf(p1.trim()) === -1
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
