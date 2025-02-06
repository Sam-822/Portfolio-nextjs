import About from "@/components/About";
import Contact from "@/components/Contact";
import HomeComponent from "@/components/HomeComponent";
import Projects from "@/components/Projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abdul Samad's Portfolio | Home",
  description: "Abdul Samad Ansari's Portfolio.",
  authors: { name: "Abdul Samad Ansari" },
  creator: "Abdul Samad Ansari",
  publisher: "Abdul Samad Ansari",
  robots: "noindex, nofollow",
};

export default function Home() {
  return (
    <>
      <HomeComponent />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
