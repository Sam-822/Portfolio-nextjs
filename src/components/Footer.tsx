import React from "react";
import Logo from "./Logo";
import { Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";

const Footer = () => {
  const oldFooter = ` <footer>
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 z-50 relative">
        <div className="container max-w-screen-xl mx-auto flex flex-wrap justify-start space-y-6 md:space-y-0">
          {/* Logo and Name Section */}
          <div className="grid gap-y-4 items-center w-full md:w-auto h-fit">
            <div className="relative flex">
              <div className="mr-4">
                <Logo />
              </div>
              <div className="text-4xl text-crimson">Abdul Samad Ansari</div>
            </div>
            <div className="relative flex gap-x-5 justify-end">
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
              <Tooltip content="Source code to this project">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fas fa-file-arrow-down text-2xl"
                />
              </Tooltip>
            </div>
          </div>

          {/* Projects Section */}
          <div className="w-full md:w-1/3 flex flex-col items-end">
            <div className="relative">
              <h3 className="text-2xl text-crimson mb-2">Projects:</h3>
              <ul className="space-y-2 text-lg">
                <li>
                  <a
                    href="https://bookstore-sooty-beta.vercel.app/"
                    className="text-white hover-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Books Palace
                  </a>
                </li>
                <li>
                  <a
                    href="https://shopbuddy-abdul-samad-ansaris-projects.vercel.app/"
                    className="text-white hover-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ShopBuddy
                  </a>
                </li>
                <li>
                  <a
                    href="https://foodbuddyabdul.netlify.app/"
                    className="text-white hover-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FoodBuddy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Source Code Button */}
    <div>
      <Tooltip content="Source code to this project">
        <Button
          as={Link}
          isIconOnly
          href="https://github.com/Sam-822/Portfolio2.0"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 rounded-full"
        >
          <i className="fab fa-github text-2xl" />
        </Button>
      </Tooltip>
    </div>
        </div>
      </div>
    </footer>`;
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
