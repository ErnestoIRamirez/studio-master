import type { LucideIcon } from 'lucide-react';
import { ScanLine, Mic, HelpCircle, Building } from 'lucide-react'; // Changed import from PropertyIcon to Building
import type { TaskType } from './types';

export function getTaskIcon(taskType: TaskType): LucideIcon { // Adjusted return type
  switch (taskType) {
    case 'property':
      return Building; // Use the lucide-react Building icon
    case 'scan':
      return ScanLine;
    case 'audio':
      return Mic;
    default:
      return HelpCircle; // Fallback icon
  }
}

export function getTaskTypeName(taskType: TaskType): string {
  switch (taskType) {
    case 'property':
      return 'Propiedad';
    case 'scan':
      return 'Escaneo';
    case 'audio':
      return 'Grabación';
    default:
      return 'Desconocido';
  }
}
