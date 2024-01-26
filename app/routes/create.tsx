import { Form } from "@remix-run/react";
import React, { useState } from "react";
import Layout from "~/components/Layout";
import MarkdownRender from "~/components/Markdown";

export function loader() {
  return {};
}

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <Layout>
      <Form
        action="/create"
        method="post"
        className="flex flex-col gap-2 p-6 rounded-lg outline outline-1 outline-background-200"
      >
        <h1 className="text-3xl">Create a new event</h1>
        <div>
          <label className="flex flex-col gap-1 text-sm">
            Title
            <input
              type="text"
              name="title"
              id="title"
              className="p-2 text-lg bg-transparent rounded outline outline-1 outline-background-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="flex flex-col gap-1 text-sm">
            Description
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols={30}
              rows={10}
              className="p-2 text-lg bg-transparent rounded outline outline-1 outline-background-200"
            />
          </label>
        </div>
        <div className="flex gap-2">
          <label className="inline-flex items-center gap-2 text-sm">
            Date and Time
            <input
              type="datetime-local"
              name="datetime"
              id="datetime"
              className="p-2 text-lg bg-transparent rounded outline outline-1 outline-background-200"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            Duration (Hours)
            <input
              className="w-12 p-2 text-lg text-center bg-transparent rounded outline outline-1 outline-background-200"
              value={duration}
              maxLength={2}
              onChange={(e) =>
                setDuration(e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          </label>
        </div>
      </Form>
      <div className="mt-6">
        <div className="divide-y rounded-lg outline outline-1 outline-background-200 text-background-900 dark:text-background-50 ">
          <div className="flex flex-col space-y-1.5 p-4">
            <h1 className="text-3xl font-bold">{title || <>&nbsp;</>}</h1>
            {/* <div className="flex flex-wrap items-center gap-2 text-lg ">
              {orderedTags.map((tag, i) => {
                return <Tag key={i} title={tag.title} color={tag.color} />;
              })}
            </div> */}
          </div>
          <div className="grid gap-4 p-4">
            {
              <>
                <div className="grid gap-2">
                  <MarkdownRender text={description}></MarkdownRender>
                </div>
                <div className="p-3">
                  <div className="flex items-center">
                    {/* <FaCalendarDay className="w-4 h-4 mr-2 antialiased" /> */}
                    <p>{date}</p>
                  </div>
                  <div className="flex items-center">
                    {/* <FaRegClock className="w-4 h-4 mr-2" /> */}
                    {/* <p>
                      {timeString} {duration && `- ${endTimeString}`}
                    </p> */}
                  </div>
                  <div className="flex items-start">
                    {/* <FaLocationDot className="w-4 h-4 mr-2" /> */}
                    {/* <p>
                      {address}
                      <br />
                      {city}, {state} {zip}
                    </p> */}
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}
