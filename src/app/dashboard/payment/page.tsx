import { searchParamsCache } from '@/lib/search-params';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';
import PaymentListingPage from './_components/payment-listing-page';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Payment'
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <PaymentListingPage />;
}
