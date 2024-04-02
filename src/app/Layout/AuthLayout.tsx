/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/store";
import Signup from "../Auth/Signup";
import Login from '../Auth/Login';
import UserInterest from "../Auth/UserInterest";
import Loader from '@/app/components/Loader';
import { TokenConstants } from '@/app/utils/constants';
import { getUserInfo } from '@/app/services/User/user-service';


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState(null);
    const [isSignup, setIsSignup] = useState(false);
    const [isSignupCompleted, setIsSignupCompleted] = useState(false);
    const [isProfileCompleted, setIsProfileCompleted] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true);

    const storeToken = useAppSelector((state) => state.appReducer.accessToken);
    const userData = useAppSelector((state) => state.appReducer.userData);

    useEffect(() => { }, []);


    useEffect(() => {
        // console.log('accessToken', accessToken)
        let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
        console.log('layout token', token);
        setAccessToken(token);
        if (token) {
            getUserData()
        }
        setTimeout(() => {
            setLoading(false)
        }, 2000)

        if (userData) {
            setIsProfileCompleted(checkIfProfileCompleted(userData));
        }
    }, [storeToken]);

    const getUserData = () => {
        let user_id = localStorage.getItem(TokenConstants.USER_INFO);
        if (user_id) {
            getUserInfo(
                user_id,
                (success: any) => {
                    console.log('getUserInfo success', success);

                    if (success) {

                        // if (access_token) { 
                        //     dispatch(setToken(access_token));
                        //     localStorage.setItem(TokenConstants.ACCESS_TOKEN, access_token)
                        // } else {

                        // }
                    }
                },
                (error: any) => {
                    console.log('login error', error);
                },
            );
        }
    }

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
