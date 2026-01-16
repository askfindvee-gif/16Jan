import { config } from '../../shared/config';
import type { Coordinates } from './locationService';

export type ReverseGeocodeResult = {
  address: string;
  district: string | null;
};

export const reverseGeocode = async (
  accessToken: string,
  coordinates: Coordinates,
): Promise<ReverseGeocodeResult> => {
  const response = await fetch(`${config.apiBaseUrl}/api/location/reverse`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = body.message ?? 'Unable to resolve address.';
    throw new Error(message);
  }

  return (await response.json()) as ReverseGeocodeResult;
};
