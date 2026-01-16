import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { reverseGeocode } from '../services/locationService';

export const locationRoutes = Router();

locationRoutes.post('/reverse', authenticate, async (req, res) => {
  try {
    const { latitude, longitude } = req.body ?? {};
    const lat = Number(latitude);
    const lon = Number(longitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return res
        .status(400)
        .json({ message: 'Valid latitude and longitude are required.' });
    }

    const result = await reverseGeocode(lat, lon);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to reverse geocode.' });
  }
});
