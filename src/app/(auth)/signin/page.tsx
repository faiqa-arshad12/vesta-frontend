import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/form/SigninForm";

export default function SignInPage() {
  return (
    <AuthLayout currentSlide={0} totalSlides={3}>
      <SignInForm />
    </AuthLayout>
  );
}
