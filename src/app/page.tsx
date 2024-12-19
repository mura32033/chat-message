"use client";

import React, { FormEvent, useState } from "react";
import { Card } from "@aws-amplify/ui-react";
import { generateRecipe } from "./actions";

export default function Home() {
  const [result, setResult] = useState<string>("");
  const [loading, setloading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setloading(true);
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const data = await generateRecipe(formData);
      const recipe = typeof data === "string" ? data : "No data returned";
      setloading(false);
      setResult(recipe);
    } catch (e) {
      alert(`An error occurred: ${e}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24  m-auto ">
      <div className=" pb-10 mx-auto text-center flex flex-col items-start -center max-w-3xl">
        <h1 className=" text-4xl  font-bold  text-gray-900 sm:text-6xl ">
          文章を考える時間を
          <br /> <span className=" text-blue-600">AI</span> に任せる
          <p className=" mt-10 font-medium   text-lg  max-w-prose text-gray-900 ">
            言いたいことを箇条書きして、送るツールを選んで、どんな温度感の文章を生成するかを選ぶだけで、文章を生成することができます。
          </p>
        </h1>
      </div>

      <section className="   w-1/2  mx-auto ">
        <form
          onSubmit={onSubmit}
          className=" p-4 flex flex-col items-center gap-4  max-w-full mx-auto"
        >
          <select
            name="app_type"
            id="app_type"
            className="border border-black  text-gray-900 p-4 rounded-lg max-w-full w-full text-xl "
          >
            <option value="Slack">Slack</option>
            <option value="Teams">Teams</option>
            <option value="Email">メール</option>
          </select>
          で
          <select
            name="tempareture"
            id="tempareture"
            className="border border-black  text-gray-900 p-4 rounded-lg max-w-full w-full text-xl "
          >
            <option value="neutral">普通</option>
            <option value="request">依頼</option>
            <option value="thank">感謝</option>
            <option value="apologize">謝罪</option>
          </select>
          したいことを箇条書きすると、
          <textarea
            id="ingredients"
            name="ingredients"
            required
            placeholder="言いたいことを箇条書きする"
            className="border border-black  text-gray-900 p-4 rounded-lg max-w-full w-full text-xl "
            rows={5}
          />
          <button
            type="submit"
            className="  text-white p-2 rounded-lg bg-blue-500   w-1/2 text-xl  "
          >
            よろしく
          </button>
        </form>
      </section>
      {loading ? (
        <div className="flex flex-col items-center gap-4 w-1/2  mx-auto ">
          <h2 className="m-10 font-medium   text-xl   max-w-prose text-blue-600 ">
            しばし待たれよ...
          </h2>
        </div>
      ) : (
        <div>
          {result ? (
            <section className="    mt-10 mx-auto  border border-black  bg-gray-50  rounded-xl     ">
              <Card className=" p-4 flex flex-col items-center gap-4  max-w-full mx-auto text-xl  font-semibold    ">
                <h2 className="whitespace-pre-wrap">{result}</h2>
              </Card>
            </section>
          ) : null}
        </div>
      )}
    </main>
  );
}
