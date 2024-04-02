'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import Image from 'next/image'



export default function TagList({ label, getCategoryInfo, createdcategory }: any) {
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([,
        { id: 1, name: 'All', slug: 'all', selected: true },
        { id: 2, name: 'Tech', slug: 'tech', selected: false },
        { id: 3, name: 'Music', slug: 'music', selected: false },
        { id: 4, name: 'Religious', slug: 'religious', selected: false },
        { id: 5, name: 'Movie', slug: 'movie', selected: false },
        { id: 6, name: 'Sports', slug: 'sports', selected: false },
        { id: 7, name: 'Gaming', slug: 'gaming', selected: false },
        { id: 8, name: 'Culture', slug: 'culture', selected: false },
        { id: 9, name: 'Health', slug: 'health', selected: false }]);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        getcagoryData()
    }, [createdcategory]);

    const getcagoryData = async () => {
        // const categoryData = await getCategories();
        setCategories(categories);
        const selectedTag = categories.find(category => {
            if (category) {
                return category?.slug === createdcategory
            }
        });
        if (selectedTag) {
            handleCategorySelected(selectedTag)
        }
    }

    const handleCategorySelected = (category: any) => {
        if (category) {
            if (categories && categories.length > 0) {
                const updatedCategories = categories.map((obj) => {
                    if (obj.id === category.id) {
                        obj.selected = true
                        setSelectedCategory(obj)
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
    }

    return (
        <div className="h-[80px]">
            {
                categories && categories.length ?
                    <>

                        <div className="flex overflow-x-scroll no-scrollbar py-4">
                            <div
                                className="flex flex-nowrap gap-6"
                            >
                                {categories.map((item: any, index: any) => (
                                    <div
                                        onClick={() => handleCategorySelected(item)}
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
