"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CategoryList from "@/app/components/categories/CategoryList";
import UpcomingList from "@/app/components/categories/UpcomingList";
import EventCard from "@/app/components/EventCard/eventCard"
import CheckoutModal from "./checkout-modal"
import ShareModal from "./share-modal"

function EventDetailsPage() {
    const [backgroundGradiant, setBackgroundGradient] = useState<string>("all-gradient-background");
    const [ticketCount, setTicketCount] = useState(1)
    const [isCheckoutModalShow, setIsCheckoutModalShow] = useState(false);
    const [isShareModalShow, setIsShareModalShow] = useState(false);

    return (
        <>
            <div className={`flex flex-col pl-[300px] pr-[100px] w-full overflow-hidden no-scrollbar ${backgroundGradiant} `}>
                <div className={`h-[400px] w-full rounded-[20px] mt-10 culture-gradient-background opacity-100`}>
                    <img
                        src="/images/battle_event.jpeg"
                        alt="Description of your image"
                        className="w-full px-[100px] h-[400px] rounded-[20px] object-stretch" />
                </div>

                <div className="w-full flex items-center">
                    <div className="md:pt-10 pt-20 w-[90%] ">
                        <h5 className="mb-2 text-[26px] font-bold tracking-tight text-gray-900 dark:text-white">Albertas Battle Through Recovery - Edmonton</h5>
                        <p className="mb-[6px] text-[18px] font-normal text-black dark:text-gray-400">Tuesday, Mar 12, 1:00 PM</p>

                        <div className="flex items-center justify-start mt-2">
                            <img
                                src="/images/location_icon.svg"
                                alt="Description of your image"
                                className="w-[20px] h-[20px] object-stretch" />
                            <p className="ml-2 text-[14px] font-normal text-black dark:text-gray-400">Universirty Of Alberta</p>
                        </div>



                    </div>

                    <div className="w-[10%] flex items-center gap-6 justify-end">
                        <div onClick={() => setIsShareModalShow(true)} className={`h-[30px] w-[80px] gap-2 rounded-[6px] px-4 py-3 text-sm font-semibold hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                            <img
                                src="/images/share_icon.svg"
                                alt="Description of your image"
                                className="w-[16px] h-[16px] object-stretch" />
                            <span className="text-[12px]">Share</span>
                        </div>
                        <div className={`h-[30px] w-[80px] gap-2 rounded-[6px] px-4 py-3 text-sm font-semibold hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                            <img
                                src="/images/favourite_icon.svg"
                                alt="Description of your image"
                                className="w-[16px] h-[16px] object-stretch" />
                            <span className="text-[12px]">Save</span>
                        </div>
                    </div>
                </div>


                <hr className="mr-0 mt-4 h-[2px] border-t-0 bg-gray-200" />


                <div className="w-full flex items-center">
                    <div className="flex flex-col items-start mt-4 w-[60%] ">
                        <h5 className="mb-2 text-[26px] font-bold tracking-tight text-gray-900 dark:text-white">About This Event</h5>
                        <div className="flex flex-col mb-[6px] gap-4 text-[14px] font-normal text-gray-700 dark:text-gray-400">
                            <span>Registration and lunch served: 11:45AM</span>
                            <span>Presentation: 12:00PM-1:00PM</span>
                            <p>
                                Come join us for a fantastic evening full of fun, prizes, raffles, auctions and of course trivia!

                                With over $10,000 in items up for grabs, there is sure to be something for everyone.

                                Tables will be set at 10 per table, however you don't need 10 to book as we will have some shared tables available.

                                Your support will help is raise vital funds for the Bendigo SES Unit.

                                Thank you and we look forward to seeing you there!
                            </p>
                            <span>Please join us as we listen, learn and discuss.</span>
                        </div>

                    </div>
                    <div className="w-[30%] h-full flex justify-end ">
                        <div className="w-[300px] h-full py-4 px-4 flex flex-col justify-end border-[1px] rounded-[10px] border-gray-300">

                            <div className="flex w-[260px] justify-between gap-2 ">
                                <div className="flex"></div>
                                <div className="flex gap-[10px]">
                                    <div onClick={() => {
                                        if (ticketCount > 1) { setTicketCount(ticketCount - 1) }
                                    }}
                                        className="w-[30px] h-[30px] cursor-pointer rounded-[6px] bg-blue-600 flex justify-center items-center">
                                        <span className="text-white text-[20px]"> - </span>
                                    </div>
                                    <span className="text-black text-[20px]"> {ticketCount} </span>
                                    <div onClick={() => {
                                        setTicketCount(ticketCount + 1)
                                    }}
                                        className="w-[30px] h-[30px] rounded-[6px] cursor-pointer bg-blue-600 flex justify-center items-center">
                                        <span className="text-white text-[20px]"> + </span>
                                    </div>
                                </div>

                            </div>
                            <span className="text-left text-[16px] mt-6">CAD ${ticketCount * 20.00}</span>

                            <button onClick={() => setIsCheckoutModalShow(true)}
                                className="h-[30px] w-full mx-[0px] mt-2 bg-red-600 rounded-[10px] items-center">
                                <span className="text-[14px] text-white"> Check out for CAD ${ticketCount * 20.00} </span>

                            </button>
                        </div>

                    </div>
                </div >

                <div className="flex flex-col items-start mt-4 w-[60%] ">
                    <h5 className="mb-2 text-[26px] font-bold tracking-tight text-gray-900 dark:text-white">Location</h5>
                    <img
                        src="/images/map_sample.png"
                        alt="Description of your image"
                        className="w-full h-[400px] object-stretch" />
                </div>


            </div >

            {isCheckoutModalShow ? (
                <CheckoutModal
                    onClose={() => setIsCheckoutModalShow(false)}
                />
            ) : null}

            {
                isShareModalShow ?
                    <ShareModal
                        onClose={() => setIsShareModalShow(false)} /> : null
            }

        </>
    )
}

export default EventDetailsPage;