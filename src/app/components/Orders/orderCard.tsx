'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import Image from 'next/image'



export default function OrderCard({ label }: any) {
    const router = useRouter();
    const [isShareModalShow, setIsShareModalShow] = useState(false);
    const [events, setEvents] = useState<any[]>([,
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
                                    <div key={index} onClick={() => goToDetails(event)} className="h-[240px] w-full flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        {/* <a href="#">
                                            <img
                                                className="rounded-t-lg w-[312px] h-[150px]"
                                                src={event.image} alt="" />
                                        </a> */}
                                        <div className="w-[100%] h-[60%] flex">
                                            <img
                                                className=" w-[312px] h-[120px]"
                                                src={event.image} alt="" />
                                            <div className='w-[60%] ml-6 mt-4'>
                                                <a href="#">
                                                    <h1 className="mb-2 text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h1>
                                                </a>
                                                <p className="mb-[6px] text-[16px] font-normal text-red-500 dark:text-gray-400">Tuesday, Mar 12, 1:00 PM</p>
                                                <div className="flex items-center justify-start mt-2  cursor-pointer hover:underline">
                                                    <img
                                                        src="/images/location_icon.svg"
                                                        alt="Description of your image"
                                                        className="w-[20px] h-[20px] object-stretch" />
                                                    <p className="ml-2 text-[14px] font-normal text-black dark:text-gray-400">Universirty Of Alberta</p>
                                                </div>
                                            </div>
                                            <div className='w-[210px] ml-auto mt-4 mr-4 bg-gray-200 h-[50px] rounded-lg p-4 flex justify-center items-center cursor-pointer hover:underline hover:bg-blue-300'>
                                                <span className="mb-0 text-[14px] font-bold text-gray-700 dark:text-gray-400">View Order Details</span>

                                            </div>
                                        </div>
                                        <hr className="mr-0 mt-2 h-[2px] border-t-0 bg-gray-200" />


                                        <div className="h-[40%] flex justify-between items-center pb-4 ml-10 mr-10 pt-4">

                                            <div className='flex items-center'>
                                                <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                                    <img
                                                        src="/images/favourite_icon.svg"
                                                        alt="Description of your image"
                                                        className="w-[20px] h-[20px] object-cover" />
                                                    {/* <span className="text-[12px]">Save</span> */}

                                                </div>
                                                <div className='flex flex-col items-start ml-[14px]'>
                                                    <span className="text-[14px] text-gray-500">Order ID</span>
                                                    <span className="text-[12px]">16AJPY</span>
                                                </div>
                                            </div>

                                            <div className='flex items-center'>
                                                <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                                    <img
                                                        src="/images/favourite_icon.svg"
                                                        alt="Description of your image"
                                                        className="w-[20px] h-[20px] object-cover" />
                                                    {/* <span className="text-[12px]">Save</span> */}

                                                </div>
                                                <div className='flex flex-col items-start ml-[14px]'>
                                                    <span className="text-[14px] text-gray-500">Total Tickets</span>
                                                    <span className="text-[12px]">1</span>
                                                </div>
                                            </div>

                                            <div className='flex items-center'>
                                                <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                                    <img
                                                        src="/images/favourite_icon.svg"
                                                        alt="Description of your image"
                                                        className="w-[20px] h-[20px] object-cover" />
                                                    {/* <span className="text-[12px]">Save</span> */}

                                                </div>
                                                <div className='flex flex-col items-start ml-[14px]'>
                                                    <span className="text-[14px] text-gray-500">Paid Amound</span>
                                                    <span className="text-[12px]">CAD $10</span>

                                                </div>
                                            </div>

                                            <div className='flex items-center'>
                                                <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                                    <img
                                                        src="/images/favourite_icon.svg"
                                                        alt="Description of your image"
                                                        className="w-[20px] h-[20px] object-cover" />
                                                    {/* <span className="text-[12px]">Save</span> */}

                                                </div>
                                                <div className='flex flex-col items-start ml-2'>
                                                    <span className="text-[14px] text-gray-500">Invoice</span>
                                                    <span className="text-[12px] text-blue-500  cursor-pointer hover:underline">Download</span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </> : <div>

                    </div>
            }
        </div>
    );
}