"use client";

import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import {
    getValueFromFormData,
    isEmpty,
    validateEmail,
    validatePhoneNumber,
} from "@/app/utils/utility-function";
import { signInWithGoogle } from "@/app/utils/auth";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { setToken } from "@/app/redux/features/app-slice";
import UserInterest from "../Auth/UserInterest";
import { doSignUp, checkUserExistOrNot, doLogin } from '@/app/services/Auth/auth-service';
import { TokenConstants } from '../utils/constants';
import { jwtDecode } from "jwt-decode";


type FormType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Signup(props: any) {
    const formRef = useRef<HTMLFormElement>(null);
    const [errorObj, setErrorObj] = useState<any>(null);
    const [isSignupCompleted, setIsSignupCompleted] = useState(false);
    const [formData, setFormData] = useState<FormType>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // setFormData({
        //     firstName: "",
        //     lastName: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: ""
        // });
    }, []);

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

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const isFormValid = (form: FormType): any | null => {
        if (isEmpty(form.firstName)) {
            const errorObj = {
                inputLabel: 'firstName',
                errorMsg: "First name is required"
            }
            return errorObj;
        }
        if (isEmpty(form.lastName)) {
            const errorObj = {
                inputLabel: 'lastName',
                errorMsg: "Last name is required"
            }
            return errorObj;
        }
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
        if (isEmpty(form.confirmPassword)) {
            const errorObj = {
                inputLabel: 'confirmPassword',
                errorMsg: "Confirm Password is required"
            }
            return errorObj;
        }


        return null;
    };

    const doHandleSignup = (form: FormData) => {
        const object: FormType = {
            firstName: getValueFromFormData(form, "firstName") ?? "",
            lastName: getValueFromFormData(form, "lastName") ?? "",
            email: getValueFromFormData(form, "email") ?? "",

            // if phone number is empty then don't add + sign else add + sign
            password: getValueFromFormData(form, "password") ?? "",
            confirmPassword: getValueFromFormData(form, "confirmPassword") ?? "",
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
            // dispatch(setToken("asdasdsads"));
            let params = {
                username: object?.email,
                password: object?.password,
                email: object?.email,
                first_name: object?.firstName,
                last_name: object?.lastName
            };

            doCallSignup(params)


        }
    }

    const doCallSignup = (params: any) => {
        doSignUp(
            params,
            (success: any) => {
                console.log('doSignUp success', success);

                if (success) {

                    const access_token = success?.data?.access;
                    const refresh_token = success?.data?.refresh;

                    if (access_token) {
                        const decoded = jwtDecode(access_token) as any;
                        console.log(decoded);
                        if (decoded) {
                            const user_id = decoded?.user_id;
                            localStorage.setItem(TokenConstants.USER_INFO, user_id)
                            if (access_token && user_id) {
                                setIsSignupCompleted(true)
                                localStorage.setItem(TokenConstants.ACCESS_TOKEN, access_token)
                            }
                        }
                        console.log(TokenConstants.ACCESS_TOKEN, access_token);
                        // dispatch(setToken(access_token));

                    } else {

                    }
                }
            },
            (error: any) => {
                console.log('login error', error);
                if (error && error.data) {
                    let errmsg = Object.values(error.data)[0] as any;
                    console.log(errmsg)
                    if (errmsg && errmsg.length > 0) {
                        alert(errmsg[0])
                    }
                }
            },
        );
    }

    const doCallLogin = (params: any) => {
        doLogin(
            params,
            (success: any) => {
                console.log('login success', success);

                if (success) {
                    const access_token = success?.data?.access;
                    const refresh_token = success?.data?.refresh;

                    if (access_token) {
                        const decoded = jwtDecode(access_token) as any;
                        console.log(decoded);
                        if (decoded) {
                            const user_id = decoded?.user_id;
                            localStorage.setItem(TokenConstants.USER_INFO, user_id)
                        }
                        console.log(TokenConstants.ACCESS_TOKEN, access_token);
                        dispatch(setToken(access_token));
                        localStorage.setItem(TokenConstants.ACCESS_TOKEN, access_token)
                    } else {

                    }
                }
            },
            (error: any) => {
                console.log('login error', error);
                if (error && error.data) {
                    alert(error?.data?.detail)
                    // let errmsg = Object.values(error.data)[0] as any;
                    // console.log(errmsg)
                    // if (errmsg && errmsg.length > 0) {
                    //     alert(errmsg[0])
                    // }
                }
            },
        );
    }

    const checkUserExist = (user: any) => {
        console.log('user_email', user?.email)
        // let params = {
        //     username: user_email,
        //     password: 'abcd1234',
        // };
        // doCallLogin(params)

        const fullName = user?.displayName;
        const nameParts = fullName.split(" ");

        const firstName = nameParts.slice(0, -1).join(" ");
        const lastName = nameParts[nameParts.length - 1];

        let params = {
            username: user?.email,
            password: 'abcd1234',
            email: user?.email,
            first_name: firstName,
            last_name: lastName
        };

        doCallSignup(params)
        checkUserExistOrNot(
            user?.email,
            (success: any) => {
                console.log('checkUserExistOrNot success', success);

                if (success) {
                }
            },
            (error: any) => {
                console.log('checkUserExistOrNot error', error);
                if (error && error.data) {
                    alert(error?.data?.detail)
                    // let errmsg = Object.values(error.data)[0] as any;
                    // console.log(errmsg)
                    // if (errmsg && errmsg.length > 0) {
                    //     alert(errmsg[0])
                    // }
                }
            },
        );
    }

    const handleLogInWithGoogle = async () => {
        // dispatch(startLoader(""));
        await signInWithGoogle((success: any) => {
            if (success) {
                console.log('success', success)
                if (success.user && success.user?.uid) {
                    checkUserExist(success.user)
                    // dispatch(setToken(success.user?.uid));
                    // localStorage.setItem("accessToken", success.user?.uid)

                }
            }
        });
        // dispatch(stopLoader());
    };

    return (
        <>
            <section className="bg-white dark:white">
                <div className="flex justify-center min-h-screen">
                    <div className="hidden bg-cover lg:block lg:w-2/5" style={divStyle} >
                    </div>

                    <div className="flex items-start w-full max-w-md px-6 mx-auto lg:w-2/6">
                        <div className="flex-1 flex-col items-center">
                            <div className="text-center mt-20">
                                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-green-700">UniEventsHub</h2>

                                <p className="mt-3 font-bold text-gray-500 dark:text-yellow-500">Create a free account</p>
                            </div>

                            {!isSignupCompleted ?
                                <div className="mt-10 gap-6 ">
                                    <form action={doHandleSignup} ref={formRef}>
                                        <div>
                                            <label htmlFor="first name" className="block mb-2 mt-4 text-md text-gray-600 dark:text-gray-900">First name</label>
                                            <input type="text"
                                                name="firstName"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleFormChange}
                                                placeholder="example: Jon"
                                                required
                                                className="block w-full px-4 py-2 mt-2 mb-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 placeholder-opacity-50 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                            {
                                                errorObj && errorObj?.inputLabel === "firstName" ?
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorObj?.errorMsg}</p> : null

                                            }
                                        </div>

                                        <div>
                                            <label htmlFor="last name" className="block mb-2 text-md text-gray-600 dark:text-gray-900">Last name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={handleFormChange}
                                                placeholder="example: Snow"
                                                required
                                                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                            {
                                                errorObj && errorObj?.inputLabel === "lastName" ?
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorObj?.errorMsg}</p> : null

                                            }
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-md text-gray-600 dark:text-gray-900">Email address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleFormChange}
                                                placeholder="jon@example.com"
                                                required
                                                className="block  w-full px-4 py-2 mt-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                            {
                                                errorObj && errorObj?.inputLabel === "email" ?
                                                    <p className="mt-0 text-sm text-red-600 dark:text-red-500">{errorObj?.errorMsg}</p> : null

                                            }
                                        </div>

                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-md text-gray-600 dark:text-gray-900">Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
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

                                                <button type="button" onClick={handleTogglePassword} className="absolute top-0 end-0 p-3.5 rounded-e-md">
                                                    {
                                                        showPassword ?
                                                            <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                                <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                                <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                                <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                                <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                                                            </svg> :
                                                            <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                                <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                                <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                                <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                                                                <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                                <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                                                            </svg>
                                                    }
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="confirm password" className="block mb-2 text-md text-gray-600 dark:text-gray-900">Confirm Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    required
                                                    onChange={handleFormChange}
                                                    placeholder="confirm password"
                                                    className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                                {
                                                    errorObj && errorObj?.inputLabel === "confirmPassword" ?
                                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorObj?.errorMsg}</p> : null

                                                }

                                                <button type="button" onClick={handleToggleConfirmPassword} className="absolute top-0 end-0 p-3.5 rounded-e-md">
                                                    {
                                                        showConfirmPassword ?
                                                            <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                                <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                                <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                                <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                                <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                                                            </svg> :
                                                            <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                                <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                                <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                                <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                                                                <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                                <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                                                            </svg>
                                                    }
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                                Sign Up
                                            </button>
                                        </div>

                                    </form>

                                    <div className="text-center pt-8 ">
                                        <span className="text-gray-500 dark:text-gray-900" >Or, Sign up with</span>
                                    </div>
                                    <button
                                        onClick={handleLogInWithGoogle}
                                        className="socialButton googleplus rounded-md text-center"
                                    >
                                        <span>Google</span>
                                    </button>
                                    <p className="mt-6 text-sm text-center text-gray-900">Don&#x27;t have an account yet?
                                        <button
                                            onClick={() => props.handleSignup(false)}
                                            className="text-blue-500 focus:outline-none focus:underline hover:underline"> Sign in</button></p>
                                </div>
                                :
                                <UserInterest />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
