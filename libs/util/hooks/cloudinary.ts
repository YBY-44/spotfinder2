import { useState } from "react";
export const useCloudinaryUpload = () => {
  const [uploading, setUpLoading] = useState(false);
  const upload = async (fileList: FileList) => {
    setUpLoading(true);
    try {
      const uploadPromise = Array.from(fileList).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
        );
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/" +
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME +
            "/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
        const data = await response.json();
        const imageUrl = data.secure_url as string;
        return imageUrl;
      });
      const uploadedImages = await Promise.all(uploadPromise);
      return uploadedImages;
    } catch (error) {
      throw new Error("Failed to upload image");
    } finally {
      setUpLoading(false);
    }
  };
  return { upload, uploading };
};
