'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import Image from 'next/image'



export default function UpcomingList({ label, getDateFilterInfo }: any) {
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([,
        { id: 1, name: 'All', slug: 'all', selected: true },
        { id: 2, name: 'Today', slug: 'today', selected: false },
        { id: 3, name: 'Tomorrow', slug: 'tomorrow', selected: false },
        { id: 4, name: 'This Week', slug: 'thisWeek', selected: false },
        { id: 5, name: 'This Weekend', slug: 'thisWeekend', selected: false },
        { id: 6, name: 'Next Week', slug: 'nextWeek', selected: false },
        { id: 7, name: 'This Month', slug: 'thisMonth', selected: false },
        { id: 8, name: 'Next Month', slug: 'nextMonth', selected: false },
        { id: 9, name: 'This Year', slug: 'thisYear', selected: false }]);
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
            const updatedCategories = categories.map((obj) => {
                if (category.id === obj.id) {
                    obj.selected = true
                    getDateFilterInfo(obj)
                }
                else {
                    obj.selected = false
                }
                return obj;
            })
            setCategories(updatedCategories)

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
                                        className={`h-[35px] rounded-full px-[20px] flex items-center justify-center hover:bg-blue cursor-pointer ${item.selected ? 'bg-[#333E48] border border-[#616161]' : 'border border-[#616161]'
                                            }`}
                                    >

                                        <span className={`select-none ${item.selected ? 'text-white text-[12px] font-medium' : 'text-gray-600 text-[12px] font-medium'}`}>{item.name}</span>

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
