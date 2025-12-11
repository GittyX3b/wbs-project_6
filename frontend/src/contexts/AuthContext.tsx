import { createContext, use, useState } from "react";
import { fetchData, apiBaseUrl } from "@utils/apiAccess";

type User = {
  id: number;
  email: string;
};

type UserType = {
  token: string;
  user: User;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function login(email: string, password: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    try {
      const data = await fetchData<UserType>(
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
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
}
