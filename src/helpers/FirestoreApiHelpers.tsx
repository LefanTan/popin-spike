import storage, {FirebaseStorageTypes} from "@react-native-firebase/storage";
import {Asset} from "react-native-image-picker";

export const EVENTS_PHOTOS_PATH = "/events";
export const USER_PHOTO_PATH = "/users";

export async function UploadPhotos(
  photoAssets: Asset[],
  storagePath: string
): Promise<FirebaseStorageTypes.TaskSnapshot[]> {
  const folderRef = storage().ref(storagePath);

  const tasks: FirebaseStorageTypes.Task[] = [];
  photoAssets.forEach(photo => tasks.push(folderRef.child(photo.fileName!).putFile(photo.uri!)));

  return Promise.all(tasks);
}
