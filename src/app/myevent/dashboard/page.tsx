"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from 'next-share';
import { useRouter, useSearchParams } from "next/navigation";
import { getEvents, getEventDetails, doUpdateEvent } from '@/app/services/Event/event-service';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { formattedAMPMTime } from '@/app/utils/utility-function';
dayjs.extend(advancedFormat);
import Loader from '@/app/components/Loader';

function EventDashboardPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [backgroundGradiant, setBackgroundGradient] = useState<string>("tech-gradient-background");
    const [isCopied, setIsCopied] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [dropData, setDropData] = useState([{ id: 0, name: 'On Sale', slug: 'OnSale', selected: false }, { id: 1, name: 'Sold out', slug: 'SoldOut', selected: false }, { id: 2, name: 'Cancelled', slug: 'cancelled', selected: false }, { id: 3, name: 'Publish event', slug: 'publish', selected: false }, { id: 4, name: 'Unpublish event', slug: 'unpublish', selected: false }, { id: 5, name: 'Draft event', slug: 'draft', selected: false }])
    const [filterType, setFilterType] = useState('On Sale');
    const [loading, setLoading] = useState<boolean>(true);
    const [eventDetails, setEventDetails] = useState<any>(null);
    const [shareLink, setShareLink] = useState<any>('')

    useEffect(() => {
        const evet_id = searchParams?.get("eventId");
        getEventInfo(evet_id)
    }, []);

    const getEventInfo = (id: any) => {

        getEventDetails(
            id,
            (success: any) => {
                console.log('getEventDetails success', success);

                if (success && success.data.length > 0) {
                    setEventDetails(success.data[0]);
                    // setTicketCount(success.data[0].total_tickets); 
                    let link = `${window.location.origin}/eventDetails?eventId=${success.data[0].id}`
                    setShareLink(link)
                    if (success.data[0].event_status) {
                        const savedStaus = dropData.find(type => type.slug === success.data[0].event_status);
                        if (savedStaus) {
                            handleDropDown(savedStaus)
                        }
                    }
                }
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
            },
            (error: any) => {
                console.log('login error', error);
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
            },
        );

    }

    const handleUpdateEvent = (status: string) => {

        const params = {
            event_status: status
        };
        if (Object.keys(params).length === 0) {
            alert('update some value')
            return;
        }
        else {
            // setLoading(true);
            doUpdateEvent(
                eventDetails.id,
                params,
                (success: any) => {
                    console.log('doUpdateEvent success', success);

                    if (success && success.data) {
                        setEventDetails(success.data);
                        alert('Event updated successfully!')
                    }
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000)
                },
                (error: any) => {
                    console.log('doUpdateEvent error', error);
                    setLoading(false);
                    if (error && error.data) {
                        let errmsg = Object.values(error.data)[0] as any;
                        console.log(errmsg)
                        if (errmsg && errmsg.length > 0) {
                            alert(errmsg[0])
                        }
                    }
                },
            );
        }
    }

    const handleDropDown = (item: any) => {
        setShowMenu(false)
        if (dropData && dropData.length > 0) {
            const updatedTicketType = dropData.map((obj) => {
                if (item.id === obj.id) {
                    obj.selected = true
                    console.log('obj', obj)
                    setFilterType(obj.name)
                    handleUpdateEvent(obj.slug)
                }
                else {
                    obj.selected = false
                }
                return obj;
            })
            setDropData(updatedTicketType)
        }
    }

    const doEditEvent = () => {
        router.push(`/createEvent?eventId=${eventDetails?.id}`);
        // router.push('/createEvent')
    }

    const goToDetails = () => {
        if (eventDetails) {
            router.push(`/eventDetails?eventId=${eventDetails.id}`)
        }

    }

    const handleMapLinkClick = () => {
        // Open Google Maps with specific latitude and longitude
        if (eventDetails) {
            window.open(`https://www.google.com/maps?q=${eventDetails?.longitude},${eventDetails?.latitude}`, '_blank');
        }

    };

    if (loading)
        return (
            <>
                <Loader message={'Loading Event.......'} />
            </>
        );

    return (
        <>
            {
                eventDetails ?

                    <div className={`flex flex-row md:pl-[200px] px-[60px] w-full overflow-hidden no-scrollbar ${backgroundGradiant} `}>
                        <div className="w-[20%] bg-gray-200 bg-opacity-100 px-[20px] pt-10  ">
                            <div onClick={() => router.back()}
                                className="flex gap-4 cursor-pointer">
                                <img

                                    className="w-[24px] h-[24px]"
                                    src={"/images/back-button-icon.svg"} alt="" />
                                <span className="text-[16px] text-blue-400">Back to events</span>
                            </div>
                            <hr className="mr-0 md:mt-4 mt-2 h-[2px] border-t-0 bg-gray-300" />

                            <h1 className="text-#1C1C1C text-[18px] text-bold text-left mb-2 mt-4">Change event status</h1>
                            <div className="relative">
                                <button onClick={() => setShowMenu(!showMenu)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                                    className="h-[50px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{filterType}
                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                {
                                    showMenu ?
                                        <div id="dropdown" className="absolute z-10 overflow-hidden mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                {
                                                    dropData.map((item, index) => {
                                                        return (
                                                            <li key={index} onClick={() => handleDropDown(item)}>
                                                                <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.name}</a>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div> : null
                                }
                            </div>


                            <h1 className="mb-2 mt-4 text-[20px] font-bold tracking-tight text-gray-900 dark:text-white">{eventDetails?.title}</h1>

                            <p className="mb-[6px] text-[16px] font-normal text-red-500 dark:text-gray-400"> {dayjs(eventDetails?.date, 'YYYY-MM-DD').format("MMM D, YYYY")}, {formattedAMPMTime(eventDetails?.start_time)}</p>

                            <div onClick={() => handleMapLinkClick()}
                                className="cursor-pointer flex items-center justify-start mt-2 mb-4 hover:underline hover:text-blue-500">
                                <img
                                    src="/images/location_icon.svg"
                                    alt="Description of your image"
                                    className="w-[20px] h-[20px] object-stretch" />
                                <p className="ml-2 text-[14px] font-normal text-black dark:text-gray-400">{eventDetails?.address}</p>
                            </div>


                            <div className="flex flex-col gap-4">
                                <span onClick={() => doEditEvent()} className="text-blue-600 cursor-pointer hover:underline">Edit your event</span>

                                <span onClick={() => goToDetails()} className="text-blue-600 cursor-pointer hover:underline">View your event</span>
                            </div>

                        </div>


                        <div className="md:w-[80%] flex justify-center items-start h-screen ml-auto mr-auto  overflow-x-scroll no-scrollbar  mt-10">

                            <div>
                                <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-6">Dashboard</h1>

                                <div className="flex gap-10">
                                    <div className="w-[235px] h-[128px] bg-white rounded-[10px] flex flex-col justify-center items-center pl-4 pt-0">

                                        <span className="text-[24px] font-medium text-black">Tickets Sold</span>
                                        <span className="text-[18px] mt-2">{eventDetails?.total_tickets_remaining} / {eventDetails?.total_tickets}</span>

                                    </div>

                                    <div className="w-[235px] h-[128px] bg-white rounded-[10px] flex flex-col justify-center items-center pl-4 pt-0">

                                        <span className="text-[24px] font-medium text-black">Gross</span>
                                        <span className="text-[18px] mt-2">{eventDetails?.ticket_type === "Free" ? "Free" : `CA$${eventDetails?.ticket_price}`}</span>

                                    </div>

                                    <div className="w-[235px] h-[128px] bg-white rounded-[10px] flex flex-col justify-center items-center pl-4 pt-0">

                                        <span className="text-[24px] font-medium text-black">Status</span>
                                        <span className="text-[18px] mt-2">{eventDetails?.event_status}</span>

                                    </div>
                                </div>
                                <hr className="mr-0 md:mt-8 mt-4 h-[2px] border-t-0 bg-gray-200" />
                                <div className="mt-6">
                                    <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-2">Share</h1>
                                    <span className="text-#1C1C1C text-[18px] text-bold text-left mb-0 mt-6">Event Link</span>
                                    <div className="w-[50%] h-[48px] mt-0 rounded-[10px] flex items-center px-0">

                                        <div className="w-[60%]  text-[14px]">
                                            <p className="truncate text-[14px]">{shareLink}</p>
                                        </div>
                                        <button onClick={() => {
                                            setIsCopied(true)
                                            navigator.clipboard.writeText(shareLink)
                                        }}
                                            className="w-[10%] custom-button"
                                            title={isCopied ? 'copied' : 'copy'}>
                                            <span className="text-[18px] text-[#28a745]">copy</span>
                                        </button>

                                    </div>
                                    <span className="text-#1C1C1C text-[18px] text-bold text-left mb-2 mt-8">Social Share</span>
                                    <div className="flex gap-6 mt-6">
                                        <FacebookShareButton
                                            url={shareLink}
                                            quote={'next-share is a social share buttons for your next React apps.'}
                                            hashtag={'#nextshare'} >
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>

                                        <WhatsappShareButton
                                            /* Url you want to share */
                                            url={shareLink}
                                            title={'next-share is a social share buttons for your next React apps.'}
                                            separator=":: " >
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                        <LinkedinShareButton
                                            url={shareLink} >
                                            <LinkedinIcon size={32} round />
                                        </LinkedinShareButton>
                                    </div>
                                </div>
                                <hr className="mr-0 md:mt-8 mt-4 h-[2px] border-t-0 bg-gray-200" />

                                <div className="flex-col mt-6">
                                    <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-2">Sales by ticket type</h1>
                                    <div className="flex justify-between">
                                        <span className="font-bold">Ticket type</span>
                                        <div className="flex gap-20">
                                            <span className="font-bold">Price</span>
                                            <span className="font-bold">Sold</span>
                                        </div>

                                    </div>
                                    <hr className="mr-0 md:mt-2 mt-4 h-[2px] border-t-0 bg-gray-300" />

                                    <div className="flex justify-between mt-4">
                                        <span >{eventDetails?.ticket_type}</span>
                                        <div className="flex gap-20">
                                            <span className="text-center">{eventDetails?.ticket_type === "Free" ? "Free" : `CA$${eventDetails?.ticket_price}`}</span>
                                            <span className="text-center">{eventDetails?.total_tickets_remaining} / {eventDetails?.total_tickets}</span>
                                        </div>

                                    </div>

                                    {/* <div className="flex justify-between mt-4">
                                        <span>Paid Ticket</span>
                                        <div className="flex gap-20">
                                            <span className="text-center">{eventDetails?.ticket_type === "Free" ? "Free" : `CA$${eventDetails?.ticket_price}`}</span>
                                            <span className="text-center">5/10</span>
                                        </div>

                                    </div> */}
                                </div>

                            </div>
                            {/*   */}
                            {/* <EventCard /> */}
                        </div>


                    </div>
                    : null
            }
        </>
    )
}

export default EventDashboardPage;