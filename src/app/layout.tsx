import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: '--font-geist-sans', // Keep original CSS variable name
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({ // Keep original CSS variable name
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Recolector Urbano',
  description: 'Recolecta datos urbanos y gana recompensas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
