import React from "react";

const About = () => {
  return (
    <section id="about">
      <div className="pt-40">
        <h3 className="text-5xl text-crimson autoShowText mb-6">About</h3>
        <p className="autoShowText text-xl mb-4">
          I'm Abdul Samad Ansari, a passionate MERN stack developer with a flair
          for building dynamic and interactive web applications. My
          expertiselies in the following technologies:
        </p>
        <ul className="autoShowText text-xl list-disc list-inside mb-4">
          <li>
            NextJS: I've been a NextJS developer intern since August 2024 at
            BeamInnovate pvt ltd.
          </li>
          <li>
            React.js: I create responsive and user-friendly interfaces using
            React, ensuring seamless user experiences.
          </li>
          <li>
            MongoDB: I handle data storage and retrieval efficiently, leveraging
            MongoDB for robust backend development.
          </li>
          <li>
            Express.js: I build RESTful APIs and manage server-side logic with
            Express.
          </li>
          <li>
            Node.js: I'm proficient in server-side scripting using Node.js,
            ensuring smooth communication between the client and server.
          </li>
        </ul>
        <p className="autoShowText text-xl">
          Whether it's crafting pixel-perfect UI components or optimizing
          backend performance, I'm committed to delivering clean, code that
          adheres to industry standards. Let's collaborate and bring your ideas
          to life! Feel free to connect with me on LinkedIn or explore my
          projects on GitHub. You can also reach out via email at{" "}
          <a
            href="mailto:ansamad1028@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-crimson hover-underline"
          >
            ansamad1028@gmail.com
          </a>
          . Looking forward to creating amazing web experiences together!
        </p>
      </div>
    </section>
  );
};

export default About;
