import React, { HTMLProps } from "react";
import { FormError } from "./FormError";
//
export type HtmlLabelProps = HTMLProps<HTMLLabelElement> & {
  error?: string | undefined;
  optional?: boolean;
};
// ref类型和prop的类型
export const HtmlLabel = React.forwardRef<HTMLLabelElement, HtmlLabelProps>(
  ({ children, title, optional, error, className }, ref) => (
    // select-none 选择无
    <label ref={ref} className={` text-sm block select-none ${className}`}>
      <div className="flex items-baseline justify-between">
        <div className="mb-1 font-semibold capitalize">{title}</div>
        <div className="text-xs text-gray-600 ">
          {optional ? "(optional)" : null}
        </div>
      </div>
      {children}
      <FormError error={error} className={className} />
    </label>
  ),
);

HtmlLabel.displayName = "HtmlLabel";
