import React, { HTMLProps } from "react";
export const HtmlTextArea = React.forwardRef<
  HTMLTextAreaElement,
  HTMLProps<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className="rounded-md block w-full px-3 py-2 border border-gray-200 rounded apperance-none read-only:text-gray-600 read-only:cursor-not-allowed focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
    />
  );
});
HtmlTextArea.displayName = "TextArea";
