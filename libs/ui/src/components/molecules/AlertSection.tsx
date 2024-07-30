import { ReactNode } from "react";
export interface AlertSectionProps {
  title?: string;
  children: ReactNode;
}
export const AlertSection = ({ title, children }: AlertSectionProps) => {
  return (
    <div className="mt-4 min-h-[calc(100vh-8rem)]">
      {title ? (
        <div className="mb-1 text-lg font-semibold text-center">{title}</div>
      ) : null}
      <div className="h-64 bg-white">
        <div className="flex flex-col items-center justify-center h-full gap-4 font-light">
          {children}
        </div>
      </div>
    </div>
  );
};
