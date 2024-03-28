"use client";

import React, { ChangeEvent, useRef, useState } from "react";
// import { Link } from 'react-router-dom'
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { setToken } from "@/app/redux/features/app-slice";
import {
    getValueFromFormData,
    isEmpty,
    validateEmail,
    validatePhoneNumber,
} from "@/app/utils/utility-function";
import { signInWithGoogle } from "@/app/utils/auth";
import Success from "../success/page";

type FormType = {
    email: string;
    password: string;
};

export default function Login(props: any) {
    const formRef = useRef<HTMLFormElement>(null);
    const [errorObj, setErrorObj] = useState<any>(null);
    const [formData, setFormData] = useState<FormType>({
        email: "",
        password: "",
    });
    const dispatch = useDispatch<AppDispatch>();

    const divStyle: React.CSSProperties = {
        backgroundImage: "url('https://www.ualberta.ca/media-library/new-brand/about-us/ua_92_about.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'green', // Fallback color if the image fails to load
        color: 'white',
        padding: '10px',
    };

    const handleFormChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        console.log('event', event)
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const isFormValid = (form: FormType): any | null => {
        if (isEmpty(form.email)) {
            const errorObj = {
                inputLabel: 'email',
                errorMsg: "Email is required"
            }
            return errorObj;
        }
        // if email is not empty and not valid
        if (!isEmpty(form.email) && !validateEmail(form.email)) {
            const errorObj = {
                inputLabel: 'email',
                errorMsg: "Email is not valid"
            }
            return errorObj;
        }
        if (isEmpty(form.password)) {
            const errorObj = {
                inputLabel: 'password',
                errorMsg: "Password is required"
            }
            return errorObj;
        }



        return null;
    };

    const handleSignin = (form: FormData) => {
        const object: FormType = {
            email: getValueFromFormData(form, "email") ?? "",
            password: getValueFromFormData(form, "password") ?? "",

        };

        console.log('object', object)

        // if form is not valid then return
        const error = isFormValid(object);
        console.log('error', error)
        if (error) {
            setErrorObj(error)
            return;
        }
        else {
            dispatch(setToken("asdasdsads"));
            localStorage.setItem("accessToken", "asdasdsads")
        }
    }

    const handleLogInWithGoogle = async () => {
        // dispatch(startLoader(""));
        await signInWithGoogle((success: any) => {
            if (success) {
                console.log('success', success)
                if (success.user && success.user?.uid) {
                    dispatch(setToken(success.user?.uid));
                    localStorage.setItem("accessToken", success.user?.uid)
                }
            }
        });
        // dispatch(stopLoader());
    };

    return (
        <>
            <div className="bg-white dark:white">
                <div className="flex justify-center h-screen">
                    <div className="hidden bg-cover lg:block lg:w-2/5" style={divStyle}>
                    </div>

                    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                        <div className="flex-1">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-green-700">UniEventsHub</h2>

                                <p className="mt-3 font-bold text-gray-500 dark:text-yellow-500">Sign in to access your account</p>
                            </div>

                            <div className="mt-8">
                                <form action={handleSignin} ref={formRef}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-md text-gray-600 dark:text-gray-900">Email address</label>
                                        <input type="email"
                                            name="email"
                                            id="email"
                                            placeholder="email address"
                                            value={formData.email}
                                            onChange={handleFormChange}
                                            required
                                            className="block  w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                        {
                                            errorObj && errorObj?.inputLabel === "email" ?
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorObj?.errorMsg}</p> : null

                                        }
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="password" className="block mb-2 text-md text-gray-600 dark:text-gray-900">Password</label>
                                            <a href="#" className="text-sm text-gray-900 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                        </div>

                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="password"
                                            required
                                            value={formData.password}
                                            onChange={handleFormChange}
                                            className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                        {
                                            errorObj && errorObj?.inputLabel === "password" ?
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorObj?.errorMsg}</p> : null

                                        }
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            Sign in
                                        </button>
                                    </div>

                                    <div className="text-center pt-4">
                                        <span className="text-gray-500 dark:text-gray-900" >Or, Sign in with</span>
                                    </div>

                                    <button
                                        onClick={handleLogInWithGoogle}
                                        className="socialButton googleplus rounded-md text-center"
                                    >
                                        <span>Google</span>
                                    </button>


                                </form>

                                <p className="mt-6 text-sm text-center text-gray-900">Don&#x27;t have an account yet?
                                    <button
                                        onClick={() => props.handleSignup(true)}
                                        className="text-blue-500 focus:outline-none focus:underline hover:underline"> Sign up</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
