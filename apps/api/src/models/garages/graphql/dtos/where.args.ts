import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
  StringListFilter,
} from 'src/common/dtos/common.input';
import { AddressRelationFilter } from 'src/models/addresses/graphql/dtos/where.args';
import { CompanyRelationFilter } from 'src/models/companies/graphql/dtos/where.args';
import { ReviewListRelationFilter } from 'src/models/reviews/graphql/dtos/where.args';
import { SlotListRelationFilter } from 'src/models/slots/graphql/dtos/where.args';
import { VerificationRelationFilter } from 'src/models/verifications/graphql/dtos/where.args';

@InputType()
export class GarageWhereUniqueInput {
  @Field()
  id: number;
}

@InputType()
export class GarageWhereInputStrict
  implements
    RestrictProperties<GarageWhereInputStrict, Prisma.GarageWhereInput>
{
  @Field(() => IntFilter)
  id: IntFilter;
  @Field(() => DateTimeFilter)
  createdAt: DateTimeFilter;
  @Field(() => DateTimeFilter)
  updatedAt: DateTimeFilter;
  @Field(() => StringFilter)
  displayName: StringFilter;
  @Field(() => StringFilter)
  description: StringFilter;
  @Field(() => StringListFilter)
  images: StringListFilter;
  @Field(() => IntFilter)
  companyId: IntFilter;
  @Field(() => CompanyRelationFilter)
  Company: CompanyRelationFilter;
  @Field(() => AddressRelationFilter)
  Address: AddressRelationFilter;
  @Field(() => VerificationRelationFilter)
  Verification: VerificationRelationFilter;
  @Field(() => ReviewListRelationFilter)
  Reviews: ReviewListRelationFilter;
  @Field(() => SlotListRelationFilter)
  Slots: SlotListRelationFilter;

  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)
  @Field()
  AND: GarageWhereInput[];
  @Field()
  OR: GarageWhereInput[];
  @Field()
  NOT: GarageWhereInput[];
}

@InputType()
export class GarageWhereInput extends PartialType(GarageWhereInputStrict) {}

@InputType()
export class GarageListRelationFilter {
  every?: GarageWhereInput;
  some?: GarageWhereInput;
  none?: GarageWhereInput;
}

@InputType()
export class GarageRelationFilter {
  is?: GarageWhereInput;
  isNot?: GarageWhereInput;
}
