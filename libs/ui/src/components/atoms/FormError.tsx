import React from "react";
import { IconExclamationCircle } from "@tabler/icons-react";

export interface IFormErrorProps {}
// 定义一个字符串 并且确定error是可选的
export const FormError = ({ error, className="" }: { error?: string | undefined , className?:string}) => {
  if (error) {
    return (
      // mt margin-top
      // text-xs 字体大小
      <div className={"flex items-center justify-start gap-1 mt-1 text-xs text-gray-900 "+className}>
        <IconExclamationCircle className="inline w-4 h-4 text-red-600" />{" "}
        {error}
      </div>
    );
  }
  return null;
};
