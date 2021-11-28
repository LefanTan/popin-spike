import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

/**
 * Map to the Event document on firestore
 */
export type FirestoreEvent = {
  id: string;

  address: string;
  startDate: FirebaseFirestoreTypes.Timestamp;
  endDate: FirebaseFirestoreTypes.Timestamp;
  description: string;
  eventName: string;
  hostName: string;
  flairs: string[];
  latlong: FirebaseFirestoreTypes.GeoPoint;

  poppedInAmount?: number;
  mainPhotoUrl?: string;
  photoUrls?: string[];
  price?: number;
  website?: string;
};

export type FirestoreUser = {
  userName: string;
  description: string;
  profilePicUrl: string;
  website?: string;
};
