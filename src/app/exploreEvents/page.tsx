"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CategoryList from "@/app/components/categories/CategoryList";
import UpcomingList from "@/app/components/categories/UpcomingList";
import EventCard from "@/app/components/EventCard/eventCard"
import Loader from '@/app/components/Loader';
import { TokenConstants } from '@/app/utils/constants';
import { getUserInfo } from '@/app/services/User/user-service';
import { getEvents, getFilteredEvents } from '@/app/services/Event/event-service';

function DashboardPage() {
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("all-gradient-background");
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        // console.log('accessToken', accessToken)
        let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
        console.log('layout token', token);
        getAllEvents()


    }, []);

    const getAllEvents = () => {
        let user_id = localStorage.getItem(TokenConstants.USER_INFO);

        getEvents(
            (success: any) => {
                console.log('getEvents success', success);
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
                if (success) {
                    setAllEvents(success.data)
                    setFilteredEvents(success.data)
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

    const getEventsByCategory = (type: string) => {
        let user_id = localStorage.getItem(TokenConstants.USER_INFO);
        let event_type = type
        getFilteredEvents(
            event_type,
            (success: any) => {
                console.log('getFilteredEvents success', success);
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
                if (success) {
                    setFilteredEvents(success.data)
                }
            },
            (error: any) => {
                console.log('getFilteredEvents error', error);
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            },
        );

    }

    const getCategoryInfo = (category: any) => {
        if (category) {
            getEventsByCategory(category.slug)
        }
    }

    const handleChange = (e: any) => {
        const query = e.target.value.toLowerCase();
        setSearchInput(query);

    };

    if (loading)
        return (
            <>
                <Loader />
            </>
        );
    else
        return (
            <>
                <div className={`flex flex-col pl-[200px] w-full overflow-hidden no-scrollbar ${backgroundGradiant} `}>
                    <div className="md:flex hidden searchBarContainer">

                        <div className="search-container" style={{ width: '50%', display: 'flex', flexDirection: 'row', background: "#FFFFFF", borderRadius: 10, alignItems: 'center', marginRight: 100, paddingLeft: 20 }}>
                            <i className="fa fa-search"></i>
                            <input
                                style={{
                                    width: '50%',
                                    height: 50,
                                    border: "none",
                                    borderRadius: 20,
                                    marginLeft: 0,
                                    padding: "0.5rem",
                                }}
                                className="search"
                                key="search-bar"
                                value={searchInput}
                                placeholder={"Search events"}
                                onChange={handleChange}
                            />
                        </div>


                    </div>


                    <div className="bg-opacity-100">
                        <img
                            src="/images/event_banner.jpeg"
                            alt="Description of your image"
                            className="w-full h-[400px] object-cover" />
                    </div>
                    <div className="md:pt-10 pt-20 flex items-center justify-center">
                        <CategoryList
                            label={"EVENTS"}
                            getCategoryInfo={getCategoryInfo}
                        />
                    </div>
                    <hr className="mr-0 mt-4 h-[2px] border-t-0 bg-gray-200" />


                    <div className="w-[1200px] h-full ml-auto mr-auto  overflow-x-scroll no-scrollbar ">
                        <div>
                            <UpcomingList
                                label={"EVENTS"}
                            />
                        </div>
                        <div>
                            <EventCard events={filteredEvents} />
                        </div>
                        {/*   */}
                        {/* <EventCard /> */}
                    </div>


                </div>
            </>
        )
}

export default DashboardPage;