import { IQueryFilter } from '@/lib/types';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  rollNumber: string;
  class: string;
  section: string;
  phoneNumber: string;
  guardian: {
    name: string;
    relation: string;
    phoneNumber: string;
  };
  address: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum FeeType {
  TUITION = 'TUITION',
  EXAM = 'EXAM',
  LIBRARY = 'LIBRARY',
  LABORATORY = 'LABORATORY',
  SPORTS = 'SPORTS',
  OTHER = 'OTHER'
}

export enum FeeStatus {
  PENDING = 'PENDING',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE'
}

export interface IFee {
  id: string;
  userId: string;
  academicYear: string;
  month: string;
  dueDate: Date;
  feeBreakdown: {
    type: FeeType;
    amount: number;
    description?: string;
  }[];
  totalAmount: number;
  paidAmount: number;
  status: FeeStatus;
}

export type IUserWithoutPassword = Omit<IUser, 'password'>;

export type IUserWithFee = {
  user: IUserWithoutPassword;
  fee: IFee;
};

export type ICreateUserRequest = Omit<IUser, 'id' | 'isEmailVerified'>;

export type IUserFilterFields = Pick<IUser, 'name' | 'role'>;

export type IGetUsersRequestParams = Partial<IUserFilterFields & IQueryFilter>;

export type IGetSingleUserRequest = Pick<IUser, 'id'>;

export type UserUpdateFields = Omit<IUser, 'id' | 'role' | 'isEmailVerified'>;

export interface IUpdateUserRequest {
  id: IUser['id'];
  body: Partial<UserUpdateFields>;
}

export type IDeleteUserRequest = Pick<IUser, 'id'>;
