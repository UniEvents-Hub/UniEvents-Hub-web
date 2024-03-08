/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import Image from "next/image";

type MenuItem = {
    name: string;
    icon: string;
    selectedIcon: string;
    isSubMenuOpen?: boolean;
    href?: string;
    submenu?: MenuItem[];
    fn?: () => Promise<void>;
};

const initialMenu: MenuItem[] = [
    {
        name: "Home",
        href: "/dashboard",
        icon: "/images/navbar/dashboard.svg",
        selectedIcon: "/images/navbar/dashboard_selected.svg"
    },
    { name: "Schedule", href: "/schedule", icon: "/images/navbar/schedule.svg", selectedIcon: "/images/navbar/schedule_selected.svg" },
];


const profileItem = {
    name: "Profile",
    href: "/profile",
    icon: "/images/navbar/user-placeholder-pic.svg",
    selectedIcon: "/images/navbar/user-placeholder-pic.svg"
}

export default function NewNavbar({ show, setter }: any) {
    const router = useRouter();
    const upcomingChildRef = useRef<any>(null);

    const authValue = null
    const Loading = false
    const userData = null
    const [upcomingHeight, setUpcomingHeight] = useState(0)

    // Define our base class
    const className = "bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

    useEffect(() => {
        // comment 
        setSelectedIndex(0)
        if (upcomingChildRef.current) {
            const height = upcomingChildRef.current.clientHeight;
            setUpcomingHeight(height);
        }
    }, [userData, upcomingChildRef]);
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleInitialMenuItemClick = async (index: number) => {
        const selectedMenuItem = initialMenu[index];
        setSelectedIndex(index);
        if (selectedMenuItem.href) {
            router.push(selectedMenuItem.href);
        } else if (selectedMenuItem.fn) {
            selectedMenuItem.fn();
        }
        setter((oldVal: any) => !oldVal);
    };

    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => {
                setter((oldVal: any) => !oldVal);
            }}
        />
    )

    return (
        <>
            {Loading && <Loader message={"Loading..."} />}

            {authValue?.isAuth && userData?.tags && (
                <div
                    id="default-sidebar"
                    className={`${className}${appendClass} fixed`}
                    aria-label="Sidebar"
                >

                    <div className="h-full pt-[27px] pl-[20px] flex-col items-center justify-center bg-white">
                        <div className="flex justify-between items-center">
                            <img
                                className="h-[34px] w-[80px] mt-0"
                                src="/images/C-Tribe_Main_Logo.svg"
                                alt="c-tribe"
                            />

                            <div className="flex items-center pointer-events-none">
                                <img
                                    className="h-[20px] w-[20px] mt-0"
                                    src="/images/search_icon.svg"
                                    alt="c-tribe"
                                />
                                <div
                                    className={`flex-none items-center`}
                                >
                                    <button
                                        // onClick={() => setIsNotiShow(true)}
                                        data-modal-target="default-modal"
                                        data-modal-toggle="default-modal"
                                        className="py-4 px-4 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                                        aria-label="Notification"
                                    >
                                        <img
                                            className="h-[20px] w-[20px] mt-0"
                                            src="/images/notification_icon.svg"
                                            alt="c-tribe"
                                        />
                                    </button>
                                </div>
                            </div>

                        </div>

                        {initialMenu.map((item, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer flex justify-start items-center`}
                                onClick={() => handleInitialMenuItemClick(index)}
                            >
                                <div className="flex items-center justify-start mt-6">
                                    <Image
                                        src={selectedIndex === index ? item.selectedIcon : item.icon}
                                        width={20}
                                        height={20}
                                        alt="sideBar"
                                        style={{ objectFit: "contain" }}
                                        quality={75}
                                    />
                                    <span className={`ml-[12px] text-[14px] ${selectedIndex === index ? 'font-bold text-black' : 'font-normal text-[#909090]'}`}>{item.name}</span>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            )}
            {show ? <ModalOverlay /> : <></>}
        </>
    );
}
