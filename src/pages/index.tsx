import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HomeComponent from "@/components/HomeComponent";
import NavBar from "@/components/NavBar";
import Projects from "@/components/Projects";
import Image from "next/image";

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
