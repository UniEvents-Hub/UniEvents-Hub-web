'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import Image from 'next/image'



export default function CategoryList({ label, getCategoryInfo }: any) {
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([,
        { id: 1, name: 'All', slug: 'all', selected: true },
        { id: 2, name: 'Film', slug: 'film', selected: false },
        { id: 3, name: 'Tech', slug: 'tech', selected: false },
        { id: 4, name: 'Gaming', slug: 'gaming', selected: false },
        { id: 5, name: 'Culture', slug: 'culture', selected: false },
        { id: 6, name: 'Music', slug: 'music', selected: false },
        // { id: 5, name: 'Food & Drink', slug: 'music', selected: false },
        { id: 7, name: 'Health', slug: 'health', selected: false },
        // { id: 7, name: 'Business', slug: 'music', selected: false }
    ]);
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
            const updatedCategories = categories.map((obj) => {
                if (category.id === obj.id) {
                    obj.selected = true
                }
                else {
                    obj.selected = false
                }
                return obj;
            })
            setCategories(updatedCategories)

            getCategoryInfo(category)
        }
    }

    return (
        <div className="h-[140px] mx-[50px]">
            {
                categories && categories.length ?
                    <>

                        <div className="flex overflow-x-scroll no-scrollbar gap-16 py-6">
                            <div
                                className="flex flex-nowrap gap-14"
                            >
                                {categories.map((item: any, index: any) => (
                                    <div
                                        key={index}
                                        className="flex flex-col justify-start items-center gap-2"
                                    >
                                        <div
                                            onClick={() => handleCategorySelected(item, index)}
                                            key={index}
                                            className={`h-[80px] w-[80px] rounded-full px-4 py-3 text-sm font-semibold hover:bg-blue cursor-pointer flex items-center justify-center ${item.selected ? 'bg-[#333E48] border border-[#616161]' : 'border border-[#616161]'
                                                }`}
                                        >
                                            <Image
                                                src={item.selected ? `/images/categories/${item.slug}_selected_category_icon.svg` : `/images/categories/${item.slug}_category_icon.svg`}
                                                alt={item.name}
                                                className="dark:invert"
                                                width={30}
                                                height={26}
                                                style={{ objectFit: "contain", color: 'white', }}
                                                quality={75} />

                                        </div>
                                        <span className={`select-none ${item.selected ? 'text-black text-[14px] font-bold' : 'text-gray-600 text-[14px] font-medium'}`}>{item.name === "All" ? "For You" : item.name}</span>
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
