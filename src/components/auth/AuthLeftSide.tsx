import Image from "next/image";
import Copyright from "./Copyright";
import BottomUI from "./BottomUI";
import Logo from "../common/Logo";

interface AuthLeftSideProps {
  currentSlide?: number;
  totalSlides?: number;
}

export default function AuthLeftSide({
  currentSlide = 0,
  totalSlides = 3,
}: AuthLeftSideProps) {
  return (
    <div className="hidden lg:flex lg:w-[50%] relative  overflow-hidden p-6">
      <div className="absolute inset-6 z-0 rounded-[32px] overflow-hidden">
        <Image
          src="/assets/images/Bg.jpg"
          alt="Background"
          fill
          // className="object-cover opacity-90"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full p-12 w-full">
        <div className="flex justify-between flex flex-row w-full">
          <Logo />
          <Copyright />
        </div>

        <div className="space-y-6 pb-9">
          <div className="space-y-4">
            <h2 className="text-[42px] font-bold text-white">
              Your Documents, Instantly Estimated
            </h2>
            <p className="text-white text-[24px] max-w-2xl text-normal">
              Experience effortless document estimation powered by intelligent
              automation.
            </p>
          </div>
          <BottomUI currentIndex={currentSlide} totalItems={totalSlides} />
        </div>
      </div>
    </div>
  );
}
