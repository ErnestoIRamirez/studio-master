
'use client';

import { useState, useEffect } from 'react';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { FloatingActionMenu } from '@/components/FloatingActionMenu';
import { suggestDataCollectionLocations } from '@/ai/flows/suggest-data-collection-locations';
import type { LocationSuggestion, TaskType } from '@/lib/types';
import { useUserLocation } from '@/hooks/useUserLocation';
import { PageHeader } from '@/components/PageHeader';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

// Mock user data (similar to AccountPage for now)
const MOCK_USER_DATA = {
  name: "Ernesto Ramirez",
  points: 1850,
};

export default function HomePage() {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { location: userLocation, error: locationError } = useUserLocation();
  const [userData] = useState(MOCK_USER_DATA); // Use mock user data

  useEffect(() => {
    if (userLocation) {
      const fetchSuggestions = async () => {
        setLoadingSuggestions(true);
        setError(null);
        try {
          const dataTypesToFetch: TaskType[] = ['property', 'scan', 'audio'];
          const allSuggestions: LocationSuggestion[] = [];

          for (const clientDataType of dataTypesToFetch) {
            let flowDataType: 'property' | 'scan' | 'recording';

            switch (clientDataType) {
              case 'property':
                flowDataType = 'property';
                break;
              case 'scan':
                flowDataType = 'scan';
                break;
              case 'audio':
                flowDataType = 'recording'; // Map 'audio' from client to 'recording' for the flow
                break;
              default:
                console.warn(`Unsupported dataType: ${clientDataType}, defaulting to property`);
                flowDataType = 'property';
            }

            const result = await suggestDataCollectionLocations({
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              dataType: flowDataType,
            });

            if (result.locations) {
              allSuggestions.push(...result.locations.map(loc => ({ ...loc, dataType: clientDataType })));
            }
          }
          setSuggestions(allSuggestions.slice(0, 10)); 
        } catch (err) {
          console.error('Error fetching suggestions:', err);
          //setError('No se pudieron cargar las sugerencias. Inténtalo de nuevo más tarde.');
        } finally {
          setLoadingSuggestions(false);
        }
      };
      fetchSuggestions();
    } else if (locationError) {
      setError(`Error de ubicación: ${locationError}. No se pueden cargar sugerencias personalizadas.`);
      setLoadingSuggestions(false);
    }
  }, [userLocation, locationError]);

  const mapIsLoading = !userLocation || loadingSuggestions;

  return (
    <div className="container mx-auto flex h-full flex-col p-4">
      <PageHeader title={`Hola, ${userData.name}!`}>
        <div className="text-right">
            <p className="text-sm text-muted-foreground">Tus Puntos</p>
            <p className="text-xl font-bold text-primary">{userData.points} Pts</p>
        </div>
      </PageHeader>
      
      {error && !mapIsLoading && (
         <Alert variant="destructive" className="mb-4">
           <Terminal className="h-4 w-4" />
           <AlertTitle>Error</AlertTitle>
           <AlertDescription>{error}</AlertDescription>
         </Alert>
      )}
      <div className="flex-grow">
        <MapPlaceholder 
          suggestions={suggestions} 
          userLocation={userLocation} 
          loading={mapIsLoading}
          suggestionsError={error}
        />
      </div>
      <FloatingActionMenu />
    </div>
  );
}
