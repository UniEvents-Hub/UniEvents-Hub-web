"use client";


import {
    getValueFromFormData,
    isEmpty,
    validateEmail,
    validatePhoneNumber,
} from "@/app/utils/utility-function";
import { User } from "@/app/models/user";

import { useAppSelector } from "@/app/redux/store";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { provinceData } from '@/app/utils/provinceData'
import { useDispatch } from "react-redux";
import Select from "react-select";
import * as _ from "lodash";
import { doUpdateUser } from '@/app/services/User/user-service';
import { TokenConstants } from '../utils/constants';
import MessageModal from '@/app/components/common/messageModal';

type FormType = {
    billing_address1: string;
    billing_address2: string;
    billing_city: string;
    billing_province: string;
    billing_zipcode: string;
    billing_country: string;
};

export default function BillingAddress({ userInfo }: any) {
    const userData = useAppSelector((store) => store.appReducer.userData);
    const authSelector = useAppSelector((store) => store.appReducer.auth);
    const formRef = useRef<HTMLFormElement>(null);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState<any>({});
    const [provinces, setProvinces] = useState<any>([])
    const [selectedProvince, setSelectedProvince] = useState<any>({})
    const [showMsgModal, setShowMsgModal] = useState(false);
    const [messageType, setMessageType] = useState('')
    const [formData, setFormData] = useState<FormType>({
        billing_address1: "",
        billing_address2: "",
        billing_city: "",
        billing_province: "",
        billing_zipcode: "",
        billing_country: ""
    });
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then((response) => response.json())
            .then((data: any) => {
                console.log('data', data)
                setCountries(data.countries);
                setSelectedCountry(data.userSelectValue);
            });
        console.log('provinceDate', provinceData)
        setProvinces(provinceData);
        setSelectedProvince({
            value: "AB",
            label: "Alberta"
        })

        setFormData({
            billing_address1: userData?.profile?.billing_address1 ?? "",
            billing_address2: userData?.profile?.billing_address2 ?? "",
            billing_city: userData?.profile?.billing_city ?? "",
            billing_province: userData?.profile?.billing_province ?? "",
            billing_zipcode: userData?.profile?.billing_zipcode ?? "",
            billing_country: userData?.profile?.billing_country ?? ""
        });
    }, [userData]);

    const handleFormChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handlePhoneChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            phoneNumber: value,
        }));
    };

    const formSubmitAction = async (form: FormData) => {
        const object: FormType = {
            billing_address1: getValueFromFormData(form, "billing_address1") ?? "",
            billing_address2: getValueFromFormData(form, "billing_address2") ?? "",
            billing_city: getValueFromFormData(form, "billing_city") ?? "",
            billing_province: selectedCountry?.label ?? "",
            billing_zipcode: getValueFromFormData(form, "billing_zipcode") ?? "",
            billing_country: selectedProvince?.label ?? "",

        };

        // if form is not valid then return
        const error = isFormValid(object);
        if (error) {
            alert(error);
            return;
        }
        else {
            let params = {
                billing_address1: object?.billing_address1,
                billing_address2: object?.billing_address2,
                billing_city: object?.billing_city,
                billing_province: object?.billing_province,
                billing_zipcode: object?.billing_zipcode,
                country: object?.billing_country
            };
            console.log('params', params)

            let user_id = localStorage.getItem(TokenConstants.USER_INFO)
            doUpdateUser(
                user_id,
                params,
                (success: any) => {
                    console.log('doUpdateUser success', success);
                    setShowMsgModal(true)
                    setMessageType('success')
                    if (success) {
                    }
                },
                (error: any) => {
                    console.log('login error', error);
                },
            );
        }
    };

    const isFormValid = (form: FormType): string | null => {
        if (isEmpty(form.billing_address1)) {
            return "Address1 is required";
        }
        if (isEmpty(form.billing_address2)) {
            return "Address2 is required";
        }
        if (isEmpty(form.billing_city)) {
            return "City is required";
        }
        if (isEmpty(form.billing_country)) {
            return "Country is required";
        }
        if (isEmpty(form.billing_province)) {
            return "Province is required";
        }
        if (isEmpty(form.billing_zipcode)) {
            return "Zipcode is required";
        }
        return null;
    };
    const submitButtonClasses = `w-[170px] bg-red-500 text-white text-[14px] p-2 rounded-[10px] mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300`;

    return (
        <>
            <div className="col-span-4 sm:col-span-9">
                <div className="bg-white rounded-[20px] my-6 relative">
                    <div className="flex-col items-start p-5">
                        <h3 className="md:text-xl text-[15px] font-bold">Billing Address</h3>
                        {/* <span className="md:text-xl text-[13px] text-[#333133]">
                            Your name, email and phone number registered to your account.
                        </span> */}
                    </div>
                    <form action={formSubmitAction} ref={formRef} className="md:w-[50%] w-[100%]">
                        <div className="flex flex-col">
                            <div className="bg-white rounded-lg relative">
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-6 md:gap-6 gap-4">
                                        <div className="md:col-span-6 col-span-6">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                Billing Address1
                                            </label>
                                            <input
                                                type="text"
                                                name="billing_address1"
                                                id="billing_address1"
                                                value={formData.billing_address1}
                                                onChange={handleFormChange}
                                                className="shadow-sm md:bg-white-50 bg-[#F0F0F0] border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                                                placeholder="Zendaya"
                                                required
                                            ></input>
                                        </div>

                                        <div className="md:col-span-6 col-span-6 ">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                Billing Address2
                                            </label>
                                            <input
                                                type="text"
                                                name="billing_address2"
                                                id="billing_address2"
                                                value={formData.billing_address2}
                                                onChange={handleFormChange}
                                                className="shadow-sm md:bg-white-50 bg-[#F0F0F0] border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                                                placeholder="Coleman"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-6 col-span-6">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                Billing City
                                            </label>
                                            <input
                                                type="text"
                                                name="billing_city"
                                                id="billing_city"
                                                value={formData.billing_city}
                                                onChange={handleFormChange}
                                                className="shadow-sm md:bg-white-50 bg-[#F0F0F0] border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                                                placeholder="Edmonton"
                                            ></input>
                                        </div>

                                        <div className="md:col-span-6 col-span-6">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                Country
                                            </label>
                                            <Select
                                                options={countries}
                                                value={selectedCountry}
                                                onChange={(selectedOption: any) => setSelectedCountry(selectedOption)}
                                            />
                                        </div>
                                        <div className="md:col-span-3 col-span-6">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                Billing Zip/Postal Code
                                            </label>
                                            <input
                                                type="text"
                                                name="billing_zipcode"
                                                id="billing_zipcode"
                                                value={formData.billing_zipcode}
                                                onChange={handleFormChange}
                                                className="shadow-sm md:bg-white-50 bg-[#F0F0F0] border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                                                placeholder="T6ETTT"
                                            ></input>
                                        </div>
                                        <div className="md:col-span-3 col-span-6">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                Province
                                            </label>
                                            <Select
                                                options={provinces}
                                                value={selectedProvince}
                                                onChange={(selectedOption: any) => setSelectedProvince(selectedOption)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-6">
                            <button type="submit" className={submitButtonClasses}>
                                SAVE CHANGES
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {
                showMsgModal ?
                    <MessageModal
                        message={'Profile updated successfully!'}
                        type={messageType}
                        closeModal={() => setShowMsgModal(false)} /> : null
            }
        </>
    );
}
