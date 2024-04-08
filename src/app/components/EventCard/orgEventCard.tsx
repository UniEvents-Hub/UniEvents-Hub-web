'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import ShareModal from "./share-modal"
import Image from 'next/image';
import Urls from '@/app/Networking/urls';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { formattedAMPMTime } from '@/app/utils/utility-function';
dayjs.extend(advancedFormat);



export default function OrgEventCard({ label, events }: any) {
    const router = useRouter();
    const [isShareModalShow, setIsShareModalShow] = useState(false);
    const [localEvents, setLocalEvents] = useState<any[]>([,
        { id: 0, name: 'U of A Forestry Graduation Night', slug: 'all', selected: false, image: "/images/event_banner.jpeg" },
        { id: 1, name: 'CSC Edmonton Presents', slug: 'today', selected: false, image: "/images/csc_event.jpeg" },
        { id: 2, name: 'Albertas Battle', slug: 'tomorrow', selected: false, image: "/images/battle_event.jpeg" },
    ]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // getcagoryData()

    }, []);

    const getcagoryData = async () => {
        // const categoryData = await getCategories();
        // setEvents(categoryData);
    }

    const handleCategorySelected = (category: any, index: number) => {
        // if (category) {
        //     // dispatch(setSelectedTag(category.slug))
        //     var newState: any[] = []
        //     // set the selected property to false for all categories
        //     categories.forEach((item: any) => {
        //         newState.push({ ...item, selected: false })
        //     })
        //     // set the selected property to true for the selected category
        //     newState[index] = { ...category, selected: true }
        //     // setSelectedTags(selectTags)
        //     setCategories(newState)
        // }
    }

    const goToDetails = (event: any) => {
        if (event) {
            router.push(`/myevent/dashboard?eventId=${event?.id}`)
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
                                    <div key={index} onClick={() => goToDetails(event)} className=" w-full cursor-pointer flex flex-row justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        {/* <a href="#">
                                            <img
                                                className="rounded-t-lg w-[312px] h-[150px]"
                                                src={event.image} alt="" />
                                        </a> */}
                                        <div className="w-[60%] flex md:flex-row flex-col">
                                            <img
                                                onClick={() => goToDetails(event)}
                                                className="w-[112px] h-full rounded-[2px] object-cover"
                                                src={event.banner ? `${Urls.BASE_URL}${event.banner}` : '/images/event_banner.jpeg'} alt="" />
                                            <div className='md:w-[70%] w-[100%] ml-6 mt-4'>
                                                <a onClick={() => goToDetails(event)}>
                                                    <h1 className="w-[90%] mb-2 text-[14px] font-bold tracking-tight text-gray-900 dark:text-white">{event.title}</h1>
                                                </a>
                                                <div className="flex items-center justify-start mt-2 hover:underline">
                                                    <img
                                                        src="/images/calender_icon.svg"
                                                        alt="Description of your image"
                                                        className="w-[20px] h-[20px] object-cover" />
                                                    <p className="mb-[2px] ml-2 text-[14px] font-normal text-red-500 dark:text-gray-400">{dayjs(event?.date, 'YYYY-MM-DD').format("MMM D, YYYY")}, {formattedAMPMTime(event?.start_time)}</p>
                                                </div>

                                                <div className="flex items-center justify-start mt-2 mb-4  cursor-pointer hover:underline">
                                                    <img
                                                        src="/images/location_icon.svg"
                                                        alt="Description of your image"
                                                        className="w-[20px] h-[20px] object-cover" />
                                                    <p className="ml-2 text-[14px] font-normal text-black dark:text-gray-400">{event?.address}</p>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="w-[40%] flex md:flex-row flex-col justify-start items-start mt-4 gap-10">
                                            <div className='flex flex-col items-start ml-[14px]'>
                                                <span className="text-[16px] text-bold text-black">Sold</span>
                                                <span className="text-[12px] mt-2">{event?.total_tickets_remaining} / {event?.total_tickets}</span>
                                            </div>
                                            <div className='flex flex-col items-start ml-[14px]'>
                                                <span className="text-[16px] text-bold text-black">Gross</span>
                                                <span className="text-[12px] mt-2">{event?.ticket_type === "Free" ? "Free" : `CAD$${event?.ticket_price}`}</span>
                                            </div>
                                            <div className='flex flex-col items-start ml-[14px]'>
                                                <span className="text-[16px] text-bold text-black">Status</span>
                                                <span className="text-[12px] mt-2">On Sale</span>
                                            </div>
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
            {
                isShareModalShow ?
                    <ShareModal
                        onClose={() => setIsShareModalShow(false)} /> : null
            }
        </div>
    );
}
