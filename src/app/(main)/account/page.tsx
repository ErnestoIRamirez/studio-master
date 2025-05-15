'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { User, Award, ClipboardCheck, LogOut, Gift } from 'lucide-react'; // Import Gift from lucide-react

// Mock data
const MOCK_USER_DATA = {
  name: "Usuario Ejemplo",
  email: "usuario@ejemplo.com",
  points: 1850,
  tasksCompleted: 2,
  rewardsRedeemed: 1,
  avatarUrl: "https://placehold.co/100x100.png?text=UE"
};

export default function AccountPage() {
  const [userData] = useState(MOCK_USER_DATA);

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="Mi Cuenta" />
      
      <Card className="mb-6 shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userData.avatarUrl} alt={userData.name} data-ai-hint="avatar person" />
            <AvatarFallback>
              {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{userData.name}</CardTitle>
            <p className="text-muted-foreground">{userData.email}</p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg border p-4">
                <Award className="mb-2 h-8 w-8 text-primary" />
                <p className="text-2xl font-bold">{userData.points}</p>
                <p className="text-sm text-muted-foreground">Puntos Totales</p>
            </div>
            <div className="flex flex-col items-center rounded-lg border p-4">
                <ClipboardCheck className="mb-2 h-8 w-8 text-secondary" />
                <p className="text-2xl font-bold">{userData.tasksCompleted}</p>
                <p className="text-sm text-muted-foreground">Tareas Completadas</p>
            </div>
            <div className="flex flex-col items-center rounded-lg border p-4">
                <Gift className="mb-2 h-8 w-8 text-accent" /> {/* Use Gift from lucide-react */}
                <p className="text-2xl font-bold">{userData.rewardsRedeemed}</p>
                <p className="text-sm text-muted-foreground">Recompensas Canjeadas</p>
            </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start text-left">
          <User className="mr-2 h-5 w-5" /> Editar Perfil
        </Button>
        <Button variant="outline" className="w-full justify-start text-left">
          <User className="mr-2 h-5 w-5" /> Mi Dirección
        </Button>
        <Button variant="outline" className="w-full justify-start text-left">
          Configuración
        </Button>
         <Button variant="destructive" className="w-full justify-start text-left">
          <LogOut className="mr-2 h-5 w-5" /> Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}

// Removed inline GiftIcon SVG definition
