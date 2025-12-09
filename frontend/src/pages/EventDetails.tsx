import { useParams } from "react-router";

const EventDetails = () => {
  const params = useParams();

  return (
    <div className="bg-green-200 min-h-screen p-15">
      EventDetails.tsx - {params.id}
    </div>
  );
};

export { EventDetails };
