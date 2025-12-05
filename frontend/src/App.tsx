import { MainLayout } from "@layouts";
import { Home } from "@pages";
import { Route, Routes } from "react-router";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
