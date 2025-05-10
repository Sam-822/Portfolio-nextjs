import { Progress } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import { apiRequestHandler } from "@/utils/apiRequestHandler";
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
  descriptionList: string[];
  techStack: string[];
}
const Project = () => {
  const router = useRouter();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { projectID } = router.query;

  const getProjectData = async () => {
    try {
      setLoading(true);
      const projectData = await apiRequestHandler(`projects?slug=${projectID}`)
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
			<Head>
				<title>{`Abdul Samad{"'"}s Portfolio | ${currentProject?.title}`} </title>
			</Head>
      {loading && (
        <Progress
          isIndeterminate
          className="h-1 fixed inset-x-0 top-[var(--navbar-height)]"
          color="danger"
					title="Loading"
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
                      currentProject.collage_images[0]
                      ? currentProject.image_path +
                      currentProject.collage_images[0] : 
											'/no-image-found.png'
                    }
										loading="eager"
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
                      currentProject.collage_images[1]
                        ? currentProject.image_path +
                          currentProject.collage_images[1]
                        : "/no-image-found.png"
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
                      currentProject.collage_images[2]?
                      currentProject.image_path +
                      currentProject.collage_images[2]: 
											'/no-image-found.png'
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
                      currentProject.collage_images[3]?
                      currentProject.image_path +
                      currentProject.collage_images[3]: '/no-image-found.png'
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
											currentProject.collage_images[4]?
                      currentProject.image_path +
                      currentProject.collage_images[4] : '/no-image-found.png'
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
                      currentProject.collage_images[5]?
                      currentProject.image_path +
                      currentProject.collage_images[5]: '/no-image-found.png'
                    }
                  />
                </motion.div>
              </div>
            </div>
            {/* Project Description */}
            {currentProject &&
              currentProject?.descriptionList &&
              currentProject?.descriptionList?.length > 0 && (
                <div className="relative mt-10 w-full">
                  <h3 className="text-3xl text-crimson mb-2">
                    Project Description:
                  </h3>
                  <ul className="list-disc list-inside text-lg">
                    {currentProject.descriptionList.map(
                      (project: string, index: number) => (
                        <li key={index}>{project}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            {/* Tech Stack */}
            {currentProject &&
              currentProject?.techStack &&
              currentProject?.techStack?.length > 0 && (
                <div className="relative mt-10 w-full">
                  <h3 className="text-3xl text-crimson mb-2">
                    Technologies Used:
                  </h3>
                  <ul className="list-disc list-inside text-lg">
                    {currentProject.techStack.map(
                      (project: string, index: number) => (
                        <li key={index}>{project}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            {/* Image Swiper */}
            <section className="max-w-full">
              <div className="relative aspect-video max-w-screen overflow-hidden">
                <h3 className="text-3xl text-crimson relative top-10">
                  Image Gallery:
                </h3>
                {currentProject.all_images ? (
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={"auto"}
                    modules={[Navigation]}
                    autoplay
                    navigation={true}
                    className="max-w-full aspect-video"
                  >
                    {Array(currentProject.all_images.length)
                      .fill(0)
                      .map((_, index) => (
                        <SwiperSlide key={index}>
                          <Image
                            src={
                              currentProject.image_path +
                              currentProject.all_images[index]
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
