import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiBaseUrl, fetchData } from "@utils/apiAccess";
import { Map } from "@components";

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
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-green-200 min-h-screen p-15">
      <h1 className="font-bold text-2xl text-shadow-gray-500 text-shadow-2xs m-4">
        {event.title}
      </h1>
      <div className="card card-xl bg-base-200 shadow-sm mb-6">
        <div className="card-body">
          <span className="cursive text-md text-neutral-400">
            {formattedDate}
          </span>
          <a
            href="#map"
            className="cursive text-md text-neutral-400 font-bold underline pb-4"
          >
            {event.location}
          </a>
          <p className="mt-2">{event.description}</p>
          <div className="card-actions justify-end">
            <button className="btn">Share</button>
            <button className="btn btn-primary">Join</button>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-sm" id="map">
        <div className="card-body">
          <p className="font-bold">{event.location}</p>
          <Map
            location={event.location}
            latitude={event.latitude}
            longitude={event.longitude}
          />
        </div>
      </div>
    </div>
  );
};

export { EventDetails };
