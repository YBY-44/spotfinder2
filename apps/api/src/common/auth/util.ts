import { GetUserType, Role } from 'src/common/types';
import { ForbiddenException } from '@nestjs/common';

export const checkRowLevelPermission = (
  user: GetUserType,
  requestedUid?: string | string[],
  roles: Role[] = ['admin'],
) => {
  if (!requestedUid) return false;

  if (user.roles?.some((role) => roles.includes(role))) {
    return true;
  }

  const uids =
    typeof requestedUid === 'string'
      ? [requestedUid]
      : requestedUid.filter(Boolean);
  console.log('Now uid find for you is: ' + requestedUid);
  if (!uids.includes(user.uid)) {
    throw new ForbiddenException('It is not your own account ! forbidden !');
  }
};
