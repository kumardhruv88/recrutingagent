import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SignIn routing="hash" forceRedirectUrl="/dashboard" fallbackRedirectUrl="/dashboard" signUpUrl="/register" />
    </div>
  );
}
