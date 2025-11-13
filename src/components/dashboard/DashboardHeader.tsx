"use client";

import {useState} from "react";
import {ChevronDown, User} from "lucide-react";
import Image from "next/image";
import Logo from "@/components/common/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";

export function DashboardHeader() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-primary px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between rounded-b-xl">
      <div className="flex-shrink-0">
        <Logo />
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <div
          className="text-white hover:bg-white/10 p-1.5 sm:p-2 rounded-lg cursor-pointer transition-colors"
          aria-label="Notifications"
        >
          <Icon
            icon="hugeicons:notification-square"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-1 sm:gap-2 text-white hover:bg-white/10 p-1.5 sm:p-2 md:p-3 h-auto rounded-lg hover:text-white cursor-pointer"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                {!imageError ? (
                  <Image
                    src="/assets/images/profile.jpg"
                    alt="User profile"
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-full h-full"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                )}
              </div>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 hidden sm:block hover:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 sm:w-56 cursor-pointer"
          >
            <DropdownMenuItem className="w-48 sm:w-56 cursor-pointer hover:bg-white/10">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
