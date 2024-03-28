/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/store";
import Signup from "../Auth/Signup";
import Login from '../Auth/Login';
import UserInterest from "../Auth/UserInterest";
import Loader from '@/app/components/Loader';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState(null);
    const [isSignup, setIsSignup] = useState(false);
    const [isSignupCompleted, setIsSignupCompleted] = useState(false);
    const [isProfileCompleted, setIsProfileCompleted] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true);

    const storeToken = useAppSelector((state) => state.appReducer.accessToken);
    const userData = useAppSelector((state) => state.appReducer.userData);

    useEffect(() => { }, []);


    useEffect(() => {
        console.log('accessToken', accessToken)
        let token = localStorage.getItem("accessToken");
        if (token) {
            setAccessToken(token);

        }
        setTimeout(() => {
            setLoading(false)
        }, 3000)

        if (userData) {
            setIsProfileCompleted(checkIfProfileCompleted(userData));
        }
    }, [storeToken]);

    const checkIfProfileCompleted = (user: any) => {
        return (
            !!user.firstName && !!user.lastName && !!user.motivations && !!user.tags
        );
    };

    const createUserIfNotExists = async (authUser: any) => {
        console.log("trying to create user");
        // if (authUser.uid) {

        //   const user = await getUserInfoById(authUser.uid);
        //   if (!user) {
        //     // console.log("creating user", authUser.uid);
        //     const userPayload: User = {
        //       email: authUser.email ?? "",
        //       authProvider: authUser.providerId,
        //       uid: authUser.uid,
        //       phoneNumber: authUser.phoneNumber ?? "",
        //     };
        //     await createUser(userPayload, authUser.uid);
        //   }
        // }

        return null;

    };

    const handleSignup = (enableSignup: boolean) => {
        setIsSignup(enableSignup)

    }

    if (loading)
        return (
            <>
                <Loader />
            </>
        );

    else if ((accessToken)) return <>{children}</>;
    else
        return (
            <div className="flex flex-col">

                <div>
                    {/* <img
                        className="h-[44px] w-[100px] mt-100 ml-20"
                        src="/images/Ctribe-logo.svg"
                        alt="c-tribe"
                    /> */}
                    {/* {
                        accessToken && isSignupCompleted && !isProfileCompleted ? <UserInterest /> : null
                    } */}

                    {isSignup ? <Signup handleSignup={handleSignup} /> : <Login handleSignup={handleSignup} />}
                </div>
            </div>
        );
}
