import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiBaseUrl, fetchData } from "@utils/apiAccess";
import { EventForm } from "@components";

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

export function EditEvent() {
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

  return <EventForm event={event} />;
}
