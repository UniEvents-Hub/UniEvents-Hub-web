"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CategoryList from "@/app/components/categories/CategoryList";
import UpcomingList from "@/app/components/categories/UpcomingList";
import FavouriteCard from "@/app/components/EventCard/favouriteCard";

function GalleryPage() {
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("tech-gradient-background");

    return (
        <>
            <div className={`flex flex-col pl-[200px] w-full overflow-hidden no-scrollbar ${backgroundGradiant} `}>
                <div className="bg-opacity-100">

                </div>


                <div className="w-[1000px] h-full ml-auto mr-auto  overflow-x-scroll no-scrollbar  mt-10">

                    <div>
                        <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-6">My Event Gallery</h1>
                        <FavouriteCard />
                    </div>
                    {/*   */}
                    {/* <EventCard /> */}
                </div>


            </div>
        </>
    )
}

export default GalleryPage;