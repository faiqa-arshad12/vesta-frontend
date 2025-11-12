interface BottomUIProps {
  currentIndex?: number;
  totalItems: number;
}

export default function BottomUI({
  currentIndex = 0,
  totalItems = 3,
}: BottomUIProps) {
  return (
    <div className="flex gap-2">
      {Array.from({length: totalItems}).map((_, index) => (
        <div
          key={index}
          className={`h-1 w-15 transition-all duration-300 ${
            index === currentIndex ? "bg-white" : "bg-[#FFFFFF33]"
          }`}
        />
      ))}
    </div>
  );
}
