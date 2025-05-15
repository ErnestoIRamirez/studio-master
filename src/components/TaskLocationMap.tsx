
'use client';

import Image from 'next/image';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Skeleton } from '@/components/ui/skeleton';

interface TaskLocationMapProps {
  apiKey?: string;
  taskAddress: string; // To display textually if needed
  centerLat: number;
  centerLng: number;
}

const containerStyle = {
  width: '100%',
  height: '250px', // Adjust height as needed for the dialog
  borderRadius: '0.375rem', // md
};

export function TaskLocationMap({ apiKey, taskAddress, centerLat, centerLng }: TaskLocationMapProps) {
  
  const mapCenter = { lat: centerLat, lng: centerLng };

  if (!apiKey) {
    return (
      <div className="h-[250px] w-full overflow-hidden rounded-md bg-muted">
        <div className="relative h-full w-full">
          <Image
            // IMPORTANT: Make sure you have saved the image as 'mapa_torre_virreyes.png' 
            // in your /public folder, or update this src path accordingly.
            src="/detalle.png" 
            alt="Vista previa del mapa de la tarea en Torre Virreyes"
            layout="fill"
            objectFit="cover"
            data-ai-hint="torre virreyes" // Updated AI hint
            priority
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground text-center">
            Ubicación de la tarea: {taskAddress}
        </p>
      </div>
    );
  }

  return (
    <LoadScript 
      googleMapsApiKey={apiKey}
      loadingElement={<Skeleton className="h-[250px] w-full rounded-md" />}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13} // A bit zoomed out since it's a general area
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: true,
        }}
      >
        {/* No specific task marker here as we don't have task lat/lng */}
      </GoogleMap>
      <p className="mt-2 text-xs text-muted-foreground">
        Mapa muestra área general. Dirección de la tarea: {taskAddress}
      </p>
    </LoadScript>
  );
}
