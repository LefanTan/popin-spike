import {Platform} from "react-native";
import {check, Permission, PERMISSIONS, request, RESULTS} from "react-native-permissions";

const locationPermission =
  Platform.OS === "android"
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

export async function checkLocationPermissionAsync(
  successCallback: () => void = () => null,
  failureCallback: () => void = () => null
) {
  const checkForPermission = await checkPermissionAsync(locationPermission);
  if (!checkForPermission) failureCallback();
  else successCallback();

  return checkForPermission;
}

export async function requestLocationPermissionAsync(
  onSuccess: () => void = () => null,
  onFailure: () => void = () => null
) {
  const result = await requestPermissionAsync(locationPermission);
  if (!result) onFailure();
  else onSuccess();
}

export async function requestPermissionAsync(permission: Permission): Promise<boolean> {
  var result = false;
  await request(permission).then(result => {
    result = result;
  });
  return result;
}

export async function checkPermissionAsync(permission: Permission): Promise<boolean> {
  var isPermissionGranted = false;
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
  return isPermissionGranted;
}
