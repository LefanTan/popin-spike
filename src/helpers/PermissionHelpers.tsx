import {Platform} from "react-native";
import {check, Permission, PERMISSIONS, request, RESULTS} from "react-native-permissions";

export const LOCATION_PERMISSION =
  Platform.OS === "android"
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

export const READ_STORAGE_PERMISSION =
  Platform.OS === "android"
    ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    : PERMISSIONS.IOS.PHOTO_LIBRARY;

export async function requestPermissionAsync(
  permission: Permission,
  onSuccess: () => void = () => null,
  onFailure: () => void = () => null
): Promise<boolean> {
  let requestResult = false;
  await request(permission).then(result => {
    switch (result) {
      case RESULTS.GRANTED:
        requestResult = true;
        break;
      case RESULTS.DENIED:
        requestResult = false;
        break;
      case RESULTS.BLOCKED:
        requestResult = false;
        break;
      case RESULTS.UNAVAILABLE:
        requestResult = false;
        break;
    }
  });
  if (!requestResult) onFailure();
  else onSuccess();
  return requestResult;
}

export async function checkPermissionAsync(
  permission: Permission,
  onSuccess: () => void = () => null,
  onFailure: () => void = () => null
): Promise<boolean> {
  let isPermissionGranted = false;
  const result = await check(permission);
  switch (result) {
    case RESULTS.GRANTED:
      isPermissionGranted = true;
      break;
    case RESULTS.DENIED:
      isPermissionGranted = false;
      break;
    case RESULTS.BLOCKED:
      isPermissionGranted = false;
      break;
    case RESULTS.UNAVAILABLE:
      isPermissionGranted = false;
      break;
  }
  if (!isPermissionGranted) onFailure();
  else onSuccess();
  return isPermissionGranted;
}
