import React, { useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect } from "react";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import Config from "react-native-config";
import { FirestoreUser } from "./types/FirestoreClasses";
import { getUserDocumentSnapshot, setNewUser } from "./helpers/FirestoreApiHelpers";
import { Asset } from "react-native-image-picker";

interface AuthProviderProps {}

type User = null | FirestoreUser;
GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
});

type AuthData = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  loading: boolean;
  errorMsg: string;
  signup: (email: string, password: string) => void;
  googleLogin: () => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  setErrorMessage: (msg: string) => void;
  clearError: () => void;
};

export const AuthContext = React.createContext<AuthData>({} as AuthData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [init, setInit] = useState(true);
  const [errorMsg, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onAuthStateChangeHandler = (tempUser: FirebaseAuthTypes.User | null) => {
    if (init) setInit(false);

    // Already initialized
    if (!init) {
      setLoading(false);
    }

    if (tempUser) {
      // React Native Firebase automatically persist user login state
      const userDocumentSnapshot = getUserDocumentSnapshot(tempUser.uid);

      userDocumentSnapshot.then(documentSnapshot => {
        //Check if user exists in firestore
        if (documentSnapshot.exists) {
          setUser(documentSnapshot.data() as User);
        } else {
          //Set username as UID, email or display name depending on which is available
          let name: string = tempUser.uid;
          if (tempUser.email) name = tempUser.email?.split("@")[0];
          if (tempUser.displayName) name = tempUser.displayName;

          //Create doc in firestore
          setNewUser({
            id: tempUser.uid,
            userName: name,
            isSetup: false,
            contact: { email: tempUser.email || "", phoneNumber: "" },
          });
          //Set user state
          setUser({
            id: tempUser.uid,
            userName: name,
            isSetup: false,
            contact: { email: tempUser.email || "", phoneNumber: "" },
          });
        }
      });
    } else setUser(null);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChangeHandler);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: setUser,
        loading: loading,
        errorMsg: errorMsg,
        signup: (email, password) => {
          setLoading(true);

          if (email === "" || password === "") {
            setError("Email or password can't be empty");
            setLoading(false);
            return;
          }

          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log("User account created & signed in!");
            })
            .catch(error => {
              setLoading(false);
              if (error.code === "auth/email-already-in-use") {
                setError("Email adress already in use!");
              }

              if (error.code === "auth/invalid-email") {
                setError("That email address is invalid!");
              }
              if (error.code === "auth/weak-password") {
                setError("Password should be at least 6 characters!");
              }

              console.error(error);
            });
        },

        //Google Login here
        googleLogin: async () => {
          try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            auth().signInWithCredential(googleCredential);
          } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
              console.log("user cancelled the login flow");
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
              console.log("operation (e.g. sign in) is in progress already");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
              console.log("play services not available or outdated");
              // some other error happened
            } else {
              console.log(error.code);
            }
          }
        },

        // Login API called here
        login: async (email, password) => {
          setLoading(true);

          if (email === "" || password === "") {
            setError("Email or password can't be empty");
            setLoading(false);
            return;
          }

          auth()
            .signInWithEmailAndPassword(email, password)
            .then(
              _ => {
                console.log("success sign in");
                setError("");
              },
              error => {
                if (error.code === "auth/invalid-email") setError("Invalid email address");

                if (error.code === "auth/user-not-found") setError("Account doesn't exist");

                console.error(error.code);
              }
            )
            .then(() => setLoading(false));
        },
        // Logout API called here
        logout: async () => {
          setLoading(false);
          const isGoogleSignedIn = await GoogleSignin.isSignedIn();
          if (isGoogleSignedIn) GoogleSignin.signOut();
          auth()
            .signOut()
            .then(
              _ => {
                console.log("success sign out");
              },
              error => {
                console.log("sign out failed.");
                console.error(error);
              }
            );
        },
        // Set error message
        setErrorMessage: errorMsg => {
          setError(errorMsg);
        },
        //Clear error message
        clearError: () => {
          setError("");
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
