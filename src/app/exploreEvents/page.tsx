"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CategoryList from "@/app/components/categories/CategoryList";
import UpcomingList from "@/app/components/categories/UpcomingList";
import EventCard from "@/app/components/EventCard/eventCard"

function DashboardPage() {
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("all-gradient-background");
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e: any) => {
        const query = e.target.value.toLowerCase();
        setSearchInput(query);

    };

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
                        <EventCard />
                    </div>
                    {/*   */}
                    {/* <EventCard /> */}
                </div>


            </div>
        </>
    )
}

export default DashboardPage;