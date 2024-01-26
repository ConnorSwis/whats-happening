import Layout from "~/components/Layout";
import { useState } from "react";
import { Form } from "@remix-run/react";
import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  return {}; // TODO: Handle the login and register form submissions | https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-2-ZTmOy58p4re8#handle-the-login-and-register-form-submissions
};

export default function Login() {
  const [registering, setRegistering] = useState(false);
  return (
    <Layout>
      <div className="max-w-xs mx-auto mt-10 border rounded-lg shadow-sm ">
        <Form>
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold tracking-tight whitespace-nowrap">
              {registering ? "Register" : "Login"}
            </h3>
            <p className="text-sm">
              {registering
                ? "Fill in the details below to create your account."
                : "Enter your email below to login to your account."}
            </p>
          </div>
          <div className="p-6 space-y-4">
            {registering && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md outline-none border-background-200 disabled:cursor-not-allowed disabled:opacity-50"
                    id="firstName"
                    placeholder="John"
                    required
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md outline-none border-background-200 disabled:cursor-not-allowed disabled:opacity-50"
                    id="lastName"
                    placeholder="Doe"
                    required
                    type="text"
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md outline-none border-background-200 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md outline-none border-background-200 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                required
                type="password"
              />
            </div>
          </div>
          <div className="flex items-center p-6">
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md text-background-50 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 bg-primary-500 "
            >
              {registering ? "Regiser" : "Login"}
            </button>
            <p
              onClick={() => setRegistering(!registering)}
              className="inline-block w-full text-sm text-center underline"
            >
              {registering ? "Already have an account?" : "Register instead?"}
            </p>
          </div>
        </Form>
      </div>
    </Layout>
  );
}
