import { SignUp } from "@/components/auth/Signup";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen pb-24">
      <Suspense fallback={<div>Loading...</div>}>
        <SignUp />
      </Suspense>
    </div>
  );
}
