"use client";
import Head from "next/head";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/store";
import { getUserOrderDetails } from "../services/User/user-service";
import { doBuyTicket, getEventDetails } from '@/app/services/Event/event-service';
import { TokenConstants } from '@/app/utils/constants';
import Loader from '@/app/components/Loader';

const Success = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userData = useAppSelector((store) => store.appReducer.userData);
    const [invoiceId, setInvoiceId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [eventDetails, setEventDetails] = useState<any>(null);

    useEffect(() => {
        const evet_id = searchParams?.get("eventId");
        getEventInfo(evet_id)
    }, []);

    const getEventInfo = (id: any) => {
        setLoading(true)
        getEventDetails(
            id,
            (success: any) => {
                console.log('getEventDetails success', success);

                if (success && success.data.length > 0) {
                    setEventDetails(success.data[0]);
                    buyTicket(success.data[0])
                }
            },
            (error: any) => {
                console.log('login error', error);
                alert('Something went wrong!')
                setTimeout(() => {
                    setLoading(false);
                }, 1000)
            },
        );
    }

    const buyTicket = (eventInfo: any) => {
        let quantity = 1
        quantity = Number(searchParams?.get("q_Id"));
        let user_id = localStorage.getItem(TokenConstants.USER_INFO);
        let subTotal = eventInfo?.ticket_price * quantity
        let tax = eventInfo?.ticket_price * quantity * 0.05
        let totalAmount = subTotal + tax
        const params = {
            ticket_number: quantity ? quantity : 1,
            total_cost: totalAmount ? totalAmount : 0.00,
            user: user_id,
            event: eventInfo?.id
        };

        doBuyTicket(
            params,
            (success: any) => {
                console.log('doBuyTicket success', success);

                if (success && success.data.ticket?.id) {
                    if (success.data.ticket?.id) {
                        getOrderDetails(success.data.ticket?.id)
                        setOrderId(success.data.ticket?.id)
                    }
                }
                setTimeout(() => {
                    setLoading(false);
                }, 1000)
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

    const getOrderDetails = (order_id: any) => {

        getUserOrderDetails(
            order_id,
            (success: any) => {
                console.log('getUserOrderDetails success', success);
                if (success && success.data) {
                    setInvoiceId(success.data.invoice_id)
                }
            },
            (error: any) => {
                console.log('getUserOrderDetails error', error);
            },
        );

    }

    const goOrderDetails = () => {
        const evet_id = searchParams?.get("eventId");
        setTimeout(() => {
            router.push(`/tickets/orderDetails?orderId=${orderId}&eventId=${evet_id}`)
        }, 1000)
    }

    if (loading)
        return (
            <>
                <Loader message={'Payment Processing.......'} />
            </>
        );

    return (
        <>
            <div className="flex flex-col pl-[300px] pr-[100px] mt-20 w-full overflow-hidden no-scrollbar justify-center items-center">
                <h1 className=" text-[20px] text-green-500 font-bold text-center">Thank you, {userData?.user?.first_name} {userData?.user?.last_name}. Your order is complete!</h1>
                <h3 className="text-gray-500 text-[18px] text-center">Your confirmation number is {invoiceId}</h3>

                <div onClick={() => {
                    goOrderDetails()

                }}
                    className='w-[210px] mt-4 mr-4 bg-green-600 h-[50px] rounded-lg p-4 flex justify-center items-center cursor-pointer  hover:bg-green-800'>
                    <span className="mb-0 text-[18px] font-medium text-white dark:text-gray-400">Go To Order Details</span>

                </div>
                {/* 
                <div className="h-[240px] mt-20 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <div className="w-[100%] h-[60%] flex">
                        <img
                            className=" w-[50%] h-[150px]"
                            src={"/images/event_banner.jpeg"} alt="" />
                        <div className='w-[60%] ml-6 mt-4'>
                            <a href="#">
                                <h1 className="mb-2 text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Hello Edmonton</h1>
                            </a>
                            <p className="mb-[6px] text-[16px] font-normal text-red-500 dark:text-gray-400">Tuesday, Mar 12, 1:00 PM</p>
                            <div className="flex items-center justify-start mt-2  cursor-pointer hover:underline">
                                <img
                                    src="/images/location_icon.svg"
                                    alt="Description of your image"
                                    className="w-[20px] h-[20px] object-stretch" />
                                <p className="ml-2 text-[14px] font-normal text-black dark:text-gray-400">Universirty Of Alberta</p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <hr className="mr-0 mt-2 h-[2px] border-t-0 bg-gray-200" />


                    <div className="h-[40%] flex justify-between items-center pb-4 ml-10 mr-10 pt-4">

                        <div className='flex items-center'>
                            <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                <img
                                    src="/images/favourite_icon.svg"
                                    alt="Description of your image"
                                    className="w-[20px] h-[20px] object-cover" />
                                 

                            </div>
                            <div className='flex flex-col items-start ml-[14px]'>
                                <span className="text-[14px] text-gray-500">Order ID</span>
                                <span className="text-[12px]">16AJPY</span>
                            </div>
                        </div>

                        <div className='flex items-center'>
                            <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                <img
                                    src="/images/favourite_icon.svg"
                                    alt="Description of your image"
                                    className="w-[20px] h-[20px] object-cover" />
                                 

                            </div>
                            <div className='flex flex-col items-start ml-[14px]'>
                                <span className="text-[14px] text-gray-500">Total Tickets</span>
                                <span className="text-[12px]">1</span>
                            </div>
                        </div>

                        <div className='flex items-center'>
                            <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                <img
                                    src="/images/favourite_icon.svg"
                                    alt="Description of your image"
                                    className="w-[20px] h-[20px] object-cover" />
                                

                            </div>
                            <div className='flex flex-col items-start ml-[14px]'>
                                <span className="text-[14px] text-gray-500">Paid Amound</span>
                                <span className="text-[12px]">CAD $10</span>

                            </div>
                        </div>


                    </div>


                </div> */}
            </div>
        </>
    );
};

export default Success;