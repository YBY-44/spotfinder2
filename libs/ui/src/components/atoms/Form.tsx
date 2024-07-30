"use client";
import React, { FormHTMLAttributes } from "react";
type FormProps = FormHTMLAttributes<HTMLFormElement>;
export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (props, ref) => {
    return (
      <form
        ref={ref}
        // 聚焦效果
        // 小屏幕的时候,字体大小为sm
        className="rounded-full flex flex-col w-full gap-2 appearance-none placeholder-gray focus:ring-primary sm:text-sm"
        {...props}
      >
        {props.children}
      </form>
    );
  },
);
Form.displayName = "Form";
