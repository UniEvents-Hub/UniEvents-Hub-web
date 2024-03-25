/* eslint-disable @next/next/no-img-element */

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { useAppSelector } from "@/app/redux/store";
import { getValueFromFormData, isEmpty } from "@/app/utils/utility-function"
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

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

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
console.log('process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, amount = 1, quantity = 1 }) => {
    const router = useRouter();
    const userData = useAppSelector((store) => store.appReducer.userData);
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState<FormType>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });

    const submitButtonClasses = `w-[170px] bg-red-500 text-white text-[14px] p-2 rounded-[10px] mb-6 mt-6 hover:bg-white hover:text-black hover:border hover:border-gray-300`;

    useEffect(() => {
        setFormData({
            firstName: userData?.firstName ?? "",
            lastName: userData?.lastName ?? "",
            email: userData?.email ?? "",
            phoneNumber: userData?.phoneNumber ?? "",
        });
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
    }

    const handler = async () => {
        try {
            const { data } = await axios.post("/api/stripe", {
                data: { amount: amount, quantity: quantity },
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log('res.vvvv.', data)
            window.location.href = data.url
            // const { sessionId } = await res.json();

            // const { error } = await stripe.redirectToCheckout({ sessionId });
            // console.log(error);
            // if (error) {
            //     router.push("/errorPage");
            // }
        } catch (err) {
            console.log(err);
            // router.push("/error");
        }
    };

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
                                <h1 className="ml-6 text-[24px]"> Billing information</h1>
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
                                        <button type="submit" className={submitButtonClasses} onClick={handler}>
                                            Proceed to Payment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="flex flex-col md:w-[30%] w-full md:h-full h-full justify-start bg-gray-100 md:pr-0 pr-0 pt-0 md:pb-6 pb-2">
                            <img
                                src="/images/battle_event.jpeg"
                                alt="Description of your image"
                                className="w-full px-[0px] h-[200px] rounded-[0px] object-stretch" />
                            <div className="md:flex hidden justify-end absolute top-0 right-0">
                                <button onClick={() => onClose()} type="button" className="text-black bg-gray-500 h-[40px] w-[40px] hover:bg-gray-600 hover:text-gray-900 rounded-full text-sm inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-[15px] h-[15px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="flex flex-col justify-start md:mx-[40px] ml-[25px] overflow-auto md:mt-4 mt-0">
                                <span className="text-black font-bold md:text-[18px] text-[14px]">Order Summary</span>

                                <div className="flex justify-between mt-6">
                                    <span className="text-[12px]">1 x Early Bird Fee($2249 Standard fee)</span>
                                    <span className="text-[14px]">CAD $100.00</span>
                                </div>
                                <hr className="mr-0 mt-4 h-[2px] border-t-0 bg-gray-200" />

                                <div className="flex justify-between mt-6">
                                    <span className="text-[12px]">SubTotal</span>
                                    <span className="text-[14px]">CAD $100.00</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[12px]">Fees</span>
                                    <span className="text-[14px]">CAD $10.00</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[12px]">Delivery</span>
                                    <span className="text-[14px]">CAD $0.00</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[12px]">Tax</span>
                                    <span className="text-[14px]">CAD $10.00</span>
                                </div>
                                <hr className="mr-0 mt-4 h-[2px] border-t-0 bg-gray-200" />

                                <div className="flex justify-between mt-4">
                                    <span className="text-[18px] ">Total</span>
                                    <span className="text-[14px]">CAD $150.00</span>
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
        </div>
    );
}

export default CheckoutModal;
