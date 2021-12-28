import storage from "@react-native-firebase/storage";
import { Asset } from "react-native-image-picker";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { FirestoreEvent, FirestoreUser } from "../types/FirestoreClasses";

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

export function getUserDocumentSnapshot(
  UID: string
): Promise<FirebaseFirestoreTypes.DocumentSnapshot> {
  return firestore()
    .collection("users")
    .doc(UID)
    .get()
    .then(documentSnapshot => documentSnapshot)
    .catch(error => {
      throw error;
    });
}

export async function getPictureUrl(UID: string): Promise<string> {
  return (
    await storage()
      .ref("users/" + UID)
      .list()
  ).items[0].getDownloadURL();
}

export async function setNewUser(user: FirestoreUser): Promise<void> {
  try {
    await firestore().collection("users").doc(user.id).set(user);
  } catch (error) {
    console.log(error);
  }
}

export function checkIfUsernameExist(username: string): Promise<boolean> {
  return (
    firestore()
      .collection("users")
      // Filter results
      .where("userName", "==", username)
      .get()
      .then(querySnapshot => !querySnapshot.empty)
      .catch(error => {
        throw error;
      })
  );
}
