'use client';
import React from 'react';
import { CarScene } from '@spotfinder2/3d/src/scenes/CarScene';
import { IconSearch } from '@tabler/icons-react';
import { RotatingCamera } from '@spotfinder2/3d/src/components/Rotating';
import Link from 'next/link';
export default function Page() {
  return (
    <main className='h-[calc(100vh-4rem)] '>
      <div className='absolute top-16 bottom-0 left-0 right-0'>
        <CarScene orbitControls={false} camera={<RotatingCamera />} />
      </div>
      <div className='flex flex-col items-start space-y-5 font-black mt-10'>
        <div className='z-50 inline-block bg-primary rounded-md p-5 text-xl text-white'>
          SpotFinder2 is a online-platform for people booking parking spots.
        </div>
        <div className='z-50 inline-block bg-primary rounded-md p-5 text-white'>
          You can click the register button on the bottom to create your
          spotAccount. Or you can click the login button to login with your
          Google Account.
        </div>
        <div className='z-50 inline-block bg-primary rounded-md p-5 text-white flex items-center'>
          <p className='bg-primary text-white'>You can also </p>
          <Link
            href='/search'
            className='z-10 flex items-center gap-2 p-3 pr-6 text-xl font-medium text-black underline underline-offset-4 bg-primary rounded-md hover:text-gray-50 text-white'
          >
            <IconSearch />
            Search
          </Link>
          <p className='bg-primary text-white'> without Login.</p>
        </div>
        <div className='z-50 inline-block bg-primary rounded-md p-5 text-white'>
         If you want to publish your own parking spots, you can regist as a provider by clicking the button below.
         <Link
            href='https://spotfinder2-web-manager.vercel.app'
            className='z-10 flex items-center gap-2 p-3 pr-6 text-xl font-medium text-black underline underline-offset-4 bg-primary rounded-md hover:text-gray-50 text-white'
          >
            https://spotfinder2-web-manager.vercel.app
          </Link>
        </div>

        <div className='z-50 inline-block bg-primary rounded-md p-5 text-white'>
         If you want to be a valet driver, you can regist as a valet driver by clicking the link below.
         
         <Link
            href='https://spotfinder2-web-valet.vercel.app'
            className='z-10 flex items-center gap-2 p-3 pr-6 text-xl font-medium text-black underline underline-offset-4 bg-primary rounded-md hover:text-gray-50 text-white'
          >
            https://spotfinder2-web-valet.vercel.app
          </Link>
          NOTE: You need to connect the parking provider manager for them to regist you be their valet.
          <p>Each Valet account can only join one valet provider.</p>
        </div>
      </div>
    </main>
  );
}
