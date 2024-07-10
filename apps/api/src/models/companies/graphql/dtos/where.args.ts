import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { GarageListRelationFilter } from 'src/models/garages/graphql/dtos/where.args';
import { ManagerListRelationFilter } from 'src/models/managers/graphql/dtos/where.args';
import { ValetListRelationFilter } from 'src/models/valets/graphql/dtos/where.args';

@InputType()
export class CompanyWhereUniqueInput {
  @Field()
  id: number;
}

@InputType()
export class CompanyWhereInputStrict
  implements
    RestrictProperties<CompanyWhereInputStrict, Prisma.CompanyWhereInput>
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
  @Field(() => GarageListRelationFilter)
  Garages: GarageListRelationFilter;
  @Field(() => ManagerListRelationFilter)
  Managers: ManagerListRelationFilter;
  @Field(() => ValetListRelationFilter)
  Valets: ValetListRelationFilter;

  AND: CompanyWhereInput[];
  OR: CompanyWhereInput[];
  NOT: CompanyWhereInput[];
}

@InputType()
export class CompanyWhereInput extends PartialType(CompanyWhereInputStrict) {}

@InputType()
export class CompanyListRelationFilter {
  every?: CompanyWhereInput;
  some?: CompanyWhereInput;
  none?: CompanyWhereInput;
}

@InputType()
export class CompanyRelationFilter {
  is?: CompanyWhereInput;
  isNot?: CompanyWhereInput;
}
