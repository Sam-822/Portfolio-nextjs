import { Skeleton } from "@nextui-org/react";
import imageCompression from "browser-image-compression";
import React, { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
interface UploadImageProps {
  setCompressedImage: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadImage: React.FC<UploadImageProps> = ({
  setCompressedImage,
  loading,
  setLoading
})  => {
  const [images, setImages] = useState<ImageListType>([]);

  const onChange = (imageList: ImageListType) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

	function blobToFile(blob: Blob, fileName: string): File {
		return new File([blob], fileName, {
			type: blob.type, // Preserve the Blob's MIME type
			lastModified: Date.now(), // Optional: set the last modified date to the current time
		});
	}
	

  const compressImage = async () => {
    if (!images.length) return;

    console.log("Original images:", images);

    const options = {
      maxSizeMB: 2, // Maximum file size in MB
      maxWidthOrHeight: 1920, // Maximum width or height in pixels
      useWebWorker: true, // Enable web worker for compression
    };

    try {
      setLoading(true);
      // Get the first image file
      const imageFile = images[0]?.file;
      if (!imageFile) {
        console.error("Image file is undefined!");
        return;
      }
      // Compress the image
      const compressedBlob = await imageCompression(imageFile, options);
			const compressedFile = blobToFile(compressedBlob, 'Image')
			console.log({compressedFile})
      setCompressedImage(URL.createObjectURL(compressedFile));

      console.log("Compressed File:", compressedBlob);
      console.log(
        `Compressed File Size: ${(compressedBlob.size / 1024 / 1024).toFixed(
          2
        )} MB`
      );
    } catch (error) {
      console.error("Image compression error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    compressImage();
  }, [images]);

  // if (loading) return <Spinner color="success" />;
  return loading ? (
    <div>
      {/* <Spinner /> */}
			<Skeleton className="h-52 w-52 rounded-md" />
    </div>
  ) : (
    <ImageUploading value={images} onChange={onChange}>
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper relative h-60 w-full">
          {imageList.length > 0 ? (
            imageList.map((image, index) => (
              <div key={index} className="image-item h-full">
                <button
                  className="absolute top-2 right-2 px-2 py-1.5 bg-red-100 text-red-500 hover:text-white hover:bg-red-500 transition-colors rounded fas fa-xmark"
                  onClick={() => onImageRemove(index)}
                />
                <img
                  src={image.dataURL}
                  alt=""
                  className="object-contain w-full h-full"
                />
                <div className="image-item__btn-wrapper">
                  {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                  {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}
                </div>
              </div>
            ))
          ) : (
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              className="h-full w-full block"
            >
              Click or Drop here
            </button>
          )}
          &nbsp;
        </div>
      )}
    </ImageUploading>
  );
};

export default UploadImage;
