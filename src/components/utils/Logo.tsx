import Link from "next/link";
import { JamIcon } from "./Jam";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center select-none">
        <JamIcon className="w-6 h-6 mr-1" />
        <span className="font-bold text-2xl tracking-tight">
          <span className="text-gray-800">Hack</span>
          <span className="text-red-500">Jam</span>
        </span>
      </div>
    </Link>
  );
};
