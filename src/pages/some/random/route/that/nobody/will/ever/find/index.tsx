import {
  apiRequestHandler,
  deleteRequestHandler,
  putRequestHandler,
} from "@/utils/apiRequestHandler";
import { Button, Skeleton, Switch } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Projects = () => {
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await apiRequestHandler("projects");
      setProjects(projectsData.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  const deleteProject = async (ID: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be reversed",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (value) => {
      if (value.isConfirmed) {
        try {
          const deleteData = await deleteRequestHandler(`projects?id=${ID}`);
          toast.success(deleteData.message);
          getProjects();
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const toggleProject = async (project: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Toggle Project?",
      icon: "question",
    }).then(async (result) => {
      if (result.isConfirmed === true) {
        try {
          await putRequestHandler("projects", {
            body: {
              id: project.id,
              active: !project.active,
            },
          });
          getProjects();
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    });
  };

  return (
    <div className="mb-20">
      <div className="my-4 flex justify-end gap-4">
        <Button
          className="rounded glass border border-white"
          onPress={() =>
            router.push(
              "/some/random/route/that/nobody/will/ever/find/sequence"
            )
          }
        >
          Change Sequence
        </Button>
        <Button
          as={Link}
          href="/some/random/route/that/nobody/will/ever/find/project"
          className="rounded glass border border-white"
        >
          Add New
        </Button>
      </div>
      <div className="relative rounded shadow shadow-white">
        <table className="w-full">
          <thead className="whitespace-nowrap">
            <tr className="py-4">
              <th className="p-4">ID</th>
              <th className="p-4">Title</th>
              {/* <th className="px-4">Description</th> */}
              <th className="p-4">Link</th>
              <th className="p-4">Deployment Status</th>
              <th className="p-4">Live Status</th>
              <th className="p-4">Active</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading
              ? Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index}>
                      {Array(7)
                        .fill(0)
                        .map((_, index) => (
                          <td key={index} className="p-4">
                            <Skeleton className="rounded-full h-5 w-full" />
                          </td>
                        ))}
                    </tr>
                  ))
              : projects &&
                projects.length > 0 &&
                projects.map((project: any, index: number) => (
                  <tr key={index}>
                    <td className="p-3 text-center">{project.index ?? "-"}</td>
                    <td className="p-3 text-center">{project.title || "-"}</td>
                    {/* <td className="p-3 text-center line-clamp-1">
                      {project.description || "-"}
                    </td> */}
                    <td className="p-3 text-center">
                      {project.link ? (
                        <a
                          href={project.link}
                          className="hover:underline hover:text-[crimson] focus-visible:underline focus-visible:text-[crimson] outline-none"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.link}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {project.deployed || "-"}
                    </td>
                    <td className="p-3 text-center">{project.live || "-"}</td>
                    <td className="p-3 text-center">
                      <Switch
                        defaultSelected
                        aria-label="Automatic updates"
                        isSelected={project?.active ?? false}
                        onChange={() => toggleProject(project)}
                      />
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                      <a
                        href={`/project/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white focus-visible:bg-blue-500 focus-visible:text-white outline-none transition-all fas fa-eye me-2"
                      ></a>
                      <Link
                        href={`/some/random/route/that/nobody/will/ever/find/project/${project.slug}`}
                        className="p-1.5 rounded bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-white focus-visible:bg-orange-500 focus-visible:text-white outline-none transition-all far fa-pen-to-square me-2"
                      ></Link>
                      <button
                        onClick={() => deleteProject(project.index)}
                        className="p-1.5 rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white focus-visible:bg-red-500 focus-visible:text-white outline-none transition-all fas fa-trash me-2"
                      ></button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
