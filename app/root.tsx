import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/app.css";
import { useEffect } from "react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
      document.body.classList.add("dark");
    }
  }, []);
  return (
    <html lang="en" className="overscroll-y-none">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <Meta />
        <Links />
      </head>
      <body className="*:transition-colors duration-[50]">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
