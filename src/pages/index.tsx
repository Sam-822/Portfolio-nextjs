import About from "@/components/About";
import Contact from "@/components/Contact";
import HomeComponent from "@/components/HomeComponent";
import Projects from "@/components/Projects";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Abdul Samad{"'"}s Portfolio | Home</title>
      </Head>
      <HomeComponent />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
