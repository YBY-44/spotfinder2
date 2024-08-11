import Image from "next/image";
export const StaticMapSample = ({
  position,
  padding = [100, 100, 100],
  className = "w-full shadow-xl aspect-square",
}: {
  position: { lat: number; lng: number };
  padding?: [number, number, number];
  className?: string;
}) => {
  if (!position) {
    return <div className="w-full bg-gray-100 shadow-xl aspect-square"></div>;
  }

  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s(${position.lng},${position.lat})/${position.lng},${position.lat},9,0/600x600?access_token=${process.env.NEXT_PUBLIC_MAXBOX_TOKEN}`;

  return (
    <Image
      src={url}
      alt="Map"
      className={className + " rounded-md"}
      width={200}
      height={200}
    />
  );
};
