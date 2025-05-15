'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { RewardCard } from '@/components/RewardCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Reward } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

// Mock Data
const mockRewards: Reward[] = [
  { id: '1', name: 'Café Gratis en "El Cafetal"', description: 'Un café americano o espresso tamaño mediano.', pointsCost: 500, status: 'available', imageUrl: 'https://placehold.co/600x400.png?text=Cafe' },
  { id: '2', name: 'Descuento 10% en "Tienda XYZ"', description: '10% de descuento en tu próxima compra.', pointsCost: 1000, status: 'available', imageUrl: 'https://placehold.co/600x400.png?text=Descuento' },
  { id: '3', name: 'Boleto de Cine', description: 'Una entrada para cualquier función estándar.', pointsCost: 1200, status: 'redeemed', imageUrl: 'https://placehold.co/600x400.png?text=Cine' },
  { id: '4', name: 'Tarjeta de Regalo $50', description: 'Tarjeta de regalo para Amazon.', pointsCost: 2500, status: 'available', imageUrl: 'https://placehold.co/600x400.png?text=Regalo' },
];

// Mock user points
const MOCK_USER_POINTS = 1850;


export default function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>(mockRewards);
  const [userPoints, setUserPoints] = useState<number>(MOCK_USER_POINTS); // Manage user points
  const { toast } = useToast();

  const handleRedeem = (rewardId: string) => {
    const rewardToRedeem = rewards.find(r => r.id === rewardId);
    if (!rewardToRedeem) return;

    if (userPoints >= rewardToRedeem.pointsCost) {
      setUserPoints(currentPoints => currentPoints - rewardToRedeem.pointsCost);
      setRewards(currentRewards => 
        currentRewards.map(r => 
          r.id === rewardId ? { ...r, status: 'redeemed' } : r
        )
      );
      toast({
        title: "¡Recompensa Canjeada!",
        description: `Has canjeado "${rewardToRedeem.name}".`,
      });
    } else {
      toast({
        title: "Puntos Insuficientes",
        description: `No tienes suficientes puntos para canjear "${rewardToRedeem.name}".`,
        variant: "destructive",
      });
    }
  };
  
  const availableRewards = rewards.filter(reward => reward.status === 'available');
  const redeemedRewards = rewards.filter(reward => reward.status === 'redeemed');

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="Recompensas">
        <div className="text-right">
            <p className="text-sm text-muted-foreground">Tus Puntos</p>
            <p className="text-xl font-bold text-primary">{userPoints} Pts</p>
        </div>
      </PageHeader>
      
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available">Disponibles</TabsTrigger>
          <TabsTrigger value="redeemed">Canjeadas</TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          {availableRewards.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableRewards.map(reward => (
                <RewardCard key={reward.id} reward={reward} onRedeem={handleRedeem} />
              ))}
            </div>
          ) : (
             <p className="mt-6 text-center text-muted-foreground">No hay recompensas disponibles actualmente.</p>
          )}
        </TabsContent>
        <TabsContent value="redeemed">
           {redeemedRewards.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {redeemedRewards.map(reward => (
                <RewardCard key={reward.id} reward={reward} isRedeemed={true} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-center text-muted-foreground">Aún no has canjeado recompensas.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
