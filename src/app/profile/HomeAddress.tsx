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

type FormType = {
    address1: string;
    address2: string;
    city: string;
    country: string;
    zipcode: string;
    province: string;
};

export default function HomeAddress({ }) {
    const userData = useAppSelector((store) => store.appReducer.userData);
    const authSelector = useAppSelector((store) => store.appReducer.auth);
    const formRef = useRef<HTMLFormElement>(null);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState<any>({});
    const [provinces, setProvinces] = useState<any>([])
    const [selectedProvince, setSelectedProvince] = useState<any>({})
    const [formData, setFormData] = useState<FormType>({
        address1: "",
        address2: "",
        city: "",
        country: "",
        zipcode: "",
        province: ""
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
            address1: userData?.profile?.address1 ?? "",
            address2: userData?.profile?.address2 ?? "",
            city: userData?.profile?.city ?? "",
            country: userData?.profile?.country ?? "",
            zipcode: userData?.profile?.zipcode ?? "",
            province: userData?.profile?.province ?? ""
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
            address1: getValueFromFormData(form, "address1") ?? "",
            address2: getValueFromFormData(form, "address2") ?? "",
            city: getValueFromFormData(form, "city") ?? "",
            country: selectedCountry?.label ?? "",
            zipcode: getValueFromFormData(form, "zipcode") ?? "",
            province: selectedProvince?.label ?? "",

        };
        console.log('object', object)

        // if form is not valid then return
        const error = isFormValid(object);
        if (error) {
            alert(error);
            return;
        }
        else {
            let params = {
                address1: object?.address1,
                address2: object?.address2,
                city: object?.city,
                country: object?.country,
                zipcode: object?.zipcode,
                province: object?.province
            };

            let user_id = localStorage.getItem(TokenConstants.USER_INFO)
            doUpdateUser(
                user_id,
                params,
                (success: any) => {
                    console.log('doUpdateUser success', success);

                    if (success) {
                    }
                },
                (error: any) => {
                    console.log('login error', error);
                },
            );
        }
    };

    const updateUserEmail = async (user: User, newEmail: string) => {

    };

    const updateUserPhoneNumber = async (user: User, newPhoneNumber: string) => {

    };

    const updateAndRefreshUserData = async (user: User) => {
        // await updateUser(user);
        // dispatch(userDetails(user));
        return user;
    };

    const isFormValid = (form: FormType): string | null => {
        if (isEmpty(form.address1)) {
            return "Address1 is required";
        }
        if (isEmpty(form.address2)) {
            return "Address2 is required";
        }
        if (isEmpty(form.city)) {
            return "City is required";
        }
        if (isEmpty(form.country)) {
            return "Country is required";
        }
        if (isEmpty(form.province)) {
            return "Province is required";
        }
        if (isEmpty(form.zipcode)) {
            return "Zipcode is required";
        }

        return null;
    };
    const submitButtonClasses = `w-[170px] bg-red-500 text-white text-[14px] p-2 rounded-[10px] mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300`;

    return (
        <>
            <div className="col-span-4 sm:col-span-9 ">
                <div className="bg-white rounded-[20px] my-6 relative">
                    <div className="flex-col items-start p-5">
                        <h3 className="md:text-xl text-[15px] font-bold">Home Address</h3>
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
                                                Address1
                                            </label>
                                            <input
                                                type="text"
                                                name="address1"
                                                id="address1"
                                                value={formData.address1}
                                                onChange={handleFormChange}
                                                className="shadow-sm md:bg-white-50 bg-[#F0F0F0] border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                                                placeholder="Zendaya"
                                                required
                                            ></input>
                                        </div>

                                        <div className="md:col-span-6 col-span-6 ">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                Address2
                                            </label>
                                            <input
                                                type="text"
                                                name="address2"
                                                id="address2"
                                                value={formData.address2}
                                                onChange={handleFormChange}
                                                className="shadow-sm md:bg-white-50 bg-[#F0F0F0] border border-gray-300 md:text-gray-900 text-[#616161] md:text-[13px] text-[13px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-3"
                                                placeholder="Coleman"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-6 col-span-6">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                value={formData.city}
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
                                                Zip/Postal Code
                                            </label>
                                            <input
                                                type="text"
                                                name="zipcode"
                                                id="zipcode"
                                                value={formData.zipcode}
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
        </>
    );
}
