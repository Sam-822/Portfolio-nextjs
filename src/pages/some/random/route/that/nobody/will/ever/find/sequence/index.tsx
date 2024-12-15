import ProjectTable from "@/components/ProjectTable";
import SequenceEdit from "@/components/SequenceEdit";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button
          className="rounded glass border border-white"
          onPress={() =>
            router.push("/some/random/route/that/nobody/will/ever/find")
          }
          startContent={<i className="fas fa-chevron-left me-2" />}
        >
          Go Back
        </Button>
      </div>
      {/* <ProjectTable projects={projects} setProjects={setProjects} /> */}
      <SequenceEdit startItems={projects} />
    </div>
  );
};

export default ProjectsPage;
