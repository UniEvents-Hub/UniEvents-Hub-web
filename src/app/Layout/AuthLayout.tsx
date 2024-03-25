/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Signup from "../Auth/Signup";
import Login from '../Auth/Login';
import UserInterest from "../Auth/UserInterest";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState(null);
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => { }, []);


    useEffect(() => {
    }, []);

    const handleSignup = (enableSignup: boolean) => {
        setIsSignup(enableSignup)

    }

    if ((user)) return <>{children}</>;
    else
        return (
            <div className="flex flex-col">

                <div>
                    {/* <img
                        className="h-[44px] w-[100px] mt-100 ml-20"
                        src="/images/Ctribe-logo.svg"
                        alt="c-tribe"
                    /> */}
                    {isSignup ? <Signup /> : <Login handleSignup={handleSignup}/>}
                </div>
            </div>
        );
}
