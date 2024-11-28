'use client';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useCreatePaymentMutation } from '../../../../services/payment/payment.api';
import { toast } from 'sonner';

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
] as const;

export const formSchema = z.object({
  studentId: z
    .string()
    .min(
      1,
      'Student ID must be at least 6 characters of uppercase letters and numbers'
    ),

  class: z
    .string({
      required_error: 'Class is required'
    })
    .regex(/^([1-9]|1[0-2])$/, {
      message: 'Class must be between 1 and 12'
    }),

  month: z.enum(months, {
    required_error: 'Month is required',
    invalid_type_error: 'Invalid month selected'
  }),

  amount: z.string().min(1, 'Amount must be between 1 and 100,000')
});

export default function PaymentForm() {
  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: '',
      month: 'january',
      class: '',
      amount: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createPayment({
      ...values
    })
      .unwrap()
      .then((result) => {
        toast.success(`Payment has been successfully created!`);
        if (typeof window !== 'undefined') {
          window.open(result.gatewayPageURL);
        }
      });
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Id</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your student id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {months.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value.toLocaleUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your class" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Pay
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
