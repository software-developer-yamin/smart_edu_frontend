'use client';

import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useDownloadPaymentReceiptMutation } from '../../../../../services/payment/payment.api';

export default function NotFound() {
  const router = useRouter();
  const { paymentId, type } = useParams();
  const [downloadReceipt, { isLoading }] = useDownloadPaymentReceiptMutation();

  const downloadHandler = async () => {
    if (type === 'success') {
      await downloadReceipt(paymentId).unwrap();
    }
    router.push('/dashboard/payment');
  };

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <div className="mt-8 flex justify-center gap-2">
        <Button
          onClick={downloadHandler}
          variant={type === 'success' ? 'default' : 'ghost'}
          size="lg"
          disabled={isLoading}
        >
          {type === 'success' ? 'Download PDF' : 'Back to Home'}
        </Button>
      </div>
    </div>
  );
}
