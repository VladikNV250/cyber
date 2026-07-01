import {
  Camera,
  Gamepad2,
  Headphones,
  Monitor,
  Smartphone,
  Watch,
} from 'lucide-react';

export const categories = [
  { name: 'Phones', icon: <Smartphone className="size-6" /> },
  { name: 'Computers', icon: <Monitor className="size-6" /> },
  { name: 'Smart Watches', icon: <Watch className="size-6" /> },
  { name: 'Cameras', icon: <Camera className="size-6" /> },
  { name: 'Headphones', icon: <Headphones className="size-6" /> },
  { name: 'Gaming', icon: <Gamepad2 className="size-6" /> },
];
