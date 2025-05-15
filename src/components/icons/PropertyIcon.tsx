// src/components/icons/PropertyIcon.tsx
import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function PropertyIcon({ className, width = 24, height = 24, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn(className)}
      {...props}
    >
      {/* Outer green border */}
      <rect
        x="1.5" y="1.5" width="21" height="21" rx="1"
        stroke="hsl(var(--secondary))" strokeWidth="2.5" fill="none"
      />
      
      {/* Icon parts using currentColor */}
      {/* Door (left part) */}
      <path d="M8.5 18.5V7.5C8.5 6.39543 7.60457 5.5 6.5 5.5H6C5.44772 5.5 5 5.94772 5 6.5V18.5H8.5" 
            stroke="currentColor" fill="none" strokeWidth="1.5"/>
      {/* Main building block (rectangle to the right of the door) */}
      <rect x="8.5" y="5.5" width="7" height="13" rx="0.5"
            stroke="currentColor" fill="none" strokeWidth="1.5"/>

      {/* Windows (dots - filled with currentColor) */}
      <circle cx="10.5" cy="8.5" r="0.75" fill="currentColor" stroke="none"/>
      <circle cx="13.5" cy="8.5" r="0.75" fill="currentColor" stroke="none"/>
      <circle cx="10.5" cy="11.5" r="0.75" fill="currentColor" stroke="none"/>
      <circle cx="13.5" cy="11.5" r="0.75" fill="currentColor" stroke="none"/>
      
      {/* Plus sign */}
      <line x1="15.5" y1="16.5" x2="19.5" y2="16.5" stroke="currentColor" strokeWidth="2"/>
      <line x1="17.5" y1="14.5" x2="17.5" y2="18.5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
