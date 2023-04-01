# 功能说明

将css样式和RN样式互相转换

CSS转RN时：

- 支持删除非RN样式的key
- background 为颜色时转换成 backgroundColor

![示例1](https://gitee.com/i2333g3/imgs/raw/master/imgs/css-to-rnstyle/css-to-rnstyle-demo.gif)

## 快捷键
- `ctrl + 9`：css转RN style
- `ctrl + 8`：RN style转css
- `ctrl + -`：附赠小功能，将选中元素在小驼峰、下划线、中划线间转换

## 配置

|                 配置项                 |  类型   | 默认值 |                      描述                      |
| :------------------------------------: | :-----: | :----: | :--------------------------------------------: |
| `css-to-rnstyle.delete-if-not-rn-keys` | boolean |  true  | css转RN样式时，是否删除非RN样式的key，默认删除 |



# 示例1

片段1：

```css
position: absolute;
left: 50px;
top: 192px;
width: 1804px;
height: 1181px;
opacity: 1;
background: #FFFFFF;
box-sizing: border-box;
border: 1px solid #BFBFBF;
```

片段2：

```js
position: "absolute",
left: 50,
top: 192,
width: 1804,
height: 1181,
opacity: 1,
backgroundColor: "#FFFFFF",
```

片段3：

```css
position: absolute;
left: 50px;
top: 192px;
width: 1804px;
height: 1181px;
opacity: 1;
background-color: #FFFFFF;
```

`ctrl + 9` 将片段1转换为片段2

`ctrl + 8` 将片段2转换为片段3

# 示例2

快捷键 `ctrl + -` 将单词像下列形式转换


```
convertRnStyleToCss

  ↓                          ↖

convert_rn_style_to_css  →  convert-rn-style-to-css
```

