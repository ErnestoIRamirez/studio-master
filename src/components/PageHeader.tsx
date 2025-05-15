import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between border-b p-4 pb-4">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {children}
    </div>
  );
}
