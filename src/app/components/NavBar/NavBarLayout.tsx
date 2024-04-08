"use client";
import React, { useEffect, useState } from 'react'
import Sidebar from './SideBar';
import MenuBarMobile from './MenuBarMobile';
import { useAppSelector } from "@/app/redux/store";
import { TokenConstants } from '@/app/utils/constants';
import { useDispatch } from "react-redux";
import { setToken } from "@/app/redux/features/app-slice";

export default function NavBarLayout({ pageTitle, children }: any) {
    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("")
    const storeToken = useAppSelector((state) => state.appReducer.accessToken);
    const userData = useAppSelector((state) => state.appReducer.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
        console.log('NavBarLayout token', token)
        if (token) {
            setAccessToken(token);
            dispatch(setToken(token));
        }
        console.log('storeToken', storeToken)
    }, [storeToken]);

    return (
        <>
            {
                storeToken ?
                    <div>
                        <MenuBarMobile setter={setShowSidebar} />
                        <Sidebar show={showSidebar} setter={setShowSidebar} />
                    </div> : null
            }

        </>
    )
}