import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-2 sm:gap-3 cursor-point">
        <Image
          src="/assets/images/logo.png"
          alt="Wiggins Logo"
          width={32}
          height={32}
          className="object-contain w-6 h-6 sm:w-8 sm:h-8"
        />
        <span className="text-white text-lg sm:text-xl md:text-[24px] font-bold whitespace-nowrap">
          Vesta
        </span>
      </div>
    </Link>
  );
}
