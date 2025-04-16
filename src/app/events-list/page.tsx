import { mainPage } from "@/lib/consts";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(mainPage);
}
