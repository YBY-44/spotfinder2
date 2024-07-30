import { TotalPrice } from '@spotfinder2/util/types';
import { CreateBookingInput } from 'src/models/bookings/graphql/dtos/create-booking.input';

export class CreateStripeDto {
  uid: string;
  totalPriceObject: TotalPrice;
  bookingData: CreateBookingInput;
}
