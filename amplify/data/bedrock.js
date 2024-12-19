export function request(ctx) {
  const ingredients = ctx.arguments.ingredients;
  const app_type = ctx.arguments.app_type;
  const temperature = ctx.arguments.temperature;

  const temp_jp = () => {
    switch (temperature) {
      case "neutral":
        return "普通";
      case "request":
        return "依頼";
      case "thank":
        return "感謝";
      case "apologize":
        return "謝罪";
    }
  };

  const prompt = `${temp_jp}する以下の内容を${app_type}で送るので、${app_type}に合った文章を日本語で生成してください。\n\n${ingredients}`;

  return {
    resourcePath: `/model/anthropic.claude-3-5-sonnet-20240620-v1:0/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `\n\nHuman:${prompt}\n\nAssistant:`,
              },
            ],
          },
        ],
      },
    },
  };
}

export function response(ctx) {
  return {
    body: ctx.result.body,
  };
}
