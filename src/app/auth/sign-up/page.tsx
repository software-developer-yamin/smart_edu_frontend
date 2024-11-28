import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { Separator } from '@/components/ui/separator';

import SignupForm from '@/components/auth/sign-up-form';

export default function SingUpPage() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-8">
      <div className="col-span-5 flex items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-lg gap-6 px-4">
          <div className="grid gap-2 text-center">
            <h1 className="text-left text-4xl font-bold">
              🌟 Ready to Be Awesome?
            </h1>
            <p className="text-balance text-left text-muted-foreground">
              Create Your Account and Dive In 🌟
            </p>
          </div>
          {/* <Button variant={"outline"} className="space-x-2">
            <GoogleLogo />
            <span>Continue with google</span>
          </Button> */}
          <Separator />

          <SignupForm />

          <div className="space-y-2 text-center text-sm">
            Already have an account?&nbsp;
            <Link
              href="/auth/login"
              className="transition-all duration-300 hover:text-muted-foreground hover:underline"
            >
              Login here!
            </Link>
            <p>
              By Signing up, you agree to our&nbsp;
              <Link
                href={'/public/terms-of-use'}
                className="underline transition-all duration-300 hover:text-muted-foreground"
              >
                Terms of Use
              </Link>
              &nbsp;and&nbsp;
              <Link
                href={'/public/privacy-policy'}
                className="underline transition-all duration-300 hover:text-muted-foreground"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-3 hidden bg-muted lg:block">
        <Image
          src="/dark-pattern.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
