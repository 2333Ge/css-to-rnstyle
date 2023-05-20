import * as vscode from "vscode";
import {
  convertSelection,
  convertWord,
  convertCssToRnStyle,
  convertRnStyleToCss,
  asyncConvertSelection,
} from "./convertUtils";
import { getCompletion } from "./ai/ts-mock";

export function activate(context: vscode.ExtensionContext) {
  let disposableConvertWord = vscode.commands.registerCommand(
    "css-to-rnstyle.convertWord",
    () => {
      // convertSelection(convertWord);
      asyncConvertSelection((str) => {
        return getCompletion(str);
      });
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
