import { SignIn } from "@clerk/nextjs";

export default function Signin() {
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <SignIn />
    </div>
  )
}