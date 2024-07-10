import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { BookingTimelineRelationFilter } from 'src/models/booking-timelines/graphql/dtos/where.args';
import { CompanyRelationFilter } from 'src/models/companies/graphql/dtos/where.args';
import { UserRelationFilter } from 'src/models/users/graphql/dtos/where.args';

@InputType()
export class ManagerWhereUniqueInput {
  @Field()
  uid: string;
}

@InputType()
export class ManagerWhereInputStrict
  implements
    RestrictProperties<ManagerWhereInputStrict, Prisma.ManagerWhereInput>
{
  @Field(() => StringFilter)
  uid: StringFilter;
  @Field(() => DateTimeFilter)
  createdAt: DateTimeFilter;
  @Field(() => DateTimeFilter)
  updatedAt: DateTimeFilter;
  @Field(() => StringFilter)
  displayName: StringFilter;
  @Field(() => IntFilter)
  companyId: IntFilter;
  @Field(() => UserRelationFilter)
  User: UserRelationFilter;
  @Field(() => CompanyRelationFilter)
  Company: CompanyRelationFilter;
  @Field(() => BookingTimelineRelationFilter)
  BookingTimeline: BookingTimelineRelationFilter;

  AND: ManagerWhereInput[];
  OR: ManagerWhereInput[];
  NOT: ManagerWhereInput[];
}

@InputType()
export class ManagerWhereInput extends PartialType(ManagerWhereInputStrict) {}

@InputType()
export class ManagerListRelationFilter {
  every?: ManagerWhereInput;
  some?: ManagerWhereInput;
  none?: ManagerWhereInput;
}

@InputType()
export class ManagerRelationFilter {
  is?: ManagerWhereInput;
  isNot?: ManagerWhereInput;
}
