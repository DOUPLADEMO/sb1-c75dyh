"use client";
import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import firebase_app from "../firebaseConfig";

const auth = getAuth(firebase_app);

interface AuthContextType {
    user: User | null;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({ user: null, logout: () => { } });

export const useAuthContext = () => React.useContext(AuthContext);

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = () => {
        signOut(auth);
        // redirect to home
        window.location.href = "/";
    };


    return (
        <AuthContext.Provider value={{ user, logout }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};