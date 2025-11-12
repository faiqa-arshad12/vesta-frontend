interface AuthHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function AuthHeader({title, description, className}: AuthHeaderProps) {
  return (
    <div className={`text-center mb-8 ${className || ""}`}>
      <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-card-foreground text-[18px] font-normal">
        {description}
      </p>
    </div>
  );
}
