import api from '@/lib/api';
import { IQueryResult } from '@/lib/types';
import { IGetPaymentsRequestParams, IPayment } from './payment.type';

const apiWithUserTags = api.enhanceEndpoints({ addTagTypes: ['Payment'] });

const paymentApi = apiWithUserTags.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (body) => ({
        url: '/payments',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Payment']
    }),
    getPayments: builder.query<
      IQueryResult<IPayment>,
      IGetPaymentsRequestParams
    >({
      query: (params) => ({
        url: '/payments',
        method: 'GET',
        params
      }),
      providesTags: (data) =>
        data && data.results
          ? [
              ...data.results.map(({ id }) => ({
                type: 'Payment' as const,
                id
              })),
              { type: 'Payment', id: 'PARTIAL-Payment-LIST' }
            ]
          : [{ type: 'Payment', id: 'PARTIAL-Payment-LIST' }]
    }),
    downloadPaymentReceipt: builder.mutation({
      query: (transactionId) => ({
        url: `/payments/${transactionId}/download/receipt`,
        method: 'GET',
        responseHandler: async (response) => {
          const blob = await response.blob();
          // Create URL and trigger download
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `payment-receipt-${transactionId}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      })
    })
  })
});

export const {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useDownloadPaymentReceiptMutation
} = paymentApi;

export default paymentApi;
