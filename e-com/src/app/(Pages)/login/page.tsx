import React from "react";
import { LoginForm } from "./_component/loginform/LoginForm";

export default function Login() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-amber-200 dark:via-amber-100 dark:to-white">
          Welcome Back !
        </h1>
        <LoginForm />
      </div>
    </>
  );
}
