'use client'
import React from "react";
import { useRouter } from 'next/navigation';

interface AuthFormProps {
    type: "signIn" | "signUp";
    onSubmit: (email: string, password: string) => Promise<{ result: any; error: any }>;
    onGoogleSignIn: () => Promise<{ result: any; error: any }>;
    onFacebookSignIn: () => Promise<{ result: any; error: any }>;
}

export function AuthForm({ type, onSubmit, onGoogleSignIn, onFacebookSignIn }: AuthFormProps) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const { result, error } = await onSubmit(email, password);
        if (error) {
            return console.log(error);
        }
        console.log(result);
        return router.push("/create");
    };

    const handleGoogleSignIn = async () => {
        const { result, error } = await onGoogleSignIn();
        if (error) {
            return console.log(error);
        }
        console.log(result);
        return router.push("/create");
    };

    const handleFacebookSignIn = async () => {
        const { result, error } = await onFacebookSignIn();
        if (error) {
            return console.log(error);
        }
        console.log(result);
        return router.push("/create");
    };

    return (
        <div className="wrapper">
            <div className="form-wrapper">
                <h1 className="mt-60 mb-30">{type === "signIn" ? "Sign in" : "Sign up"}</h1>
                <form onSubmit={handleForm} className="form space-y-4">
                    <label htmlFor="email">
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                    </label>
                    <button type="submit" className="w-full">{type === "signIn" ? "Sign in" : "Sign up"}</button>
                </form>
                <button onClick={handleGoogleSignIn} className="w-full mt-2">Sign {type === "signIn" ? "in" : "up"} with Google</button>
                <button onClick={handleFacebookSignIn} className="w-full mt-2">Sign {type === "signIn" ? "in" : "up"} with Facebook</button>
            </div>
        </div>
    );
}
