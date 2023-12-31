import { FaRegClock, FaLocationDot, FaCalendarDay } from "react-icons/fa6";
import { Form, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { json } from "@remix-run/node";

import { getEvents } from "~/server/events.server";
import Layout from "~/components/Layout";
import Tag from "~/components/Tag";

export async function loader() {
  return json({ events: await getEvents(50) });
}

export default function Index() {
  const { events } = useLoaderData<typeof loader>();
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    events.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        if (id === selected) {
          element.classList.add(
            "col-span-1",
            "sm:col-span-2",
            "lg:col-span-3",
            "row-span-1",
            "sm:row-span-2"
          );
          element.scrollIntoView();
        } else {
          element.classList.remove(
            "col-span-1",
            "sm:col-span-2",
            "lg:col-span-3",
            "row-span-1",
            "sm:row-span-2"
          );
        }
      }
    });
  }, [selected]);

  return (
    <Layout>
      <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 md:p-6 ">
        {events.map(
          (
            {
              description,
              id,
              name,
              date,
              duration,
              city,
              address,
              attendees,
              state,
              tags,
            },
            i
          ) => {
            const { dateString, timeString, endTimeString } = formatDateTime(
              new Date(date),
              duration
            );

            const [registering, setRegisering] = useState(false);
            const [registered, setRegistered] = useState(false);
            const sortedTags = tags.sort((a, b) => b.length - a.length);

            // Step 2: Reorder the sorted tags to L, S, S, L, S, S pattern.
            const orderedTags: string[] = [];
            let longIndex = 0; // Index for the next longest tag.
            let shortIndex = sortedTags.length - 1; // Index for the next shortest tag.

            while (longIndex <= shortIndex) {
              // Add the next longest tag.
              if (longIndex <= shortIndex) {
                orderedTags.push(sortedTags[longIndex++]);
              }

              // Add the next two shortest tags.
              for (let i = 0; i < 2 && longIndex <= shortIndex; i++) {
                orderedTags.push(sortedTags[shortIndex--]);
              }
            }
            return (
              <div
                className="flex flex-col justify-between rounded-lg outline outline-1 outline-background-200 text-background-900 dark:text-background-50 scroll-mt-16"
                id={id}
                key={id}
              >
                {selected !== id ? (
                  <>
                    <div>
                      <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="text-lg font-semibold h-14 md:text-xl line-clamp-2">
                          {name}
                        </h3>
                      </div>
                      <div className="px-6 line-clamp-2">{description}</div>
                      <div className="p-6">
                        <div className="flex items-center">
                          <FaCalendarDay className="w-4 h-4 mr-2 antialiased" />
                          <p>{dateString}</p>
                        </div>
                        <div className="flex items-center">
                          <FaRegClock className="w-4 h-4 mr-2" />
                          <p>{timeString}</p>
                        </div>
                        <div className="flex items-center">
                          <FaLocationDot className="w-4 h-4 mr-2" />
                          <p>
                            {city}, {state}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2 -mb-2">
                          {orderedTags.map((tag, i) => {
                            return <Tag key={i} title={tag} />;
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-baseline justify-start h-max">
                      <button
                        onClick={() => {
                          selected === id ? setSelected("") : setSelected(id);
                        }}
                        className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-bl-lg outline outline-1 rounded-tr-md outline-background-200"
                      >
                        More Info
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="divide-y rounded-lg outline outline-1 outline-background-200 text-background-900 dark:text-background-50">
                    <div className="flex flex-col space-y-1.5 p-4">
                      <h1 className="text-3xl font-bold">{name}</h1>
                      <div className="flex flex-wrap items-center gap-2 text-lg ">
                        {orderedTags.map((tag, i) => {
                          return <Tag key={i} title={tag} />;
                        })}
                      </div>
                    </div>
                    <div className="grid gap-4 p-4">
                      {!registering && (
                        <>
                          <div className="grid gap-2">
                            <h3 className="text-lg font-bold">Description</h3>
                            <p className="text-sm text-background-700 dark:text-background-200">
                              {description}
                            </p>
                          </div>
                          <div className="p-3">
                            <div className="flex items-center">
                              <FaCalendarDay className="w-4 h-4 mr-2 antialiased" />
                              <p>{dateString}</p>
                            </div>
                            <div className="flex items-center">
                              <FaRegClock className="w-4 h-4 mr-2" />
                              <p>
                                {timeString} {duration && `- ${endTimeString}`}
                              </p>
                            </div>
                            <div className="flex items-start">
                              <FaLocationDot className="w-4 h-4 mr-2" />
                              <p>
                                {address}
                                <br />
                                {city}, {state}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      {registering && (
                        <Form>
                          <div className="grid gap-2">
                            <label
                              className="text-lg font-bold"
                              htmlFor="firstName"
                            >
                              First Name
                            </label>
                            <input
                              className="w-full p-2 text-sm border rounded-lg outline-none bg-background-50 dark:bg-background-900 border-background-300"
                              id="firstName"
                              type="text"
                            />
                          </div>
                          <div className="grid gap-2">
                            <label
                              className="text-lg font-bold"
                              htmlFor="lastName"
                            >
                              Last Name
                            </label>
                            <input
                              className="w-full p-2 text-sm border rounded-lg outline-none bg-background-50 dark:bg-background-900 border-background-300"
                              id="lastName"
                              type="text"
                            />
                          </div>
                          <div className="grid gap-2">
                            <label
                              className="text-lg font-bold"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              className="p-2 text-sm border rounded-lg outline-none bg-background-50 dark:bg-background-900 border-background-300"
                              id="email"
                              type="email"
                            />
                          </div>
                          <div className="grid gap-2">
                            <label
                              className="text-lg font-bold"
                              htmlFor="message"
                            >
                              Message (Optional)
                            </label>
                            <textarea
                              className="p-2 text-sm border rounded-lg outline-none bg-background-50 dark:bg-background-900 border-background-300"
                              id="message"
                            />
                          </div>
                        </Form>
                      )}
                    </div>
                    <div className="flex justify-between p-4">
                      <div>
                        <button
                          onClick={() => {
                            setSelected("");
                          }}
                          className="inline-flex items-center justify-center h-10 px-4 py-2 mr-2 text-sm font
                        medium border rounded-md hover:bg-primary-500 active:bg-primary-500/[.8] active:shadow
                        hover:text-background-50"
                        >
                          Less
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            if (registering) {
                              setRegisering(false);
                            }
                          }}
                          className="inline-flex items-center justify-center h-10 px-4 py-2 mr-2 text-sm font-medium border rounded-md hover:bg-primary-500 active:bg-primary-500/[.8] active:shadow-inner hover:text-background-50"
                        >
                          {!registering && "Share Event"}
                          {registering && "Cancel"}
                        </button>
                        <button
                          onClick={() => {
                            setRegisering(!registering);
                          }}
                          className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white transition-colors duration-75 rounded-md bg-primary-500 hover:bg-primary-500 active:bg-primary-500/90 active:shadow-inner hover:outline hover:outline-1"
                        >
                          {!registering && "Register"}
                          {registering && "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }
        )}
      </section>
    </Layout>
  );
}

function formatDateTime(
  date: Date,
  duration: number
): {
  dateString: string;
  timeString: string;
  endTimeString: string;
} {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const dateString = `${month} ${day}, ${year}`;

  let hours = date.getHours();
  let endHours = hours + duration;
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const endAmpm = endHours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  endHours = endHours % 12;
  hours = hours ? hours : 12;
  endHours = endHours ? endHours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();
  const timeString = `${hours}:${minutesStr} ${ampm}`;
  const endTimeString = `${endHours}:${minutesStr} ${endAmpm}`;

  return { dateString, timeString, endTimeString };
}
