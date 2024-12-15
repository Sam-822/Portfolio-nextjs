import React, { useEffect } from "react";
import Typed from "typed.js";

const Home = () => {
  useEffect(() => {
    const typed = new Typed("#type-list", {
      strings: [
        "React.JS",
        "Next.JS",
        "Express.JS",
        "Node.JS",
        "MongoDB",
        "Vite",
        "Bootstrap",
        "Tailwind",
      ],
      typeSpeed: 50,
      backSpeed: 20,
      loop: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section id="home">
      <div className="grid sm:grid-cols-3 items-center mt-20">
        <div className="sm:col-span-2">
          <h1 id="react-dev" className="text-5xl text-crimson mb-6">
            Abdul Samad Ansari
          </h1>
          <p className="text-white text-3xl mb-4">
            I am a Web Developer who works with{" "}
            <span id="type-list" className="text-crimson" />
          </p>
          <p className="text-white text-xl" style={{ width: "50vw" }}>
            My extensive project experience, as described in the projects
            section, has honed my problem-solving skills and equipped me with
            the ability to create dynamic, responsive web applications.
            Additionally, my backend knowledge in technologies like NodeJS and
            ExpressJS complements my frontend skills, allowing me to contribute
            to full-stack development projects effectively.
          </p>
        </div>
        <div className="z-10 autoBob">
          <svg
            id="sw-js-blob-svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <defs>
              <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                <stop
                  id="stop1"
                  stopColor="rgba(65, 90, 119, 1)"
                  offset="0%"
                ></stop>
                <stop
                  id="stop2"
                  stopColor="rgba(224, 225, 221, 1)"
                  offset="100%"
                ></stop>
              </linearGradient>
              {/* Define clip path */}
              <clipPath id="clip-path">
                <path
                  d="M17.5,-30.4C23.5,-26.8,29.9,-23.9,33.7,-18.9C37.4,-14,38.6,-7,39.2,0.4C39.9,7.7,40,15.5,36,20C32.1,24.6,23.9,26,17.2,30.2C10.5,34.5,5.3,41.5,-0.6,42.6C-6.5,43.7,-13.1,38.9,-17.3,33.2C-21.6,27.6,-23.5,21.1,-26.8,15.5C-30.2,9.8,-34.8,4.9,-37.3,-1.4C-39.8,-7.8,-40.1,-15.5,-36.7,-21.2C-33.4,-26.8,-26.4,-30.2,-19.7,-33.5C-13,-36.7,-6.5,-39.7,-0.4,-39C5.7,-38.3,11.4,-34,17.5,-30.4Z"
                  transform="translate(50 50)"
                />
              </clipPath>
            </defs>

            {/* Blob shape */}
            <path
              fill="url(#sw-gradient)"
              d="M17.5,-30.4C23.5,-26.8,29.9,-23.9,33.7,-18.9C37.4,-14,38.6,-7,39.2,0.4C39.9,7.7,40,15.5,36,20C32.1,24.6,23.9,26,17.2,30.2C10.5,34.5,5.3,41.5,-0.6,42.6C-6.5,43.7,-13.1,38.9,-17.3,33.2C-21.6,27.6,-23.5,21.1,-26.8,15.5C-30.2,9.8,-34.8,4.9,-37.3,-1.4C-39.8,-7.8,-40.1,-15.5,-36.7,-21.2C-33.4,-26.8,-26.4,-30.2,-19.7,-33.5C-13,-36.7,-6.5,-39.7,-0.4,-39C5.7,-38.3,11.4,-34,17.5,-30.4Z"
              transform="translate(50 50)"
              strokeWidth="0"
              style={{ transition: "all 0.3s ease 0s" }}
              stroke="url(#sw-gradient)"
            />

            {/* Image */}
            <image
              href="https://avatars.githubusercontent.com/u/67514912?v=4"
              x="15"
              y="10"
              width="75"
              height="75"
              clipPath="url(#clip-path)"
            />
          </svg>
        </div>
      </div>
      <img src="/helm.png" className="helm autoRotate" alt="" />
    </section>
  );
};

export default Home;
