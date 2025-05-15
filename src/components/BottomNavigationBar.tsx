'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, Award, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/tasks', label: 'Tareas', icon: ClipboardList },
  { href: '/rewards', label: 'Recompensas', icon: Award },
  { href: '/account', label: 'Cuenta', icon: User },
];

export function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-t-lg">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center p-2 text-muted-foreground hover:text-primary',
                isActive && 'text-primary'
              )}
            >
              <item.icon className={cn('h-6 w-6', isActive ? 'fill-primary/20' : '')} />
              <span className="mt-1 text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
