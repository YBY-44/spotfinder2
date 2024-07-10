import { Field, InputType, PartialType } from '@nestjs/graphql';
import { $Enums, Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { BookingListRelationFilter } from 'src/models/bookings/graphql/dtos/where.args';
import { GarageRelationFilter } from 'src/models/garages/graphql/dtos/where.args';

@InputType()
export class SlotWhereUniqueInput {
  @Field()
  id: number;
}
// 四种过滤方式
@InputType()
export class EnumSlotTypeFilter {
  // 对比特定车位类型
  @Field(() => $Enums.SlotType, { nullable: true })
  equals?: $Enums.SlotType;
  // 合法类型
  @Field(() => [$Enums.SlotType], { nullable: true })
  in?: $Enums.SlotType[];
  // 不合法类型
  @Field(() => [$Enums.SlotType], { nullable: true })
  notIn?: $Enums.SlotType[];
  // 对比不是特定车位类型
  @Field(() => $Enums.SlotType, { nullable: true })
  not?: $Enums.SlotType;
}

@InputType()
export class SlotWhereInputStrict
  implements RestrictProperties<SlotWhereInputStrict, Prisma.SlotWhereInput>
{
  @Field(() => IntFilter)
  id: IntFilter;

  @Field(() => DateTimeFilter)
  createdAt: DateTimeFilter;

  @Field(() => DateTimeFilter)
  updatedAt: DateTimeFilter;

  @Field(() => StringFilter)
  displayName: StringFilter;

  @Field(() => FloatFilter)
  pricePerHour: FloatFilter;

  @Field(() => FloatFilter)
  pricePerDay: FloatFilter;

  @Field(() => FloatFilter)
  pricePerWeek: FloatFilter;

  @Field(() => IntFilter)
  length: IntFilter;

  @Field(() => IntFilter)
  width: IntFilter;

  @Field(() => IntFilter)
  height: IntFilter;

  @Field(() => EnumSlotTypeFilter)
  type: EnumSlotTypeFilter;

  @Field(() => IntFilter)
  garageId: IntFilter;

  @Field(() => GarageRelationFilter)
  Garage: GarageRelationFilter;

  @Field(() => BookingListRelationFilter)
  Bookings: BookingListRelationFilter;

  AND: SlotWhereInput[];
  OR: SlotWhereInput[];
  NOT: SlotWhereInput[];
}

@InputType()
export class SlotWhereInput extends PartialType(SlotWhereInputStrict) {}

@InputType()
export class SlotListRelationFilter {
  every?: SlotWhereInput;
  some?: SlotWhereInput;
  none?: SlotWhereInput;
}

@InputType()
export class SlotRelationFilter {
  is?: SlotWhereInput;
  isNot?: SlotWhereInput;
}
