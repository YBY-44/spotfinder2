import { Switch as AntSwitch, Field, Label } from "@headlessui/react";
import { ReactNode } from "react";

export interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: ReactNode;
  className?: string;
}

export const Switch = ({
  label,
  checked,
  onChange,
  children,
  className,
}: SwitchProps) => {
  return (
    <Field>
      <div className={"flex items-center " + className}>
        <Label className="mr-2 text-sm font-bold">{label}</Label>
        <AntSwitch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? "bg-primary-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          >
            {children}
          </span>
        </AntSwitch>
      </div>
    </Field>
  );
};
