"use client";
import { CarScene } from "@spotfinder2/3d/src/scenes/CarScene";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { RotatingCamera } from "@spotfinder2/3d/src/components/Rotating";
export default function Home() {
  // const [open, setIsOpen] = useState(false);
  return (
    <main className="h-[calc(100vh-4rem)] ">
      <div className="absolute top-16 bottom-0 left-0 right-0">
        <CarScene orbitControls={false} camera={<RotatingCamera />} />
      </div>
      <div className="flex flex-col items-start space-y-2 font-black text-6xl mt-10">
        <div className="z-50 inline-block bg-primary rounded-md p-5 text-white">
          Need
        </div>{" "}
        <div className="z-50 inline-block bg-primary rounded-md p-5 text-white">
          Parking?
        </div>
        <Link
          href="/search"
          className="z-10 flex items-center gap-2 p-3 pr-6 text-xl font-medium text-black underline underline-offset-4 bg-primary rounded-md hover:text-gray-50 text-white"
        >
          <IconSearch /> Search now
        </Link>
        <div className='z-50 inline-block bg-primary rounded-md p-5 text-white text-lg font-normal'>
         If you want to publish your own parking spots, you can regist as a provider by clicking the button below.
         <Link
            href='https://spotfinder2-web-manager.vercel.app'
            className='z-10 flex items-center gap-2 p-3 pr-6 text-xl font-medium text-black underline underline-offset-4 bg-primary rounded-md hover:text-gray-50 text-white'
          >
            https://spotfinder2-web-manager.vercel.app
          </Link>
        </div>

        <div className='z-50 inline-block bg-primary rounded-md p-5 text-white text-lg font-normal'>
         If you want to be a valet driver, you can regist as a valet driver by clicking the link below.
         
         <Link
            href='https://spotfinder2-web-valet.vercel.app'
            className='z-10 flex items-center gap-2 p-3 pr-6 text-xl font-medium text-black underline underline-offset-4 bg-primary rounded-md hover:text-gray-50 text-white'
          >
            https://spotfinder2-web-valet.vercel.app
          </Link>
        </div>
      </div>
      
    </main>
  );
}
