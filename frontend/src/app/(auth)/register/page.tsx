import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SignUp routing="hash" forceRedirectUrl="/dashboard" fallbackRedirectUrl="/dashboard" signInUrl="/login" />
    </div>
  );
}
