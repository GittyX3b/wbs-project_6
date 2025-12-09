import { createContext, use, useState } from "react";
import { signIn } from "@utils/apiAccess";

const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  async function login(email: string, password: string) {
    try {
      const data = await signIn(email, password);

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
    } catch (error) {
      throw new Error(error);
    }
  }

  return <AuthContext value={{ token, user, login }}>{children}</AuthContext>;
}

export function useAuth() {
  return use(AuthContext);
}
