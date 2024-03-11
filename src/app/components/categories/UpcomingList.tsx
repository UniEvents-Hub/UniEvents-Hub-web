'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import Image from 'next/image'



export default function UpcomingList({ label }: any) {
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([,
        { id: 0, name: 'All', slug: 'all', selected: true },
        { id: 1, name: 'Today', slug: 'today', selected: false },
        { id: 2, name: 'Tomorrow', slug: 'tomorrow', selected: false },
        { id: 3, name: 'This Week', slug: 'this_week', selected: false },
        { id: 4, name: 'This Weekend', slug: 'this_weekend', selected: false },
        { id: 5, name: 'Next Week', slug: 'next_week', selected: false },
        { id: 5, name: 'This Month', slug: 'this_month', selected: false },
        { id: 6, name: 'Next Month', slug: 'next_month', selected: false },
        { id: 7, name: 'This Year', slug: 'year', selected: false }]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        getcagoryData()

        // let payload = {
        //     categories
        // }
        // categoryCreate({ payload });
    }, []);

    const getcagoryData = async () => {
        // const categoryData = await getCategories();
        setCategories(categories);
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
        <div className="h-[80px]">
            {
                categories && categories.length ?
                    <>

                        <div className="flex overflow-x-scroll no-scrollbar py-6">
                            <div
                                className="flex flex-nowrap gap-6"
                            >
                                {categories.map((item: any, index: any) => (
                                    <div
                                        onClick={() => handleCategorySelected(item, index)}
                                        key={index}
                                        className={`h-[35px] rounded-full px-4 py-3 text-sm font-semibold hover:bg-blue cursor-pointer flex items-center justify-center ${item.selected ? 'bg-[#333E48] border border-[#616161]' : 'border border-[#616161]'
                                            }`}
                                    >

                                        <span className={`select-none ${item.selected ? 'text-white text-[12px] font-bold' : 'text-gray-600 text-[14px] font-medium'}`}>{item.name}</span>

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
