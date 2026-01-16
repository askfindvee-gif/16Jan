import { env } from '../config/env';

type NominatimResponse = {
  display_name?: string;
  address?: Record<string, string>;
};

export type ReverseGeocodeResult = {
  address: string;
  district: string | null;
};

const selectDistrict = (address: Record<string, string> | undefined) => {
  if (!address) {
    return null;
  }

  return (
    address.city_district ??
    address.state_district ??
    address.county ??
    address.suburb ??
    address.neighbourhood ??
    address.city ??
    address.town ??
    address.village ??
    null
  );
};

export const reverseGeocode = async (
  latitude: number,
  longitude: number,
): Promise<ReverseGeocodeResult> => {
  const url = new URL(env.geocodingBaseUrl);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('lat', latitude.toString());
  url.searchParams.set('lon', longitude.toString());
  url.searchParams.set('addressdetails', '1');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.geocodingTimeoutMs);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': env.geocodingUserAgent,
        'Accept-Language': 'en',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('Geocoding request failed.');
    }

    const data = (await response.json()) as NominatimResponse;
    const address = data.display_name;

    if (!address) {
      throw new Error('Geocoding response missing address.');
    }

    return {
      address,
      district: selectDistrict(data.address),
    };
  } finally {
    clearTimeout(timeout);
  }
};
