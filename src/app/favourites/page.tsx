"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CategoryList from "@/app/components/categories/CategoryList";
import UpcomingList from "@/app/components/categories/UpcomingList";
import FavouriteCard from "@/app/components/EventCard/favouriteCard";
import { TokenConstants } from '@/app/utils/constants';
import { getEvents, getOrgEvents, getFavouritesEvents } from '@/app/services/Event/event-service';
import Loader from '@/app/components/Loader';

function FavouritesPage() {
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("tech-gradient-background");
    const [loading, setLoading] = useState<boolean>(true);
    const [allFavEvents, setAllFavEvents] = useState([]);

    useEffect(() => {
        // console.log('accessToken', accessToken)
        let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
        console.log('layout token', token);
        getFavEvents()
    }, []);

    const getFavEvents = () => {
        let user_id = localStorage.getItem(TokenConstants.USER_INFO);

        getFavouritesEvents(
            user_id,
            (success: any) => {
                console.log('getFavouritesEvents success', success);
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
                if (success) {
                    setAllFavEvents(success.data)
                }
            },
            (error: any) => {
                console.log('login error', error);
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            },
        );

    }

    if (loading)
        return (
            <>
                <Loader message={'Loading Event.......'} />
            </>
        );

    return (
        <>
            <div className={`flex flex-col md:pl-[200px] px-[60px] w-full overflow-hidden no-scrollbar ${backgroundGradiant} `}>
                <div className="bg-opacity-100">

                </div>
                <div className="md:w-[50%] h-screen ml-auto mr-auto  overflow-x-scroll no-scrollbar  mt-10">

                    <div>
                        <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-6">Favourites</h1>
                        <FavouriteCard events={allFavEvents} />
                    </div>
                    {/*   */}
                    {/* <EventCard /> */}
                </div>


            </div>
        </>
    )
}

export default FavouritesPage;