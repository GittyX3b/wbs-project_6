import { createEventInDB } from "@utils/apiAccess";
import { useNavigate } from "react-router";

export type FormOutputType = {
  title: string;
  description: string;
  date: string;
  location: string;
  longitude: number | null;
  latitude: number | null;
};

export function CreateEvent() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // verhindert Page Reload

    const formData = new FormData(e.currentTarget);

    const formOutput: FormOutputType = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: formData.get("date") as string,
      location: mergeLocation(formData),
      longitude: formData.get("longitude")
        ? Number(formData.get("longitude"))
        : null,
      latitude: formData.get("latitude")
        ? Number(formData.get("latitude"))
        : null,
    };

    try {
      const res = await createEventInDB(formOutput);
      if (res.success) {
        // navigation direkt nach erfolgreichem POST
        navigate("/my-events", { replace: true });
      } else {
        console.error("Event creation failed:", res);
      }
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  return (
    <div className="p-15">
      <h2>Create Event</h2>
      <form
        className="grid grid-cols-[1fr_1fr] 2xl:grid-cols-[1fr_2fr] gap-5 bg-base-200 p-5 "
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col justify-start col-span-2 lg:col-span-1">
          <label className="floating-label mb-10">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Event Title"
              className="input input-md w-full placeholder:font-bold"
              required
            />
            <span className="text-xl font-bold rounded-xl">Event Title</span>
          </label>

          <label className="floating-label mb-10">
            <input
              type="datetime-local"
              id="date"
              name="date"
              placeholder="Event Date"
              className="input input-md w-full placeholder:font-bold "
              required
              onInput={(e) => (e.target as HTMLInputElement).blur()}
            />
            <span className="text-xl font-bold rounded-xl">Event Date</span>
          </label>

          <div className="text-xl font-bold p-6 pl-4">Location</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="floating-label mb-5">
              <input
                type="text"
                id="streetNumber"
                name="streetNumber"
                placeholder="Street and Number"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold rounded-xl">
                Street and Number
              </span>
            </label>
            <label className="floating-label mb-5">
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold rounded-xl">City</span>
            </label>
            <label className="floating-label mb-5">
              <input
                type="text"
                id="postalcode"
                name="postalcode"
                placeholder="Postal Code"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold rounded-xl">Postal Code</span>
            </label>
            <label className="floating-label mb-5">
              <input
                type="text"
                id="Country"
                name="Country"
                placeholder="Country"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold rounded-xl">Country</span>
            </label>
            <label className="floating-label mb-5  sm:mb-0">
              <input
                type="number"
                id="longitude"
                name="longitude"
                placeholder="Longitude"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold rounded-xl">Longitude</span>
            </label>
            <label className="floating-label mb-5 sm:mb-0">
              <input
                type="number"
                id="latitude"
                name="latitude"
                placeholder="Latitude"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold rounded-xl">Latitude</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="gap-3 h-full col-span-2 lg:col-span-1 pt-10 lg:pt-0 min-h-80">
          <label className="floating-label mb-3 h-full">
            <textarea
              id="description"
              name="description"
              placeholder="Event Description"
              className="input input-md p-3 w-full min-h-full placeholder:font-bold"
            ></textarea>
            <span className="text-xl font-bold rounded-xl">
              Event Description
            </span>
          </label>
        </fieldset>

        <button
          className="btn btn-primary btn-soft btn-xl mt-6 col-span-2 py-20 col-span-2 "
          type="submit"
        >
          Create event
        </button>
      </form>
    </div>
  );
}

function mergeLocation(formData: FormData): string {
  const street = formData.get("streetNumber") as string;
  const postal = formData.get("postalcode") as string;
  const city = formData.get("city") as string;
  const country = formData.get("Country") as string;

  return `${street}, ${postal} ${city}, ${country}`;
}

// const validate = ({ name, email, message }) => {
//   const newErrors = {};
//   if (!name.trim()) newErrors.name = 'Name is required.';
//   if (!email.trim()) {
//     newErrors.email = 'Email is required.';
//   } else if (!/\S+@\S+\.\S+/.test(email)) {
//     newErrors.email = 'Invalid email format.';
//   }
//   if (!message.trim()) newErrors.message = 'Message is required.';
//   return newErrors;
// };
