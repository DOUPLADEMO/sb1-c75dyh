'use client'
import React from "react";
import signIn from "@/lib/firebase/signin";
import { signInWithGoogle, signInWithFacebook } from "@/lib/firebase/authProviders";
import { AuthForm } from "@/components/auth/AuthForm";

function Page() {
    return (
        <AuthForm
            type="signIn"
            onSubmit={signIn}
            onGoogleSignIn={signInWithGoogle}
            onFacebookSignIn={signInWithFacebook}
        />
    );
}

export default Page;
