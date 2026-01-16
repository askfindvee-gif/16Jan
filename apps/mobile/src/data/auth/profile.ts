import { config } from '../../shared/config';

export type ProfileUpdateInput = {
  fullName: string;
  address: string;
  district: string;
  latitude?: number;
  longitude?: number;
};

export type ProfileUpdateResponse = {
  user: {
    id: string;
    email?: string;
    fullName?: string;
    address?: string;
    district?: string;
    status: 'PROFILE_INCOMPLETE' | 'ACTIVE';
  };
};

export const updateProfile = async (
  accessToken: string,
  input: ProfileUpdateInput,
): Promise<ProfileUpdateResponse> => {
  const response = await fetch(`${config.apiBaseUrl}/api/profile`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = body.message ?? 'Unable to update profile.';
    throw new Error(message);
  }

  return (await response.json()) as ProfileUpdateResponse;
};
