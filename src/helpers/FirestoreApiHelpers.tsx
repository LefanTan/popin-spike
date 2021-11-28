import storage from "@react-native-firebase/storage";
import { Asset } from "react-native-image-picker";
import firestore from "@react-native-firebase/firestore";
import { FirestoreEvent } from "../types/FirestoreClasses";
import { PromiseTask, Task } from "react-native";

export const EVENTS_PHOTOS_PATH = "/events";
export const USER_PHOTO_PATH = "/users";

/**
 * Upload photo assets to cloud storage
 * @param photoAssets Photo Assets retrieved from react native image picker
 * @param storagePath Path in cloud storage to store the files
 * @returns
 */
export async function UploadPhotos(photoAssets: Asset[], storagePath: string): Promise<string[]> {
  const folderRef = storage().ref(storagePath);
  const tasks: Promise<void>[] = [];
  const downloadUrls: string[] = [];

  photoAssets.forEach(photo => {
    tasks.push(
      folderRef
        .child(photo.fileName!)
        .putFile(photo.uri!)
        .then(
          () => {
            return folderRef
              .child(photo.fileName!)
              .getDownloadURL()
              .then(url => {
                downloadUrls.push(url);
              });
          },
          err => console.warn(err.message)
        )
    );
  });

  await Promise.all(tasks);
  // return the download urls
  return downloadUrls;
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

export async function CreateEventAsync(event: FirestoreEvent): Promise<void> {
  await firestore().collection("events").doc(event.id).set(event);
}
