import {
  Camera,
  Gamepad2,
  Headphones,
  Monitor,
  Smartphone,
  Watch,
} from 'lucide-react';

export const categories = [
  {
    name: 'Phones',
    icon: <Smartphone className="size-6" />,
    href: '/catalog/smartphones',
  },
  {
    name: 'Computers',
    icon: <Monitor className="size-6" />,
    href: '/catalog/computers',
  },
  {
    name: 'Smart Watches',
    icon: <Watch className="size-6" />,
    href: '/catalog/watches',
  },
  {
    name: 'Cameras',
    icon: <Camera className="size-6" />,
    href: '/catalog/cameras',
  },
  {
    name: 'Headphones',
    icon: <Headphones className="size-6" />,
    href: '/catalog/headphones',
  },
  {
    name: 'Gaming',
    icon: <Gamepad2 className="size-6" />,
    href: '/catalog/gaming',
  },
];
