
'use client';

import { useRouter } from 'next/navigation';
import { Plus, ScanLine, Mic, Building } from 'lucide-react'; // Import Building from lucide-react
// PropertyIcon import removed
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function FloatingActionMenu() {
  const router = useRouter();

  const menuItems = [
    {
      label: 'Info. Propiedad',
      icon: Building, // Use the Building icon
      action: () => router.push('/collect/property'),
    },
    {
      label: 'Escanear Entorno',
      icon: ScanLine,
      action: () => router.push('/collect/scan'),
    },
    {
      label: 'Grabar Sonido',
      icon: Mic,
      action: () => router.push('/collect/audio'),
    },
    {
      label: 'Tráfico',
      icon: Mic,
      // action: () => router.push('/collect/audio'),
    },
    {
      label: 'Afluencia peatonal',
      icon: Mic,
      // action: () => router.push('/collect/audio'),
    },
    {
      label: 'Propiedad en venta',
      icon: Mic,
      // action: () => router.push('/collect/audio'),
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-20 right-6 z-40 h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
          aria-label="Crear nueva recolección"
        >
          <Plus className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mb-2 w-auto p-2" side="top" align="end">
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              onClick={item.action}
              className="justify-start px-3 py-2"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
