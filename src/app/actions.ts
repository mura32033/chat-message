import { amplifyClient } from "./amplify-utils";

export async function generateRecipe(formData: FormData) {
  const response = await amplifyClient.queries.askBedrock({
    ingredients: formData.get("ingredients")?.toString() || "",
    app_type: formData.get("app_type")?.toString() || "",
    temperature: formData.get("temperature")?.toString() || "",
    who: formData.get("who")?.toString() || "",
  });

  const res = JSON.parse(response.data?.body!);
  console.log(`res: ${res}`)
  const content = res.content[0].text;
  return content || "";
}
