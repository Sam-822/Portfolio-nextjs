import { promises as fs } from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "public", "projects.json");

type ResponseData = {
  status: string;
  message: string;
  data?: any;
};	

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  switch (req.method) {
    case "PUT":
      return updateProjectSequence(req, res);
    default:
      return res.status(405).json({ status: "error", message: "Method Not Allowed" });
  }
}

// Function to handle updating project sequence
async function updateProjectSequence(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const { sequence } = req.body; // sequence should be an array of slugs or indices

    if (!Array.isArray(sequence)) {
      return res.status(400).json({ status: "error", message: "Invalid sequence format" });
    }

    const projects = JSON.parse(await fs.readFile(filePath, "utf-8"));

    // Validate the sequence
    if (sequence.length !== projects.length) {
      return res.status(400).json({ status: "error", message: "Sequence length mismatch" });
    }

    const reorderedProjects = sequence.map((slug) => {
      const project = projects.find((proj: any) => proj.slug === slug);
      if (!project) throw new Error(`Project with slug "${slug}" not found`);
      return project;
    });

    // Save the updated sequence
    await fs.writeFile(filePath, JSON.stringify(reorderedProjects, null, 2), "utf-8");

    return res.status(200).json({ status: "success", message: "Project sequence updated", data: reorderedProjects });
  } catch (error: any) {
    console.error("Error updating project sequence:", error);
    return res.status(500).json({ status: "error", message: error.message });
  }
}
