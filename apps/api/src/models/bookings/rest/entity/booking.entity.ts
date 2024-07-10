import { Booking, BookingStatus } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class BookingEntity
  implements RestrictProperties<BookingEntity, Booking>
{
  id: number;
  createdAt: Date;
  updatedAt: Date;
  @IsOptional()
  pricePerHour: number;
  @IsOptional()
  pricePerDay: number;
  @IsOptional()
  pricePerWeek: number;
  @IsOptional()
  totalPrice: number;
  startTime: Date;
  endTime: Date;
  vehicleNumber: string;
  @IsOptional()
  phoneNumber: string;
  @IsOptional()
  passcode: string;
  status: BookingStatus;
  slotId: number;
  customerId: string;
}
