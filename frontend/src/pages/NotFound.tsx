import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="bg-green-200 min-h-screen p-15">
      <h2>Page Not Found</h2>
      <p>
        Oops… looks like this page doesn’t exist.
        <Link to="/" className="link link-primary font-semibold">
          Go Home
        </Link>
      </p>
    </div>
  );
};

export { NotFound };
