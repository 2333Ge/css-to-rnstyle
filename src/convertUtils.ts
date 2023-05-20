import * as vscode from "vscode";
import {
  RN_STYLE_KEYS,
  CSS2RN_STR_KEYS,
  RN2CSS_NUM_NOT_PX_KEYS,
} from "./constants";

export async function asyncConvertSelection(
  transform: (text: string) => Promise<string | undefined>
) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const text = document.getText(selection);

  const convertedText = await transform(text);

  editor.edit((editBuilder) => {
    editBuilder.replace(selection, convertedText || "处理失败");
  });
}

/**
 * 转换选中的文本
 * @param transform 转换函数
 * @returns
 */
export function convertSelection(transform: (text: string) => string) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const text = document.getText(selection);

  const convertedText = transform(text);

  editor.edit((editBuilder) => {
    editBuilder.replace(selection, convertedText);
  });
}

/**
 * css 转 RN 样式
 * @param cssText css文本
 * @returns
 */
export function convertCssToRnStyle(cssText: string): string {
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
      if (
        key === "border" ||
        key === "borderLeft" ||
        key === "borderRight" ||
        key === "borderTop" ||
        key === "borderBottom"
      ) {
        const [borderWidth, borderStyle, ...colorRest] = value.split(" ");

        if (colorRest?.length) {
          return `
${key}Width:${borderWidth},
${key}Style:"${borderStyle}",
${key}Color:"${colorRest.join(" ")}",`;
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

/**
 * RN 样式转 CSS
 * @param rnText RN 样式文本
 * @returns
 */
export function convertRnStyleToCss(rnText: string): string {
  let result = rnText;
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

/**
 * 小驼峰、下划线、中划线互相转换
 * @param text
 * @returns
 */
export function convertWord(text: string) {
  if (/[a-z]([A-Z])/.test(text)) {
    return text.replace(/[a-z]([A-Z])/g, (match, p1) =>
      match.replace(p1, `_${p1.toLowerCase()}`)
    );
  }

  if (text.indexOf("-") !== -1) {
    return text.replace(/-(\w)/g, (_, p1) => p1.toUpperCase());
  }

  if (text.indexOf("_") !== -1) {
    return text.replace(/_(\w)/g, (_, p1) => `-${p1.toLowerCase()}`);
  }
  return text;
}
