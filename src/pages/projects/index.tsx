import ProjectItem from "@/components/ProjectItem";
import Head from "next/head";
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
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Could not get projects");
      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message);
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
    <>
		<Head>
			<title>Abdul Samad{"'"}s Portfolio | My Projects</title>
		</Head>
      <h3 className="text-5xl text-crimson">Projects</h3>
      <div className="grid my-3 grid-cols-1 sm:grid-cols-2 px-2 sm:px-32">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => <ProjectItem key={index} loading={loading} />)
          : projects &&
            projects.length > 0 &&
            projects.map((project, index) => (
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
