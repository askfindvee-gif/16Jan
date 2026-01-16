import { User } from '../domain/user';
import { UserRepository } from '../repositories/userRepository';

export class ProfileError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

type ProfileUpdateInput = {
  userId: string;
  fullName: string;
  address: string;
  district: string;
  latitude?: number;
  longitude?: number;
};

const isProfileComplete = (user: User) => {
  return (
    Boolean(user.fullName?.trim()) &&
    Boolean(user.address?.trim()) &&
    Boolean(user.district?.trim())
  );
};

export const createProfileService = (repo: UserRepository) => {
  const updateProfile = (input: ProfileUpdateInput) => {
    const { userId, fullName, address, district, latitude, longitude } = input;
    const user = repo.getUserById(userId);

    if (!user) {
      throw new ProfileError('User not found.', 404);
    }

    const trimmedName = fullName.trim();
    const trimmedAddress = address.trim();
    const trimmedDistrict = district.trim();

    if (!trimmedName || !trimmedAddress || !trimmedDistrict) {
      throw new ProfileError('Full name, address, and district are required.', 422);
    }

    const updates: Partial<User> = {
      fullName: trimmedName,
      address: trimmedAddress,
      district: trimmedDistrict,
    };

    if (typeof latitude === 'number' && typeof longitude === 'number') {
      updates.location = { latitude, longitude };
    }

    const updated = repo.updateUser(userId, updates);

    if (!updated) {
      throw new ProfileError('Unable to update profile.', 500);
    }

    if (isProfileComplete(updated) && updated.status !== 'ACTIVE') {
      repo.updateUser(userId, { status: 'ACTIVE' });
    }

    return repo.getUserById(userId);
  };

  return { updateProfile };
};
