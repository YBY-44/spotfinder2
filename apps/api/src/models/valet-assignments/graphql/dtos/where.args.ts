import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { BookingRelationFilter } from 'src/models/bookings/graphql/dtos/where.args';
import { ValetRelationFilter } from 'src/models/valets/graphql/dtos/where.args';

@InputType()
export class ValetAssignmentWhereUniqueInput {
  @Field()
  bookingId: number;
}

@InputType()
export class ValetAssignmentWhereInputStrict
  implements
    RestrictProperties<
      ValetAssignmentWhereInputStrict,
      Prisma.ValetAssignmentWhereInput
    >
{
  @Field(() => IntFilter)
  bookingId: IntFilter;

  @Field(() => DateTimeFilter)
  createdAt: DateTimeFilter;

  @Field(() => DateTimeFilter)
  updatedAt: DateTimeFilter;

  @Field(() => FloatFilter)
  pickupLat: FloatFilter;

  @Field(() => FloatFilter)
  pickupLng: FloatFilter;

  @Field(() => FloatFilter)
  returnLat: FloatFilter;

  @Field(() => FloatFilter)
  returnLng: FloatFilter;

  @Field(() => StringFilter)
  pickupValetId: StringFilter;

  @Field(() => StringFilter)
  returnValetId: StringFilter;

  @Field(() => ValetRelationFilter)
  PickupValet: ValetRelationFilter;

  @Field(() => ValetRelationFilter)
  ReturnValet: ValetRelationFilter;

  @Field(() => BookingRelationFilter)
  Booking: BookingRelationFilter;
  AND: ValetAssignmentWhereInput[];
  OR: ValetAssignmentWhereInput[];
  NOT: ValetAssignmentWhereInput[];
}

@InputType()
export class ValetAssignmentWhereInput extends PartialType(
  ValetAssignmentWhereInputStrict,
) {}

@InputType()
export class ValetAssignmentListRelationFilter {
  every?: ValetAssignmentWhereInput;
  some?: ValetAssignmentWhereInput;
  none?: ValetAssignmentWhereInput;
}

@InputType()
export class ValetAssignmentRelationFilter {
  is?: ValetAssignmentWhereInput;
  isNot?: ValetAssignmentWhereInput;
}
