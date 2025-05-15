import Image from 'next/image';
import type { Reward } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift } from 'lucide-react';

interface RewardCardProps {
  reward: Reward;
  onRedeem?: (rewardId: string) => void;
  isRedeemed?: boolean;
}

export function RewardCard({ reward, onRedeem, isRedeemed }: RewardCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-md transition-all hover:shadow-lg">
      {reward.imageUrl ? (
        <div className="relative h-40 w-full">
          <Image
            src={reward.imageUrl}
            alt={reward.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint="rewards gifts"
          />
        </div>
      ) : (
        <div className="flex h-40 w-full items-center justify-center bg-secondary">
          <Gift className="h-16 w-16 text-secondary-foreground/50" />
        </div>
      )}
      <CardHeader className="flex-grow">
        <CardTitle className="text-lg">{reward.name}</CardTitle>
        <CardDescription>{reward.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <Badge variant="outline" className="text-lg">{reward.pointsCost} Pts</Badge>
        {onRedeem && !isRedeemed && (
          <Button onClick={() => onRedeem(reward.id)} size="sm" variant="default">
            Canjear
          </Button>
        )}
        {isRedeemed && (
            <Badge variant="default" className="bg-green-600 text-white">Canjeada</Badge>
        )}
      </CardFooter>
    </Card>
  );
}
