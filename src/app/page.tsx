import ImageCarousel from '@/components/home/image-carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function RootPage() {
  return (
    <main>
      <header className="mb-5 flex h-16 items-center justify-between bg-primary-foreground shadow">
        <div className="flex items-center gap-2 px-4"></div>
        <div className="flex items-center gap-2 px-4">
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Register</Button>
          </Link>
        </div>
      </header>
      <ImageCarousel />
    </main>
  );
}
