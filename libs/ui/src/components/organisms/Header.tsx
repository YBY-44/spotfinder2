"use client";
import { MenuItem, Role, BaseComponent } from "@spotfinder2/util/types";
import { Brand } from "../atoms/Brand";
import { Container } from "../atoms/Container";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserInfo } from "../molecules/UserInfo";
import { Sidebar } from "./Sidebar";
import { LogoutButton } from "../molecules/LogoutButton";
import { Button } from "../atoms/Button";
import { useDialogState } from "@spotfinder2/util/hooks/dialog";
import { NavSidebar } from "./NavSideBar";
import { Menus } from "./Menus";
export type IHeaderProps = {
  type?: Role;
  menuItems: MenuItem[];
} & BaseComponent;
export const Header = ({ type, menuItems }: IHeaderProps) => {
  const session = useSession();
  const uid = session?.data?.user?.uid;
  const [open, setOpen] = useDialogState(false);
  return (
    <header>
      <nav className="fixed z-50 top-0 w-full shadow-md shadow-gray-300/10 bg-white/50 backdrop-blur-md">
        <Container className="relative flex items-center justify-between h-16 py-2 gap-16">
          <Link href="/" aria-label="Home" className="w-auto z-50">
            <Brand type={type} className="hidden h-10 sm:block" />
            <Brand type={type} shortForm className="block sm:hidden" />
          </Link>
          <div className="flex items-center gap-2">
            {uid ? (
              <div className="flex gap-6 items-center">
                {/* <div className="text-sm mr-6 flex gap-3">
                    <Menus menuItems={menuItems} />
                  </div> */}
                <NavSidebar menuItems={menuItems} />
              </div>
            ) : (
              <>
                <Link href="/regist">
                  <Button varient="outlined" className="hidden md:block">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button varient="contained" className="hidden md:block">
                    {" Login "}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Container>
      </nav>
      <div className="h-16"></div>
    </header>
  );
};
