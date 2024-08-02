import { GaragesQuery } from '@spotfinder2/network/src/gql/generated';
import { AutoComplete } from '../atoms/AutoComplete';
import { AutoImageChanger } from './AutoImageChanger';
import { Button } from '../atoms/Button';
import Link from 'next/link';
import { IconTypes } from '../molecules/IconTypes';
import { CreateManySlotDialog } from './CreateManySlot';
export interface GaragesCardProps {
  garage: GaragesQuery['garages'][number];
}
export const GarageCard = ({ garage }: GaragesCardProps) => {
  return (
    <div className='overflow-hidden bg-white shadow-xl rounded-md'>
      <AutoImageChanger
        images={garage.images || []}
        durationPerImage={5000}
        aspectRatio='aspect-auto'
      />
      <div className='p-2 flex-grow flex flex-col gap-4'>
        <div className='flex justify-between items-center pr-2.5 mb-1 border-b border-b-color-gray-50 pb-3'>
          <h3 className='text-gray-800 line-clamp-1'>{garage.displayName}</h3>
          <Link
            className='text-sm'
            href={
                {
                pathname: 'bookings',
                query: {
                  garageId: garage.id,
                }
              }
            }
          >
          <div className='border-primary h-7 w-full flex justify-center items-center rounded-md mx-2.5 border hover:bg-primary-50 cursor-pointer'>
            Bookings
          </div>
          </Link>
        </div>
        <p className='text-gray-500 text-align:justify line-clamp-3 text-xs'>{garage.description}</p>
        <p className='text-sm text-gray-400'>
          Located in - {garage.address?.address}
        </p>
        <div className='flex gap-2 mt-auto'>
          <>
            {garage.slotCounts.map((slotType) => {
              return (
                <div
                  key={slotType.type}
                  className='rounded-md flex items-center justify-center w-16 h-10 gap-1 border-2 border-primary'
                >
                  <div>{IconTypes[slotType.type]}</div>
                  <div className='text-sm'>{slotType.count}</div>
                </div>
              );
            })}
            <CreateManySlotDialog garageId={garage.id} displayName={garage.displayName || 'Spot'} />
          </>
        </div>
      </div>
    </div>
  );
};
