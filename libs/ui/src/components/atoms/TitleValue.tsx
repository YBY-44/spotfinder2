import { ReactNode } from "react";
export const TitleValue = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-full">
      <strong className="block font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </strong>{" "}
      <div className="text-sm">{children}</div>
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
      <div className="text-sm text-gray-500">{title}</div>{" "}
      <div className="text-black">{children}</div>
    </div>
  );
};
