import { useState, useEffect } from "react";

type Direction = "init" | "success" | "badRequest" | "userExist";

function submitSignUp(event) {
  event.preventDefault();
  console.log("Sign Up Submit Event");
}

export function SignUp() {
  const [signUpState, setSignUpState] = useState((): Direction => "init");
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl m-4">Sign Up</h1>
        <form className="flex flex-col" onSubmit={submitSignUp}>
          <label htmlFor="email">E-Mail: </label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" />
          <button
            className=" rounded-xl bg-indigo-700 hover:bg-fuchsia-700"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="text-red-600 mt-2">
          {signUpState === "userExist"
            ? "🛑 User already exists!"
            : signUpState === "badRequest"
              ? "🛑 Password too short! At least 8 characters!"
              : signUpState === "success"
                ? "Sign up successful!"
                : "♥️ Please fill out form for sign up ♥️"}
        </p>
      </div>
    </>
  );
}
