import { createEventInDB, updateEventInDB } from "@utils/apiAccess";
import { useNavigate } from "react-router";

export type FormOutputType = {
  title: string;
  description: string;
  date: string;
  location: string;
  longitude: number | null;
  latitude: number | null;
};

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  organizerId: number;
};

type EventFormProps = {
  event?: Partial<Event>;
};

const EventForm = ({ event }: EventFormProps) => {
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
      const res = event?.id
        ? await updateEventInDB(event.id, formOutput)
        : await createEventInDB(formOutput);

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
      <h2>{event ? "Edit Event" : "Create Event"}</h2>
      <form className="grid grid-cols-[1fr_2fr] gap-5" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col justify-start">
          <label className="floating-label mb-10">
            <input
              type="text"
              id="title"
              defaultValue={event?.title ?? ""}
              name="title"
              placeholder="Event Title"
              className="input input-md w-full placeholder:font-bold "
              required
            />
            <span className="text-xl font-bold">Event Title</span>
          </label>

          <label className="floating-label mb-10">
            <input
              type="datetime-local"
              id="date"
              defaultValue={event?.date ?? ""}
              name="date"
              placeholder="Event Date"
              className="input input-md w-full placeholder:font-bold "
              required
              onInput={(e) => (e.target as HTMLInputElement).blur()}
            />
            <span className="text-xl font-bold">Event Date</span>
          </label>

          <div className="text-xl font-bold p-6 pl-4">Location</div>
          <div className="grid grid-cols-2 gap-4">
            <label className="floating-label mb-5">
              <input
                type="text"
                id="streetNumber"
                defaultValue={
                  event?.location ? parseLocation(event.location).street : ""
                }
                name="streetNumber"
                placeholder="Street and Number"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold">Street and Number</span>
            </label>
            <label className="floating-label mb-5">
              <input
                type="text"
                id="city"
                defaultValue={
                  event?.location ? parseLocation(event.location).city : ""
                }
                name="city"
                placeholder="City"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold">City</span>
            </label>
            <label className="floating-label mb-5">
              <input
                type="text"
                id="postalcode"
                defaultValue={
                  event?.location
                    ? parseLocation(event.location).postalCode
                    : ""
                }
                name="postalcode"
                placeholder="Postal Code"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold">Postal Code</span>
            </label>
            <label className="floating-label mb-5">
              <input
                type="text"
                id="Country"
                defaultValue={
                  event?.location ? parseLocation(event.location).country : ""
                }
                name="Country"
                placeholder="Country"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold">Country</span>
            </label>
            <label className="floating-label">
              <input
                type="number"
                id="longitude"
                defaultValue={event?.longitude ?? ""}
                name="longitude"
                placeholder="Longitude"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold">Longitude</span>
            </label>
            <label className="floating-label">
              <input
                type="number"
                id="latitude"
                defaultValue={event?.latitude ?? ""}
                name="latitude"
                placeholder="Latitude"
                className="input input-md w-full placeholder:font-bold "
              />
              <span className="text-xl font-bold">Latitude</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="gap-3 h-full">
          <label className="floating-label mb-3 h-full">
            <textarea
              id="description"
              defaultValue={event?.description ?? ""}
              name="description"
              placeholder="Event Description"
              className="input input-md p-3 w-full min-h-full placeholder:font-bold"
            ></textarea>
            <span className="text-xl font-bold">Event Description</span>
          </label>
        </fieldset>

        <button
          className="btn btn-primary btn-soft btn-xl mt-6 col-span-2 py-20"
          type="submit"
        >
          {event ? "Edit Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export { EventForm };

function mergeLocation(formData: FormData): string {
  const street = formData.get("streetNumber") as string;
  const postal = formData.get("postalcode") as string;
  const city = formData.get("city") as string;
  const country = formData.get("Country") as string;

  return `${street}, ${postal} ${city}, ${country}`;
}

function parseLocation(location: string) {
  const [streetPart, cityPart, country] = location
    .split(",")
    .map((s) => s.trim());

  const [postalCode, ...cityParts] = cityPart.split(" ");
  const city = cityParts.join(" ");

  return {
    street: streetPart,
    postalCode,
    city,
    country,
  };
}
