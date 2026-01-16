import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { createUserContext } from '../middlewares/attachUser';
import { userRepository } from '../repositories/userStore';
import { ProfileError, createProfileService } from '../services/profileService';

const profileService = createProfileService(userRepository);
const userContext = createUserContext(userRepository);

export const profileRoutes = Router();

profileRoutes.patch('/', authenticate, userContext, (req, res) => {
  try {
    const { fullName, address, district, latitude, longitude } = req.body ?? {};
    const parsedLatitude =
      typeof latitude === 'number' ? latitude : Number(latitude);
    const parsedLongitude =
      typeof longitude === 'number' ? longitude : Number(longitude);

    const updated = profileService.updateProfile({
      userId: req.user?.id ?? '',
      fullName: fullName ?? '',
      address: address ?? '',
      district: district ?? '',
      latitude: Number.isFinite(parsedLatitude) ? parsedLatitude : undefined,
      longitude: Number.isFinite(parsedLongitude) ? parsedLongitude : undefined,
    });

    return res.status(200).json({ user: updated });
  } catch (error) {
    if (error instanceof ProfileError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Unexpected error.' });
  }
});
