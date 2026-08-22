interface Props {
  title: string;
}

export function ProductCardTitle({ title }: Props) {
  return (
    <h3 className="text-base font-medium text-center line-clamp-2 min-h-12 text-foreground">
      {title}
    </h3>
  );
}
