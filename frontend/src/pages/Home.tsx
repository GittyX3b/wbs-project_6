import { type Event, fetchUpcomingEvents } from "@utils";
import { useEffect, useState, type SetStateAction } from "react";
import { EventCard, Hero } from "@components";

const Home = () => {
  const [page, _setPage] = useState(1);
  const [limit, _setLimit] = useState(10);
  const [eventData, setEventData] =
    useState<SetStateAction<Event[] | null>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchUpcomingEvents();
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
        <h2 id="upcoming">Upcoming Events ({eventData?.length})</h2>

        <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] 2xl:grid-cols-[1fr_1fr_1fr_1fr] gap-5">
          {eventData?.map((item: Event) => {
            return <EventCard {...item} key={item.id} editable={false} />;
          })}
        </div>
      </div>
    </div>
  );
};

export { Home };
