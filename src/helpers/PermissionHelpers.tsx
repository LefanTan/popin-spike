import { Platform } from "react-native";
import { check, Permission, PERMISSIONS, RESULTS } from "react-native-permissions";

export async function getLocationPermissionAsync(failureCallback: () => void, successCallback: () => void) {
    const permission =
        Platform.OS === "android"
            ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE

    const checkForPermission = await checkPermissionAsync(permission)
    if (!checkForPermission)
        failureCallback()
    else
        successCallback()

    return checkForPermission
}

export async function checkPermissionAsync(permission: Permission) {
    var isPermissionGranted = false
    const result = await check(permission)
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