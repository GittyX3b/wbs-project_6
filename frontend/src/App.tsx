import { MainLayout } from "@layouts";
import { Home } from "@pages";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
