'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import Image from 'next/image'



export default function EventCard({ label }: any) {
    const router = useRouter();
    const [events, setEvents] = useState<any[]>([,
        { id: 0, name: 'U of A Forestry Graduation Night', slug: 'all', selected: false, image: "/images/event_banner.jpeg" },
        { id: 1, name: 'CSC Edmonton Presents:National Building Code Changes – 2023 Alberta Edition', slug: 'today', selected: false, image: "/images/csc_event.jpeg" },
        { id: 2, name: 'Albertas Battle Through Recovery - Edmonton', slug: 'tomorrow', selected: false, image: "/images/battle_event.jpeg" },
        { id: 3, name: 'University of Alberta Car Reveal', slug: 'this_week', selected: false, image: "/images/car_event.jpeg" },
        { id: 4, name: 'CPPS Co-simulation: Operational Level for HIL with Cyber-security Focus', slug: 'this_weekend', selected: false, image: "/images/cpps_event.png" },
        { id: 5, name: 'The 13th Annual Alberta Budget Post-Mortem', slug: 'next_week', selected: false, image: "/images/budget_banner.jpeg" },
        { id: 5, name: 'Inclusion Alberta Family Conference 2024', slug: 'this_month', selected: false, image: "/images/family_event.jpeg" },
        { id: 6, name: 'Graduation Luncheon', slug: 'next_month', selected: false, image: "/images/graduation_event.jpeg" },
        { id: 7, name: 'AI Research conference 2024', slug: 'year', selected: false, image: "/images/conference_event.jpeg" }]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // getcagoryData()

    }, []);

    const getcagoryData = async () => {
        // const categoryData = await getCategories();
        // setEvents(categoryData);
    }

    const handleCategorySelected = (category: any, index: number) => {
        if (category) {
            // dispatch(setSelectedTag(category.slug))
            var newState: any[] = []
            // set the selected property to false for all categories
            categories.forEach((item: any) => {
                newState.push({ ...item, selected: false })
            })
            // set the selected property to true for the selected category
            newState[index] = { ...category, selected: true }
            // setSelectedTags(selectTags)
            setCategories(newState)
        }
    }

    return (
        <div className="h-full w-full mt-4">
            {
                events && events.length ?
                    <>

                        <div className="grid grid-rows-4 grid-flow-col gap-4 overflow-x-scroll no-scrollbar py-0">
                            <div
                                className="flex flex-wrap gap-6"
                            >
                                {events.map((event: any, index: any) => (
                                    <div key={index} className="w-[318px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <a href="#">
                                            <img
                                                className="rounded-t-lg w-[318px] h-[150px]"
                                                src={event.image} alt="" />
                                        </a>
                                        <div className="p-5">
                                            <a href="#">
                                                <h5 className="mb-2 text-[16px] font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
                                            </a>
                                            <p className="mb-[6px] text-[12px] font-normal text-gray-700 dark:text-gray-400">Tuesday, Mar 12, 1:00 PM</p>
                                            <p className="mb-3 text-[12px] font-normal text-gray-700 dark:text-gray-400">Universirty Of Alberta</p>
                                            <p className="mb-0 font-normal text-gray-700 dark:text-gray-400">CAD $100.00</p>
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
