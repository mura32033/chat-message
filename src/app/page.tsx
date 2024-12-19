"use client";

import React, { FormEvent, useState } from "react";
import { Card } from "@aws-amplify/ui-react";
import { generateRecipe } from "./actions";

export default function Home() {
  const [result, setResult] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [isGenerateMode, setIsGenerateMode] = useState(true);

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
      console.error(e);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24  m-auto ">
      <div className=" pb-10 mx-auto text-center flex flex-col items-start -center max-w-3xl">
        <h1 className=" text-4xl  font-bold  text-gray-900 sm:text-6xl ">
          文章を考える時間を
          <br />{" "}
          <span
            className={isGenerateMode ? " text-blue-600" : "text-green-500"}
          >
            AI
          </span>{" "}
          に任せる
          <p className=" mt-10 font-medium   text-lg  max-w-prose text-gray-900 ">
            {isGenerateMode
              ? "言いたいことを箇条書きして、送るツールを選んで、どんな温度感の文章を生成するかを選ぶだけで、文章を生成することができます。"
              : "文章を入力するだけで、AIが添削してくれます。"}
          </p>
        </h1>
      </div>

      <section className="w-3/4 mx-auto">
        <form
          onSubmit={onSubmit}
          className=" p-4 flex flex-col items-center gap-4  max-w-full mx-auto"
        >
          {/* <input
            type="button"
            name="isGenerateMode"
            id="isGenerateMode"
            className={`text-white p-2 rounded-lg w-1/2 text-xl ${
              isGenerateMode ? "bg-blue-500" : "bg-green-500"
            }`}
            onClick={() => setIsGenerateMode(!isGenerateMode)}
            value={isGenerateMode ? "true" : "false"}
          >
            クリックして{isGenerateMode ? "手動入力" : "自動生成"}モードにする
          </input> */}
          <div className="flex flex-row items-center justify-center gap-4">
            いまは
            <select
              name="isGenerateMode"
              id="isGenerateMode"
              className="border border-black text-gray-900 p-4 rounded-lg text-xl"
              onChange={() => setIsGenerateMode(!isGenerateMode)}
            >
              <option value="true">自動生成</option>
              <option value="false">手動入力</option>
            </select>
            モード
          </div>

          <div className="m-auto flex flex-row w-full items-center justify-center gap-4">
            <select
              name="who"
              id="who"
              className="border border-black  text-gray-900 p-4 rounded-lg text-xl "
            >
              <option value="attached_manager">直属の上司</option>
              <option value="outbound">社外の人</option>
              <option value="senior_close">親しい先輩</option>
              <option value="senior_stranger">知らない先輩</option>
              <option value="junior_close">親しい後輩</option>
              <option value="junior_stranger">知らない後輩</option>
              <option value="friend">友達</option>
            </select>
            に
            <select
              name="app_type"
              id="app_type"
              className="border border-black  text-gray-900 p-4 rounded-lg text-xl "
            >
              <option value="Slack">Slack</option>
              <option value="Teams">Teams</option>
              <option value="Email">メール</option>
            </select>
            で送りたい
          </div>
          <div className="m-auto flex flex-row w-full items-center justify-center gap-4">
            <select
              name="temperature"
              id="temperature"
              className="border border-black  text-gray-900 p-4 rounded-lg text-xl "
            >
              <option value="neutral">普通な</option>
              <option value="request">依頼する</option>
              <option value="thank">感謝する</option>
              <option value="apologize">謝罪する</option>
            </select>
            内容{isGenerateMode ? "を箇条書きすると、" : "を添削してもらうぞ！"}
          </div>
          <textarea
            id="ingredients"
            name="ingredients"
            required
            placeholder={
              isGenerateMode
                ? "言いたいことを箇条書きする"
                : "添削してもらう文章を入力する"
            }
            className="border border-black  text-gray-900 p-4 rounded-lg max-w-full w-full text-xl "
            rows={5}
          />
          <button
            type="submit"
            className={`text-white p-2 rounded-lg w-1/2 text-xl ${
              isGenerateMode ? "bg-blue-500" : "bg-green-500"
            }`}
          >
            {isGenerateMode ? "あとは頼んだ" : "お直ししてもらう"}
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
