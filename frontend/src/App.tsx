import { MainLayout, ProtectedLayout } from "@layouts";
import {
  Home,
  EventDetails,
  SignIn,
  CreateEvent,
  EditEvent,
  MyEvents,
  AboutUs,
  Contact,
  NotFound,
} from "@pages";
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
            <Route path="/edit-event/:id" element={<EditEvent />} />
            <Route path="/my-events" element={<MyEvents />} />
          </Route>
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
