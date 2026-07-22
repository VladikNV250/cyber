import Link from 'next/link';

export interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export function CategoryCard({ title, icon, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="flex w-[160px] h-[128px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-banner-light transition-colors hover:bg-border"
    >
      <div className="text-foreground">{icon}</div>
      <span className="text-foreground text-base font-medium">{title}</span>
    </Link>
  );
}
