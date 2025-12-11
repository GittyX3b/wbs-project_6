import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
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

export function SignUp() {
  const [signUpState, setSignUpState] = useState((): SignUpState => "init");
  const [redirect, SetRedirect] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/my-events");
  });

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
        <div className="card card-xl w-full md:max-w-xl bg-base-200 shadow-sm p-4">
          <form className="w-full" onSubmit={submitSignUp}>
            <fieldset className="fieldset mb-4">
              <label
                className="fieldset-legend text-sm font-bold"
                htmlFor="email"
              >
                E-Mail:
              </label>
              <input
                className="w-full input"
                type="email"
                name="email"
                id="email"
              />
              <label
                className="fieldset-legend text-sm font-bold"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="w-full input"
                type="password"
                name="password"
                id="password"
              />
            </fieldset>
            <div className="card-actions justify-end">
              <button
                disabled={signUpState === "fetching" ? true : false}
                className={
                  signUpState === "fetching"
                    ? "btn btn-sm bg-gray-700"
                    : "btn btn-primary"
                }
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <p>
            Already have an account?
            <Link to="/login" className="link ml-2">
              Sign in
            </Link>
          </p>
        </div>
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
