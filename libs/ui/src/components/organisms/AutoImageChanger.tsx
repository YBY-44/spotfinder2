import { useEffect, useState } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPhotoCancel,
} from "@tabler/icons-react";
export interface AutoImageChangerProps {
  images: string[];
  durationPerImage: number;
  aspectRatio?: "aspect-square" | "aspect-auto" | "aspect-video";
  noAutoChange?: boolean;
}
export const AutoImageChanger = ({
  images,
  durationPerImage = 5000,
  aspectRatio = "aspect-square",
  noAutoChange = false,
}: AutoImageChangerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    if (noAutoChange) return;
    const Interval = setInterval(() => {
      setCurrentImageIndex((oldIndex) => {
        return (oldIndex + 1) % images.length;
      });
    }, durationPerImage);
    return () => clearInterval(Interval);
  }, [durationPerImage, images]);
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-48 gap-2 text-sm bg-white border select-none border-gray-50 text-gray">
        <IconPhotoCancel /> No images.
      </div>
    );
  }
  return (
    <div className={"relative w-full overflow-hidden " + { aspectRatio }}>
      <img
        src={images[currentImageIndex]}
        alt="Garage"
        className="object-cover h-full w-full aspect-[1/1]"
      />
      <div className="absolute bottom-0 left-0 right-0 flex jusitify-center p-1 space-x-2">
        {images.map((_, index) => {
          return (
            <div
              className={
                "h-2 rounded-full " + (currentImageIndex === index)
                  ? "bg-white w-4"
                  : "bg-gray-300 w-2"
              }
              key={index}
            />
          );
        })}
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="absolute transform -translate-y-1/2 top-1/2 left-2"
            onClick={() => {
              setCurrentImageIndex((oldIndex) => {
                return oldIndex == 0 ? images.length - 1 : oldIndex - 1;
              });
            }}
          >
            <IconChevronLeft className="w-6 h-6 text-black rounded-full bg-white/40 hover:" />
          </button>
          <button
            type="button"
            className="absolute transform -translate-y-1/2 top-1/2 right-2"
            onClick={() => {
              setCurrentImageIndex((oldIndex) => {
                return (oldIndex + 1) % images.length;
              });
            }}
          >
            <IconChevronRight className="w-6 h-6 text-black rounded-full bg-white/40 hover:bg-white" />
          </button>
        </>
      )}
    </div>
  );
};
