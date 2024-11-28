'use client';

import React, { useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { useForm } from 'react-hook-form';
import { loginFormSchema, LoginFormType } from '@/lib/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import HookFormPasswordInput from './hook-form-password-input';
import SubmitButton from './submit-button';
import { useLoginMutation } from '@/services/auth/auth.api';
import { setCookie } from 'cookies-next';

export default function LoginForm() {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginMutation();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: LoginFormType) {
    localStorage.setItem('rememberMe', 'true');
    const rememberMe = localStorage.getItem('rememberMe');

    await loginUser({ email: values.email, password: values.password })
      .unwrap()
      .then((payload) => {
        // if (rememberMe === 'true') {
        //   localStorage.setItem('accessToken', payload.tokens.access.token);
        //   localStorage.setItem('refreshToken', payload.tokens.refresh.token);
        //   localStorage.setItem('userId', payload.user.id);
        // } else {
        //   sessionStorage.setItem('accessToken', payload.tokens.access.token);
        //   sessionStorage.setItem('refreshToken', payload.tokens.refresh.token);
        //   sessionStorage.setItem('userId', payload.user.id);
        // }

        setCookie('accessToken', payload.tokens.access.token);
        setCookie('refreshToken', payload.tokens.refresh.token);
        setCookie('userId', payload.user.id);

        router.replace('/site');
        form.reset();
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div className="grid flex-1 gap-2">
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <HookFormPasswordInput form={form} includeForgotPasswordLink />
          <SubmitButton loading={isLoading} buttonTitle="Login" />
        </form>
      </Form>
    </>
  );
}
