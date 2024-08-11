import { IsAdmin } from "@spotfinder2/ui/src/components/organisms/IsAdmin";
import Image from "next/image";
import { AdminHome } from "@spotfinder2/forms/src/AdminHome";
export default function Home() {
  return (
    <main>
      <IsAdmin>
        <AdminHome />
      </IsAdmin>
    </main>
  );
}
