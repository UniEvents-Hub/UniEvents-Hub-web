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

type FormType = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
};

export default function HomeAddress({ }) {
    const userData = useAppSelector((store) => store.appReducer.userData);
    const authSelector = useAppSelector((store) => store.appReducer.auth);
    const formRef = useRef<HTMLFormElement>(null);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [provinces, setProvinces] = useState<any>([])
    const [selectedProvince, setSelectedProvince] = useState({})
    const [formData, setFormData] = useState<FormType>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
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
            firstName: userData?.firstName ?? "",
            lastName: userData?.lastName ?? "",
            email: userData?.email ?? "",
            phoneNumber: userData?.phoneNumber ?? "",
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
            firstName: getValueFromFormData(form, "firstName") ?? "",
            lastName: getValueFromFormData(form, "lastName") ?? "",
            email: getValueFromFormData(form, "email") ?? "",

            // if phone number is empty then don't add + sign else add + sign
            phoneNumber: isEmpty(formData.phoneNumber)
                ? ""
                : `+${formData.phoneNumber}`,
        };

        // if form is not valid then return
        const error = isFormValid(object);
        if (error) {
            alert(error);
            return;
        }
        if (!userData) return;
        // dispatch(startLoader("Updating user data..."));
        let user: User | undefined = _.cloneDeep<User>(userData);
        if (!user) {
            alert("User not updated!!! Try after sometime.");
            //   dispatch(stopLoader());
            return;
        }
        user.firstName = object.firstName;
        user.lastName = object.lastName;
        user = await updateAndRefreshUserData(user);


        if (
            validateEmail(object.email) &&
            object.email != userData?.email &&
            user
        ) {
            //   user = await updateUserEmail(user, object.email);
        }

        if (
            validatePhoneNumber(object.phoneNumber) &&
            object.phoneNumber != userData?.phoneNumber &&
            user
        ) {
            //   user = await updateUserPhoneNumber(user, object.phoneNumber);
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
        if (isEmpty(form.firstName)) {
            return "First name is required";
        }
        if (isEmpty(form.lastName)) {
            return "Last name is required";
        }
        if (isEmpty(form.email) && isEmpty(form.phoneNumber)) {
            return "Either email or phone number is required";
        }

        // if email is not empty and not valid
        if (!isEmpty(form.email) && !validateEmail(form.email)) {
            return "Email is not valid";
        }

        // if phone number is not empty and not valid
        if (!isEmpty(form.phoneNumber) && !validatePhoneNumber(form.phoneNumber)) {
            return "Phone number is not valid";
        }
        return null;
    };
    const submitButtonClasses = `w-[170px] bg-red-500 text-white text-[14px] p-2 rounded-[10px] mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300`;

    return (
        <>
            <div className="col-span-4 sm:col-span-9">
                <div className="bg-white rounded-[20px] my-6 relative">
                    <div className="flex-col items-start p-5">
                        <h3 className="md:text-xl text-[15px] font-bold">Home Address</h3>
                        {/* <span className="md:text-xl text-[13px] text-[#333133]">
                            Your name, email and phone number registered to your account.
                        </span> */}
                    </div>
                    <form action={formSubmitAction} ref={formRef} className="w-[50%]">
                        <div className="flex flex-col">
                            <div className="bg-white rounded-lg relative">
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-6 md:gap-6 gap-4">
                                        <div className="md:col-span-6 col-span-6">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                Address
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

                                        <div className="md:col-span-6 col-span-6 ">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                Address2
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

                                        <div className="md:col-span-6 col-span-6">
                                            <label className="text-sm font-medium text-gray-900 block mb-2">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                value={formData.email}
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
                                                name="email"
                                                id="email"
                                                value={formData.email}
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
