import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage";
import { Asset } from "react-native-image-picker";
import firestore from "@react-native-firebase/firestore";
import { FirestoreEvent } from "../types/FirestoreClasses";

export const EVENTS_PHOTOS_PATH = "/events";
export const USER_PHOTO_PATH = "/users";

/**
 * Upload photo assets to cloud storage
 * @param photoAssets Photo Assets retrieved from react native image picker
 * @param storagePath Path in cloud storage to store the files
 * @returns
 */
export function UploadPhotos(
  photoAssets: Asset[],
  storagePath: string
): Promise<FirebaseStorageTypes.TaskSnapshot[]> {
  const folderRef = storage().ref(storagePath);

  const tasks: FirebaseStorageTypes.Task[] = [];
  photoAssets.forEach(photo => tasks.push(folderRef.child(photo.fileName!).putFile(photo.uri!)));

  return Promise.all(tasks);
}

export async function GetEventsListAsync(): Promise<FirestoreEvent[]> {
  const eventsList: FirestoreEvent[] = [];
  await firestore()
    .collection("events")
    .get()
    .then(querySnapshot =>
      querySnapshot.forEach(documentSnapshot => {
        const event: FirestoreEvent = documentSnapshot.data() as FirestoreEvent;
        event.id = documentSnapshot.id;
        eventsList.push(event);
      })
    );

  return eventsList;
}

export async function SetEventAsync(event: FirestoreEvent): Promise<void> {
  await firestore().collection("events").doc(event.id).set(event);
}