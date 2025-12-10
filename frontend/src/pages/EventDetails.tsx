import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiBaseUrl, fetchData } from "@utils/apiAccess";

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

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const eventDetail = async () => {
      try {
        const data = (await fetchData(
          apiBaseUrl + `api/events/${id}`
        )) as Event;
        setEvent(data);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    eventDetail();
  }, [id]);

  if (!event) {
    return (
      <div className="bg-green-200 min-h-screen p-15">
        <h2>Event Not Found</h2>
        <p>Sorry, we couldn't find the event you're looking for.</p>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleString("de-De", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-green-200 min-h-screen p-15">
      <h1 className="font-bold text-2xl text-shadow-gray-500 text-shadow-2xs m-4">
        {event.title}
      </h1>
      <div className="card bg-base-100 shadow-sm mb-6">
        <div className="card-body">
          <h2 className="card-title">Event Details</h2>
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p className="mt-2">{event.description}</p>
        </div>
      </div>
      <div className="card-actions justify-end">
        <button className="btn">Share</button>
        <button className="btn btn-primary">Join</button>
      </div>
    </div>
  );
};

export { EventDetails };
