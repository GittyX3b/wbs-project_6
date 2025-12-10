import { createContext, use, useState } from "react";
import { fetchData, apiBaseUrl } from "@utils/apiAccess";

type UserType = {
  id: number;
  email: string;
};

type UserDataType = {
  token: string;
  user: {
    id: number;
    email: string;
  };
};

const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem("user"))
  );

  async function login(email: string, password: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    try {
      const data = await fetchData<UserDataType>(
        apiBaseUrl + "api/auth/login",
        requestOptions
      );

      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext value={{ token, user, login, logout }}>{children}</AuthContext>
  );
}

export function useAuth() {
  return use(AuthContext);
}
