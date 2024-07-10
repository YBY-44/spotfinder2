import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { UserRelationFilter } from 'src/models/users/graphql/dtos/where.args';
import { VerificationListRelationFilter } from 'src/models/verifications/graphql/dtos/where.args';

@InputType()
export class AdminWhereUniqueInput {
  @Field()
  uid: string;
}

@InputType()
export class AdminWhereInputStrict
  implements RestrictProperties<AdminWhereInputStrict, Prisma.AdminWhereInput>
{
  @Field(() => StringFilter)
  uid: StringFilter;
  @Field(() => DateTimeFilter)
  createdAt: DateTimeFilter;
  @Field(() => DateTimeFilter)
  updatedAt: DateTimeFilter;
  @Field(() => UserRelationFilter)
  User: UserRelationFilter;
  @Field(() => VerificationListRelationFilter)
  Verifications: VerificationListRelationFilter;
  @Field()
  AND: AdminWhereInput[];
  @Field()
  OR: AdminWhereInput[];
  @Field()
  NOT: AdminWhereInput[];
}

@InputType()
export class AdminWhereInput extends PartialType(AdminWhereInputStrict) {}

@InputType()
export class AdminListRelationFilter {
  every?: AdminWhereInput;
  some?: AdminWhereInput;
  none?: AdminWhereInput;
}

@InputType()
export class AdminRelationFilter {
  is?: AdminWhereInput;
  isNot?: AdminWhereInput;
}
