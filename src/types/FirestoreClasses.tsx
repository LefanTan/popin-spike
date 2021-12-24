import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Asset } from "react-native-image-picker";

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
  id: string;
  userName: string;
  description?: string;
  profilePic?: Asset;
  profilePicUrl?: string;
  website?: string;
  contact?: { email: string; phoneNumber: string };
  isSetup: boolean;
};
