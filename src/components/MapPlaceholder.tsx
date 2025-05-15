
'use client';

import Image from 'next/image';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import type { LocationSuggestion } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface MapPlaceholderProps {
  suggestions: LocationSuggestion[];
  userLocation: { latitude: number; longitude: number } | null;
  loading: boolean;
  suggestionsError: string | null;
}

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 12rem)', 
  borderRadius: '0.5rem', 
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', 
};

const defaultCenter = {
  lat: 19.4326,
  lng: -99.1332,
};

export function MapPlaceholder({ suggestions, userLocation, loading, suggestionsError }: MapPlaceholderProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (loading) {
    return <Skeleton className="h-[calc(100vh-12rem)] w-full rounded-lg shadow-md" />;
  }

  const showApiKeyError = !apiKey;
  // Consider suggestionsError as a reason to show the placeholder image only if apiKey IS present.
  // If apiKey is missing, that's the primary reason for the placeholder.
  const showFallbackImage = showApiKeyError || (apiKey && suggestionsError);

  if (showFallbackImage) {
    return (
      <div className="h-[calc(100vh-12rem)] w-full rounded-lg shadow-md overflow-hidden bg-muted">
        <div className="relative w-full h-full">
          <Image
            src="/bg.png"
            alt="Visualización de mapa"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="map overview"
            priority 
          />
        </div>
      </div>
    );
  }
  
  // If we reach here, apiKey must be defined and there are no blocking suggestions errors
  // (or we don't care about suggestion errors for *showing* the map, only for markers).
  // The LoadScript component requires a non-null apiKey.

  const mapCenter = userLocation
    ? { lat: userLocation.latitude, lng: userLocation.longitude }
    : defaultCenter;

  return (
    <LoadScript 
      googleMapsApiKey={apiKey!} 
      loadingElement={<Skeleton className="h-[calc(100vh-12rem)] w-full rounded-lg shadow-md" />}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={userLocation ? 14 : 10} 
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: true,
        }}
      >
        {userLocation && (
          <MarkerF
            position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
            title="Tu Ubicación"
          />
        )}
        {suggestions.map((suggestion, index) => (
          <MarkerF
            key={index}
            position={{ lat: suggestion.latitude, lng: suggestion.longitude }}
            title={suggestion.description}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

