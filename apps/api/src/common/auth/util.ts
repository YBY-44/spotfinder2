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
// 小写化
export const toTitleCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, ' $1') // insert a space before all capital letters
    .replace(/^./, function (str) {
      return str.toUpperCase();
    }); // uppercase the first character
};
// 生成数字
export const generateSixDigitNumber = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};
