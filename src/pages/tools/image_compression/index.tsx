import UploadImage from "@/components/UploadImage";
import Image from "next/image";
import React, { useState } from "react";

const ImageCompression = () => {
  const [compressedImage, setCompressedImage] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex gap-x-4 h-screen">
      <div className="border-dashed border-2 h-60 w-60 grid place-content-center">
        <UploadImage
          setCompressedImage={setCompressedImage}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
      {compressedImage && (
        <Image
          width={1024}
          height={1024}
          src={compressedImage}
          alt=""
          className="mt-4 object-contain"
        />
      )}
    </div>
  );
};

export default ImageCompression;
