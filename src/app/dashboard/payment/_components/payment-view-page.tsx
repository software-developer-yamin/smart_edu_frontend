import { ScrollArea } from '@/components/ui/scroll-area';
import PaymentForm from './payment-form';

export default function PaymentViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <PaymentForm />
      </div>
    </ScrollArea>
  );
}
