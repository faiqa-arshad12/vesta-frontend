import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";

interface PageHeaderProps {
  title: string;
  description: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}

export function PageHeader({
  title,
  description,
  searchPlaceholder = "Search By filename...",
  onSearch,
}: PageHeaderProps) {
  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        <div className="flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-foreground mb-1 sm:mb-2">
            {title}
          </h1>
          <p className="text-sm sm:text-base lg:text-[18px] text-card-foreground">
            {description}
          </p>
        </div>
        <div className="relative w-full  lg:max-w-md lg:flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className="pl-9 sm:pl-10 bg-white border-[#E9EAEB] h-10 sm:h-12 lg:h-[48px] text-sm sm:text-base lg:text-foreground font-medium placeholder:text-foreground placeholder:text-sm sm:placeholder:text-base lg:placeholder:text-[18px]"
          />
        </div>
      </div>
    </div>
  );
}
