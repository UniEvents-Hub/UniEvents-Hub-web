"use client";

import React, { useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { getIntialials, isEmpty } from "@/app/utils/utility-function";
// import BasicInfo from "./BasicInfo";
// import HomeAddress from "./HomeAddress";
// import BillingAddress from "./BillingAddress";
import { useAppSelector } from "@/app/redux/store";
import TagList from './tags';
import * as _ from "lodash";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "react-datepicker/dist/react-datepicker.css";
dayjs.extend(advancedFormat);

import { doCreateEvent, getEventDetails, doUpdateEvent } from '@/app/services/Event/event-service';
import { TokenConstants } from '../utils/constants';
import Loader from '@/app/components/Loader';
import Urls from '@/app/Networking/urls';

function CreateEventPage(props: any) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const userData = useAppSelector((store) => store.appReducer.userData);
    const [errorObj, setErrorObj] = useState<any>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [severImage, setServerImage] = useState('');
    const [filename, setFilename] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showStartDate, setShowStartDate] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [showStartTime, setShowStartTime] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [showEndTime, setShowEndTime] = useState(false);
    const [endTime, setEndTime] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any>([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedCoordinates, setSelectedCoordinates] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [ticketType, setTicketType] = useState([{ id: 0, name: 'Paid', selected: false }, { id: 1, name: 'Free', selected: false }, { id: 2, name: 'Donation', selected: false }])
    const [selectedTicketType, setSelectedTicketType] = useState('');
    const [totalTicket, setTotalTicket] = useState(0);
    const [availableTicket, setAvailableTicket] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [eventDetails, setEventDetails] = useState<any>(null);
    const fileInputRef = useRef<any>(null);
    const times = Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 || 12;
        const period = i < 12 ? 'AM' : 'PM';
        return `${hour}:00 ${period}`;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const evet_id = searchParams?.get("eventId");
        if (evet_id) {
            getEventInfo(evet_id)
        }

    }, []);

    const getEventInfo = (id: any) => {

        getEventDetails(
            id,
            (success: any) => {
                console.log('getEventDetails success', success);

                if (success && success.data.length > 0) {
                    let eventDetails = success.data[0];
                    if (eventDetails) {
                        setIsEdit(true)
                        setEventDetails(eventDetails)
                        if (eventDetails.banner) {
                            setServerImage(`${Urls.BASE_URL}${eventDetails.banner}`)
                        }
                        // if (eventDetails.address) {
                        //     setQuery(eventDetails.address)
                        // }
                        // if (eventDetails.title) {
                        //     setTitle(eventDetails.title)
                        // }
                        // if (eventDetails.total_tickets) {
                        //     setTotalTicket(eventDetails.total_tickets)
                        //     setAvailableTicket(eventDetails.total_tickets)
                        // }
                        // if (eventDetails.ticket_price) {
                        //     setTicketPrice(eventDetails.ticket_price)
                        // }
                        // if (eventDetails.event_type) {
                        //     console.log('eventDetails.event_type', eventDetails.event_type)
                        //     setSelectedCategory(eventDetails.event_type)
                        // }
                        if (eventDetails.ticket_type) {
                            const savedType = ticketType.find(type => type.name === eventDetails.ticket_type);
                            if (savedType) {
                                handleTicketType(savedType)
                            }
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

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };


    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        // Add styling to indicate the drop zone
        // e.target.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        // Remove styling for the drop zone
        // e.target.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        console.log('handleDrop', event)
        // Remove styling for the drop zone
        // e.target.classList.remove('drag-over');

        // Trigger file input click event
        // fileInputRef.current.click();
    };

    function base64ToFile(base64String: any, filename: any) {
        // Check if the Base64 string is in a valid format
        const isValidBase64 = /^data:image\/[a-z]+;base64,/.test(base64String);
        if (!isValidBase64) {
            throw new Error('Invalid Base64 string format');
        }

        // Extract the Base64 data (remove data URI prefix)
        const base64Data = base64String.split(';base64,')[1];

        // Decode the Base64 data
        const byteCharacters = atob(base64Data);

        // Convert byte characters to byte numbers
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        // Create a Uint8Array from the byte numbers
        const byteArray = new Uint8Array(byteNumbers);

        // Create a Blob object from the Uint8Array
        const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust the MIME type if needed

        // Create a File object from the Blob with the given filename
        const file = new File([blob], filename, { type: 'image/jpeg' }); // Adjust the MIME type if needed

        return file;
    }

    const handleFileChange = (event: any) => {
        console.log('event', event)
        const selectedFile = event.target.files[0];
        const filename = selectedFile.name;
        setFilename(filename)
        console.log('filename', filename)
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                // Set the selected image file to the state
                console.log('e', e.target.result)

                setImage(e.target.result);
                const base64String = reader.result;
                console.log('base64String', base64String)
                // const fileObject = base64ToFile(base64String, filename);
                // console.log(fileObject);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const onEditorStateChange = (editorState: any) => {
        console.log('editorState', editorState.getCurrentContent())

        setEditorState(editorState)
    };

    const handleStartDateClick = (e: any) => {
        console.log('setStartDate', e)
        setShowStartDate(!showStartDate);
        setStartDate(e);
    };

    const searchAddress = async (query: any) => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoibW1haG11ZDMiLCJhIjoiY2x1YnRta241MGdqdDJybnlwM2dhZHdmbSJ9.KYysPCZQKr7vVCKqAUKTjQ`);
            const data = await response.json();
            console.log('data', data)
            setResults(data.features);
        } catch (error) {
            console.error('Error:', error);
            setResults([]);
        }
    };

    const handleInputChange = (event: any) => {
        setQuery(event.target.value);
        if (event.target.value === '') {
            setResults([]);
        } else {
            searchAddress(event.target.value);
        }
    };

    const handleAddressClick = (address: any) => {
        console.log('address', address)
        setSelectedAddress(address);
        setQuery(address?.place_name)
        setSelectedCoordinates(address?.geometry?.coordinates)
        setResults([]);
    };

    const handleSaveAddress = () => {
        if (selectedAddress) {
            // Handle saving selected address (e.g., send to server, store in state, etc.)
            console.log('Selected address:', selectedAddress);
            // Reset the selected address and search query
            setSelectedAddress(null);
            setQuery('');
        }
    };

    const getCategoryInfo = (category: any) => {
        if (category) {
            setSelectedCategory(category.slug)
        }
    }

    const handleTicketType = (item: any) => {
        if (ticketType && ticketType.length > 0) {
            const updatedTicketType = ticketType.map((obj) => {
                if (item.id === obj.id) {
                    obj.selected = true
                    console.log('obj', obj)
                    setSelectedTicketType(obj.name)
                }
                else {
                    obj.selected = false
                }
                return obj;
            })
            setTicketType(updatedTicketType)
        }
    }

    const formattedTime = (timeString: any) => {
        // const startTimeString = '6:00 PM';
        const [timePart, ampmPart] = timeString.split(' ');

        // Split the time part into hours and minutes
        const [hours, minutes] = timePart.split(':').map(Number);

        // Convert 12-hour format to 24-hour format
        let hours24 = hours;
        if (ampmPart.toUpperCase() === 'PM' && hours !== 12) {
            hours24 += 12;
        } else if (ampmPart.toUpperCase() === 'AM' && hours === 12) {
            hours24 = 0;
        }

        // Create a new Date object with the adjusted hours and minutes
        const parsedTime = dayjs().set('hour', hours24).set('minute', minutes).set('second', 0);

        if (parsedTime.isValid()) {
            const formattedTime = parsedTime.format('HH:mm:ss');
            console.log(formattedTime); // Output: "18:00:00"
            return formattedTime
        } else {
            console.error('Invalid time format:', timeString);
        }
    }

    const isFormValid = (form: any): any | null => {
        if (!form.banner) {
            const errorObj = {
                inputLabel: 'banner',
                errorMsg: "Banner image is required"
            }
            return errorObj;
        }
        if (isEmpty(form.title)) {
            const errorObj = {
                inputLabel: 'title',
                errorMsg: "Title is required"
            }
            return errorObj;
        }
        if (isEmpty(form.address)) {
            const errorObj = {
                inputLabel: 'address',
                errorMsg: "Address is required"
            }
            return errorObj;
        }
        if ((form.total_tickets === 0)) {
            const errorObj = {
                inputLabel: 'total_tickets',
                errorMsg: "Total ticket is required"
            }
            return errorObj;
        }
        if (isEmpty(form.ticket_type)) {
            const errorObj = {
                inputLabel: 'ticket_type',
                errorMsg: "Ticket type is required"
            }
            return errorObj;
        }
        if (form.ticket_type !== "Free" && form.ticket_price === 0) {
            const errorObj = {
                inputLabel: 'ticket_price',
                errorMsg: "Ticket price is required"
            }
            return errorObj;
        }


        return null;
    };

    const handleCreateEvent = () => {
        // router.push('/organizations/events')
        // router.push('/myevent/preview?eventId=1213adas')
        const formattedStartTime = formattedTime(startTime)
        const formattedEndTime = formattedTime(endTime);

        let user_id = localStorage.getItem(TokenConstants.USER_INFO)
        let params = {
            user: user_id,
            banner: image ? base64ToFile(image, filename) : '',
            event_type: selectedCategory,
            title: title,
            event_status: 'draft',
            date: dayjs(startDate).format("YYYY-MM-DD"),
            start_time: formattedStartTime,
            end_time: formattedEndTime,
            longitude: selectedCoordinates ? selectedCoordinates[1] : 53.5213,
            latitude: selectedCoordinates ? selectedCoordinates[0] : -113.521,
            address: query,
            description: "This is a music event",
            ticket_price: selectedTicketType !== "Free" ? ticketPrice : 0.00,
            ticket_type: selectedTicketType,
            sharable_link: "https://github.com/bobby-didcoding/drf_course/tree/module_1",
            total_tickets: totalTicket,
            availableTicket: availableTicket ? availableTicket : totalTicket

        };
        console.log('params', params)
        const error = isFormValid(params);
        console.log('error', error)
        if (error) {
            setErrorObj(error)
            alert(error.errorMsg)
            return;
        }
        else {
            setLoading(true);
            doCreateEvent(
                params,
                (success: any) => {
                    console.log('doCreateEvent success', success);

                    if (success && success.data) {
                        router.push(`/myevent/preview?eventId=${success.data.id}`)
                    }
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000)
                },
                (error: any) => {
                    console.log('login error', error);
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


    const updatePayload = () => {
        const params = {} as any;
        if (image) {
            params.banner = image ? base64ToFile(image, filename) : ''
        }
        if (!isEmpty(title)) {
            params.title = title
        }
        if (!isEmpty(selectedCategory)) {
            params.event_type = selectedCategory
        }
        if (startDate) {
            params.date = dayjs(startDate).format("YYYY-MM-DD")
        }
        if (!isEmpty(startTime)) {
            let formattedStartTime = formattedTime(startTime)
            params.start_time = formattedStartTime
        }
        if (!isEmpty(endTime)) {
            let formattedEndTime = formattedTime(endTime);
            params.end_time = formattedEndTime
        }
        if (!isEmpty(query)) {
            params.address = query
            params.longitude = selectedCoordinates ? selectedCoordinates[1] : 53.5213
            params.latitude = selectedCoordinates ? selectedCoordinates[0] : -113.521
        }
        if (totalTicket > 0) {
            params.total_tickets = totalTicket
        }
        if (ticketPrice !== 0) {
            params.ticket_price = ticketPrice
        }
        if (!isEmpty(selectedTicketType)) {
            params.ticket_type = selectedTicketType
        }

        console.log('params', params)
        return params

    }
    const handleUpdateEvent = () => {
        // router.push('/organizations/events')
        // router.push('/myevent/preview?eventId=1213adas')


        // let user_id = localStorage.getItem(TokenConstants.USER_INFO)

        const params = updatePayload();
        if (Object.keys(params).length === 0) {
            alert('update some value')
            return;
        }
        else {
            setLoading(true);
            doUpdateEvent(
                eventDetails.id,
                params,
                (success: any) => {
                    console.log('doUpdateEvent success', success);

                    if (success && success.data) {
                        router.push(`/myevent/preview?eventId=${success.data.id}`)
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

    const whichTicketType = () => {
        if (ticketType && ticketType.length > 0) {
            const ticket = ticketType.find(item => item.selected === true)
            console.log('ticket', ticket?.name)
            return ticket?.name
        }
    }



    const submitButtonClasses = `md:w-[170px] w-[120px] bg-black text-white text-[14px] p-2 rounded-full mb-0 hover:bg-white hover:text-black hover:border hover:border-gray-300`;

    if (loading)
        return (
            <>
                <Loader message={isEdit ? 'Updating Event......' : 'Creating Event.......'} />
            </>
        );
    else
        return (

            <div className="flex flex-col h-screen w-full overflow-y-scroll overflow-hidden no-scrollbar md:pl-[250px] md:pr-[80px] px-[25px] all-gradient-background">

                <div className="flex flex-col items-center col-span-4 sm:col-span-3 md:mt-4 mt-12 mb-24">
                    <h1 className="text-xl font-bold text-left mb-4 md:mt-2 mt-8">{isEdit ? 'Edit Event' : 'Create an Event'}</h1>

                    <div className="w-[70%] bg-white md:p-10 p-2 rounded-[20px]">
                        <div className="mb-6 pt-4">
                            <label className="mb-0 block text-xl font-semibold text-[#07074D]">
                                Add Banner Image
                            </label>
                            <span className="text-[12px] text-gray-700">Add photos to show what your event will be about.</span>

                            <div className="mb-8 mt-4"
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}>
                                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                {
                                    image || eventDetails?.banner ?
                                        <div className="relative w-full">
                                            <img
                                                src={image ? image : `${Urls.BASE_URL}${eventDetails?.banner}`}
                                                alt="Selected"
                                                className="h-[300px] w-full rounded-[10px]" />
                                            <div className="absolute top-0 right-0 p-2">
                                                <button
                                                    className="focus:outline-none "
                                                    onClick={handleMenuClick}
                                                >
                                                    <div className="relative">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-[26px] w-[46px] bg-white rounded-[6px] text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3 10a2 2 0 100-4 2 2 0 000 4zm7 0a2 2 0 100-4 2 2 0 000 4zm7 0a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                        </svg>
                                                        <div className="absolute inset-0 mt-2 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[26px] w-[46px] bg-white rounded-[6px] text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M3 10a2 2 0 100-4 2 2 0 000 4zm7 0a2 2 0 100-4 2 2 0 000 4zm7 0a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </button>
                                                {showMenu && (
                                                    <div className="absolute right-0 mt-0 w-[190px] py-2 bg-white rounded-md shadow-lg">
                                                        <button
                                                            onClick={() => {
                                                                setShowMenu(false)
                                                                fileInputRef?.current?.click()
                                                            }}
                                                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full text-left">Upload another image</button>
                                                        <button
                                                            onClick={() => {
                                                                setShowMenu(false)
                                                                setImage(null)
                                                            }}
                                                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full text-left">Remove</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div> :
                                        <label
                                            onClick={() => fileInputRef?.current?.click()}
                                            for="file"
                                            class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] bg-gray-100 p-12 text-center"
                                        >
                                            <div>
                                                {/* <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                                Drop files here
                                            </span>
                                            <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                                Or
                                            </span> */}
                                                <span
                                                    className="inline-flex rounded border border-[#e0e0e0] py-4 px-7 text-base font-medium text-[#07074D] bg-white"
                                                >
                                                    Upload image
                                                </span>
                                            </div>
                                        </label>
                                }

                            </div>
                        </div>
                        <div className="md:col-span-3 col-span-6 mt-10">
                            <label className="text-[16px] font-medium text-gray-900 block mb-2">
                                What’s the name of your event?
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title ? title : eventDetails && eventDetails.title ? eventDetails.title : ''}
                                onChange={(e) => setTitle(e.target.value)}
                                className="shadow-sm md:bg-white-50 bg-gray-50 border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                                placeholder="Event Title"
                                required
                            ></input>
                        </div>

                        <div className="md:col-span-3 col-span-6 mt-10">
                            <label className="text-[16px] font-medium text-gray-900 block mb-0">
                                Select Category
                            </label>
                            <TagList getCategoryInfo={getCategoryInfo} createdcategory={eventDetails && eventDetails?.event_type ? eventDetails?.event_type : ''} />
                        </div>

                        <div className="md:col-span-3 col-span-6 mt-6">
                            <label className="text-[16px] font-medium text-gray-900 block mb-2">
                                When does your event start and end?
                            </label>

                            <div className="flex mt-6">
                                <div className="relative w-1/4 flex flex-col">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date:</label>
                                    <div onClick={() => setShowStartDate(!showStartDate)}
                                        className="relative max-w-sm flex">

                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <span>{startDate ? dayjs(startDate).format("DD-MM-YYYY") : eventDetails && eventDetails.date ? eventDetails.date : "Select your date"}</span>
                                        </div>
                                    </div>
                                    {
                                        showStartDate ?
                                            <div className="absolute z-10 overflow-hidden mt-[70px]">
                                                <DatePicker selected={startDate} onChange={handleStartDateClick} inline />
                                            </div> : null
                                    }
                                </div>

                                <div className="relative w-1/6 flex flex-col ml-20 mr-10">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time:</label>
                                    <div className="relative" onClick={() => setShowStartTime(true)}>
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <span>{startTime ? startTime : eventDetails && eventDetails?.start_time ? eventDetails?.start_time : 'Select start time'}</span>
                                        </div>
                                    </div>

                                    {
                                        showStartTime ?
                                            <div id="dropdown" className="absolute z-1000 overflow-hidden mt-[70px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-60 overflow-y-auto" aria-labelledby="dropdownDefaultButton">
                                                    {
                                                        times.map((time, index) => {
                                                            return (
                                                                <li key={index} onClick={() => {
                                                                    setShowStartTime(!showStartTime);
                                                                    setStartTime(time);

                                                                }}>
                                                                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{time}</a>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div> : null
                                    }

                                </div>
                                {/* {
                                showStartTime ?
                                    <DatePicker
                                        selected={startTime}
                                        onChange={handleStartDateClick}
                                        showTimeSelect
                                        dateFormat="Pp"
                                        inline />
                                    : null
                            } */}

                                <div className="relative w-1/6 flex flex-col">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End time:</label>
                                    <div className="relative" onClick={() => setShowEndTime(true)}>
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <span>{endTime ? endTime : eventDetails && eventDetails?.start_time ? eventDetails?.end_time : "Select end time"}</span>
                                        </div>
                                    </div>

                                    {
                                        showEndTime ?
                                            <div id="dropdown" className="absolute z-1000 overflow-hidden mt-[70px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-60 overflow-y-auto" aria-labelledby="dropdownDefaultButton">
                                                    {
                                                        times.map((time, index) => {
                                                            return (
                                                                <li key={index} onClick={() => {
                                                                    setShowEndTime(!showEndTime);
                                                                    setEndTime(time);

                                                                }}>
                                                                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{time}</a>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div> : null
                                    }
                                </div>

                            </div>

                        </div>

                        <div className="md:col-span-3 col-span-6 mt-10">
                            <label className="text-[16px] font-medium text-gray-900 block mb-2">
                                Where is it located??
                            </label>

                            <input
                                type="text"
                                placeholder="Enter address..."
                                value={query ? query : eventDetails && eventDetails?.address ? eventDetails?.address : query}
                                onChange={handleInputChange}
                                className="shadow-sm md:bg-white-50 bg-gray-50 border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                            />
                            {
                                results && results.length > 0 ?

                                    <ul className="mt-2 border border-gray-300 rounded-md shadow-sm">
                                        {results.map((result: any, index: any) => (
                                            <li
                                                key={index}
                                                onClick={() => handleAddressClick(result)}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            >
                                                {result?.place_name}
                                            </li>
                                        ))}
                                    </ul>
                                    : null}


                        </div>

                        <div className="mt-10">
                            <label className="mb-0 block text-xl font-semibold text-[#07074D]">
                                About this event
                            </label>

                            <span className="text-[12px] text-gray-700">Add more details about your event and include what people can expect if they attend.</span>

                            <div className="border-[1px] border-gray-90">
                                {/* <Editor

                                editorState={editorState}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={onEditorStateChange}

                            /> */}
                                {/* <textarea
                                disabled
                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                            /> */}
                            </div>
                        </div>

                        <div className="md:col-span-3 col-span-6 mt-10">
                            <label className="text-[16px] font-medium text-gray-900 block mb-2">
                                What's the capacity for your event?
                            </label>
                            <span className="text-[12px] text-gray-700">Event capacity is the total number of tickets you're willing to sell.</span>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={totalTicket !== 0 ? totalTicket : eventDetails && eventDetails?.total_tickets ? eventDetails?.total_tickets : totalTicket !== 0 ? totalTicket : ''}
                                onChange={(e: any) => {
                                    setTotalTicket(e.target.value)
                                    setAvailableTicket(e.target.value)
                                }}
                                className="shadow-sm md:bg-white-50 mt-2 bg-gray-50 border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-[50%] p-3"
                                placeholder="Total Capacity"
                                required
                            ></input>
                        </div>

                        <div className="mt-10">
                            <label className="mb-0 block text-xl font-semibold text-[#07074D]">
                                Create Tickets
                            </label>
                            <span className="text-[12px] text-gray-700">Choose a ticket type or build a section with multiple ticket types.</span>
                            <div className="gap-2 mt-6">
                                {
                                    ticketType.map((item: any, index: any) => {
                                        return (
                                            <span
                                                onClick={() => handleTicketType(item)}
                                                key={index}
                                                className={`inline-flex cursor-pointer rounded border ${item.selected ? 'border-[#3659e3] bg-[#3659e3] bg-opacity-20' : 'border-[#e0e0e0]'} py-2 px-5 mr-4 text-base font-medium ${item.selected ? 'text-[#3659e3]' : 'text-[#07074D]'}  bg-white`}
                                            >
                                                {item.name}
                                            </span>
                                        )
                                    })
                                }

                                <div className="mt-6">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={availableTicket !== 0 ? availableTicket : eventDetails && eventDetails?.total_tickets ? eventDetails?.total_tickets : availableTicket !== 0 ? availableTicket : ''}
                                        onChange={(e: any) => setAvailableTicket(e.target.value)}
                                        className="shadow-sm md:bg-white-50 bg-gray-50 border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-[50%] p-3"
                                        placeholder="Available quantity"
                                        required
                                    ></input>

                                    <input
                                        type="text"
                                        name="title"
                                        id="title"

                                        disabled={selectedTicketType === "Free" ? true : selectedTicketType === "Donation" ? true : false}
                                        value={ticketPrice !== 0 ? ticketPrice : eventDetails && eventDetails?.ticket_price ? eventDetails?.ticket_price : ticketPrice !== 0 ? ticketPrice : ''}
                                        onChange={(e: any) => setTicketPrice(e.target.value)}
                                        className="shadow-sm md:bg-white-50 mt-6 bg-gray-50 border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-[50%] p-3"
                                        placeholder={selectedTicketType === "Free" ? "Free" : selectedTicketType === "Donation" ? "Attendeed can donate what they wish" : "Ticket Price e.g $50.0"}
                                        required
                                    ></input>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <BasicInfo />
            <HomeAddress />
            <BillingAddress /> */}
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-end items-end">
                    <button
                        onClick={isEdit && eventDetails ? handleUpdateEvent : handleCreateEvent}
                        className="bg-[#007a33] hover:bg-blue-600 text-[#f2cd00] font-bold py-2 px-4 rounded">
                        {isEdit ? 'Edit event' : 'Create event'}
                    </button>
                </div>
            </div>

        );
}

export default CreateEventPage;
