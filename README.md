# 功能说明

将css样式和RN样式互相转换

## 快捷键
- `ctrl + 9`：css转RN style
- `ctrl + 8`：RN style转css

## 配置项

|                  名字                  |  类型   | 默认值 |                      描述                      |
| :------------------------------------: | :-----: | :----: | :--------------------------------------------: |
| `css-to-rnstyle.delete-if-not-rn-keys` | boolean |  true  | css转RN样式时，是否删除非RN样式的key，默认删除 |



# 示例

片段1：

```css
position: static;
left: 0px;
top: 0px;
width: 48px;
height: 48px;
opacity: 1;

z-index: 0;
```

片段2：

```js
{
  position: 'static',
  left: 0,
  top: 0,
  width: 48,
  height: 48,
  opacity: 1,
  zIndex: 0,
}
```

`ctrl + 9` 将片段1转换为片段2

`ctrl + 8` 将片段2转换为片段1
