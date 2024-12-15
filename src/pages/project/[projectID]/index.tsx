import { Button, Progress } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { motion } from "framer-motion";
interface Project {
  title: string;
  description: string;
  link: string;
  deployed: boolean;
  slug: string;
  image: string;
  image_path: string;
  all_images: string[];
  collage_images: string[];
  index: number;
  live: boolean;
}
const Project = () => {
  const router = useRouter();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { projectID } = router.query;

  const getProjectData = async () => {
    try {
      setLoading(true);
      const projectRes = await fetch(`/api/projects?slug=${projectID}`);
      const projectData = await projectRes.json();
      if (projectData.status !== "success")
        throw new Error(projectData.message);
      setCurrentProject(projectData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getProjectData();
  }, [router.isReady]);

  return (
    <section className="overflow-hidden">
      {loading && (
        <Progress
          isIndeterminate
          className="h-1 fixed inset-x-0 top-[var(--navbar-height)]"
          color="danger"
        />
      )}
      {!loading && currentProject && (
        <section className="text-white body-font">
          <div className="container px-5 mx-auto flex flex-wrap">
            <div className="flex w-full flex-wrap mb-10">
              {currentProject.link ? (
                <Link
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:text-3xl text-2xl font-medium title-font text-crimson lg:w-1/3 lg:mb-0 mb-4 hover:underline"
                >
                  {currentProject.title}
                </Link>
              ) : (
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-crimson lg:w-1/3 lg:mb-0 mb-4">
                  {currentProject.title}
                </h1>
              )}
              <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base content-end">
                {currentProject.description}
              </p>
            </div>
            {/* Image Collage */}
            <div className="flex flex-wrap md:-m-2 -m-1">
              <div className="flex flex-wrap w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="md:p-2 p-1 w-1/2"
                >
                  <Image
                    width={600}
                    height={400}
                    alt="gallery"
                    className="w-full object-cover h-full object-center block"
                    src={
                      currentProject.image_path +
                      currentProject.collage_images[0]
                    }
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="md:p-2 p-1 w-1/2"
                >
                  <Image
                    width={600}
                    height={400}
                    alt="gallery"
                    className="w-full object-cover h-full object-center block"
                    src={
                      currentProject.image_path +
                      currentProject.collage_images[1]
                    }
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="md:p-2 p-1 w-full"
                >
                  <Image
                    width={600}
                    height={400}
                    alt="gallery"
                    className="w-full h-full object-cover object-center block"
                    src={
                      currentProject.image_path +
                      currentProject.collage_images[2]
                    }
                  />
                </motion.div>
              </div>
              <div className="flex flex-wrap w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="md:p-2 p-1 w-full"
                >
                  <Image
                    width={600}
                    height={400}
                    alt="gallery"
                    className="w-full h-full object-cover object-center block"
                    src={
                      currentProject.image_path +
                      currentProject.collage_images[3]
                    }
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="md:p-2 p-1 w-1/2"
                >
                  <Image
                    width={600}
                    height={400}
                    alt="gallery"
                    className="w-full object-cover h-full object-center block"
                    src={
                      currentProject.image_path +
                      currentProject.collage_images[4]
                    }
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="md:p-2 p-1 w-1/2"
                >
                  <Image
                    width={600}
                    height={400}
                    alt="gallery"
                    className="w-full object-cover h-full object-center block"
                    src={
                      currentProject.image_path +
                      currentProject.collage_images[5]
                    }
                  />
                </motion.div>
              </div>
            </div>
            {/* Project Description */}
            <div className="relative mt-10">
              <h3 className="text-3xl text-crimson">Project Description:</h3>
              <ul className="list-disc list-inside">
                <li className="text-lg">List item 1</li>
                <li className="text-lg">List item 2</li>
                <li className="text-lg">List item 3</li>
                <li className="text-lg">List item 4</li>
              </ul>
            </div>
            {/* Image Swiper */}
            <section className="max-w-full">
              <div className="relative aspect-video max-w-screen overflow-hidden">
              <h3 className="text-3xl text-crimson relative top-10">Image Gallery:</h3>
                {currentProject.all_images ? (
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={"auto"}
                    modules={[Navigation]}
                    autoplay
                    navigation={true}
                    className="max-w-full aspect-video"
                  >
                    {Array(currentProject.all_images.length - 1)
                      .fill(0)
                      .map((_, index) => (
                        <SwiperSlide key={index}>
                          <Image
                            src={
                              currentProject.image_path +
                              currentProject.all_images[index + 1]
                            }
                            height={1080}
                            width={1920}
                            alt={currentProject.title}
                            className="h-full block max-w-screen mx-auto object-center object-contain aspect-video"
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                ) : (
                  <Image
                    src="/no-image-found.png"
                    height={300}
                    width={300}
                    alt={currentProject.title}
                    className="object-contain block m-auto"
                  />
                )}
              </div>
            </section>
          </div>
        </section>
      )}
    </section>
  );
};

export default Project;
