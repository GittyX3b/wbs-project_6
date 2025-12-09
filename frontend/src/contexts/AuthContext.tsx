import { createContext, use, useState } from "react";
import { signIn } from "@utils/apiAccess";

const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  async function login(email: string, password: string) {
    try {
      const data = await signIn(email, password);

      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      throw new Error(error);
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
