import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type FirestoreEvent = {
    id: string

    address : string
    poppedInAmount: number
    startDate: FirebaseFirestoreTypes.Timestamp
    endDate: FirebaseFirestoreTypes.Timestamp
    description: string
    eventName: string
    hostName: string
    flairs: string[]
    latlong: FirebaseFirestoreTypes.GeoPoint
    mainPhotoUrl?: string
    price?: number
}