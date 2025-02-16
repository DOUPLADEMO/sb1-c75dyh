'use client'
import React from "react";
import signUp from "@/lib/firebase/signup";
import { signInWithGoogle, signInWithFacebook } from "@/lib/firebase/authProviders";
import { AuthForm } from "@/components/auth/AuthForm";

function Page() {
    return (
        <AuthForm
            type="signUp"
            onSubmit={signUp}
            onGoogleSignIn={signInWithGoogle}
            onFacebookSignIn={signInWithFacebook}
        />
    );
}

export default Page;