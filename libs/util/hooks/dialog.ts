import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef, use } from "react";
export const useDialogState = (defaultState = false) => {
  const [open, setOpen] = useState(defaultState);
  const pathname = usePathname();
  const initialpathname = useRef(pathname);
  useEffect(() => {
    if (pathname !== initialpathname.current) {
      setOpen(false);
      initialpathname.current = pathname;
    }
  }, [pathname, open]);
  return [open, setOpen] as const;
};
