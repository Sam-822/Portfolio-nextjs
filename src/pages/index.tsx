import About from "@/components/About";
import Contact from "@/components/Contact";
import HomeComponent from "@/components/HomeComponent";
import Projects from "@/components/Projects";

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
