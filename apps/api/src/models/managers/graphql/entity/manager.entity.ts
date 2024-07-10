import { Field, ObjectType } from '@nestjs/graphql';
import { Manager as ManagerType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Manager implements RestrictProperties<Manager, ManagerType> {
  @Field(() => String)
  uid: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => String, { nullable: true })
  displayName: string;
  @Field(() => Number)
  companyId: number;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
