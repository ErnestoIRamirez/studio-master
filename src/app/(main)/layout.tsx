import type { ReactNode } from 'react';
import { BottomNavigationBar } from '@/components/BottomNavigationBar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow pb-16">{children}</main>
      <BottomNavigationBar />
    </div>
  );
}
