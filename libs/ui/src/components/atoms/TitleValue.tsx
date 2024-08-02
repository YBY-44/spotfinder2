import { ReactNode } from 'react';
export const TitleValue = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <strong className='font-semibold'>{title}</strong>{' '}
      <div className='text-sm'>{children}</div>
    </div>
  );
};

export const TitleStrongValue = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <strong className='text-sm text-gray'>{title}</strong>{' '}
      <div className='text-sm'>{children}</div>
    </div>
  );
};

