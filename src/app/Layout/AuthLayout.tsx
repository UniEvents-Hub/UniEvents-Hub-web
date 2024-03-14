/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SignUp from '../Auth/Signup';
import Login from '../Auth/Login';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState(null);
    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => { }, []);


    useEffect(() => {
    }, []);

    if ((!user)) return <>{children}</>;
    else
        return (
            <div className="flex flex-col">

                <div>
                    <img
                        className="h-[44px] w-[100px] mt-100 ml-20"
                        src="/images/Ctribe-logo.svg"
                        alt="c-tribe"
                    />
                    {isSignup ? <SignUp /> : <Login />}
                </div>
            </div>
        );
}
