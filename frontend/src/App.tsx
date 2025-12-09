import { MainLayout, ProtectedLayout } from "@layouts";
import { Home, EventDetails, SignIn, CreateEvent, MyEvents } from "@pages";
import { Route, Routes } from "react-router";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/my-events" element={<MyEvents />} />
          </Route>
          <Route path="/event/:slug" element={<EventDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
