import { useState, useEffect } from "react";
import { addUser } from "../utils/apiAccess";

type SignUpState =
  | "fetching"
  | "init"
  | "success"
  | "badRequest"
  | "userExist"
  | "noEmail"
  | "noPass"
  | "passTooShort";

export function SignUp() {
  const [signUpState, setSignUpState] = useState((): SignUpState => "init");

  function submitSignUp(event) {
    event.preventDefault();
    console.log("Sign Up Submit Event");
    // setSignUpState("fetching");
    console.log(event.target.password.value);

    if (event.target.email.value.length === 0) setSignUpState("noEmail");
    else if (event.target.password.value.length === 0) setSignUpState("noPass");
    else if (event.target.password.value.length < 8)
      setSignUpState("passTooShort");
    else setSignUpState("init");

    // console.log("signUpState:", signUpState);
    if (signUpState !== "init") return;

    addUser(event.target.email.value, event.target.password.value);
  }

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
            disabled={signUpState === "fetching" ? true : false}
            className={
              signUpState === "fetching"
                ? "bg-gray-700 rounded-xl"
                : "rounded-xl bg-indigo-700 hover:bg-fuchsia-700"
            }
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="text-red-600 mt-2">
          {signUpState === "userExist"
            ? "⚠️ User already exists!"
            : signUpState === "badRequest" || signUpState === "passTooShort"
              ? "⚠️ Password too short! At least 8 characters!"
              : signUpState === "success"
                ? "Sign up successful!"
                : signUpState === "noEmail"
                  ? "Please enter E-Mail address!"
                  : signUpState === "noPass"
                    ? "Please enter password with at least 8 characters!"
                    : "Please fill out form for sign up!"}
        </p>
      </div>
    </>
  );
}
