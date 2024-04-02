"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CategoryList from "@/app/components/categories/CategoryList";
import UpcomingList from "@/app/components/categories/UpcomingList";
import FavouriteCard from "@/app/components/EventCard/favouriteCard";
import OrderCard from "@/app/components/Orders/orderCard";

function TicketsPage() {
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("tech-gradient-background");

    return (
        <>
            <div className={`flex flex-col md:pl-[200px] px-[60px] w-full overflow-hidden no-scrollbar ${backgroundGradiant} `}>


                <div className="md:w-[50%] w-full h-full ml-auto md:mr-auto  overflow-x-scroll no-scrollbar  mt-20">

                    <div>
                        <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-6">My Orders</h1>
                        <OrderCard />
                    </div>
                    {/*   */}
                    {/* <EventCard /> */}
                </div>


            </div>
        </>
    )
}

export default TicketsPage;