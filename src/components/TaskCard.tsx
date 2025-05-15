
import type { Task } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { getTaskIcon } from '@/lib/icons';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onStartTask?: (taskId: string) => void;
  onViewDetails?: (task: Task) => void; // Added onViewDetails prop
}

export function TaskCard({ task, onStartTask, onViewDetails }: TaskCardProps) {
  const Icon = getTaskIcon(task.type);

  return (
    <Card className="p-4 shadow-md transition-all hover:shadow-lg">
      <div className="flex items-center space-x-3">
        <Icon className="h-10 w-10 flex-shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-grow">
          <h3 className="truncate text-base font-semibold">
            {task.title || getTaskTypeName(task.type)}
          </h3>
          <p className="truncate text-sm text-muted-foreground">
            {task.address}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <p className="text-sm font-medium text-primary">{task.points} Puntos</p>
        {task.status === 'available' && onStartTask ? (
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onStartTask(task.id)}
            className="flex-shrink-0"
          >
            Comenzar
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails?.(task)}
            className="flex-shrink-0"
          >
            Ver detalles
          </Button>
        )}
      </div>
    </Card>
  );
}

// Helper function that was implicitly used by task.title fallback, making it explicit
function getTaskTypeName(taskType: Task['type']): string {
  switch (taskType) {
    case 'property':
      return 'Información de Propiedad';
    case 'scan':
      return 'Escaneo de Entorno';
    case 'audio':
      return 'Grabación de Sonido';
    default:
      return 'Tarea Desconocida';
  }
}
