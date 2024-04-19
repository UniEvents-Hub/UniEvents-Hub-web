"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getEvents, getEventDetails, doUpdateEvent, getEventImage } from '@/app/services/Event/event-service';
import OrderCard from "@/app/components/Orders/orderCard";
import GalleryEventCard from "@/app/components/EventCard/galleryEventCard";
import { TokenConstants } from '@/app/utils/constants';
import { getUserOrders } from '@/app/services/User/user-service';
import Loader from '@/app/components/Loader';

function GalleryPage() {
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("tech-gradient-background");
    const [loading, setLoading] = useState<boolean>(true);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        // console.log('accessToken', accessToken)
        let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
        getorders()
    }, []);

    const getorders = () => {
        let user_id = localStorage.getItem(TokenConstants.USER_INFO);

        getUserOrders(
            user_id,
            (success: any) => {
                console.log('getUserOrders success', success);
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
                if (success) {
                    setAllOrders(success.data)
                }
            },
            (error: any) => {
                console.log('login error', error);
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            },
        );

    }
    if (loading)
        return (
            <>
                <Loader message={'Loading orders.......'} />
            </>
        );

    return (
        <>
            <div className={`flex flex-col md:pl-[200px] px-[60px] w-full overflow-y-scroll ${backgroundGradiant} `}>

                <div className="md:w-[50%] w-full h-screen ml-auto md:mr-auto mt-10">

                    <div>
                        <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-6">Attended Events</h1>
                        <GalleryEventCard orders={allOrders} />
                    </div>
                    <div className="h-20">

                    </div>
                </div>


            </div>
        </>
    )
}

export default GalleryPage;