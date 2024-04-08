"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CategoryList from "@/app/components/categories/CategoryList";
import UpcomingList from "@/app/components/categories/UpcomingList";
import EventCard from "@/app/components/EventCard/eventCard"
import Loader from '@/app/components/Loader';
import { TokenConstants } from '@/app/utils/constants';
import { getUserInfo } from '@/app/services/User/user-service';
import { getEvents, getFilteredEvents, checkEventIsSaved } from '@/app/services/Event/event-service';
import { formattedAMPMTime } from '@/app/utils/utility-function';

function DashboardPage() {
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("all-gradient-background");
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        // console.log('accessToken', accessToken)
        let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);

        getAllEvents()
    }, []);

    const getAllEvents = async () => {
        let user_id = localStorage.getItem(TokenConstants.USER_INFO);

        let event_type = 'all'
        getFilteredEvents(
            event_type,
            async (success: any) => {
                console.log('getFilteredEvents success', success);
                setTimeout(() => {
                    setLoading(false)
                }, 500)
                if (success) {
                    if (success.data.length > 0) {
                        let modifiedEvent = [] as any;
                        for (let i = 0; i < success.data.length; i++) {
                            if (success.data[i]?.event_status !== null && (success.data[i]?.event_status !== 'draft' || success.data[i]?.event_status !== 'unpublish')) {
                                let isSaved = await checkSavedEvent(success.data[i].id);
                                success.data[i].isSaved = isSaved
                                modifiedEvent.push(success.data[i])
                            }

                        }
                        setAllEvents(modifiedEvent)
                        setFilteredEvents(modifiedEvent)
                    }

                }
            },
            (error: any) => {
                console.log('getFilteredEvents error', error);
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            },
        );

    }

    const checkSavedEvent = async (event_id: any): Promise<boolean> => {

        return new Promise<boolean>((resolve, reject) => {
            checkEventIsSaved(
                event_id,
                (success: any) => {
                    if (success && success.data) {
                        resolve(!!success.data.saved);
                    } else {
                        resolve(false);
                    }
                },
                (error: any) => {
                    console.log('login error', error);
                    resolve(false);
                },
            );
        });

    }

    const getEventsByCategory = async (type: string) => {
        let user_id = localStorage.getItem(TokenConstants.USER_INFO);
        let event_type = type
        getFilteredEvents(
            event_type,
            async (success: any) => {
                // console.log('getFilteredEvents success', success);
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
                if (success) {
                    let modifiedEvent = [] as any;
                    for (let i = 0; i < success.data.length; i++) {
                        if (success.data[i]?.event_status !== null && (success.data[i]?.event_status !== 'draft' || success.data[i]?.event_status !== 'unpublish')) {
                            let isSaved = await checkSavedEvent(success.data[i].id);
                            success.data[i].isSaved = isSaved
                            modifiedEvent.push(success.data[i])
                        }

                    }
                    setFilteredEvents(modifiedEvent)
                }
            },
            (error: any) => {
                console.log('getFilteredEvents error', error);
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            },
        );

    }

    const filterEvents = (filterValue: any) => {
        const currentDate = new Date(); // Get current date
        const today = currentDate.toISOString().split('T')[0]; // Format current date as YYYY-MM-DD
        const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Next week date
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).toISOString().split('T')[0]; // Next month date
        const thisYear = `${currentDate.getFullYear()}-12-31`; // End of current year
        let events = allEvents;
        // Filter events based on the chosen filter value
        switch (filterValue) {
            case 'all':
                return allEvents;
            case 'today':
                return events.filter(event => event.date === today);
            case 'tomorrow':
                const tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                return events.filter(event => event.date === tomorrow);
            case 'thisWeek':
                return events.filter(event => event.date >= today && event.date <= nextWeek);
            case 'thisWeekend':
                // Implement logic to determine the weekend based on current date
                // Example: weekend = { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' }
                const weekend = { startDate: '2024-04-06', endDate: '2024-04-07' }; // Example weekend dates
                return events.filter(event => event.date >= weekend.startDate && event.date <= weekend.endDate);
            case 'nextWeek':
                return events.filter(event => event.date > nextWeek && event.date <= nextMonth);
            case 'thisMonth':
                return events.filter(event => event.date >= today && event.date <= nextMonth);
            case 'nextMonth':
                return events.filter(event => event.date > nextMonth && event.date <= thisYear);
            case 'thisYear':
                return events.filter(event => event.date >= today && event.date <= thisYear);
            default:
                return events; // Return all events if no filter value matches


        }

    };

    const getDateFilterValue = (dateobj: any) => {
        if (dateobj) {
            let filteredEvents = filterEvents(dateobj.slug)
            console.log('filteredEvents', filteredEvents)
            setFilteredEvents(filteredEvents);
        }

    }

    const getCategoryInfo = (category: any) => {
        if (category) {
            getEventsByCategory(category.slug)
            setSelectedCategory(category)
        }
    }


    const handleChange = (e: any) => {
        const query = e.target.value.toLowerCase();
        setSearchInput(query);
        const eventFilteredData = allEvents.filter(event =>
            event?.title.toLowerCase().includes(query)
        );

        if (eventFilteredData && eventFilteredData.length > 0 && selectedCategory) {
            if (selectedCategory?.slug === 'all') {
                setFilteredEvents(eventFilteredData);
            }
            else {
                const filterByCategoryEvents = eventFilteredData.filter(event => event.event_type === selectedCategory?.slug);
                setFilteredEvents(filterByCategoryEvents);
            }

        }
        else {
            setFilteredEvents(eventFilteredData);
        }


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
                                getDateFilterInfo={getDateFilterValue}
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