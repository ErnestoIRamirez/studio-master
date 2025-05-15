'use client';

import { useState, useEffect } from 'react';

interface UserLocation {
  latitude: number;
  longitude: number;
}

// Mock current location (e.g., a central point in a city)
const MOCK_LOCATION: UserLocation = {
  latitude: 19.4326, // Mexico City
  longitude: -99.1332,
};

export function useUserLocation(): { location: UserLocation | null; error: string | null } {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching location
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            console.warn(`Error getting geolocation: ${err.message}. Using mock location.`);
            setLocation(MOCK_LOCATION); // Fallback to mock location on error/denial
            // setError(err.message); // Optionally set error state
          }
        );
      } else {
        console.warn("Geolocation not supported. Using mock location.");
        setLocation(MOCK_LOCATION); // Fallback for non-browser or no support
        // setError("Geolocation is not supported by this browser.");
      }
    }, 500); // Simulate delay

    return () => clearTimeout(timer);
  }, []);

  return { location, error };
}
