'use client';

import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import EmployeeTable from './payment-tables';
import { useGetPaymentsQuery } from '../../../../services/payment/payment.api';

export default function PaymentListingPage() {
  const { data, isLoading, isFetching } = useGetPaymentsQuery({});

  if (isLoading || isFetching) return <h4>Loading</h4>;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Payment (${data?.totalResults})`} description="" />

          <Link
            href={'/dashboard/payment/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <EmployeeTable data={data!.results} totalData={data!.totalResults} />
      </div>
    </PageContainer>
  );
}
