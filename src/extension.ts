import * as vscode from "vscode";
import { convertSelection, convertWord, convertCssToRnStyle, convertRnStyleToCss } from "./convertUtils";

export function activate(context: vscode.ExtensionContext) {
  let disposableConvertWord = vscode.commands.registerCommand(
    "css-to-rnstyle.convertWord",
    () => {
      convertSelection(convertWord);
    }
  );

  let disposableToRnStyle = vscode.commands.registerCommand(
    "css-to-rnstyle.convertCssToRnStyle",
    () => {
      convertSelection(convertCssToRnStyle);
    }
  );

  let disposableToCss = vscode.commands.registerCommand(
    "css-to-rnstyle.convertRnStyleToCss",
    () => {
      convertSelection(convertRnStyleToCss);
    }
  );

  context.subscriptions.push(
    disposableToRnStyle,
    disposableToCss,
    disposableConvertWord
  );
}

export function deactivate() {}
