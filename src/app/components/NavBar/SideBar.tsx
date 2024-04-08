/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/app/redux/store";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import Image from "next/image";
import { getIntialials } from '@/app/utils/utility-function';
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { setToken, logOut } from "@/app/redux/features/app-slice";
import { TokenConstants } from "@/app/utils/constants";

import * as _ from 'lodash';
import Urls from "@/app/Networking/urls";

type MenuItem = {
    name: string;
    icon: string;
    selectedIcon: string;
    isSubMenuOpen?: boolean;
    href?: string;
    submenu?: MenuItem[];
};

const initialMenu: MenuItem[] = [
    {
        name: "Explore Events",
        href: "/exploreEvents",
        icon: "/images/navbar/dashboard.svg",
        selectedIcon: "/images/navbar/dashboard_selected.svg"
    },
    { name: "Tickets", href: "/tickets", icon: "/images/navbar/tickets.svg", selectedIcon: "/images/navbar/tickets_selected.svg" },
    { name: "Favourites Events", href: "/favourites", icon: "/images/navbar/favourites.svg", selectedIcon: "/images/navbar/favourites_selected.svg" },

    { name: "Create Event", href: "/createEvent", icon: "/images/navbar/create_event.svg", selectedIcon: "/images/navbar/create_event_selected.svg" },
    { name: "My Events", href: "/organizations/events", icon: "/images/navbar/my_event.svg", selectedIcon: "/images/navbar/my_event_selected.svg" },
    { name: "My Gallery", href: "/gallery", icon: "/images/navbar/gallery.svg", selectedIcon: "/images/navbar/gallery_selected.svg" },
    { name: "Profile Settings", href: "/profile", icon: "/images/navbar/settings.svg", selectedIcon: "/images/navbar/settings_selected.svg" },
    { name: "Log Out", href: "/", icon: "/images/navbar/logout.svg", selectedIcon: "/images/navbar/logout_selected.svg" },
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
    const dispatch = useDispatch<AppDispatch>();

    const authValue = useAppSelector((state) => state.appReducer.auth);
    const Loading = useAppSelector((state) => state.appReducer.Loading);
    const userData = useAppSelector((state) => state.appReducer.userData);
    const [upcomingHeight, setUpcomingHeight] = useState(0)
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("fashion-gradient-background");
    const [accessToken, setAccessToken] = useState<string>("")
    const [selectedPathName, setSelectedPathName] = useState('')
    const pathname = usePathname();
    // Define our base class
    const containerClassName = "w-[200px] transition-[margin-left] ease-in-out duration-500 top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";
    const storeToken = useAppSelector((state) => state.appReducer.accessToken);

    useEffect(() => {
        console.log('accessToken', accessToken)
        let token = localStorage.getItem("accessToken");
        if (token) {
            setAccessToken(token);
        }

    }, [storeToken]);

    useEffect(() => {
        if (pathname) {
            setSelectedPathName(pathname)
        }
    }, [pathname]);

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
            if (selectedMenuItem.href === "/") {
                dispatch(setToken(""));
                localStorage.removeItem(TokenConstants.ACCESS_TOKEN)
                dispatch(logOut());
                router.push("/")
            }
            else {
                router.push(selectedMenuItem.href);
            }

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
            {Loading.isLoading && <Loader message={Loading.message} />}

            <div
                id="default-sidebar"
                className={`${containerClassName}${appendClass} bg-[#275d38] default-sideBar fixed`}
                aria-label="Sidebar"
            >
                <div className="h-screen ">

                    <div className={`h-full pt-[0px] pl-[0px] flex-col flex`}>

                        <div className="flex justify-between items-center">
                            <Image
                                height={10}
                                width={200}
                                className="mt-2"
                                src="/images/ue-hub-logo-2.png"
                                alt="c-tribe"
                            />
                        </div>

                        <div className="pl-[20px] pt-4 ">
                            {initialMenu.map((item, index) => (
                                <div
                                    key={index}
                                    className={`cursor-pointer flex justify-start items-center pt-2`}
                                    onClick={() => handleInitialMenuItemClick(index)}
                                >
                                    <div className="flex items-center justify-start mt-6">
                                        {
                                            selectedPathName === item.href ?
                                                <div className="w-[28px] h-[28px] rounded-[4px] flex justify-center items-center bg-[#f2cd00]">
                                                    <Image
                                                        src={selectedPathName === item.href ? item.selectedIcon : item.icon}
                                                        width={20}
                                                        height={20}
                                                        alt="sideBar"
                                                        style={{ objectFit: "contain" }}
                                                        quality={75}
                                                    />
                                                </div>
                                                :
                                                <Image
                                                    src={selectedPathName === item.href ? item.selectedIcon : item.icon}
                                                    width={20}
                                                    height={20}
                                                    alt="sideBar"
                                                    style={{ objectFit: "contain" }}
                                                    quality={75}
                                                />
                                        }

                                        <span className={`ml-[12px] text-[14px] ${selectedPathName === item.href ? 'font-bold text-[#f2cd00]' : 'font-normal text-white'}`}>{item.name}</span>


                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr className="mr-4 mt-8 h-5.5 border-t-0 bg-[#C4C4C4]" />

                        <div className="flex flex-col cursor-pointer md:pb-10 md:mt-auto mt-[60px] pl-[20px]"
                            onClick={() => {
                                setter((oldVal: any) => !oldVal);
                                router.push(profileItem.href)
                            }}>
                            <div
                                className={`flex items-center justify-start`}>

                                {
                                    userData?.profile?.profile_photo ?
                                        <img
                                            src={`${Urls.BASE_URL}${userData?.profile?.profile_photo}`}
                                            alt="Selected"
                                            className="w-[45px] h-[45px] rounded-full mr-[1px]" /> :
                                        <div className="h-[45px] w-[45px] rounded-[10px] ml-[-6px] bg-[#f2cd00] flex justify-center items-center">
                                            <h1 className="navbar-profile-gradient-background text-center md:text-[22px] text-[22px] font-bold text-white">
                                                {getIntialials(userData && userData.user && userData.user?.first_name, userData && userData.user && userData.user?.last_name)}
                                            </h1>
                                        </div>

                                }


                                <div className="mt-1 ml-2 flex flex-col justify-center">
                                    <span className="text-[#f2cd00] font-medium text-[13px]">{`${_.capitalize(userData && userData.user && userData.user?.first_name)} ${_.capitalize(userData && userData.user && userData.user?.last_name)}`}</span>
                                    {/* <span className="text-[#00000080] font-normal text-[12px] mt-0">View Account</span> */}
                                </div>
                            </div>
                        </div>

                    </div >
                </div>
            </div >

            {show ? <ModalOverlay /> : <></>}
        </>
    );
}
