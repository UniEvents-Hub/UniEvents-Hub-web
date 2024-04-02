"use client";

import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getIntialials } from "@/app/utils/utility-function";
import BasicInfo from "./BasicInfo";
import HomeAddress from "./HomeAddress";
import BillingAddress from "./BillingAddress";
import { useAppSelector } from "@/app/redux/store";
import * as _ from "lodash";
import { doUpdateUser } from '@/app/services/User/user-service';
import { TokenConstants } from '../utils/constants';

function ProfilePage() {
    const router = useRouter();
    const userData = useAppSelector((store) => store.appReducer.userData);
    const [image, setImage] = useState(null);
    const [filename, setFilename] = useState('');
    const [userInfo, setUserInfo] = useState<any>(null);
    const fileInputRef = useRef<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userData) {
            console.log('userData', userData)
            setUserInfo(userData)
        }
    }, [userData]);

    const handleFileChange = (event: any) => {
        console.log('event', event)
        const selectedFile = event.target.files[0];
        const filename = selectedFile.name;
        setFilename(filename)
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                // Set the selected image file to the state
                setImage(e.target.result);
                updateProfilePhoto()
            };
            reader.readAsDataURL(selectedFile);
        }
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

    const updateProfilePhoto = () => {
        let params = {
            profile_photo: image ? base64ToFile(image, filename) : '',
        };
        console.log('params', params)
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

    const submitButtonClasses = `md:w-[170px] w-[120px] bg-black text-white text-[14px] p-2 rounded-full mb-0 hover:bg-white hover:text-black hover:border hover:border-gray-300`;

    return (

        <div className="flex flex-col h-screen w-full overflow-y-scroll overflow-hidden no-scrollbar md:pl-[250px] md:pr-[80px] px-[25px] all-gradient-background">

            <div className="col-span-4 sm:col-span-3 md:mt-4 mt-12">
                <h1 className="text-xl font-bold text-left mb-4 md:mt-2 mt-8">Account Information</h1>

                <div className="bg-white md:p-4 p-2 rounded-[20px]">
                    <div className="flex flex-col justify-center items-center p-4 ">
                        <div className={`flex items-center justify-center`}>
                            <div className={`md:h-[120px] h-[75px] md:w-[120px] w-[75px] md:rounded-full rounded-full ${image ? 'bg-gray-200' : 'bg-black'} flex justify-center items-center`}>
                                {
                                    image ?
                                        <img
                                            src={image}
                                            alt="Selected"
                                            className="md:h-[120px] h-[75px] md:w-[120px] w-[75px] md:rounded-full rounded-full object-fit" /> :
                                        <h1 className="navbar-profile-gradient-background text-center md:text-[50px] text-[27px] font-bold text-white">
                                            {getIntialials(userInfo && userInfo.user && userInfo.user?.first_name, userInfo && userInfo.user && userInfo.user?.last_name)}
                                        </h1>
                                }

                            </div>

                        </div>
                        <button onClick={() => fileInputRef?.current?.click()}
                            className="mt-[-30px] ml-[80px]">
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                            <img
                                src="/images/edit_profile_pic.svg"
                                alt="Description of your image"
                                className="w-[40px] h-[40px] object-stretch" />
                        </button>
                        <h1 className="md:text-xl text-[14px] font-bold md:mt-6 mt-4">{`${_.capitalize(
                            userInfo && userInfo.user ? userInfo.user?.first_name : ''
                        )} ${_.capitalize(userInfo && userInfo.user ? userInfo.user?.last_name : '')}`}</h1>
                        <p className="text-[#777E90] text-left text-[12px] mt-0">
                            {userInfo && userInfo.user ? userInfo.user?.email : ''}
                        </p>

                    </div>
                </div>
            </div>
            <BasicInfo userInfo={userInfo} />
            <HomeAddress userInfo={userInfo} />
            <BillingAddress userInfo={userInfo} />
        </div>

    );
}

export default ProfilePage;
