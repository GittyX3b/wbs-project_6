const Hero = () => {
  return (
    <div
      className="hero min-h-screen "
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1631179234473-f48fedffed9a)",
      }}
    >
      <div className="hero-verlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button
            className="btn btn-primary btn-soft"
            onClick={() => {
              const section = document.getElementById("upcoming");
              if (section) {
                const y =
                  section.getBoundingClientRect().top +
                  window.pageYOffset -
                  100; // 100px offset because fixed header
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
          >
            Upcoming Events
          </button>
        </div>
      </div>
    </div>
  );
};

export { Hero };
