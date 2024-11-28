import React from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import UpdatePasswordForm from '@/components/auth/update-password-form';

export default function UpdatePasswordPage() {
  return (
    <>
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
              <h1 className="text-left text-4xl font-bold">
                Password Makeover 🔄
              </h1>
              <p className="text-balance text-left text-muted-foreground">
                ✨ Freshen Up Your Security with a New Password
              </p>
            </div>
            <Separator />
            <UpdatePasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}
