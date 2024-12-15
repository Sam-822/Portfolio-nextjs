import React from "react";

const Conact = () => {
  return (
    <section id="contact">
      <div className=" text-white py-40">
        <h3 className="text-5xl text-crimson autoShowText mb-6">Contact Me:</h3>
        <p className="text-xl autoShowText mb-4">
          Find my contact details below
        </p>
        <div className="autoShowText">
          <div className="contact-item text-xl mb-1">
            <i className="fas fa-envelope fs-3 me-2 text-xl" />
            Email:&nbsp;
            <a
              href="mailto:ansamad1028@gmail.com"
              target="_blank"
              className="hover-underline"
              rel="noopener noreferrer"
            >
              ansamad1028@gmail.com
            </a>
          </div>
          <div className="contact-item text-xl mb-1">
            <i className="fab fa-linkedin fs-3 me-2 text-xl" />
            LinkedIn:&nbsp;
            <a
              href="https://www.linkedin.com/in/abdulsamad102/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline"
            >
              linkedin.com/in/abdulsamad102/
            </a>
          </div>
          <div className="contact-item text-xl mb-1">
            <i className="fab fa-github fs-3 me-2 text-xl" />
            Github:&nbsp;
            <a
              href="https://github.com/Sam-822"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline"
            >
              github.com/Sam-822
            </a>
          </div>
          <div className="contact-item text-xl mb-1">
            <i className="fas fa-file-arrow-down fs-3 me-2 text-xl" />
            Resume:&nbsp;
            <a
              href={"/resume.pdf"}
              className="hover-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here to download
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Conact;
