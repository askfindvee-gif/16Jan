import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export type LocationPermissionStatus = 'granted' | 'denied' | 'blocked';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

const LOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10_000,
  maximumAge: 3_000,
};

const requestAndroidLocationPermission = async (): Promise<LocationPermissionStatus> => {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location access',
      message: 'Allow location to auto-fill your address.',
      buttonPositive: 'Allow',
      buttonNegative: 'Not now',
    },
  );

  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    return 'granted';
  }

  if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    return 'blocked';
  }

  return 'denied';
};

export const checkLocationPermission = async (): Promise<LocationPermissionStatus> => {
  if (Platform.OS !== 'android') {
    return 'denied';
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  return hasPermission ? 'granted' : 'denied';
};

export const requestLocationPermission = async (): Promise<LocationPermissionStatus> => {
  if (Platform.OS === 'android') {
    return requestAndroidLocationPermission();
  }

  if (Platform.OS === 'ios') {
    const status = await Geolocation.requestAuthorization('whenInUse');
    if (status === 'granted') {
      return 'granted';
    }
    if (status === 'disabled') {
      return 'blocked';
    }
    return 'denied';
  }

  return 'denied';
};

export const getCurrentCoordinates = async (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        reject(error);
      },
      LOCATION_OPTIONS,
    );
  });
};
