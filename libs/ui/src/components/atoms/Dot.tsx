import { BaseComponent } from "@spotfinder2/util/types";
export const DotPlugs = ({ children }: BaseComponent) => {
  if (children) {
    return (
      <div className="absolute top-0 px-2 bg-primary-500 rounded-full left-full animate-pulse">
        {children}
      </div>
    );
  } else {
    return (
      <div className="absolute left-full top-0 animate-pulse">
        <div className="w-2 h-2 rounded-full bg-primary-500" />
      </div>
    );
  }
};
