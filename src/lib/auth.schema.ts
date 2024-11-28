import { z } from 'zod';

export const signUpFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  rollNumber: z.string().min(8, 'Roll number must be 8 characters'),
  class: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  phoneNumber: z
    .string()
    .min(11, 'Phone number must be at least 11 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  confirmPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  guardianName: z
    .string()
    .min(3, 'Guardian name must be at least 3 characters'),
  guardianRelation: z
    .string()
    .min(3, 'Guardian relation must be at least 3 characters'),
  guardianPhoneNumber: z
    .string()
    .min(11, 'Guardian phone number must be at least 11 characters')
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Incorrect password. TRY AGAIN!' })
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export const updatePasswordFormSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Password should be more than 6 characters...' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password should be more than 6 characters...' })
});

export type UpdatePasswordFormType = z.infer<typeof updatePasswordFormSchema>;

export const forgotPasswordFormSchema = z.object({
  email: z.string().email()
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;
