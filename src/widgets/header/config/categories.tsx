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
    href: '/catalog/245631bd-f50a-4a5b-b407-30bf071a6388',
  },
  {
    name: 'Computers',
    icon: <Monitor className="size-6" />,
    href: '/catalog/27d18678-ab56-4dd5-a136-d807509c36e9',
  },
  {
    name: 'Smart Watches',
    icon: <Watch className="size-6" />,
    href: '/catalog/15451908-d754-465d-a29b-c65efc56190a',
  },
  {
    name: 'Cameras',
    icon: <Camera className="size-6" />,
    href: '/catalog/c1353c06-0659-4495-b9c8-32acf7fdb29c',
  },
  {
    name: 'Headphones',
    icon: <Headphones className="size-6" />,
    href: '/catalog/f950dbec-8c71-4200-b4c4-86742f9b8dc0',
  },
  {
    name: 'Gaming',
    icon: <Gamepad2 className="size-6" />,
    href: '/catalog/035ac999-05cb-4dc5-a307-29fa023c4832',
  },
];
