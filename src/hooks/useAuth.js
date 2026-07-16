import { useEffect, useState, useCallback } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
    updatePassword,
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider
} from "firebase/auth";
import { auth } from "../firebase";

const ERROR_MESSAGES = {
    "auth/email-already-in-use": "That email is already registered — try logging in instead.",
    "auth/invalid-email": "That doesn't look like a valid email address.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts — please wait a bit and try again.",
    "auth/configuration-not-found": "Email/Password sign-in isn't enabled yet in the Firebase console."
};

export function friendlyAuthError(error) {
    return ERROR_MESSAGES[error?.code] || error?.message || "Something went wrong.";
}

export function useAuth() {
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthReady(true);
        });
        return unsubscribe;
    }, []);

    const signUp = useCallback((email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }, []);

    const logIn = useCallback((email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    const googleSignIn = useCallback(() => {
        return signInWithPopup(auth, new GoogleAuthProvider());
    }, []);

    const resetPassword = useCallback((email) => {
        return sendPasswordResetEmail(auth, email);
    }, []);

    const logOut = useCallback(() => signOut(auth), []);

    const changeDisplayName = useCallback((name) => {
        if (!auth.currentUser) return Promise.reject(new Error("Not logged in"));
        return updateProfile(auth.currentUser, { displayName: name });
    }, []);

    const reauthenticate = useCallback((currentPassword) => {
        if (!auth.currentUser?.email) return Promise.reject(new Error("Not logged in"));
        const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
        return reauthenticateWithCredential(auth.currentUser, credential);
    }, []);

    const changePassword = useCallback(
        async (currentPassword, newPassword) => {
            await reauthenticate(currentPassword);
            return updatePassword(auth.currentUser, newPassword);
        },
        [reauthenticate]
    );

    const deleteAccount = useCallback(
        async (currentPassword) => {
            await reauthenticate(currentPassword);
            return deleteUser(auth.currentUser);
        },
        [reauthenticate]
    );

    return {
        user,
        isLoggedIn: !!user,
        authReady,
        signUp,
        logIn,
        googleSignIn,
        resetPassword,
        logOut,
        changeDisplayName,
        changePassword,
        deleteAccount
    };
}
