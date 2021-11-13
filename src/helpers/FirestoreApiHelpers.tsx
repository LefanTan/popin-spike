import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage";
import { Asset } from "react-native-image-picker";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { FirestoreEvent, FirestoreUser } from "../types/FirestoreClasses";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

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

export async function getUserDocumentSnapshot(
  UID: string
): Promise<FirebaseFirestoreTypes.DocumentSnapshot> {
  let userDocumentSnapshot: any = "";
  await firestore()
    .collection("users")
    .doc(UID)
    .get()
    .then(documentSnapshot => {
      userDocumentSnapshot = documentSnapshot;
    });

  return userDocumentSnapshot;
}

export async function setNewUser(user: FirestoreUser): Promise<void> {
  try {
    await firestore().collection("users").doc(user.id).set(user);
  } catch (error) {
    console.log(error);
  }
}

export async function checkIfUsernameExist(username: string): Promise<boolean> {
  let isExist: boolean = false;
  await firestore()
    .collection("users")
    // Filter results
    .where("userName", "==", username)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        isExist = false;
      } else {
        isExist = true;
      }
    });
  return isExist;
}
