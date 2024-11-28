'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { signUpFormSchema, SignUpFormType } from '@/lib/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useRouter } from 'nextjs-toploader/app';

import HookFormPasswordInput from './hook-form-password-input';
import SubmitButton from './submit-button';
import { PhoneInput } from '@/components/ui/phone-input';
import { ScrollArea } from '../ui/scroll-area';
import { z } from 'zod';
import { useRegisterMutation } from '@/services/auth/auth.api';

export default function SignUpForm() {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      rollNumber: '',
      class: '',
      section: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      guardianName: '',
      guardianRelation: '',
      guardianPhoneNumber: ''
    }
  });

  async function onSubmit(values: SignUpFormType) {
    localStorage.setItem('rememberMe', 'true');
    const rememberMe = localStorage.getItem('rememberMe');

    await registerUser({
      name: values.name,
      rollNumber: values.rollNumber,
      class: values.class,
      section: values.section,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      guardian: {
        name: values.guardianName,
        relation: values.guardianRelation,
        phoneNumber: values.phoneNumber
      },
      address: 'address'
    })
      .unwrap()
      .then((payload) => {
        if (rememberMe === 'true') {
          localStorage.setItem('accessToken', payload.tokens.access.token);
          localStorage.setItem('refreshToken', payload.tokens.refresh.token);
          localStorage.setItem('userId', payload.user.id);
        } else {
          sessionStorage.setItem('accessToken', payload.tokens.access.token);
          sessionStorage.setItem('refreshToken', payload.tokens.refresh.token);
          sessionStorage.setItem('userId', payload.user.id);
        }
        router.replace('/site');
        form.reset();
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <ScrollArea className="h-[55vh] md:h-[60vh] lg:h-[65vh]">
            <div className="grid gap-4 p-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <div className="grid flex-1 gap-2">
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <FormControl>
                          <Input placeholder="10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <div className="grid flex-1 gap-2">
                      <FormItem>
                        <FormLabel>Section</FormLabel>
                        <FormControl>
                          <Input placeholder="A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter a phone number"
                        defaultCountry="BD"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <HookFormPasswordInput form={form} />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="confirm password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="guardianName"
                  render={({ field }) => (
                    <div className="grid flex-1 gap-2">
                      <FormItem>
                        <FormLabel>Guardian Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Karim Ali" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guardianRelation"
                  render={({ field }) => (
                    <div className="grid flex-1 gap-2">
                      <FormItem>
                        <FormLabel>Guardian Relation</FormLabel>
                        <FormControl>
                          <Input placeholder="Father" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="guardianPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guardian Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter a phone number"
                        defaultCountry="BD"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
          <SubmitButton loading={false} buttonTitle="Get Started" />
        </form>
      </Form>
    </>
  );
}
