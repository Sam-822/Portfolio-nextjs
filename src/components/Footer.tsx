import React from "react";
import Logo from "./Logo";
import { Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="text-gray-400 bg-gray-900 body-font z-10 relative">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-white"
          >
            <Logo />
            <span className="ml-3 text-xl">Abdul Samad Ansari</span>
          </Link>
          <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
            © 2024 Abdul Samad Ansari —
            <Tooltip content="Github Profile">
              <a
                href="https://github.com/Sam-822"
                className="text-gray-500 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Sam-822
              </a>
            </Tooltip>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start gap-x-4">
            <Tooltip content="Email">
              <a
                href="mailto:ansamad1028@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fas fa-envelope text-2xl"
              />
            </Tooltip>
            <Tooltip content="LinkedIn">
              <a
                href="https://www.linkedin.com/in/abdulsamad102/"
                target="_blank"
                rel="noopener noreferrer"
                className="fab fa-linkedin text-2xl"
              />
            </Tooltip>
            <Tooltip content="Github">
              <a
                href="https://github.com/Sam-822"
                target="_blank"
                rel="noopener noreferrer"
                className="fab fa-github text-2xl"
              />
            </Tooltip>
            <Tooltip content="Resume">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="fas fa-file-arrow-down text-2xl"
              />
            </Tooltip>
          </span>
        </div>
      </footer>
      <div className="relative">
        <Tooltip content="Source code to this portfolio">
          <Button
            as={Link}
            isIconOnly
            href="https://github.com/Sam-822/Portfolio2.0"
            target="_blank"
            rel="noopener noreferrer"
            className=" rounded-full fixed bottom-5 right-5"
          >
            <i className="fab fa-github text-2xl" />
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default Footer;
