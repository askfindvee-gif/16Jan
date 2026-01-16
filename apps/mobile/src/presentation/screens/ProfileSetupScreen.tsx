import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { updateProfile } from '../../data/auth/profile';
import type { GoogleProfile } from '../../data/auth/types';
import {
  checkLocationPermission,
  getCurrentCoordinates,
  requestLocationPermission,
  type Coordinates,
} from '../../data/location/locationService';
import { reverseGeocode } from '../../data/location/reverseGeocode';
import { defaultTheme } from '../../shared/theme';
import { ScreenContainer } from '../components/ScreenContainer';

type SaveState = 'idle' | 'loading' | 'success' | 'error';
type LocationState = 'idle' | 'requesting' | 'locating' | 'resolving' | 'success' | 'error' | 'blocked';

type ProfileSetupScreenProps = {
  accessToken: string;
  profile: GoogleProfile;
  onComplete: () => void;
};

const theme = defaultTheme;

export const ProfileSetupScreen = ({
  accessToken,
  profile,
  onComplete,
}: ProfileSetupScreenProps) => {
  const [fullName, setFullName] = useState(profile.fullName ?? '');
  const [email] = useState(profile.email ?? '');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationState, setLocationState] = useState<LocationState>('idle');
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitFocused, setIsSubmitFocused] = useState(false);

  useEffect(() => {
    setFullName(profile.fullName ?? '');
  }, [profile.fullName]);

  useEffect(() => {
    const autoDetect = async () => {
      const permission = await checkLocationPermission();
      if (permission === 'granted') {
        await handleDetectLocation(false);
      }
    };

    autoDetect();
  }, []);

  const isLocationLoading =
    locationState === 'requesting' ||
    locationState === 'locating' ||
    locationState === 'resolving';

  const isFormValid = useMemo(() => {
    return (
      fullName.trim().length > 0 &&
      email.trim().length > 0 &&
      address.trim().length > 0 &&
      district.trim().length > 0
    );
  }, [address, district, email, fullName]);

  const handleDetectLocation = async (shouldRequestPermission: boolean) => {
    setLocationError(null);

    if (shouldRequestPermission) {
      setLocationMessage('Requesting location permission...');
      setLocationState('requesting');
    }

    const permission = shouldRequestPermission
      ? await requestLocationPermission()
      : await checkLocationPermission();

    if (permission !== 'granted') {
      if (!shouldRequestPermission) {
        setLocationState('idle');
        setLocationMessage(null);
        setLocationError(null);
        return;
      }

      if (permission === 'blocked') {
        setLocationState('blocked');
        setLocationMessage(null);
        setLocationError(
          'Location permission blocked. Enable it in settings to auto-fill.',
        );
        return;
      }

      setLocationState('error');
      setLocationMessage(null);
      setLocationError('Location permission denied. Enter address manually.');
      return;
    }

    setLocationState('locating');
    setLocationMessage('Detecting your location...');

    try {
      const current = await getCurrentCoordinates();
      setCoordinates(current);
      setLocationState('resolving');
      setLocationMessage('Resolving address...');

      const result = await reverseGeocode(accessToken, current);
      setAddress(result.address ?? '');
      if (result.district) {
        setDistrict(result.district);
      }
      setLocationState('success');
      setLocationMessage('Location detected.');
    } catch (error: any) {
      const code = typeof error?.code === 'number' ? error.code : null;
      let message = 'Unable to detect location.';
      if (code === 1) {
        message = 'Location permission denied. Enter address manually.';
      } else if (code === 2) {
        message = 'GPS unavailable. Enter address manually.';
      } else if (code === 3) {
        message = 'Location request timed out. Try again.';
      } else if (error instanceof Error) {
        message = error.message;
      }

      setLocationState('error');
      setLocationMessage(null);
      setLocationError(message);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid || saveState === 'loading') {
      return;
    }

    setSaveState('loading');
    setSaveError(null);

    try {
      await updateProfile(accessToken, {
        fullName: fullName.trim(),
        address: address.trim(),
        district: district.trim(),
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude,
      });
      setSaveState('success');
      onComplete();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to save profile.';
      setSaveState('error');
      setSaveError(message);
    }
  };

  const isSaveDisabled = !isFormValid || saveState === 'loading';

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile setup</Text>
          <Text style={styles.subtitle}>
            Confirm your details and auto-fill your location.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              accessibilityLabel="Full name"
              value={fullName}
              onChangeText={setFullName}
              onFocus={() => setFocusedField('fullName')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your full name"
              placeholderTextColor={theme.input.placeholder}
              style={[
                styles.input,
                focusedField === 'fullName' && styles.inputFocused,
              ]}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              accessibilityLabel="Email address"
              value={email}
              editable={false}
              placeholderTextColor={theme.input.placeholder}
              style={[styles.input, styles.inputDisabled]}
            />
          </View>

          <View style={styles.field}>
            <View style={styles.fieldHeader}>
              <Text style={styles.label}>Address</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Use my location"
                onPress={() => handleDetectLocation(true)}
                disabled={isLocationLoading}
                style={({ pressed }) => [
                  styles.linkButton,
                  pressed && styles.linkButtonPressed,
                ]}
              >
                <Text style={styles.linkText}>Use my location</Text>
              </Pressable>
            </View>
            <TextInput
              accessibilityLabel="Address"
              value={address}
              onChangeText={setAddress}
              onFocus={() => setFocusedField('address')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your address"
              placeholderTextColor={theme.input.placeholder}
              style={[
                styles.input,
                focusedField === 'address' && styles.inputFocused,
              ]}
            />
            {isLocationLoading ? (
              <View style={styles.locationStatus}>
                <ActivityIndicator
                  size={theme.icon.size.status}
                  color={theme.color.text.muted}
                  style={styles.locationSpinner}
                />
                <Text style={styles.locationMessageInline}>
                  {locationMessage}
                </Text>
              </View>
            ) : null}
            {locationMessage && !isLocationLoading ? (
              <Text
                style={[
                  styles.locationMessage,
                  locationState === 'success' && styles.locationMessageSuccess,
                ]}
              >
                {locationMessage}
              </Text>
            ) : null}
            {locationError ? (
              <Text style={styles.locationError}>{locationError}</Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>District</Text>
            <TextInput
              accessibilityLabel="District"
              value={district}
              onChangeText={setDistrict}
              onFocus={() => setFocusedField('district')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your district"
              placeholderTextColor={theme.input.placeholder}
              style={[
                styles.input,
                focusedField === 'district' && styles.inputFocused,
              ]}
            />
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create account"
          accessibilityState={{ disabled: isSaveDisabled, busy: saveState === 'loading' }}
          disabled={isSaveDisabled}
          onPress={handleSubmit}
          onFocus={() => setIsSubmitFocused(true)}
          onBlur={() => setIsSubmitFocused(false)}
          style={({ pressed }) => [
            styles.submitButton,
            pressed && !isSaveDisabled && styles.submitButtonPressed,
            isSaveDisabled && styles.submitButtonDisabled,
            isSubmitFocused && !isSaveDisabled && styles.submitButtonFocused,
          ]}
        >
          <View style={styles.submitContent}>
            {saveState === 'loading' ? (
              <ActivityIndicator
                size={theme.icon.size.action}
                color={theme.button.primary.text}
                style={styles.submitSpinner}
              />
            ) : null}
            <Text
              style={[
                styles.submitLabel,
                isSaveDisabled && styles.submitLabelDisabled,
              ]}
            >
              Create Account
            </Text>
          </View>
        </Pressable>

        {saveError ? <Text style={styles.saveError}>{saveError}</Text> : null}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  content: {
    paddingBottom: theme.spacing.section.spacious,
  },
  header: {
    marginBottom: theme.spacing.section.regular,
  },
  title: {
    color: theme.color.text.primary,
    fontFamily: theme.typography.styles.h2.fontFamily,
    fontSize: theme.typography.styles.h2.fontSize,
    lineHeight: theme.typography.styles.h2.lineHeight,
    fontWeight: theme.typography.styles.h2.fontWeight,
    letterSpacing: theme.typography.styles.h2.letterSpacing,
  },
  subtitle: {
    marginTop: theme.spacing.scale.sm,
    color: theme.color.text.secondary,
    fontFamily: theme.typography.styles.bodySmall.fontFamily,
    fontSize: theme.typography.styles.bodySmall.fontSize,
    lineHeight: theme.typography.styles.bodySmall.lineHeight,
    fontWeight: theme.typography.styles.bodySmall.fontWeight,
    letterSpacing: theme.typography.styles.bodySmall.letterSpacing,
  },
  form: {
    marginBottom: theme.spacing.section.regular,
  },
  field: {
    marginBottom: theme.spacing.section.compact,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.scale.xs,
  },
  label: {
    color: theme.color.text.muted,
    fontFamily: theme.typography.styles.caption.fontFamily,
    fontSize: theme.typography.styles.caption.fontSize,
    lineHeight: theme.typography.styles.caption.lineHeight,
    fontWeight: theme.typography.styles.caption.fontWeight,
    letterSpacing: theme.typography.styles.caption.letterSpacing,
  },
  input: {
    height: theme.input.height,
    paddingHorizontal: theme.input.paddingHorizontal,
    paddingVertical: theme.input.paddingVertical,
    borderRadius: theme.input.radius,
    borderWidth: theme.input.borderWidth,
    borderColor: theme.input.border,
    backgroundColor: theme.input.background,
    color: theme.input.text,
    fontFamily: theme.typography.styles.body.fontFamily,
    fontSize: theme.typography.styles.body.fontSize,
    lineHeight: theme.typography.styles.body.lineHeight,
    fontWeight: theme.typography.styles.body.fontWeight,
    letterSpacing: theme.typography.styles.body.letterSpacing,
  },
  inputFocused: {
    borderColor: theme.input.focus.border,
  },
  inputDisabled: {
    backgroundColor: theme.input.disabled.background,
    borderColor: theme.input.disabled.border,
    color: theme.input.disabled.text,
  },
  linkButton: {
    paddingHorizontal: theme.spacing.scale.sm,
    paddingVertical: theme.spacing.scale.xs,
    borderRadius: theme.radius.sm,
  },
  linkButtonPressed: {
    backgroundColor: theme.color.surface.raised,
  },
  linkText: {
    color: theme.color.text.secondary,
    fontFamily: theme.typography.styles.bodySmall.fontFamily,
    fontSize: theme.typography.styles.bodySmall.fontSize,
    lineHeight: theme.typography.styles.bodySmall.lineHeight,
    fontWeight: theme.typography.styles.bodySmall.fontWeight,
    letterSpacing: theme.typography.styles.bodySmall.letterSpacing,
  },
  locationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.scale.sm,
  },
  locationSpinner: {
    marginRight: theme.spacing.scale.xs,
  },
  locationMessage: {
    marginTop: theme.spacing.scale.sm,
    color: theme.color.text.muted,
    fontFamily: theme.typography.styles.helper.fontFamily,
    fontSize: theme.typography.styles.helper.fontSize,
    lineHeight: theme.typography.styles.helper.lineHeight,
    fontWeight: theme.typography.styles.helper.fontWeight,
    letterSpacing: theme.typography.styles.helper.letterSpacing,
  },
  locationMessageInline: {
    color: theme.color.text.muted,
    fontFamily: theme.typography.styles.helper.fontFamily,
    fontSize: theme.typography.styles.helper.fontSize,
    lineHeight: theme.typography.styles.helper.lineHeight,
    fontWeight: theme.typography.styles.helper.fontWeight,
    letterSpacing: theme.typography.styles.helper.letterSpacing,
  },
  locationMessageSuccess: {
    color: theme.color.status.success,
  },
  locationError: {
    marginTop: theme.spacing.scale.sm,
    color: theme.color.danger.text,
    fontFamily: theme.typography.styles.helper.fontFamily,
    fontSize: theme.typography.styles.helper.fontSize,
    lineHeight: theme.typography.styles.helper.lineHeight,
    fontWeight: theme.typography.styles.helper.fontWeight,
    letterSpacing: theme.typography.styles.helper.letterSpacing,
  },
  submitButton: {
    minHeight: theme.button.minHeight,
    paddingHorizontal: theme.button.paddingHorizontal,
    paddingVertical: theme.button.paddingVertical,
    borderRadius: theme.button.radius,
    borderWidth: theme.border.width.thin,
    borderColor: theme.button.primary.border,
    backgroundColor: theme.button.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonPressed: {
    backgroundColor: theme.button.primary.pressed.background,
  },
  submitButtonDisabled: {
    backgroundColor: theme.button.primary.disabled.background,
    borderColor: theme.button.primary.disabled.border,
  },
  submitButtonFocused: {
    borderColor: theme.button.focus.ringColor,
    borderWidth: theme.button.focus.ringWidth,
  },
  submitContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitSpinner: {
    marginRight: theme.spacing.scale.sm,
  },
  submitLabel: {
    color: theme.button.primary.text,
    fontFamily: theme.typography.styles.bodyStrong.fontFamily,
    fontSize: theme.typography.styles.bodyStrong.fontSize,
    lineHeight: theme.typography.styles.bodyStrong.lineHeight,
    fontWeight: theme.typography.styles.bodyStrong.fontWeight,
    letterSpacing: theme.typography.styles.bodyStrong.letterSpacing,
  },
  submitLabelDisabled: {
    color: theme.button.primary.disabled.text,
  },
  saveError: {
    marginTop: theme.spacing.scale.md,
    color: theme.color.danger.text,
    fontFamily: theme.typography.styles.helper.fontFamily,
    fontSize: theme.typography.styles.helper.fontSize,
    lineHeight: theme.typography.styles.helper.lineHeight,
    fontWeight: theme.typography.styles.helper.fontWeight,
    letterSpacing: theme.typography.styles.helper.letterSpacing,
  },
});
