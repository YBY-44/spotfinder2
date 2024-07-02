import { User } from '../entity/user.entity';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(User) {
  uid: User['uid'];
}
