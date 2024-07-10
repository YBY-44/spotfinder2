import {
  Field,
  InputType,
  ObjectType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { AuthProviderType } from '@prisma/client';

registerEnumType(AuthProviderType, {
  name: 'AuthProviderType',
});

@InputType()
export class RegistWithProviderInput extends PickType(
  User,
  ['uid', 'name', 'image'],
  InputType,
) {
  // age: number;
  @Field(() => AuthProviderType)
  type: AuthProviderType;
}

@InputType()
export class RegistWithUserselfInput {
  email: string;
  password: string;
}

@InputType()
export class LoginInput extends PickType(RegistWithUserselfInput, [
  'email',
  'password',
]) {}

@ObjectType()
export class LoginOutput {
  token: string;
  user: User;
}
