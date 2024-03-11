"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CategoryList from "@/app/components/categories/CategoryList";
import UpcomingList from "@/app/components/categories/UpcomingList";
import EventCard from "@/app/components/EventCard/eventCard"

function DashboardPage() {
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("tech-gradient-background");

    return (
        <>
            <div className={`flex flex-col pl-[200px] w-full overflow-hidden no-scrollbar ${backgroundGradiant} `}>
                <div className="opacity-100">
                    <img
                        src="/images/event_banner.jpeg"
                        alt="Description of your image"
                        className="w-full h-[400px] object-cover" />
                </div>
                <div className="md:pt-10 pt-20">
                    <CategoryList
                        label={"EVENTS"}
                    />
                </div>
                <hr className="mr-0 mt-4 h-[2px] border-t-0 bg-gray-200" />


                <div className="flex flex-col items-start mt-4 px-[100px]">
                    <UpcomingList
                        label={"EVENTS"}
                    />
                    <EventCard />
                </div>


            </div>
        </>
    )
}

export default DashboardPage;