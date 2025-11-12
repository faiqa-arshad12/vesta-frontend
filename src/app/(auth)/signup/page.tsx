import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/form/SignupForm";

export default function SignInPage() {
  return (
    <AuthLayout currentSlide={0} totalSlides={3}>
      <SignupForm />
    </AuthLayout>
  );
}
