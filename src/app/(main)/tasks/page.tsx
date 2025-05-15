
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { TaskCard } from '@/components/TaskCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Task, TaskStatus } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { TaskDetailsDialog } from '@/components/TaskDetailsDialog'; // Import the new dialog

// Mock Data
const mockTasks: Task[] = [
  { id: '1', type: 'property', title: 'Evaluar Condominio Central', address: 'Av. Principal 123, Centro', points: 150, status: 'available', description: 'Recopilar información sobre precios de alquiler y venta en el área.' },
  { id: '2', type: 'scan', title: 'Escaneo Ambiental Parque Norte', address: 'Parque Norte, Col. Bosques', points: 75, status: 'in-progress', description: 'Realizar un escaneo 3D de la entrada principal del parque.' },
  { id: '3', type: 'audio', title: 'Grabación Sonora Mercado Hidalgo', address: 'Mercado Hidalgo, Puesto 54', points: 50, status: 'completed', description: 'Grabar el ambiente sonoro del mercado en hora pico.' },
  { id: '4', type: 'property', title: 'Inspección Fachada Edificio Histórico', address: 'Calle Reforma 45, Casco Antiguo', points: 200, status: 'available', description: 'Documentar estado de la fachada y posibles daños.' },
  { id: '5', type: 'scan', title: 'Mapeo Wi-Fi Plaza Comercial', address: 'Plaza Sol, Local 22-B', points: 60, status: 'available', description: 'Escanear la cobertura y calidad de las redes Wi-Fi públicas.' },
  { id: '6', type: 'audio', title: 'Registro Sonoro Estación de Tren', address: 'Estación Central, Andén 3', points: 40, status: 'completed', description: 'Grabar anuncios y sonidos característicos de la estación.' },
];


export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleStartTask = (taskId: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, status: 'in-progress' as TaskStatus } : task
      )
    );
    const startedTask = tasks.find(task => task.id === taskId);
    toast({
      title: "Tarea Iniciada",
      description: `Has comenzado la tarea: "${startedTask?.title || 'Tarea seleccionada'}".`,
    });
  };

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const filteredTasks = (status: TaskStatus) => tasks.filter(task => task.status === status);

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="Mis Tareas" />
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Disponibles</TabsTrigger>
          <TabsTrigger value="in-progress">En Curso</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          <div className="mt-4 space-y-4">
            {filteredTasks('available').length > 0 ? (
              filteredTasks('available').map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStartTask={handleStartTask} 
                  onViewDetails={handleViewDetails} 
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground">No hay tareas disponibles.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="in-progress">
          <div className="mt-4 space-y-4">
            {filteredTasks('in-progress').length > 0 ? (
              filteredTasks('in-progress').map(task => 
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onViewDetails={handleViewDetails} 
                />)
            ) : (
              <p className="text-center text-muted-foreground">No tienes tareas en curso.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="mt-4 space-y-4">
            {filteredTasks('completed').length > 0 ? (
              filteredTasks('completed').map(task => 
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onViewDetails={handleViewDetails}
                />)
            ) : (
              <p className="text-center text-muted-foreground">Aún no has completado tareas.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {selectedTask && (
        <TaskDetailsDialog
          isOpen={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
          task={selectedTask}
        />
      )}
    </div>
  );
}
