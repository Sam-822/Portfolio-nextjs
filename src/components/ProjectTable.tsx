import React from "react";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { toast } from "react-toastify";

interface Project {
  slug: string;
  title: string;
}

interface ProjectTableProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  setProjects,
}) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex(
      (project) => project.slug === active.id
    );
    const newIndex = projects.findIndex((project) => project.slug === over.id);

    const reorderedProjects = arrayMove(projects, oldIndex, newIndex);
    setProjects(reorderedProjects);

    // Update the sequence on the server
    try {
      const sequence = reorderedProjects.map((project) => project.slug);

      const res = await fetch("/api/sequence", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence }),
      });

      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message);

      toast.success("Sequence updated successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message); // Safe to access `message` property
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext
        items={projects.map((project) => project.slug)}
        strategy={verticalListSortingStrategy}
      >
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <SortableRow key={project.slug} project={project} index={index} />
            ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  );
};

const SortableRow: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: project.slug,
  });

  return (
    <tr
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`border-b !py-1.5 ${
        isDragging ? "bg-gray-200 bg-opacity-10" : ""
      }`}
    >
      <td>{index + 1}</td>
      <td>{project.title}</td>
      <td>{project.slug}</td>
    </tr>
  );
};

export default ProjectTable;
