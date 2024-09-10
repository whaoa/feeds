import '@/styles/tailwind.css';

import * as meta from '@/constants/metadata';
import { RootHeader } from '@/components/layout/root';
import { ReactQueryProvider } from '@/components/utility/react-query';

import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  authors: meta.author,
  title: {
    default: `${meta.name} - ${meta.description}`,
    template: `%s | ${meta.name}`,
  },
  description: `${meta.name} - ${meta.description}`,
  keywords: [
    ...meta.keywords,
  ],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="text-base text-slate-800 bg-gray-100">
        <ReactQueryProvider>
          <RootHeader />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
