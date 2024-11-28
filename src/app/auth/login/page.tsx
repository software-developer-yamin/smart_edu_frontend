import React from 'react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { Separator } from '@/components/ui/separator';
import LoginForm from '@/components/auth/login-form';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-8">
      <div className="col-span-3 hidden bg-muted lg:block">
        <Image
          src="/light-pattern.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="col-span-5 flex items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-lg gap-6 px-4">
          <div className="grid gap-2 text-center">
            <h1 className="text-left text-5xl font-bold">Welcome Back! 👋</h1>
            <p className="text-balance text-left text-muted-foreground">
              Enter Your Credentials to Proceed
            </p>
          </div>
          {/* <Button variant={"outline"} className="space-x-2">
            <GoogleLogo />
            <span>Continue with Google</span>
          </Button> */}
          <Separator />

          <LoginForm />

          <div className="text-center text-sm">
            Already have an account?&nbsp;
            <Link
              href="/auth/sign-up"
              className="transition-all duration-300 hover:text-muted-foreground hover:underline"
            >
              Sign up here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
