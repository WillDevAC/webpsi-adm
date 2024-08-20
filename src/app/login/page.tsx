import { LoginBranding } from "@/components/client/login-branding";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <LoginBranding />
      <section className="flex items-center justify-center h-screen bg-white">
        <LoginForm />
      </section>
    </div>
  );
}
