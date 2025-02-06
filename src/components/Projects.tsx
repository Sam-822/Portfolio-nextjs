import React, { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { apiRequestHandler } from "@/utils/apiRequestHandler";

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
      const data = await apiRequestHandler('projects');
      setProjects(data.data.filter((project: any) => project.active === true));
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
    <section id="projects">
      <div className="pt-40">
        <div className="relative flex justify-between items-center autoShowText">
          <h3 className="text-5xl text-crimson">Projects</h3>
          <Link href="/projects" className="hover-underline group">
            View All{" "}
            <i className="fas fa-arrow-right text-sm group-hover:translate-x-2 transition-transform ms-1" />
          </Link>
        </div>
        <div className="grid my-3 grid-cols-1 sm:grid-cols-2 px-2 sm:px-32">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <ProjectItem key={index} loading={loading} />
                ))
            : projects &&
              projects.length > 0 &&
              projects
                .sort((a, b) => a.index - b.index)
                .slice(0, 4)
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
        <div className="relative flex justify-center">
          {!loading && (
            <Button
              as={Link}
              href="projects"
              className="!bg-white/30 glass mx-auto text-white"
              endContent={<i className="fas fa-arrow-right" />}
            >
              View All
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
