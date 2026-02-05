import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Notes & Bookmarks Manager',
  description: 'A personal notes and bookmark management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
