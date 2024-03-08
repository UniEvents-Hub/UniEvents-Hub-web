import React from 'react'
import Link from 'next/link'

export default function MenuBarMobile({ setter }: any) {
    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-[#E3EAF1]  flex [&>*]:my-auto px-2">
            <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter((oldVal: any) => !oldVal);
                }}
            >
                <img
                    className="h-[28px] w-[28px] mt-0"
                    src="/images/Mobile_Menu.svg"
                    alt="c-tribe"
                />
            </button>

            <Link href="/" className="ml-4">
                {/*eslint-disable-next-line*/}
                <img
                    className="h-[25px] w-[58px] mt-0"
                    src="/images/C-Tribe_Main_Logo.svg"
                    alt="c-tribe"
                />
            </Link>
            <div className='mx-auto'></div>
            <div
                className=" flex flex-row justify-start items-center"
            >
                <div>
                    <button
                        // onClick={() => setIsNotiShow(true)}
                        data-modal-target="default-modal"
                        data-modal-toggle="default-modal"
                        className="py-4 px-0 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                        aria-label="Notification"
                    >
                        <img
                            className="h-[20px] w-[20px] mt-0"
                            src="/images/notification_icon.svg"
                            alt="c-tribe"
                        />
                        <span className="absolute inset-0 object-right-top -mr-6">
                            <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                                6
                            </div>
                        </span>
                    </button>
                </div>
                <div>
                    <img
                        className="h-[20px] w-[20px] ml-4 mr-6"
                        src="/images/search_icon.svg"
                        alt="c-tribe"
                    />
                </div>
            </div>
        </nav>
    )
}