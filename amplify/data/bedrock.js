export function request(ctx) {
  const ingredients = ctx.arguments.ingredients;
  const app_type = ctx.arguments.app_type;
  const temperature = ctx.arguments.temperature;
  const who = ctx.arguments.who;

  const temp_jp = () => {
    switch (temperature) {
      case "neutral":
        return "普通な";
      case "request":
        return "依頼する";
      case "thank":
        return "感謝する";
      case "apologize":
        return "謝罪する";
    }
  };

  const who_jp = () => {
    switch (who) {
      case "attached_manager":
        return "直属の上司";
      case "outbound":
        return "社外の人";
      case "senior_close":
        return "親しい先輩";
      case "senior_stranger":
        return "知らない先輩";
      case "junior_close":
        return "親しい後輩";
      case "junior_stranger":
        return "知らない後輩";
      case "friend":
        return "友達";
    }
  };

  const prompt = `${temp_jp}内容を${app_type}で${who_jp}に送るので、${app_type}に合った文章を日本語で生成してください。\n\n${ingredients}`;

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
