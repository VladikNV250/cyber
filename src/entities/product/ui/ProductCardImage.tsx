import { ImageIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

interface Props {
  imageUrl?: StaticImageData;
  alt: string;
}

export function ProductCardImage({ imageUrl, alt }: Props) {
  if (!imageUrl)
    return (
      <div className="h-40 w-40 bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
        <ImageIcon className="w-12 h-12 opacity-20" />
      </div>
    );

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={160}
      height={160}
      className="object-contain size-40"
    />
  );
}
