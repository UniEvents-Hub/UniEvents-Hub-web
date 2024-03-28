"use client";
import React, { useEffect, useState } from 'react'
import Sidebar from './SideBar';
import MenuBarMobile from './MenuBarMobile';
import { useAppSelector } from "@/app/redux/store";

export default function NavBarLayout({ pageTitle, children }: any) {
    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("")
    const storeToken = useAppSelector((state) => state.appReducer.accessToken);
    const userData = useAppSelector((state) => state.appReducer.userData);

    useEffect(() => {
        console.log('accessToken', accessToken)
        let token = localStorage.getItem("accessToken");
        if (token) {
            setAccessToken(token);

        }

    }, [storeToken]);

    return (
        <>
            {
                accessToken ?
                    <div>
                        <MenuBarMobile setter={setShowSidebar} />
                        <Sidebar show={showSidebar} setter={setShowSidebar} />
                    </div> : null
            }

        </>
    )
}