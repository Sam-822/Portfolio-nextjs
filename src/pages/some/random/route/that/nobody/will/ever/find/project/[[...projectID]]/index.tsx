import { Button, Checkbox } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Project = () => {
  const router = useRouter();
  const { projectID } = router.query;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    link: "",
    deployed: false,
    image: "",
    image_path: "/",
    all_images: "",
    collage_images: "",
    index: "",
    live: false,
  });
  const [projectData, setProjectData] = useState<any>();
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    link: "",
    deployed: "",
    slug: "",
    image: "",
    image_path: "",
    all_images: "",
    collage_images: "",
    index: "",
    live: "",
  });

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const newErrors = errors;
    if (name === "title") {
      if (!value.trim()) newErrors.title = "Title is required";
      else newErrors.title = "";
    }
    if (name === "description") {
      if (!value.trim()) newErrors.description = "Description is required";
      else newErrors.description = "";
    }
    if (name === "slug") {
      if (!value.trim()) newErrors.slug = "Slug is required";
      else newErrors.slug = "";
    }
    if (name === "image_path") {
      if (!value.trim()) newErrors.image_path = "Image Path is required";
      else newErrors.image_path = "";
    }
    if (name === "all_images") {
      if (!value) newErrors.all_images = "Atleast one image is required";
      else newErrors.all_images = "";
    }
    if (name === "collage_images") {
      if (!value) newErrors.collage_images = "Atleast one image is required";
      else newErrors.collage_images = "";
    }
    if (name === "deployed") {
      if (value.length === 0)
        newErrors.deployed = "Deployment status is required";
      else newErrors.deployed = "";
    }
    setErrors(newErrors);
  };

  const parseInputArray = (input: string): string[] | null => {
    try {
      const sanitizedInput = String(input)
        .trim()
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .map((item) => `"${item}"`)
        .join(",");

      const jsonArray = JSON.parse(`[${sanitizedInput}]`);

      if (Array.isArray(jsonArray)) {
        return jsonArray;
      } else {
        console.error("Parsed input is not an array");
        return null;
      }
    } catch (error) {
      console.error("Error parsing input array:", error);
      return null;
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.image_path.trim())
      newErrors.image_path = "Image Path is required";
    if (!formData.all_images)
      newErrors.all_images = "Atleast one image is required";
    if (!formData.collage_images)
      newErrors.all_images = "Atleast one image is required";

    // console.log({ newErrors });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitProject = async () => {
    try {
      const submitRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          all_images: parseInputArray(formData.all_images),
          collage_images: parseInputArray(formData.collage_images),
        }),
      });
      const submitData = await submitRes.json();
      if (submitData.status !== "success") throw new Error(submitData.message);
      router.push("/some/random/route/that/nobody/will/ever/find");
      toast.success(submitData.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getProject = async (ID: string) => {
    try {
      const projectRes = await fetch(`/api/projects?slug=${ID}`);
      const projectData = await projectRes.json();
      if (!projectRes.ok)
        throw new Error(projectData.message || "Could not get project data");
      setFormData({
        title: projectData.data.title,
        description: projectData.data.description,
        slug: projectData.data.slug,
        link: projectData.data.link,
        deployed: projectData.data.deployed,
        image: projectData.data.image,
        image_path: projectData.data.image_path,
        all_images: projectData.data.all_images,
        collage_images: projectData.data.collage_images,
        index: projectData.data.index,
        live: projectData.data.live,
      });
      setProjectData(projectData.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (projectID) getProject(String(projectID));
  }, [router.isReady]);

  const updateProject = async () => {
    try {
      const submitRes = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: projectData.index,
          ...formData,
          all_images: parseInputArray(formData.all_images),
          collage_images: parseInputArray(formData.collage_images),
        }),
      });
      const submitData = await submitRes.json();
      if (submitData.status !== "success") throw new Error(submitData.message);
      router.push("/some/random/route/that/nobody/will/ever/find");
      // toast.success(submitData.message);
      Swal.fire({
        title: "Success!",
        text: submitData.message,
        icon: submitData.status,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmitForm = () => {
    if (!validateForm()) return;
    if (projectID) updateProject();
    else submitProject();
  };

  return (
    <form action={handleSubmitForm} className="grid grid-cols-2 gap-4">
      {/* Title */}
      <div>
        <label htmlFor="title">Project Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className={`form-input ${errors.title ? "!border-red-500" : ""}`}
          value={formData.title}
          onChange={handleFormChange}
        />
        {errors.title && (
          <span className="text-sm text-red-500">{errors.title}</span>
        )}
      </div>
      {/* Slug */}
      <div>
        <label htmlFor="slug">Project Slug</label>
        <input
          type="text"
          name="slug"
          id="slug"
          className={`form-input ${errors.slug ? "!border-red-500" : ""}`}
          value={formData.slug}
          onChange={handleFormChange}
        />
        {errors.slug && (
          <span className="text-sm text-red-500">{errors.slug}</span>
        )}
      </div>
      {/* Description */}
      <div className="col-span-2">
        <label htmlFor="description">Project Description</label>
        <input
          type="text"
          name="description"
          id="description"
          className={`form-input ${
            errors.description ? "!border-red-500" : ""
          }`}
          value={formData.description}
          onChange={handleFormChange}
        />
        {errors.description && (
          <span className="text-sm text-red-500">{errors.description}</span>
        )}
      </div>
      {/* Link */}
      <div>
        <label htmlFor="slug">Project Link</label>
        <input
          type="text"
          name="link"
          id="link"
          className={`form-input ${errors.link ? "!border-red-500" : ""}`}
          value={formData.link}
          onChange={handleFormChange}
        />
        {errors.link && (
          <span className="text-sm text-red-500">{errors.link}</span>
        )}
      </div>
      {/* Image */}
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          id="image"
          className={`form-input ${errors.image ? "!border-red-500" : ""}`}
          value={formData.image}
          onChange={handleFormChange}
        />
        {errors.image && (
          <span className="text-sm text-red-500">{errors.image}</span>
        )}
      </div>
      {/* Image Path */}
      <div>
        <label htmlFor="image_path">Image Path</label>
        <input
          type="text"
          name="image_path"
          id="image_path"
          className={`form-input ${errors.image_path ? "!border-red-500" : ""}`}
          value={formData.image_path}
          onChange={handleFormChange}
        />
        {errors.image_path && (
          <span className="text-sm text-red-500">{errors.image_path}</span>
        )}
      </div>
      {/* All Images */}
      <div>
        <label htmlFor="all_images">All Images (provide an array)</label>
        <input
          type="text"
          name="all_images"
          id="all_images"
          className={`form-input ${errors.all_images ? "!border-red-500" : ""}`}
          value={formData.all_images}
          onChange={handleFormChange}
        />
        {errors.all_images && (
          <span className="text-sm text-red-500">{errors.all_images}</span>
        )}
      </div>
      {/* Collage Images */}
      <div>
        <label htmlFor="collage_images">
          Collage Images (provide an array)
        </label>
        <input
          type="text"
          name="collage_images"
          id="collage_images"
          className={`form-input ${
            errors.collage_images ? "!border-red-500" : ""
          }`}
          value={formData.collage_images}
          onChange={handleFormChange}
        />
        {errors.collage_images && (
          <span className="text-sm text-red-500">{errors.collage_images}</span>
        )}
      </div>
      {/* Deploed and Live Checkboxes */}
      <div className="col-span-2 grid grid-cols-2">
        <div className="relative grid grid-cols-2">
          <p className="mb-1 col-span-2">Deployment and Live status</p>
          <Checkbox
            color="success"
            radius="sm"
            isSelected={formData.deployed}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, deployed: value }))
            }
          >
            Deployed? (check if yes)
          </Checkbox>
          <Checkbox
            color="success"
            radius="sm"
            isSelected={formData.live}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, live: value }))
            }
          >
            Live? (check if yes)
          </Checkbox>
        </div>
      </div>
      <div className="col-span-2">
        <Button
          type="submit"
          className="glass border border-white rounded block ms-auto"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Project;
