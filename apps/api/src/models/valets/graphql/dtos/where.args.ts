import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { BookingTimelineListRelationFilter } from 'src/models/booking-timelines/graphql/dtos/where.args';
import { CompanyRelationFilter } from 'src/models/companies/graphql/dtos/where.args';
import { UserRelationFilter } from 'src/models/users/graphql/dtos/where.args';
import { ValetAssignmentListRelationFilter } from 'src/models/valet-assignments/graphql/dtos/where.args';

@InputType()
export class ValetWhereUniqueInput {
  @Field()
  uid: string;
}

@InputType()
export class ValetWhereInputStrict
  implements RestrictProperties<ValetWhereInputStrict, Prisma.ValetWhereInput>
{
  @Field(() => UserRelationFilter)
  User: UserRelationFilter;
  @Field(() => StringFilter)
  uid: StringFilter;
  @Field(() => DateTimeFilter)
  createdAt: DateTimeFilter;
  @Field(() => DateTimeFilter)
  updatedAt: DateTimeFilter;
  @Field(() => StringFilter)
  displayName: StringFilter;
  @Field(() => StringFilter)
  image: StringFilter;
  @Field(() => StringFilter)
  licenceID: StringFilter;
  @Field(() => IntFilter)
  companyId: IntFilter;
  @Field(() => CompanyRelationFilter)
  Company: CompanyRelationFilter;
  @Field(() => BookingTimelineListRelationFilter)
  BookingTimeline: BookingTimelineListRelationFilter;
  @Field(() => ValetAssignmentListRelationFilter)
  PickupAssignments: ValetAssignmentListRelationFilter;
  @Field(() => ValetAssignmentListRelationFilter)
  ReturnAssignments: ValetAssignmentListRelationFilter;

  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ValetWhereInput[];
  OR: ValetWhereInput[];
  NOT: ValetWhereInput[];
}

@InputType()
export class ValetWhereInput extends PartialType(ValetWhereInputStrict) {}

@InputType()
export class ValetListRelationFilter {
  every?: ValetWhereInput;
  some?: ValetWhereInput;
  none?: ValetWhereInput;
}

@InputType()
export class ValetRelationFilter {
  is?: ValetWhereInput;
  isNot?: ValetWhereInput;
}
