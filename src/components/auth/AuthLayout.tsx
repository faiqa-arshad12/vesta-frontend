import AuthLeftSide from "./AuthLeftSide";

interface AuthLayoutProps {
  children: React.ReactNode;
  currentSlide?: number;
  totalSlides?: number;
}

export default function AuthLayout({
  children,
  currentSlide = 0,
  totalSlides = 3,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <AuthLeftSide currentSlide={currentSlide} totalSlides={totalSlides} />

      <div className="flex-1 flex items-center justify-center bg-white p-8">
        {children}
      </div>
    </div>
  );
}
