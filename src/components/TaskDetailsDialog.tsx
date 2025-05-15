
'use client';

import type { Task } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TaskLocationMap } from './TaskLocationMap';
import { Separator } from './ui/separator';

interface TaskDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  task: Task | null;
}

// Default center for the map (e.g., Mexico City)
const defaultCenter = {
  lat: 19.4326,
  lng: -99.1332,
};

export function TaskDetailsDialog({ isOpen, onOpenChange, task }: TaskDetailsDialogProps) {
  if (!task) {
    return null;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
          <DialogDescription>{task.address}</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="grid gap-4 py-4">
          {task.description && (
            <div>
              <h4 className="mb-1 font-medium text-sm">Descripción:</h4>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>
          )}
          <div>
            <h4 className="mb-2 font-medium text-sm">Ubicación (General):</h4>
            <TaskLocationMap 
              apiKey={apiKey} 
              taskAddress={task.address}
              centerLat={defaultCenter.lat}
              centerLng={defaultCenter.lng}
            />
          </div>
           <div className="mt-2 text-sm text-muted-foreground">
              <p>Puntos por completar: <span className="font-semibold text-primary">{task.points}</span></p>
           </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
