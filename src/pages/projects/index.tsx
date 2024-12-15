import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ProjectItem from "@/components/ProjectItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      title: null,
      description: null,
      deployed: null,
      slug: null,
      link: null,
      image: null,
      index: 0,
      live: null,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const getProjects = async () => {
    try {
      const res = await fetch("/projects.json");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
        <h3 className="text-5xl text-crimson">Projects</h3>
        <div className="grid my-3 grid-cols-1 sm:grid-cols-2 px-2 sm:px-32">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <ProjectItem key={index} loading={loading} />
                ))
            : projects &&
              projects.length > 0 &&
              projects
                .map((project, index) => (
                  <ProjectItem
                    key={index}
                    img={project.image}
                    title={project.title}
                    description={project.description}
                    link={project.link}
                    buttonText={project.deployed}
                    projectID={project.slug}
                    loading={loading}
                    live={project.live}
                  />
                ))}
        </div>
    </>
  );
};

export default Projects;
