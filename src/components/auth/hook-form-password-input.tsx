'use client';

import React, { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Link } from 'next-view-transitions';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

type HookFormPasswordInputProps = {
  form: UseFormReturn<any>;
  includeForgotPasswordLink?: boolean;
};

export default function HookFormPasswordInput({
  form,
  includeForgotPasswordLink
}: HookFormPasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Password</FormLabel>
            {includeForgotPasswordLink && (
              <Link
                href={'/auth/forgot-password'}
                className="text-sm text-muted-foreground transition-all duration-300  hover:text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            )}
          </div>
          <FormControl>
            <div className="relative">
              <Input
                placeholder="Password"
                type={`${showPassword ? 'text' : 'password'}`}
                {...field}
              />
              <span className="absolute right-1 top-0">
                {showPassword ? (
                  <Button
                    type="button"
                    size={'icon'}
                    variant={'ghost'}
                    className="rounded-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Eye className="opacity-80" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size={'icon'}
                    variant={'ghost'}
                    className="rounded-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <EyeOff className="opacity-80" />
                  </Button>
                )}
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
