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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">{type === "signIn" ? "Sign in" : "Sign up"}</h1>
                <form onSubmit={handleForm} className="space-y-4">
                    <label htmlFor="email" className="block">
                        <span className="text-gray-700">Email</span>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
                    </label>
                    <label htmlFor="password" className="block">
                        <span className="text-gray-700">Password</span>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
                    </label>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">{type === "signIn" ? "Sign in" : "Sign up"}</button>
                </form>
                <button onClick={handleGoogleSignIn} className="w-full px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">Sign {type === "signIn" ? "in" : "up"} with Google</button>
                <button onClick={handleFacebookSignIn} className="w-full px-4 py-2 mt-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-800">Sign {type === "signIn" ? "in" : "up"} with Facebook</button>
            </div>
        </div>
    );
}
