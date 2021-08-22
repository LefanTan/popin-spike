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
    loading: boolean,
    errorMsg: string,
    login: (email: string, password: string) => void
    logout: () => void
}>({
    user: null,
    loading: true,
    errorMsg: "",
    login: () => { },
    logout: () => { }
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>(null)
    const [init, setInit] = useState(true)
    const [errorMsg, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onAuthStateChangeHandler = (userData: FirebaseAuthTypes.User | null) => {
        if (init) setInit(false)

        // Already initialized
        if (!init) {
            setLoading(false)
        }

        if (userData) {
            // React Native Firebase automatically persist user login state
            let displayName = userData.displayName ?? ''
            setUser({ userName: displayName, firebaseAuthData: userData })
        }
        else
            setUser(null)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChangeHandler)
        return subscriber
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading: loading,
                errorMsg: errorMsg,
                // Login API called here
                login: async (email, password) => {
                    setLoading(true)

                    if (email === '' || password === '') {
                        setError("Email or password can't be empty")
                        setLoading(false)
                        return
                    }

                    auth().signInWithEmailAndPassword(email, password).then(
                        (_) => {
                            console.log('success sign in')
                            setError('')
                        },
                        (error) => {
                            if (error.code === 'auth/invalid-email')
                                setError('Invalid email address')

                            if (error.code === 'auth/user-not-found')
                                setError("Account doesn't exist")
                            
                            console.error(error.code)
                        }
                    ).then(() => setLoading(false))
                },
                // Logout API called here
                logout: () => {
                    auth().signOut().then(
                        (_) => {
                            console.log('success sign out')
                        },
                        (error) => {
                            console.log('sign out failed.')
                            console.error(error)
                        }
                    )
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}