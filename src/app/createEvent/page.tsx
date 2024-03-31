"use client";

import React, { useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getIntialials } from "@/app/utils/utility-function";
// import BasicInfo from "./BasicInfo";
// import HomeAddress from "./HomeAddress";
// import BillingAddress from "./BillingAddress";
import { useAppSelector } from "@/app/redux/store";
import TagList from './tags';
import * as _ from "lodash";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import dayjs from 'dayjs';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "react-datepicker/dist/react-datepicker.css";

function CreateEventPage() {
    const router = useRouter();
    const userData = useAppSelector((store) => store.appReducer.userData);
    const [image, setImage] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [showStartDate, setShowStartDate] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [showStartTime, setShowStartTime] = useState(false);
    const [startTime, setStartTime] = useState(dayjs().format("hh:mm A"));
    const [showEndTime, setShowEndTime] = useState(false);
    const [endTime, setEndTime] = useState(dayjs().format("hh:mm A"));
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any>([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [ticketType, setTicketType] = useState([{ id: 0, name: 'Paid', selected: false }, { id: 1, name: 'Free', selected: false }, { id: 2, name: 'Donation', selected: false }])
    const [selectedTicketType, setSelectedTicketType] = useState('')
    const fileInputRef = useRef<any>(null);
    const times = Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 || 12;
        const period = i < 12 ? 'AM' : 'PM';
        return `${hour}:00 ${period}`;
    });
    const dispatch = useDispatch();

    // const doLogOut = () => {
    //     signOut();
    //     dispatch(logOut());
    //     router.push("/");
    // };

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

    const handleFileChange = (event: any) => {
        console.log('event', event)
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                // Set the selected image file to the state
                setImage(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const onEditorStateChange = (editorState: any) => {
        console.log('editorState', editorState.getCurrentContent())

        setEditorState(editorState)
    };

    const handleStartDateClick = (e) => {
        console.log('setStartDate', e)
        setShowStartDate(!showStartDate);
        setStartDate(e);
    };

    const searchAddress = async (query) => {
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

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        if (event.target.value === '') {
            setResults([]);
        } else {
            searchAddress(event.target.value);
        }
    };

    const handleAddressClick = (address) => {
        setSelectedAddress(address);
        setQuery(address?.place_name)
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

    const handleCreateEvent = () => {
        // router.push('/organizations/events')
        router.push('/myevent/preview?eventId=1213adas')
    }

    const whichTicketType = () => {
        if (ticketType && ticketType.length > 0) {
            const ticket = ticketType.find(item => item.selected === true)
            console.log('ticket', ticket?.name)
            return ticket?.name
        }
    }



    const submitButtonClasses = `md:w-[170px] w-[120px] bg-black text-white text-[14px] p-2 rounded-full mb-0 hover:bg-white hover:text-black hover:border hover:border-gray-300`;

    return (

        <div className="flex flex-col h-screen w-full overflow-y-scroll overflow-hidden no-scrollbar md:pl-[250px] md:pr-[80px] px-[25px] all-gradient-background">

            <div className="flex flex-col items-center col-span-4 sm:col-span-3 md:mt-4 mt-12 mb-24">
                <h1 className="text-xl font-bold text-left mb-4 md:mt-2 mt-8">Create an Event</h1>

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
                                image ?
                                    <div className="relative w-full">
                                        <img
                                            src={image}
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
                            // value={formData.firstName}
                            // onChange={handleFormChange}
                            className="shadow-sm md:bg-white-50 bg-gray-50 border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                            placeholder="Event Title"
                            required
                        ></input>
                    </div>

                    <div className="md:col-span-3 col-span-6 mt-10">
                        <label className="text-[16px] font-medium text-gray-900 block mb-0">
                            Select Category
                        </label>
                        <TagList />
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
                                        <span>{dayjs(startDate).format("DD-MM-YYYY")}</span>
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
                                        <span>{startTime}</span>
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
                                        <span>{endTime}</span>
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
                            value={query}
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
                            // value={formData.firstName}
                            // onChange={handleFormChange}
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
                                    // value={formData.firstName}
                                    // onChange={handleFormChange}
                                    className="shadow-sm md:bg-white-50 bg-gray-50 border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-[50%] p-3"
                                    placeholder="Available quantity"
                                    required
                                ></input>

                                <input
                                    type="text"
                                    name="title"
                                    id="title"

                                    disabled={selectedTicketType === "Free" ? true : selectedTicketType === "Donation" ? true : false}
                                    // value={formData.firstName}
                                    // onChange={handleFormChange}
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
                    onClick={handleCreateEvent}
                    className="bg-[#007a33] hover:bg-blue-600 text-[#f2cd00] font-bold py-2 px-4 rounded">
                    Create event
                </button>
            </div>
        </div>

    );
}

export default CreateEventPage;
