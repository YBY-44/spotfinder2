import { BookingsForGarageQuery } from '@spotfinder2/network/src/gql/generated';
import { TitleStrongValue, TitleValue } from '../atoms/TitleValue';
import { Reveal } from '../molecules/Reveal';
import { StartEndDateCard } from '../organisms/DateCard';
import { Accordion } from '../atoms/Accordion';
import { format } from 'date-fns';
export interface ManageBookingCardProps {
  booking: BookingsForGarageQuery['bookingsForGarage'][0];
}
export const ManageBookingCard = ({ booking }: ManageBookingCardProps) => {
  return (
    <div className='p-4 space-y-3 bg-white rounded-md shadow-lg'>
      <div className='flex justify-between items-start'>
        <TitleStrongValue title={'Vehicle number'}>
          <div className='text-3xl font-bold'>{booking.vehicleNumber}</div>
        </TitleStrongValue>
        <div className='px-1 py-0.5 rounded-md border border-black '>
          <TitleValue title={'Slot'}>{booking.slot.displayName}</TitleValue>
        </div>
      </div>
      <TitleStrongValue title={'Code'}>
        <Reveal showInstruction={false} secret={booking.passcode || ''} />
      </TitleStrongValue>
      <StartEndDateCard
        startTime={booking.startTime}
        endTime={booking.endTime}
      />
      <Accordion
        defaultOpen={false}
        title={
          <TitleStrongValue title={'Status'}>
            <div className='font-bold'>
              {booking.status?.split('_').join(' ')}
            </div>
          </TitleStrongValue>
        }
      >
        <div className='flex flex-col gap-2'>
          {booking.bookingTimeline.map((timeline, index) => {
            return (
              <div key={timeline.timestamp} className='flex gap-2'>
                <TitleValue title={timeline.status}>
                  {format(new Date (timeline.timestamp), 'yyyy-MM-dd hh:mm a')}
                </TitleValue>
              </div>
            );
          })}
        </div>
      </Accordion>
    </div>
  );
};
