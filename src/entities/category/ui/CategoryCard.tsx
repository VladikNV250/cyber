export interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
}

export function CategoryCard({ title, icon }: CategoryCardProps) {
  return (
    <div className="flex w-[160px] h-[128px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-banner-light transition-colors hover:bg-border">
      <div className="text-foreground">{icon}</div>
      <span className="text-foreground text-base font-medium">{title}</span>
    </div>
  );
}
