import { Toaster } from '@/components/ui/sonner';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import StoreProvider from '@/providers/store-provider';
import { ViewTransitions } from 'next-view-transitions';
import { ThemeProvider } from '@/providers/theme-provider';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <ViewTransitions>
        <html
          lang="en"
          className={`${lato.className}`}
          suppressHydrationWarning={true}
        >
          <body className={'overflow-hidden'}>
            <NextTopLoader showSpinner={false} />
            <Toaster />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ViewTransitions>
    </StoreProvider>
  );
}
