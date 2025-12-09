import { useState } from "react";
import { useNavigate } from "react-router";
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
  const [errors, setErrors] = useState({});
  const [error, setError] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        await login(formData.email, formData.password);

        navigate("/create-event");
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl text-shadow-gray-500 text-shadow-2xs m-4">
        Sign In
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="text-black font-bold" htmlFor="email">
          E-Mail:
        </label>
        <input
          className="border-2 rounded-md mb-2 text-black p-0.4"
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-sm text-red-600 mb-2">{errors.email}</p>
        )}
        <label className="text-black font-bold" htmlFor="password">
          Password:
        </label>
        <input
          className="border-2 rounded-md mb-2 text-black p-0.4"
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
        <button
          className="btn btn-sm mt-2 mb-2 hover:bg-gray-600 disabled:bg-gray-600"
          type="submit"
          disabled={loading}
        >
          {loading ? "Login ..." : "Login"}
        </button>
      </form>
      {error.message && <p className="text-red-600">{error.message}</p>}
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
