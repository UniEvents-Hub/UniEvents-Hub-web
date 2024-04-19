/* eslint-disable @next/next/no-img-element */

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { useAppSelector } from "@/app/redux/store";
import { getValueFromFormData, isEmpty } from "@/app/utils/utility-function"
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { doBuyTicket } from '@/app/services/Event/event-service';
import Loader from '@/app/components/Loader';
import { TokenConstants } from '@/app/utils/constants';
import Urls from '@/app/Networking/urls';
import SuccessToast from '@/app/components/common/successToast';

type FormType = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
};

interface CheckoutModalProps {
    onClose: () => void;
    amount: number;
    quantity: number;
}

// const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// console.log('process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, amount = 1, quantity = 1, eventDetails }: any) => {
    const router = useRouter();
    const userData = useAppSelector((store) => store.appReducer.userData);
    const pathname = usePathname();

    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<FormType>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });
    const [isShowToast, setIsShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const submitButtonClasses = `w-[170px] bg-red-500 text-white text-[14px] p-2 rounded-[10px] mb-6 mt-6 hover:bg-red-400 hover:text-white`;

    useEffect(() => {
        setFormData({
            firstName: userData?.user?.first_name ?? "",
            lastName: userData?.user?.last_name ?? "",
            email: userData?.user?.email ?? "",
            phoneNumber: userData?.profile?.phone_number ?? "",
        });
        console.log('pathname', pathname)
    }, [userData]);

    const handlePhoneChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            phoneNumber: value,
        }));
    };

    const handleFormChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const formSubmitAction = async (form: FormData) => {
        const object: FormType = {
            firstName: getValueFromFormData(form, "firstName") ?? "",
            lastName: getValueFromFormData(form, "lastName") ?? "",
            email: getValueFromFormData(form, "email") ?? "",

            // if phone number is empty then don't add + sign else add + sign
            phoneNumber: isEmpty(formData.phoneNumber)
                ? ""
                : `+${formData.phoneNumber}`,
        };

        buyTicket()
    }

    const handler = async (quantity: any) => {
        console.log('quantity', quantity)
        try {
            if (eventDetails) {
                let subTotal = eventDetails?.ticket_price * quantity
                let tax = eventDetails?.ticket_price * quantity * 0.05
                let totalAmount = subTotal + tax
                let cancelPath = `${window.location.origin}${pathname}?eventId=${eventDetails?.id}`
                let successPath = `${window.location.origin}/success?q_Id=${quantity}&eventId=${eventDetails?.id}`
                const { data } = await axios.post("/api/stripe", {
                    data: { amount: eventDetails?.ticket_price, quantity: quantity, cancelUrl: cancelPath, successUrl: successPath },
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                console.log('res.vvvv.', data)
                window.location.href = data.url
                setLoading(false)



                // const { sessionId } = await res.json();

                // const { error } = await stripe.redirectToCheckout({ sessionId });
                // console.log(error);
                // if (error) {
                //     router.push("/errorPage");
                // }

            }

        } catch (err) {
            console.log(err);
            // router.push("/error");
        }
    };

    const buyTicket = () => {
        let user_id = localStorage.getItem(TokenConstants.USER_INFO);
        let subTotal = eventDetails?.ticket_price * quantity
        let tax = eventDetails?.ticket_price * quantity * 0.05
        let totalAmount = subTotal + tax
        const params = {
            ticket_number: quantity,
            total_cost: eventDetails?.ticket_type !== "Free" ? 0.00 : totalAmount ? totalAmount : 0.00,
            user: user_id,
            event: eventDetails?.id,
            order_id: 4600,
            invoice_id: 3378
        };
        if (eventDetails?.ticket_type !== "Free") {
            setIsLoading(true)
            handler(quantity)
        }
        else {
            setIsLoading(true)
            doBuyTicket(
                params,
                (success: any) => {
                    console.log('doBuyTicket success', success);

                    if (success && success.data.ticket) {
                        setIsShowToast(true)
                        setToastMsg("Thanks for your order!.")

                        setTimeout(() => {
                            router.push(`/tickets/orderDetails?orderId=${success.data.ticket?.id}&eventId=${success.data.ticket.event}`)
                        }, 1000)

                    }
                    setLoading(false);
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


    const handleClose = (e: any) => {
        if (e.target.id === 'wrapper') onClose();
    }
    return (
        <div id="wrapper" onClick={handleClose} aria-hidden="true" className="fixed top-0 right-0 bg-black bg-opacity-60 h-full w-full flex items-center justify-center" style={{ 'zIndex': 9999 }}>
            <div className="relative p-0 md:w-[60%] w-[330px] max-w-full max-h-full">

                <div className="bg-white rounded-[20px] overflow-hidden shadow dark:bg-gray-700">
                    <div className="flex md:flex-row flex-col flex-wrap justify-start ">
                        <div className="md:w-[70%] w-full flex flex-col h-[60%] relative">
                            <div className="h-[50px] w-full flex flex-col justify-center items-center">
                                <h1 className="mt-6 text-[20px]">Checkout</h1>
                            </div>
                            <hr className="mr-0 mt-4 h-[2px] border-t-0 bg-gray-200" />

                            <div className="px-[60px] mt-10">
                                <h1 className="ml-6 text-[24px]"> Contact information</h1>
                                <form action={formSubmitAction} ref={formRef}>
                                    <div className="flex flex-col">
                                        <div className="bg-white rounded-lg relative">
                                            <div className="p-6 space-y-4">
                                                <div className="grid grid-cols-6 md:gap-6 gap-4">
                                                    <div className="md:col-span-3 col-span-6">
                                                        <label className="text-sm font-medium text-gray-900 block mb-2">
                                                            First Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            id="firstName"
                                                            value={formData.firstName}
                                                            onChange={handleFormChange}
                                                            className="shadow-sm md:bg-white-50 bg-[#F0F0F0] border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                                                            placeholder="Zendaya"
                                                            required
                                                        ></input>
                                                    </div>

                                                    <div className="md:col-span-3 col-span-6 ">
                                                        <label className="text-sm font-medium text-gray-900 block mb-2">
                                                            Last Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            id="lastName"
                                                            value={formData.lastName}
                                                            onChange={handleFormChange}
                                                            className="shadow-sm md:bg-white-50 bg-[#F0F0F0] border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                                                            placeholder="Coleman"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="md:col-span-3 col-span-6">
                                                        <label className="text-sm font-medium text-gray-900 block mb-2">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            id="email"
                                                            value={formData.email}
                                                            onChange={handleFormChange}
                                                            className="shadow-sm md:bg-white-50 bg-[#F0F0F0] border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                                                            placeholder="sample.email@gmail.com"
                                                        ></input>
                                                    </div>

                                                    <div className="md:col-span-3 col-span-6">
                                                        <label className="text-sm font-medium text-gray-900 block mb-2">
                                                            Phone
                                                        </label>
                                                        <PhoneInput
                                                            country={"ca"}
                                                            preferredCountries={["ca", "us", "uk"]}
                                                            enableSearch={true}
                                                            inputStyle={{ height: "auto", width: "inherit" }}
                                                            inputClass="shadow-sm md:bg-white-50 bg-[#F0F0F0] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-black-600 focus:border-black-600 block w-full p-2"
                                                            onChange={handlePhoneChange}
                                                            value={formData.phoneNumber}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <button type="submit" className={submitButtonClasses}>
                                            {
                                                isLoading ?
                                                    <div>
                                                        <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                                        </svg>
                                                        Processing...
                                                    </div> :
                                                    eventDetails?.ticket_type === "Free" ? "Register" : 'Proceed to Payment'
                                            }

                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="flex flex-col md:w-[30%] w-full md:h-full h-full justify-start bg-gray-100 md:pr-0 pr-0 pt-0 md:pb-6 pb-2">
                            <img
                                src={eventDetails.banner ? `${Urls.BASE_URL}${eventDetails.banner}` : '/images/event_banner.jpeg'}
                                alt="Description of your image"
                                className="w-full px-[0px] h-[200px] rounded-[0px] object-stretch" />
                            <div className="md:flex hidden justify-end absolute top-0 right-0">
                                <button onClick={() => onClose()} type="button" className="text-black bg-yellow-500 h-[40px] w-[40px] hover:bg-gray-600 hover:text-gray-900 rounded-full text-sm inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-[15px] h-[15px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="flex flex-col justify-start md:mx-[40px] ml-[25px] overflow-auto md:mt-4 mt-0">
                                <span className="text-black font-bold md:text-[18px] text-[14px]">Order Summary</span>

                                <div className="flex justify-between mt-6">
                                    <span className="text-[12px]">{`${quantity} x ($${eventDetails?.ticket_price} Standard fee)`}</span>
                                    <span className="text-[14px]">CAD ${eventDetails?.ticket_price * quantity}</span>
                                </div>
                                <hr className="mr-0 mt-4 h-[2px] border-t-0 bg-gray-200" />

                                <div className="flex justify-between mt-6">
                                    <span className="text-[12px]">SubTotal</span>
                                    <span className="text-[14px]">CAD ${eventDetails?.ticket_price * quantity}</span>
                                </div>
                                {/* <div className="flex justify-between mt-2">
                                    <span className="text-[12px]">Fees</span>
                                    <span className="text-[14px]">CAD $10.00</span>
                                </div> */}
                                {/* <div className="flex justify-between mt-2">
                                    <span className="text-[12px]">Delivery</span>
                                    <span className="text-[14px]">CAD $0.00</span>
                                </div> */}
                                {
                                    eventDetails?.ticket_type !== "Free" &&
                                    <div className="flex justify-between mt-2">
                                        <span className="text-[12px]">Tax</span>
                                        <span className="text-[14px]">CAD ${eventDetails?.ticket_price * quantity * 0.05}</span>
                                    </div>
                                }

                                <hr className="mr-0 mt-4 h-[2px] border-t-0 bg-gray-200" />

                                <div className="flex justify-between mt-4">
                                    <span className="text-[18px] ">Total</span>
                                    <span className="text-[14px]">CAD ${eventDetails?.ticket_price * quantity + eventDetails?.ticket_price * quantity * 0.05}</span>
                                </div>
                            </div>
                        </div>

                        <div className="md:hidden flex justify-center items-center h-[50px] shadow border-t-[1px] bg-white">
                            <button onClick={() => onClose()}>
                                <span className="text-black">Close</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                isShowToast ?
                    <SuccessToast
                        message={toastMsg}
                        closeModal={() => setIsShowToast(false)} /> : null
            }
        </div>
    );
}

export default CheckoutModal;
