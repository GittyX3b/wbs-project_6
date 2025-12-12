import { NavLink } from "react-router";
import { Pencil, Trash } from "lucide-react";
import { deleteEventInDB } from "@utils/apiAccess";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: Date;
  editable: boolean;
}

const EventCard = ({
  title,
  description,
  date,
  id,
  editable,
}: EventCardProps) => {
  const deleteEvent = async (eventId: number) => {
    const res = await deleteEventInDB(eventId);

    if (res.success) {
      const element = document.getElementById(`event-card-${eventId}`);
      if (element) {
        element.remove();
      }
    }
  };

  return (
    <div
      id={`event-card-${id}`}
      className="card bg-base-200 card-xl shadow-sm w-full cursor-pointer"
    >
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <span className="cursive text-md text-neutral-400 pb-4">
          {convertDate(date)}
        </span>

        <p>
          {description.length > 100
            ? description.slice(0, 100) + "…"
            : description}
        </p>

        <div
          className={`card-actions justify-end mt-4 ${editable && "grid grid-cols-[1fr_4fr_1fr]"}`}
        >
          {editable && (
            <button
              className="btn btn-soft btn-error p-0"
              onClick={() => deleteEvent(id)}
            >
              <Trash size={18} />
            </button>
          )}
          <NavLink
            to={`/event/${id}`}
            className="btn btn-soft btn-info w-full "
          >
            See Details
          </NavLink>
          {editable && (
            <NavLink
              to={`/edit-event/${id}`}
              className="btn btn-soft btn-warning p-0"
            >
              <Pencil size={18} />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export { EventCard };

function convertDate(date: string | Date): string {
  // Ensure it's a Date object
  const d = date instanceof Date ? date : new Date(date);

  // Format the date part
  const datePart = d.toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the time part
  const timePart = d.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart} - ${timePart} Uhr`;
}
