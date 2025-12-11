import {
  type ChangeEventHandler,
  type FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const initialState = {
  email: "",
  password: "",
};

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [error, setError] = useState<string | null>();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/my-events");
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        await login(formData.email, formData.password);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h1 className="font-bold text-2xl text-shadow-gray-500 text-shadow-2xs m-4">
        Sign In
      </h1>
      <div className="card card-xl w-full md:max-w-xl bg-base-200 shadow-sm p-4">
        <form onSubmit={handleSubmit} className="w-full">
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
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mb-2">{errors.email}</p>
            )}
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
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </fieldset>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Login ..." : "Login"}
            </button>
          </div>
        </form>
        <p>
          Need an account?
          <Link to="/signup" className="link ml-2">
            Sign up
          </Link>
        </p>
      </div>
      {error && <p className="text-red-600 font-bold my-2">{error}</p>}
    </div>
  );
};

export { SignIn };

function validate({ email, password }: FormData) {
  const newErrors: Partial<FormData> = {};

  if (!email) {
    newErrors.email = "Please provide your email.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format.";
  }
  if (!password) {
    newErrors.password = "Please provide your password";
  } else if (password.length < 8) {
    newErrors.password = "Password length must be at least 8 characters long.";
  }
  return newErrors;
}
