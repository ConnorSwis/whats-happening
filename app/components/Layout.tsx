import React from "react";

import Navbar from "./Navbar";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-background-50 dark:bg-background-900">
      <Navbar />
      <main className="w-screen h-full min-h-screen p-12 mx-auto lg:max-w-5xl">
        {props.children}
      </main>
    </div>
  );
}
