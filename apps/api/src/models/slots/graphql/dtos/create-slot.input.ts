import { InputType, OmitType } from '@nestjs/graphql';
import { Slot } from '../entity/slot.entity';
// 创建slot
@InputType()
export class CreateSlotInput extends OmitType(
  Slot,
  ['createdAt', 'updatedAt', 'id'],
  InputType,
) {}
// 创建slot，不要车库id
@InputType()
export class CreateSlotInputWithoutGarageId extends OmitType(
  CreateSlotInput,
  ['garageId'],
  InputType,
) {
  count: number;
}
