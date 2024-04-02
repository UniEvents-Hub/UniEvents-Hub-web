"use client";

import React, { useRef, useState } from "react";
import { userSignUpFormSteps } from "@/app/utils/constants";
import InterestFormRendered from "./InterestFormRendered";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/redux/store";
import { setToken } from "@/app/redux/features/app-slice";
import Image from "next/image";
import { doUpdateUser } from '@/app/services/User/user-service';
import { TokenConstants } from '../utils/constants';


export default function UserInterest() {
    const childRef = useRef<any>();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);

    const userData = useAppSelector((state) => state.appReducer.userData);
    const dispatch = useDispatch();

    const divStyle: React.CSSProperties = {
        backgroundImage: "url('https://www.ualberta.ca/media-library/new-brand/about-us/ua_92_about.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'green', // Fallback color if the image fails to load
        color: 'white',
        padding: '10px',

    };

    const formDataValidate = (value: any) => {
        setIsDisabled(value);
    };

    const preparePayload = (formOutput: any) => {
        if (formOutput && formOutput.questions.length > 0) {
            const newObj = {} as any
            let questions = formOutput.questions
            for (let i = 0; i < questions.length; i++) {
                newObj[questions[i].slug] = questions[i].value
            }
            const updatedUser: any = {
                ...userData,
                ...newObj
            };
            return updatedUser
        }
    }

    const updateUserInfo = async () => {
        console.log('asdas')
        if (selectedIndex <= userSignUpFormSteps.length - 1) {
            if (selectedIndex < userSignUpFormSteps.length - 1) {
                setSelectedIndex(selectedIndex + 1)
                setIsDisabled(true)
            }

            let formOutput = childRef.current.getStepFormData();
            let payload = preparePayload(formOutput) as any;

            let params = {
                interests: payload?.tags.toString()
            };
            console.log('params', params)
            let user_id = localStorage.getItem(TokenConstants.USER_INFO)
            doUpdateUser(
                user_id,
                params,
                (success: any) => {
                    console.log('doUpdateUser success', success);

                    if (success) {

                        const access_token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);

                        if (access_token) {
                            console.log(TokenConstants.ACCESS_TOKEN, access_token);
                            dispatch(setToken(access_token));
                        } else {

                        }
                    }
                },
                (error: any) => {
                    console.log('login error', error);
                },
            );


            // dispatch(setToken("asdasdsads"));
            // localStorage.setItem("accessToken", "asdasdsads")

            //   const result = await updateUser(payload);
            //   if (result && userData?.uid) {
            //     const updatedUser = await getUserInfoById(userData?.uid);
            //     if (updatedUser) {
            //       dispatch(userDetails(updatedUser));
            //     }
            //   }
        }
    };

    const handleBackButton = () => {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    }

    return (
        <>
            <div className="flex-1 w-full items-center mt-[30px]">

                <div className="mt-2 gap-6 bg-gray-0">
                    <div className="flex flex-col py-2 ">
                        <span className="text-left font-semibold text-[1.5rem] leading-8 text-custom-gray">
                            {userSignUpFormSteps[selectedIndex]?.questionGuide?.title}
                        </span>
                        {/* <span className="text-left font-normal text-[16px] leading-5 text-custom-gray mt-1 w-[16.25rem]">
                            {userSignUpFormSteps[selectedIndex]?.questionGuide?.body}
                        </span> */}

                        <form>
                            {userSignUpFormSteps && userSignUpFormSteps.length > 0 ?
                                <InterestFormRendered
                                    formSteps={userSignUpFormSteps}
                                    formDataValidate={formDataValidate}
                                    formIndex={selectedIndex}
                                    ref={childRef} />

                                : null}

                        </form>

                    </div>

                    <div className="mt-0">
                        <button
                            onClick={updateUserInfo}
                            disabled={isDisabled}
                            className={`w-full px-4 tracking-wide focus:outline-none focus:underline hover:underline font-bold p-2 mt-6 rounded-lg mb-6 ${isDisabled ? "cursor-not-allowed" : ""
                                } ${isDisabled ? "bg-gray-300 bg-opacity-70" : "bg-blue-500"} ${isDisabled ? "text-[#616161]" : "text-white"
                                }`}>
                            {selectedIndex === userSignUpFormSteps.length - 1 ? 'Finish' : 'NEXT'}
                        </button>
                    </div>

                    {/* <div className="flex justify-center items-center bg-black">
                        <button
                            onClick={updateUserInfo}
                            disabled={isDisabled}
                            className={`flex justify-center items-center focus:outline-none focus:underline hover:underline font-bold p-2 mt-6 rounded-lg mb-6 ${isDisabled ? "cursor-not-allowed" : ""
                                } ${isDisabled ? "bg-gray-300 bg-opacity-70" : "bg-blue-500"} ${isDisabled ? "text-[#616161]" : "text-white"
                                }`}
                            style={{ width: '16.875rem', lineHeight: '1.313rem', fontSize: '0.875rem' }}
                        >
                            {selectedIndex === userSignUpFormSteps.length - 1 ? 'Finish' : 'NEXT'}
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    );
}
