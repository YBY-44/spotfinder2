import { Field, InputType, PartialType } from '@nestjs/graphql';
import { BookingStatus, Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { BookingTimelineListRelationFilter } from 'src/models/booking-timelines/graphql/dtos/where.args';
import { CustomerRelationFilter } from 'src/models/customers/graphql/dtos/where.args';
import { SlotRelationFilter } from 'src/models/slots/graphql/dtos/where.args';
import { ValetAssignmentRelationFilter } from 'src/models/valet-assignments/graphql/dtos/where.args';

@InputType()
export class EnumBookingStatusFilter {
  @Field(() => BookingStatus, { nullable: true })
  equals: BookingStatus;
  @Field(() => [BookingStatus], { nullable: true })
  in: BookingStatus[];
  @Field(() => [BookingStatus], { nullable: true })
  notIn: BookingStatus[];
  @Field(() => BookingStatus, { nullable: true })
  not: BookingStatus;
}
@InputType()
export class BookingWhereUniqueInput {
  @Field()
  id: number;
}

@InputType()
export class BookingWhereInputStrict
  implements
    RestrictProperties<BookingWhereInputStrict, Prisma.BookingWhereInput>
{
  @Field(() => FloatFilter)
  pricePerDay: FloatFilter;
  @Field(() => FloatFilter)
  pricePerWeek: FloatFilter;
  @Field(() => IntFilter)
  id: IntFilter;
  @Field(() => DateTimeFilter)
  createdAt: DateTimeFilter;
  @Field(() => DateTimeFilter)
  updatedAt: DateTimeFilter;
  @Field(() => FloatFilter)
  pricePerHour: FloatFilter;
  @Field(() => FloatFilter)
  totalPrice: FloatFilter;
  @Field(() => DateTimeFilter)
  startTime: DateTimeFilter;
  @Field(() => DateTimeFilter)
  endTime: DateTimeFilter;
  @Field(() => StringFilter)
  vehicleNumber: StringFilter;
  @Field(() => StringFilter)
  phoneNumber: StringFilter;
  @Field(() => StringFilter)
  passcode: StringFilter;
  @Field(() => EnumBookingStatusFilter)
  status: EnumBookingStatusFilter;
  @Field(() => IntFilter)
  slotId: IntFilter;
  @Field(() => StringFilter)
  customerId: StringFilter;
  @Field(() => ValetAssignmentRelationFilter)
  ValetAssignment: ValetAssignmentRelationFilter;
  @Field(() => CustomerRelationFilter)
  Customer: CustomerRelationFilter;
  @Field(() => SlotRelationFilter)
  Slot: SlotRelationFilter;
  @Field(() => BookingTimelineListRelationFilter)
  BookingTimeline: BookingTimelineListRelationFilter;
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)
  @Field()
  AND: BookingWhereInput[];
  @Field()
  OR: BookingWhereInput[];
  @Field()
  NOT: BookingWhereInput[];
}

@InputType()
export class BookingWhereInput extends PartialType(BookingWhereInputStrict) {}

@InputType()
export class BookingListRelationFilter {
  every?: BookingWhereInput;
  some?: BookingWhereInput;
  none?: BookingWhereInput;
}

@InputType()
export class BookingRelationFilter {
  is?: BookingWhereInput;
  isNot?: BookingWhereInput;
}
