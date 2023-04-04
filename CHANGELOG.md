# Change Log
## 0.0.3 - 2023-03-29

- 支持RN转CSS
- 支持CSS转RN

## 0.0.4 - 2023-03-29

- 新增配置项：css-to-rnstyle.delete-if-not-rn-keys, 用于控制css转RN样式时，是否删除非RN样式的key，默认删除


## 0.0.5 - 2023-03-30

- CSS转RN时，background 为颜色时转换成 backgroundColor

## 0.0.6 - 2023-04-01

- fix: space-between => spaceBetween
- 新增小功能：`ctrl + -`：将选中元素在小驼峰、下划线、中划线间转换

## 0.0.7 - 2023-04-01

- 新增border相关处理：border、border-left等属性会转换成borderWidth、borderColor等属性（因缺省时判断是何属性较复杂，暂时均按照 【border: border-width border-style border-color】结构处理）
