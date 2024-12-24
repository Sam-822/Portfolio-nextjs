import { Button, Image, Skeleton } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import React from "react";
const ProjectItem = (props: any) => {
  const {
    img,
    title,
    description,
    link,
    buttonText,
    projectID,
    live,
    loading,
  } = props;

  if (loading)
    return (
      <div className="glass mx-2 my-4 autoShow text-white rounded-lg overflow-hidden shadow-red transition-all flex flex-col">
        {/* Image Section */}
        <Skeleton className="w-full h-60 rounded-lg" />

        {/* Card Body */}
        <div className="flex flex-col justify-between p-6 flex-grow">
          <Skeleton className="mb-3 h-6 rounded-full" />
          <Skeleton className="mb-4 h-6 rounded-full" />
          <div className="relative flex justify-end gap-x-3 items-end">
            <Button as={Skeleton} className="rounded-full" />
            <Button as={Skeleton} className="rounded-full" />
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="glass mx-2 my-4 autoShow text-white rounded-lg overflow-hidden shadow-red transition-all flex flex-col">
        {/* Image Section */}
        <Image
          width={500}
          height={300}
          as={NextImage}
          isBlurred
          src={img}
          fallbackSrc="/no-image-found.png"
          alt={title}
          className={`w-full h-60 ${img ? "object-cover" : "object-contain"}`}
					classNames={{wrapper: 'bg-center bg-no-repeat bg-contain'}}
        />

        {/* Card Body */}
        <div className="flex flex-col justify-between p-6 flex-grow">
          <div className="relative">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <p className="text-sm text-gray-300 mb-4">{description}</p>
          </div>
          <div className="relative flex justify-end gap-x-3 items-end">
            {link && (
              <Button
                as={Link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                className="rounded-md"
              >
                {live
                  ? "View Live Project"
                  : buttonText
                  ? "View Deployed Project"
                  : "View Project on Github"}
              </Button>
            )}
            <Button
              as={Link}
              href={`/project/${projectID}`}
              color="primary"
              className="rounded-md"
            >
              View Project Description
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectItem;
