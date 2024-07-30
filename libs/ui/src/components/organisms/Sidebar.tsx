import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useDialogState } from "@spotfinder2/util/hooks/dialog";
import { Children, ReactNode, useState } from "react";
import { BrandIcon } from "../atoms/BrandIcon";

export interface ISidebarProps {
  children: ReactNode;
  blur?: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const Sidebar = ({
  children,
  blur = true,
  open,
  setOpen,
}: ISidebarProps) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-hidden"
          onClose={() => {
            setOpen(false);
          }}
        >
          {blur ? (
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-1000"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-1000"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            </TransitionChild>
          ) : null}
          <div className="fixed inset-y-0 right-0 flex max-w-full bg-white ">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="flex flex-col w-screen max-w-md p-3">
                <button
                  type="button"
                  className="absolute top-0 right-0 z-10 m-2 ml-auto rounded-full"
                  onClick={() => setOpen(false)}
                >
                  <IconX className="w-6 h-6 p-1" aria-hidden="true" />
                </button>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
