import firebase_app from "../../firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const auth = getAuth(firebase_app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { result, error: null };
    } catch (error) {
        return { result: null, error };
    }
};

export const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        return { result, error: null };
    } catch (error) {
        return { result: null, error };
    }
};
