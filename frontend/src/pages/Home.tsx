import { fetchEvents, type EventsRequest } from "@utils";
import { useEffect, useState } from "react";
import { EventCard, Hero } from "@components";

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

  if (loading) return <div>Lädt...</div>;
  if (error) return <div>Fehler: {error}</div>;

  return (
    <div>
      <Hero />
      <div className="p-15">
        <h2>Upcoming Events ({eventData?.totalCount})</h2>

        <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] 2xl:grid-cols-[1fr_1fr_1fr_1fr] gap-5">
          {eventData?.results.map((item) => {
            return <EventCard {...item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export { Home };
