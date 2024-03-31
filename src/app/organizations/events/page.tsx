"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CategoryList from "@/app/components/categories/CategoryList";
import UpcomingList from "@/app/components/categories/UpcomingList";
import FavouriteCard from "@/app/components/EventCard/favouriteCard";
import OrgEventCard from "@/app/components/EventCard/orgEventCard";

function OrganizationEventPage() {
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("tech-gradient-background");
    const [showMenu, setShowMenu] = useState(false);
    const [dropData, setDropData] = useState([{ id: 0, name: 'Upcoming events', selected: false }, { id: 1, name: 'draft events', selected: false }, { id: 2, name: 'Past events', selected: false }, { id: 3, name: 'All events', selected: false }])
    const [filterType, setFilterType] = useState('Upcoming events')
    const router = useRouter();

    const handleDropDown = (item: any) => {
        setShowMenu(false)
        if (dropData && dropData.length > 0) {
            const updatedTicketType = dropData.map((obj) => {
                if (item.id === obj.id) {
                    obj.selected = true
                    console.log('obj', obj)
                    setFilterType(obj.name)
                }
                else {
                    obj.selected = false
                }
                return obj;
            })
            setDropData(updatedTicketType)
        }
    }

    return (
        <>
            <div className={`flex flex-col md:pl-[200px] px-[60px] w-full overflow-hidden no-scrollbar ${backgroundGradiant} `}>
                <div className="bg-opacity-100">

                </div>


                <div className="md:w-[50%] h-screen ml-auto mr-auto  overflow-x-scroll no-scrollbar  mt-10">

                    <div>
                        <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-10 border-b-2 border-[#007a33]">Events</h1>

                        <div className="flex justify-between items-center gap-10 mb-10">
                            <div className="relative h-[50px]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search events" required />

                            </div>

                            <div className="relative">
                                <button onClick={() => setShowMenu(!showMenu)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                                    className="h-[50px] mr-[200px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{filterType}
                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                {
                                    showMenu ?
                                        <div id="dropdown" className="absolute z-10 overflow-hidden mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                {
                                                    dropData.map((item, index) => {
                                                        return (
                                                            <li key={index} onClick={() => handleDropDown(item)}>
                                                                <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.name}</a>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div> : null
                                }
                            </div>

                            <div className="flex justify-end items-end">
                                <button
                                    onClick={() => router.push('/createEvent')} id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                                    className="h-[50px] bg-[#007a33] hover:bg-blue-600 text-[#f2cd00] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-6.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                    Create Event

                                </button>

                            </div>

                        </div>
                        <OrgEventCard />
                    </div>
                    {/*   */}
                    {/* <EventCard /> */}
                </div>


            </div>
        </>
    )
}

export default OrganizationEventPage;