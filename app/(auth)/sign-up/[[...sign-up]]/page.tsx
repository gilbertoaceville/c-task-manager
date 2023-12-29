import { SignUp } from "@clerk/nextjs";

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <SignUp />
    </div>
  );
}
