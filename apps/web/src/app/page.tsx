import Image from "next/image";
import { add } from "@spotfinder2/sample-lib";
export default function Home() {
  let r = add(5, 10);
  return <main>Hello{r}</main>;
}
