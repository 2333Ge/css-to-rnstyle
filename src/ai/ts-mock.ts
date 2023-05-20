import { Configuration, OpenAIApi } from "openai";

export const getCompletion = async (input: string) => {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
1. 我们约定：
  a. 将__英文(如：__result)的字符串称为变量，表示各个阶段的文本；
  b. 在末尾一对---符号包裹的字符串，表示最终你需要处理的文本；
请记住前面说的内容，后面将多次使用这些概念且不再重复说明。

2. 处理过程要求如下：
  a. 该字符串为类似JSON的数据，可能有语法错误，将其处理为正确的JSON数据结构，称处理结果为__right_json
  b. __right_json 转换成 typescript 的类型声明，称处理结果为__result_ts

3. 输出
  a. 如果处理过程发现语法错误输出如下：
    发现语法错误，处理json如下:
    __right_json
    ts类型声明如下:
    __result_ts
  b. 如果处理没发现语法错误输出:__result_ts

---
${input}
---
`,
  });
  console.log("response====>", response.data.choices[0].text);
  return response.data.choices[0].text;
};
