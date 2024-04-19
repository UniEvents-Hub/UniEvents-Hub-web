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
import { getEvents, getEventDetails, doUpdateEvent, doUploadImages, getEventImage } from '@/app/services/Event/event-service';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { formattedAMPMTime } from '@/app/utils/utility-function';
dayjs.extend(advancedFormat);
import Loader from '@/app/components/Loader';
import Urls from '@/app/Networking/urls';
import ImageModal from './imageModal';

function ImagesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [backgroundGradiant, setBackgroundGradient] = useState<string>("fashion-gradient-background");
    const [isCopied, setIsCopied] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [dropData, setDropData] = useState([{ id: 0, name: 'On Sale', slug: 'OnSale', selected: false }, { id: 1, name: 'Sold out', slug: 'SoldOut', selected: false }, { id: 2, name: 'Cancelled', slug: 'cancelled', selected: false }, { id: 3, name: 'Publish event', slug: 'publish', selected: false }, { id: 4, name: 'Unpublish event', slug: 'unpublish', selected: false }, { id: 5, name: 'Draft event', slug: 'draft', selected: false }])
    const [filterType, setFilterType] = useState('On Sale');
    const [loading, setLoading] = useState<boolean>(true);
    const [eventDetails, setEventDetails] = useState<any>(null);
    const [shareLink, setShareLink] = useState<any>('')
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const evet_id = searchParams?.get("eventId");
        getEventInfo(evet_id)
        getEventImages(evet_id)
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

    const getEventImages = (id: any) => {

        getEventImage(
            id,
            (success: any) => {
                console.log('getEventImages success', success);

                if (success && success.data.length > 0) {
                    setSelectedImages(success.data)
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



    const handleDropDown = (item: any) => {
        setShowMenu(false)
        if (dropData && dropData.length > 0) {
            const updatedTicketType = dropData.map((obj) => {
                if (item.id === obj.id) {
                    obj.selected = true
                    console.log('obj', obj)
                    setFilterType(obj.name)
                }
                else {
                    obj.selected = false
                }
                return obj;
            })
            setDropData(updatedTicketType)
        }
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

    const handleImageSelect = (e: any) => {
        const files = Array.from(e.target.files);
        console.log('files', files)
        setSelectedImages(files)
        // Do something with the selected files, such as uploading them
    };

    const handleClickImage = (imageUrl: any) => {
        setSelectedImage(imageUrl);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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

                    <div className={`flex flex-row md:pl-[200px] px-[60px] w-full overflow-hidden bg-opacity-10 no-scrollbar ${backgroundGradiant} `}>
                        <div className="w-[20%] bg-gray-200 bg-opacity-80 px-[20px] pt-10  ">
                            <div onClick={() => router.back()}
                                className="flex gap-4 cursor-pointer">
                                <img

                                    className="w-[24px] h-[24px]"
                                    src={"/images/back-button-icon.svg"} alt="" />
                                <span className="text-[16px] text-blue-400">Back to events</span>
                            </div>
                            <hr className="mr-0 md:mt-4 mt-2 h-[2px] border-t-0 bg-gray-300" />



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


                                <span onClick={() => goToDetails()} className="text-blue-600 cursor-pointer hover:underline">View your event</span>
                            </div>

                        </div>


                        <div className="md:w-[80%] flex justify-center items-start h-screen ml-10 mr-auto  overflow-x-scroll no-scrollbar  mt-10">

                            <div>
                                <h1 className="text-#1C1C1C text-[38px] text-bold text-left mb-6">Image Gallery</h1>

                                <div className="flex-col mt-6">


                                    <div className="grid grid-cols-4 gap-4 mt-10 mb-10">
                                        {selectedImages.map((item: any, index: any) => (
                                            item?.image &&
                                            <div onClick={() => handleClickImage(`${Urls.BASE_URL}${item?.image}`)}
                                                key={index} className="relative cursor-pointer">
                                                <img src={item?.image ? `${Urls.BASE_URL}${item?.image}` : ''} alt={`Image ${index}`} className="w-full h-[200px] object-cover rounded-lg" />

                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                            {showModal && (
                                <ImageModal imageUrl={selectedImage} onClose={() => setShowModal(false)} />
                                // <div className="modal">
                                //     <div className="modal-content">
                                //         <button onClick={handleCloseModal} className="close-button">
                                //             Close
                                //         </button>
                                //         <img src={selectedImage} alt="Full image" className="full-image" />
                                //     </div>
                                // </div>
                            )}
                        </div>


                    </div>
                    : null
            }
        </>
    )
}

export default ImagesPage;