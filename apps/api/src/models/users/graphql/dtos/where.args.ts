import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';

@InputType()
export class UserWhereUniqueInput {
  @Field()
  uid: string;
}

@InputType()
export class UserWhereInputStrict
  implements
    RestrictProperties<
      UserWhereInputStrict,
      Omit<
        Prisma.UserWhereInput,
        | 'Credentials'
        | 'AuthProvider'
        | 'Admin'
        | 'Manager'
        | 'Valet'
        | 'Customer'
      >
    >
{
  @Field(() => StringFilter)
  uid: StringFilter;

  @Field(() => DateTimeFilter)
  createdAt: DateTimeFilter;

  @Field(() => DateTimeFilter)
  updatedAt: DateTimeFilter;

  @Field(() => StringFilter)
  name: StringFilter;

  @Field(() => StringFilter)
  image: StringFilter;

  AND: UserWhereInput[];
  OR: UserWhereInput[];
  NOT: UserWhereInput[];
}

@InputType()
export class UserWhereInput extends PartialType(UserWhereInputStrict) {}

@InputType()
export class UserListRelationFilter {
  @Field(() => UserWhereInput, { nullable: true })
  every?: UserWhereInput;
  @Field(() => UserWhereInput, { nullable: true })
  some?: UserWhereInput;
  @Field(() => UserWhereInput, { nullable: true })
  none?: UserWhereInput;
}

@InputType()
export class UserRelationFilter {
  @Field(() => UserWhereInput, { nullable: true })
  is?: UserWhereInput;
  @Field(() => UserWhereInput, { nullable: true })
  isNot?: UserWhereInput;
}
