"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryList from "@/app/components/categories/CategoryList";
import UpcomingList from "@/app/components/categories/UpcomingList";
import EventCard from "@/app/components/EventCard/eventCard"
import MapView from '@/app/components/MapComponent/Map';
import CheckoutModal from "./checkout-modal"
import ShareModal from "../../components/EventCard/share-modal";
import { getEvents, getEventDetails, doUpdateEvent } from '@/app/services/Event/event-service';
import Loader from '@/app/components/Loader';
import Urls from '@/app/Networking/urls';

function EventPreviewPage() {
    const router = useRouter();

    const [backgroundGradiant, setBackgroundGradient] = useState<string>("tech-gradient-background");
    const [ticketCount, setTicketCount] = useState(1)
    const [ticketPrice, setTicketPrice] = useState(10);
    const [eventDetails, setEventDetails] = useState<any>(null);
    const [shareLink, setShareLink] = useState<any>('')
    const [isCheckoutModalShow, setIsCheckoutModalShow] = useState(false);
    const [isShareModalShow, setIsShareModalShow] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();

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
                    setTicketPrice(Number(success.data[0].ticket_price))
                    let link = `${window.location.origin}/eventDetails?eventId=${success.data[0].id}`
                    setShareLink(link)
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

    const handleUpdateEvent = () => {
        const params = {
            event_status: 'publish'
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
                        getEventInfo(success.data.id)
                        // router.push(`/myevent/preview?eventId=${success.data.id}`)
                        // router.push('/organizations/events')
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

    const doEditEvent = () => {
        router.push(`/createEvent?eventId=${eventDetails?.id}`);
        // router.push('/createEvent')
    }

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
                    <>

                        <div className={`flex flex-col pl-[300px] pr-[100px] w-full overflow-hidden no-scrollbar ${backgroundGradiant} `}>
                            <div className={`h-[400px] w-full rounded-[20px] mt-10 culture-gradient-background opacity-100`}>
                                <img
                                    src={eventDetails.banner ? `${Urls.BASE_URL}${eventDetails.banner}` : "/images/battle_event.jpeg"}
                                    alt="Description of your image"
                                    className="w-full px-[100px] h-[400px] rounded-[20px] object-stretch" />
                            </div>

                            <div className="w-full flex items-center">
                                <div className="md:pt-10 pt-20 w-[90%] ">
                                    <h5 className="mb-2 text-[26px] font-bold tracking-tight text-gray-900 dark:text-white">{eventDetails?.title}</h5>
                                    <p className="mb-[6px] text-[18px] font-normal text-black dark:text-gray-400">{eventDetails?.date}, {eventDetails?.start_time}</p>

                                    <div className="flex items-center justify-start mt-2">
                                        <img
                                            src="/images/location_icon.svg"
                                            alt="Description of your image"
                                            className="w-[20px] h-[20px] object-stretch" />
                                        <p className="ml-2 text-[14px] font-normal text-black dark:text-gray-400">{eventDetails?.address}</p>
                                    </div>
                                </div>

                                <div className="w-[10%] flex items-center gap-6 justify-end">
                                    <div onClick={() => setIsShareModalShow(true)} className={`h-[30px] w-[80px] gap-2 rounded-[6px] px-4 py-3 text-sm font-semibold hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                        <img
                                            src="/images/share_icon.svg"
                                            alt="Description of your image"
                                            className="w-[16px] h-[16px] object-stretch" />
                                        <span className="text-[12px]">Share</span>
                                    </div>
                                    <div className={`h-[30px] w-[80px] gap-2 rounded-[6px] px-4 py-3 text-sm font-semibold hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                        <img
                                            src="/images/favourite_icon.svg"
                                            alt="Description of your image"
                                            className="w-[16px] h-[16px] object-stretch" />
                                        <span className="text-[12px]">Save</span>
                                    </div>
                                </div>
                            </div>


                            <hr className="mr-0 mt-4 h-[2px] border-t-0 bg-gray-200" />


                            <div className="w-full flex items-center">
                                <div className="flex flex-col items-start mt-4 w-[60%] ">
                                    <h5 className="mb-2 text-[26px] font-bold tracking-tight text-gray-900 dark:text-white">About This Event</h5>
                                    <div className="flex flex-col mb-[6px] gap-4 text-[14px] font-normal text-gray-700 dark:text-gray-400">
                                        <span>Registration and lunch served: 11:45AM</span>
                                        <span>Presentation: 12:00PM-1:00PM</span>
                                        <p> {eventDetails?.description}
                                        </p>
                                        <span>Please join us as we listen, learn and discuss.</span>
                                    </div>

                                </div>

                                <div className="w-[30%] h-full flex justify-end items-end ml-auto">
                                    <div className="w-[300px] h-full py-4 px-4 flex flex-col justify-end border-[1px] rounded-[10px] border-gray-300">

                                        <div className="flex w-[260px] justify-between gap-2 ">
                                            <div className="flex"></div>
                                            <div className="flex gap-[10px]">
                                                <div onClick={() => {
                                                    if (ticketCount > 1) { setTicketCount(ticketCount - 1) }
                                                }}
                                                    className="w-[30px] h-[30px] cursor-pointer rounded-[6px] bg-blue-600 flex justify-center items-center">
                                                    <span className="text-white text-[20px]"> - </span>
                                                </div>
                                                <span className="text-black text-[20px]"> {ticketCount} </span>
                                                <div onClick={() => {
                                                    setTicketCount(ticketCount + 1)
                                                }}
                                                    className="w-[30px] h-[30px] rounded-[6px] cursor-pointer bg-blue-600 flex justify-center items-center">
                                                    <span className="text-white text-[20px]"> + </span>
                                                </div>
                                            </div>

                                        </div>
                                        <span className="text-left text-[16px] mt-6">CAD ${ticketCount * ticketPrice}</span>

                                        <button onClick={() => setIsCheckoutModalShow(true)}
                                            className="h-[30px] w-full mx-[0px] mt-2 bg-red-600 rounded-[10px] items-center">
                                            <span className="text-[14px] text-white"> Check out for CAD ${ticketCount * ticketPrice} </span>
                                        </button>
                                    </div>

                                </div>
                            </div >

                            <div className="flex flex-col items-start mt-4 w-[60%] mb-20">
                                <h1 className="mb-2 text-[26px] font-bold text-gray-900 dark:text-white">Location</h1>
                                <MapView latitude={eventDetails?.latitude} longitude={eventDetails?.longitude} />
                            </div>
                        </div >

                        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-end items-end">
                            <button
                                onClick={() => doEditEvent()}
                                className="bg-red-600 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-10 rounded">
                                Edit event
                            </button>
                            {
                                eventDetails && eventDetails?.event_status !== "publish" ?
                                    <button
                                        onClick={() => handleUpdateEvent()}
                                        className="bg-[#007a33] hover:bg-blue-600 text-[#f2cd00] font-bold py-2 px-4 rounded">
                                        Publish event
                                    </button> : null
                            }

                        </div>

                        {isCheckoutModalShow ? (
                            <CheckoutModal
                                onClose={() => setIsCheckoutModalShow(false)}
                                amount={ticketPrice}
                                quantity={ticketCount}
                            />
                        ) : null}

                        {
                            isShareModalShow ?
                                <ShareModal
                                    shareLink={shareLink}
                                    onClose={() => setIsShareModalShow(false)} /> : null
                        }
                    </>
                    :
                    null
            }

        </>
    )
}

export default EventPreviewPage;