import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
// Utility function to get the path to the projects JSON file
const getProjectsFilePath = () =>
  path.join(process.cwd(), "public", "projects.json");

// Read projects from JSON file
const readProjects = () => {
  const filePath = getProjectsFilePath();
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
};

// Write projects to the JSON file
const writeProjects = (projects: any[]) => {
  const filePath = getProjectsFilePath();
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
};

// Handle API requests
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  let projects = readProjects(); // Load projects from the file

  switch (method) {
    case "GET": {
      // Check for "slug" query parameter
      const { slug } = query;

      if (slug) {
        // Find the project by its slug
        const project = projects.find((project: any) => project.slug === slug);
        if (!project) {
          res.status(404).json({
            status: "error",
            message: `Project with slug '${slug}' not found`,
          });
          return;
        }
        res.status(200).json({ status: "success", data: project });
      } else {
        // Return all projects if no slug is provided
        res.status(200).json({ status: "success", data: projects });
      }
      break;
    }

    case "POST": {
      // Add a new project
      const newProject = req.body;

      // Check for required fields
      if (!newProject.title || !newProject.description || !newProject.slug) {
        res.status(400).json({
          status: "error",
          message: "Missing required fields: title, description, or slug",
        });
        return;
      }

      // Set default values for fields like id, index, etc.
      newProject.id = projects.length
        ? projects[projects.length - 1].id + 1
        : 1;
      newProject.index = projects.length;
      newProject.deployed = newProject.deployed || false;
      newProject.live = newProject.live || false;
      newProject.all_images = newProject.all_images || [];
      newProject.collage_images = newProject.collage_images || [];
      newProject.image_path =
        newProject.image_path || "/projects/flaunt-green/";
			newProject.descriptionList = newProject.descriptionList || []
			newProject.techStack = newProject.techStack || []

      projects.push(newProject);
      writeProjects(projects); // Save the new project list
      res
        .status(201)
        .json({ status: "success", message: "Project saved successfully" });
      break;
    }

    case "PUT": {
      // Update an existing project
      const updatedProject = req.body;

      // Check for ID in the request
      if (!updatedProject.id && updatedProject.id !== 0) {
        res.status(400).json({
          status: "error",
          message: "Missing project ID",
        });
        return;
      }

      // Find and update the project
      let projectFound = false;
      projects = projects.map((project: any) => {
        if (project.index === updatedProject.id) {
          projectFound = true;
          return { ...project, ...updatedProject };
        }
        return project;
      });

      if (!projectFound) {
        res.status(404).json({
          status: "error",
          message: "Project not found",
        });
        return;
      }

      writeProjects(projects);
      res.status(200).json({
        status: "success",
        message: "Project Updated Successfully",
      });
      break;
    }

    case "DELETE": {
      // Delete a project by ID
      const { id } = req.query;

      if (!id) {
        res.status(400).json({
          status: "error",
          message: "Missing project ID",
        });
        return;
      }

      const projectId = Number(id);
      const projectIndex = projects.findIndex(
        (project: any) => project.index === projectId
      );

      if (projectIndex === -1) {
        res.status(404).json({
          status: "error",
          message: "Project not found",
        });
        return;
      }

      projects.splice(projectIndex, 1);

      // Re-index remaining projects to maintain order
      projects = projects.map((project: any, index: number) => ({
        ...project,
        index,
      }));

      writeProjects(projects);
      res.status(200).json({
        status: "success",
        message: "Project deleted successfully",
      });
      break;
    }

    default: {
      res.status(405).json({
        status: "error",
        message: "Method Not Allowed",
      });
      break;
    }
  }
}
