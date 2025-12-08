import { fetchEvents, type EventsRequest } from "@utils";
import { useEffect, useState } from "react";

const Home = () => {
  const [page, _setPage] = useState(1);
  const [limit, _setLimit] = useState(10);
  const [eventData, setEventData] = useState<EventsRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchEvents(page, limit);
        setEventData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Fehler beim Laden");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [page, limit]); // ← Nur primitive Values als Dependencies

  console.log("eventData:", eventData);

  if (loading) return <div>Lädt...</div>;
  if (error) return <div>Fehler: {error}</div>;

  return (
    <div>
      <h1>Events ({eventData?.totalCount})</h1>
      <ul>
        {eventData?.results.map((event: any) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export { Home };
