/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import Image from 'next/image'
import Urls from '@/app/Networking/urls';
import { getFavouritesEvents, checkEventIsSaved } from '@/app/services/Event/event-service';
import { TokenConstants } from '@/app/utils/constants';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { formattedAMPMTime } from '@/app/utils/utility-function';
dayjs.extend(advancedFormat);

export default function EventCard({ label, events }: any) {
    const router = useRouter();
    const [localevents, setEvents] = useState<any[]>([,
        { id: 0, name: 'U of A Forestry Graduation Night', slug: 'all', selected: false, image: "/images/event_banner.jpeg" },
        { id: 1, name: 'CSC Edmonton Presents:National Building Code Changes – 2023 Alberta Edition', slug: 'today', selected: false, image: "/images/csc_event.jpeg" },
        { id: 2, name: 'Albertas Battle Through Recovery - Edmonton', slug: 'tomorrow', selected: false, image: "/images/battle_event.jpeg" },
        { id: 3, name: 'University of Alberta Car Reveal', slug: 'this_week', selected: false, image: "/images/car_event.jpeg" },
        { id: 4, name: 'CPPS Co-simulation: Operational Level for HIL with Cyber-security Focus', slug: 'this_weekend', selected: false, image: "/images/cpps_event.png" },
        { id: 5, name: 'The 13th Annual Alberta Budget Post-Mortem', slug: 'next_week', selected: false, image: "/images/budget_banner.jpeg" },
        { id: 6, name: 'Inclusion Alberta Family Conference 2024', slug: 'this_month', selected: false, image: "/images/family_event.jpeg" },
        { id: 7, name: 'Graduation Luncheon', slug: 'next_month', selected: false, image: "/images/graduation_event.jpeg" },
        { id: 8, name: 'AI Research conference 2024', slug: 'year', selected: false, image: "/images/conference_event.jpeg" }]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // getcagoryData()

    }, []);

    const renderSavedIcon = (event: any) => {
        return (
            event.isSaved ?
                <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                    <img
                        src="/images/favourite_icon.svg"
                        alt="Description of your image"
                        className="w-[20px] h-[20px] object-cover" />
                </div>
                :
                <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                    <img
                        src="/images/unfavourite_icon.svg"
                        alt="Description of your image"
                        className="w-[20px] h-[20px] object-cover" />
                </div>

        )
    }

    const hasEventEnded = (eventDate: any) => {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date as YYYY-MM-DD
        return eventDate < currentDate;
    };

    const renderStatus = (event: any) => {
        if (hasEventEnded(event?.date)) {
            return (
                <div className='w-[96px] h-[30px] mt-[-16px] ml-[-2px] mb-[8px] bg-yellow-500 rounded-[10px] flex justify-center items-center'>
                    <span className='text-[14px] text-white'>Event ended</span>
                </div>
            )
        }
        else {

            if (event.event_status === "cancelled") {
                return (
                    <div className='w-[80px] h-[30px] mt-[-16px] ml-[-2px] mb-[8px] bg-red-500 rounded-[10px] flex justify-center items-center'>
                        <span className='text-[14px] text-white'>Cancelled</span>
                    </div>
                )
            }
            if (event.event_status === "publish") {
                if (event?.ticket_type === "Free") {
                    return (
                        <div className='w-[90px] h-[30px] mt-[-16px] ml-[-2px] mb-[8px] bg-blue-500 rounded-[6px] flex justify-center items-center'>
                            <span className='text-[14px] text-white'>Going Fast</span>
                        </div>
                    )
                }
                else {
                    return (
                        <div className='w-[80px] h-[30px] mt-[-16px] ml-[-2px] mb-[8px] bg-green-500 rounded-[6px] flex justify-center items-center'>
                            <span className='text-[14px] text-white'>On Sale</span>
                        </div>
                    )
                }

            }
            if (event.event_status === "SoldOut") {
                return (
                    <div className='w-[80px] h-[30px] mt-[-16px] ml-[-2px] mb-[8px] bg-red-500 rounded-[10px] flex justify-center items-center'>
                        <span className='text-[14px] text-white'>Sold Out</span>
                    </div>
                )
            }
            if (event.total_tickets_remaining === -1) {
                return (
                    <div className='w-[80px] h-[30px] mt-[-16px] ml-[-2px] mb-[8px] bg-red-500 rounded-[10px] flex justify-center items-center'>
                        <span className='text-[14px] text-white'>Sold Out</span>
                    </div>
                )
            }

        }

    }

    const goToDetails = (event: any) => {
        if (event) {
            router.push(`/eventDetails?eventId=${event?.id}`)
        }
    }

    return (
        <div>
            {
                events && events.length ?
                    <>

                        <div className="grid mb-10">
                            <div
                                className="flex flex-wrap gap-6"
                            >
                                {events.map((event: any, index: any) => (
                                    <div key={index} onClick={() => goToDetails(event)} className="w-[280px] pb-0 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                                        <img
                                            className="rounded-t-lg w-[312px] h-[150px]"
                                            src={event.banner ? `${Urls.BASE_URL}${event.banner}` : '/images/event_banner.jpeg'} alt="" />

                                        <div className="p-5 h-[40%]">
                                            {
                                                renderStatus(event)
                                            }

                                            <h5 className="mb-2 text-[16px] font-bold tracking-tight text-gray-900 dark:text-white">{event.title}</h5>

                                            <p className="mb-[6px] text-[12px] font-normal text-gray-700 dark:text-gray-400">{dayjs(event?.date, 'YYYY-MM-DD').format("MMM D, YYYY")}, {formattedAMPMTime(event?.start_time)}</p>
                                            <p className="mb-3 text-[12px] font-normal text-gray-700 dark:text-gray-400">{event?.address}</p>

                                        </div>
                                        <div className='h-[20%] flex flex-row justify-between items-center mx-5 pb-4'>
                                            {
                                                event?.ticket_type === "Free" ?
                                                    event?.ticket_type === "Donation" ?
                                                        <p className="font-normal text-gray-700 dark:text-gray-400">Donation</p> :
                                                        <p className="font-bold text-gray-700 dark:text-gray-400">Free</p> :
                                                    <p className="font-bold text-gray-700 dark:text-gray-400">CAD${event?.ticket_price}</p>
                                            }
                                            {
                                                renderSavedIcon(event)
                                            }
                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                    </> : <div>
                        <label
                            className="relative flex min-h-[200px] mt-10 items-center justify-center rounded-md border border-dashed border-[#e0e0e0] bg-gray-100 p-12 text-center"
                        >
                            <div>
                                <span
                                    className="inline-flex   py-4 px-7 text-base font-medium text-[#07074D] "
                                >
                                    No event found!
                                </span>
                            </div>
                        </label>
                    </div>
            }

        </div>
    );
}
