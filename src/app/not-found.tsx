import Link from 'next/link';

import { Button, Container } from '@/shared/ui';

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h1 className="text-8xl font-black mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Button asChild size="lg">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </Container>
  );
}
