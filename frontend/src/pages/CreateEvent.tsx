import { useState } from "react";

/**
 * Define string literal type CreateEventState
 */
type CreateEventState = "fetching" | "init" | "emptyFields";

export function CreateEvent() {
  const [createEventState, SetCreateEventState] = useState(() => "init");

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl text-shadow-gray-500 text-shadow-2xs m-4">
          Create Event
        </h1>
        <form className="flex flex-col">
          <label className="font-bold" htmlFor="title">
            Title:
          </label>
          <input className="input mb-2" type="text" name="title" id="title" />
          <label className="font-bold">Description:</label>
          <textarea className="textarea mb-2"></textarea>
          <label className="font-bold" htmlFor="description">
            Date:
          </label>
          <input
            className="input mb-2"
            type="datetime-local"
            name="date"
            id="date"
          />
          <label className="font-bold" htmlFor="location">
            Location:
          </label>
          <input
            className="input mb-2"
            type="text"
            name="location"
            id="location"
          />
          <button className="btn btn-primary mt-6" type="submit">
            Create event
          </button>
        </form>
        <p className="text-red-600 font-bold mt-2">
          {createEventState === "emptyFields"
            ? "⚠️ There are empty fields ⚠️"
            : "Please fill out form"}
        </p>
      </div>
    </>
  );
}
