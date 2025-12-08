const EventCard = ({ title, description, date }) => {
  return (
    <div className="card bg-base-100 card-xl shadow-sm w-full cursor-pointer">
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
        <div className="card-actions justify-end">
          <button className="btn btn-primary w-full mt-4">See Details</button>
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
