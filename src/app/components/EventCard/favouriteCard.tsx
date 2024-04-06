/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import ShareModal from "./share-modal"
import Image from 'next/image'
import Urls from '@/app/Networking/urls';



export default function FavouriteCard({ label, events }: any) {
    const router = useRouter();
    const [isShareModalShow, setIsShareModalShow] = useState(false);
    const [localEvents, setEvents] = useState<any[]>([,
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
        router.push('/eventDetails')
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
                                    <div key={index} onClick={() => goToDetails(event)} className="h-[230px] w-full flex flex-row justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        {/* <a href="#">
                                            <img
                                                className="rounded-t-lg w-[312px] h-[150px]"
                                                src={event.image} alt="" />
                                        </a> */}
                                        <div className="w-[80%] p-5">
                                            <h1 className="mb-2 text-[24px] font-bold tracking-tight text-gray-900 dark:text-white">{event?.event?.title}</h1>

                                            <p className="mb-[6px] text-[16px] font-normal text-red-500 dark:text-gray-400">{event?.event?.date}, {event?.event?.start_time}</p>
                                            <p className="mb-3 text-[16px] font-normal text-gray-700 dark:text-gray-400">{event?.event?.address}</p>
                                            <p className="mb-0 text-[16px] font-bold text-gray-700 dark:text-gray-400">CAD${event?.event?.ticket_price}</p>
                                        </div>

                                        <div className='flex flex-col justify-between items-center'>
                                            <img
                                                className=" w-[312px] h-[150px]"
                                                src={event.event?.banner ? `${Urls.BASE_URL}${event?.event.banner}` : '/images/event_banner.jpeg'} alt="" />

                                            <div className="ml-auto flex items-center gap-6 justify-end pb-4 mr-6">

                                                <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                                    <img
                                                        src="/images/favourite_icon.svg"
                                                        alt="Description of your image"
                                                        className="w-[20px] h-[20px] object-cover" />
                                                    {/* <span className="text-[12px]">Save</span> */}
                                                </div>
                                                <div onClick={() => setIsShareModalShow(true)} className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                                    <img
                                                        src="/images/share_icon.svg"
                                                        alt="Description of your image"
                                                        className="w-[20px] h-[20px] object-cover" />
                                                    {/* <span className="text-[12px]">Share</span> */}
                                                </div>
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
