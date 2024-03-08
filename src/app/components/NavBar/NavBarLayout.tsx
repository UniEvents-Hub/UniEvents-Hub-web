"use client";
import React, { useState } from 'react'
import Sidebar from './SideBar';
import MenuBarMobile from './MenuBarMobile';

export default function NavBarLayout({ pageTitle, children }: any) {
    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div>
                <MenuBarMobile setter={setShowSidebar} />
                <Sidebar show={showSidebar} setter={setShowSidebar} />
            </div>
        </>
    )
}