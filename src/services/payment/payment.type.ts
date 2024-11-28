import { IQueryFilter } from '@/lib/types';

// Enums
export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// Interfaces
export interface IRefundData {
  amount: number;
  reason: string;
  date: Date;
}

export interface IMetadata {
  ipAddress?: string;
  userAgent?: string;
  attempts: number;
}

export interface IGatewayResponse {
  [key: string]: any;
}

export interface IPayment {
  id: string;
  studentId: string;
  class: string;
  month: string;
  amount: number;
  transactionId: string;
  status: PaymentStatus;
  paymentDate: Date;
  gatewayResponse: IGatewayResponse;
  receiptUrl?: string;
  refundData?: IRefundData;
  metadata: IMetadata;
}

export type ICreatePaymentRequest = Pick<
  IPayment,
  'amount' | 'class' | 'studentId' | 'month'
>;

export type IPaymentFilterFields = Pick<IPayment, 'studentId'>;

export type IGetPaymentsRequestParams = Partial<
  IPaymentFilterFields & IQueryFilter
>;
