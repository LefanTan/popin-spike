import React, { useState } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useEffect } from 'react'


interface AuthProviderProps { }

type User = null | {
    firebaseAuthData: FirebaseAuthTypes.User
    userName: string
}

export const AuthContext = React.createContext<{
    user: User
    initializing: boolean
    login: () => void
    logout: () => void
}>({
    user: null,
    initializing: true,
    login: () => { },
    logout: () => { }
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>(null)
    const [init, setInit] = useState<boolean>(true)

    const onAuthStateChangeHandler = (userData: FirebaseAuthTypes.User | null) => {
        if (userData) {
            let displayName = userData.displayName ?? ''
            setUser({ userName: displayName, firebaseAuthData: userData })
        }
        else
            setUser(null)

        if (init) setInit(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChangeHandler)
        return subscriber
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                initializing: init,
                // Login API called here, to persist user, save this in an async storage so user info will persist
                login: async () => {
                    auth().signInWithEmailAndPassword('lefan@test.com', 'test123').then(
                        (_) => {
                            console.log('success sign in')
                        },
                        (error) => {
                            console.log('sign in failed.')
                            console.error(error)
                        }
                    )
                },
                // Logout API called here
                logout: () => {
                    auth().signOut()
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}