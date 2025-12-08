import { useState, useEffect } from "react";
import { addUser } from "../utils/apiAccess";

/**
 * Define string literal type SignUpState
 */
type SignUpState =
  | "fetching"
  | "init"
  | "success"
  | "badRequest"
  | "userExist"
  | "noEmail"
  | "noPass"
  | "passTooShort";

// enum ServerErrorCode {
//   Success = 200,
//   BadPassword = "User Already Exist",
//   UserExits = "",
// }

export function SignUp() {
  const [signUpState, setSignUpState] = useState((): SignUpState => "init");
  const [redirect, SetRedirect] = useState("");

  function submitSignUp(event) {
    event.preventDefault();
    console.log("Sign Up Submit Event");

    console.log(event.target.password.value);
    let newSignUpState: SignUpState = "init";

    if (event.target.email.value.length === 0) newSignUpState = "noEmail";
    else if (event.target.password.value.length === 0)
      newSignUpState = "noPass";
    else if (event.target.password.value.length < 8)
      newSignUpState = "passTooShort";

    setSignUpState(newSignUpState);
    console.log("signUpState:", newSignUpState);
    console.log("email", event.target.email.value);
    console.log("pass:", event.target.password.value);
    if (newSignUpState !== "init") {
      console.log("Returned");
      return;
    }

    setSignUpState("fetching");
    addUser(event.target.email.value, event.target.password.value).then(
      (data) => {
        /* Error case: Response Code 400, 409 */
        if ("error" in data) {
          console.error("Error Case:", data);
          if (data.error === "User Already Exist") setSignUpState("userExist");
          else setSignUpState("badRequest");
          /* Success: Response Code 200 */
        } else {
          console.log("Success case:", data);
          SetRedirect("signin");
        }
      }
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl text-shadow-gray-500 text-shadow-2xs m-4">
          Sign Up
        </h1>
        <form className="flex flex-col" onSubmit={submitSignUp}>
          <label className="text-black font-bold" htmlFor="email">
            E-Mail:{" "}
          </label>
          <input
            className="border-2 rounded-md mb-2 text-black p-0.4"
            type="email"
            name="email"
            id="email"
          />
          <label className="text-black font-bold" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="border-2 rounded-md mb-2 text-black p-0.4"
            type="password"
            name="password"
            id="password"
          />
          <button
            disabled={signUpState === "fetching" ? true : false}
            className={
              signUpState === "fetching"
                ? "btn btn-sm mt-2 mb-2 bg-gray-700"
                : "btn btn-sm mt-2 mb-2 hover:bg-gray-600"
            }
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="text-red-600 font-bold mt-2">
          {signUpState === "userExist"
            ? "⚠️ User already exists ⚠️"
            : signUpState === "badRequest" || signUpState === "passTooShort"
              ? "⚠️ Password too short! At least 8 characters ⚠️"
              : signUpState === "success"
                ? "Sign up successful!"
                : signUpState === "noEmail"
                  ? "⚠️ Please enter E-Mail address ⚠️"
                  : signUpState === "noPass"
                    ? "⚠️ Please enter password with at least 8 characters ⚠️"
                    : "Please fill out form for sign up"}
        </p>
      </div>
    </>
  );
}
