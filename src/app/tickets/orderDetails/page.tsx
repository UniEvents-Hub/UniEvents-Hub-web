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
import MapView from '@/app/components/MapComponent/Map';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);
import Urls from '@/app/Networking/urls';

function OrderDetailsPage() {
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

    return (
        <>
            <div className={`flex flex-row md:pl-[200px] px-[60px] w-full overflow-hidden no-scrollbar ${backgroundGradiant} `}>
                <div className="w-[20%] bg-gray-200 bg-opacity-100 px-[20px] pt-10  ">
                    <div onClick={() => router.back()}
                        className="flex gap-4 cursor-pointer">
                        <img

                            className="w-[24px] h-[24px]"
                            src={"/images/back-button-icon.svg"} alt="" />
                        <span className="text-[16px] text-blue-400">Back to Tickets</span>
                    </div>
                    <hr className="mr-0 md:mt-4 mt-2 h-[2px] border-t-0 bg-gray-300" />

                    <div className="mt-6">
                        <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-2">Share</h1>
                        <span className="text-#1C1C1C text-[18px] text-bold text-left mb-0 mt-6">Event Link</span>
                        <div className="w-[100%] h-[48px] mt-0 rounded-[10px] flex items-center px-0">

                            <div className="w-[80%]  text-[14px]">
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

                </div>


                <div className="md:w-[100%] flex justify-center items-start h-screen ml-auto mr-auto  overflow-x-scroll no-scrollbar  mt-10">

                    {
                        eventDetails &&

                        <div className="w-[50%] flex flex-col">
                            <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-6">Order Details</h1>

                            <div className="flex flex-col bg-white rounded-[10px] pl-0 pt-4">

                                <div className={`h-[200px] w-full rounded-[10px] mt-[-20px] ml-[0px] culture-gradient-background opacity-100`}>
                                    <img
                                        src={eventDetails.banner ? `${Urls.BASE_URL}${eventDetails.banner}` : '/images/event_banner.jpeg'}
                                        alt="Description of your image"
                                        className="w-full h-[200px] rounded-[10px] object-cover" />
                                </div>

                                <div className="w-[100%] flex">
                                    <div className="w-[70%] ml-0">
                                        <h1 className="mb-2 ml-6 mt-4 text-[20px] font-bold tracking-tight text-gray-900 dark:text-white">{eventDetails?.title}</h1>
                                        <div className="flex flex-col gap-0 mt-0 ml-6">
                                            <span onClick={() => goToDetails()} className="text-blue-600 cursor-pointer hover:underline">View your event</span>
                                        </div>

                                        <div className="flex justify-between mx-6 mt-4">
                                            <div className="flex flex-col items-start">
                                                <span className="mb-[6px] text-[16px] font-normal text-green-500 dark:text-gray-400">Date</span>
                                                <p className="mb-[6px] text-[16px] font-normal text-black dark:text-gray-400">{dayjs(eventDetails?.date, 'YYYY-MM-DD').format("MMM D, YYYY")}</p>
                                            </div>

                                            <div className="flex flex-col items-start mr-7">
                                                <span className="mb-[6px] text-[16px] font-normal text-green-500 dark:text-gray-400">Time</span>
                                                <p className="mb-[6px] text-[16px] font-normal text-black dark:text-gray-400">{eventDetails?.start_time}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mx-6 mt-6 mb-8">
                                            <div className="flex flex-col items-start">
                                                <span className="mb-[6px] text-[16px] font-normal text-green-500 dark:text-gray-400">Ticket number</span>
                                                <p className="mb-[6px] text-[16px] font-normal text-black dark:text-gray-400">EVSDS</p>
                                            </div>

                                            <div className="flex flex-col items-start">
                                                <span className="mb-[6px] text-[16px] font-normal text-green-500 dark:text-gray-400">Seat number</span>
                                                <p className="mb-[6px] text-[16px] font-normal text-black dark:text-gray-400">N/A</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <hr className="mr-0 md:mt-8 mt-4 h-[2px] border-t-0 bg-gray-200" /> */}
                                    <div className="w-[30%] flex items-center">
                                        <hr className="mr-0 md:mt-0 mt-4 h-full w-[2px] border-t-0 bg-gray-200" />

                                        <div className="flex flex-col justify-center items-center ml-8">
                                            <h1 className="mb-2 ml-0 mt-0 text-[16px] font-bold tracking-tight text-blue-400 dark:text-white">{eventDetails?.title}</h1>
                                            <img
                                                src={'/images/qr-code-sample.svg'}
                                                alt="Description of your image"
                                                className="w-[120px] h-[120px] mt-0  rounded-[10px] object-cover" />
                                        </div>

                                    </div>
                                </div>

                                <hr className="mr-0 md:mt-0 mt-4 h-[2px] border-t-0 bg-gray-200" />
                                {
                                    eventDetails && <div className="w-ful flex flex-col justify-start items-start pl-4 pt-4">

                                        <div className="flex flex-col items-start mt-4 ml-2 w-full h-[400px] mb-10">
                                            <h1 className="mb-2 text-[26px] font-bold text-gray-900 dark:text-white">Event Location</h1>
                                            <div className="flex items-center justify-start mt-0 ml-0 mb-4">
                                                <img
                                                    src="/images/location_icon.svg"
                                                    alt="Description of your image"
                                                    className="w-[20px] h-[20px] object-stretch" />
                                                <p className="ml-1 text-[14px] font-normal text-black dark:text-gray-400">{eventDetails?.address}</p>
                                            </div>
                                            <MapView latitude={eventDetails?.latitude} longitude={eventDetails?.longitude} />
                                        </div>
                                    </div>
                                }
                            </div>
                            <hr className="mr-0 md:mt-0 mt-4 h-[2px] border-t-0 bg-gray-200" />

                            <hr className="mr-0 md:mt-8 mt-4 h-[2px] border-t-0 bg-gray-200" />
                            <div className="w-[100%] flex flex-col bg-white rounded-lg pl-6 mb-10">
                                <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-2 mt-2">Invoice</h1>

                                <div className="flex flex-col bg-white rounded-[10px] pl-0 pt-0">
                                    <div className="flex justify-between mx-0 mt-0">
                                        <div className="flex flex-col items-start">
                                            <span className="mb-[6px] text-[16px] font-normal text-green-500 dark:text-gray-400">Order ID: 615123</span>
                                        </div>

                                        <div className="flex flex-col items-start mr-7">
                                            <p className="mb-[6px] text-[16px] font-normal text-black dark:text-gray-400">{dayjs().format("MMM D, YYYY")}</p>
                                        </div>
                                    </div>

                                    <hr className="mr-0 md:mt-0 mt-4 h-[2px] border-t-0 bg-gray-200" />
                                    <h1 className="mb-2 ml-0 mt-4 text-[20px] font-bold tracking-tight text-gray-900 dark:text-white">{eventDetails?.title}</h1>

                                    <h1 className="text-#1C1C1C text-[28px] text-bold text-left mb-2 mt-2">Invoice Details</h1>
                                    <hr className="mr-0 md:mt-0 mt-4 h-[2px] border-t-0 bg-gray-200" />

                                    <div className="flex justify-between items-center mr-10 mt-6 mb-8">
                                        <div className='flex items-center md:py-0 py-2 mt-0 '>
                                            <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                                <img
                                                    src="/images/ticket_icon.svg"
                                                    alt="Description of your image"
                                                    className="w-[20px] h-[20px] object-cover" />
                                                {/* <span className="text-[12px]">Save</span> */}

                                            </div>
                                            <div className='flex flex-col items-start ml-[14px]'>
                                                <span className="text-[14px] text-gray-500">Total Tickets</span>
                                                <span className="text-[12px]">2</span>
                                            </div>
                                        </div>

                                        <div className='flex items-center md:py-0 py-2'>
                                            <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                                <img
                                                    src="/images/amount_icon.svg"
                                                    alt="Description of your image"
                                                    className="w-[20px] h-[20px] object-cover" />
                                                {/* <span className="text-[12px]">Save</span> */}

                                            </div>
                                            <div className='flex flex-col items-start ml-[14px]'>
                                                <span className="text-[14px] text-gray-500">Paid Amound</span>
                                                <span className="text-[12px]">CAD $20.00</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    }
                    {/*   */}
                    {/* <EventCard /> */}
                </div>


            </div>
        </>
    )
}

export default OrderDetailsPage;