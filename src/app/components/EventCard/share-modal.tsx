/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import Image from 'next/image'
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from 'next-share';

interface ShareModalProps {
    onClose: () => void;
    shareLink: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose, shareLink }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleClose = (e: any) => {
        if (e.target.id === 'wrapper') onClose();
    }
    return (
        <div id="wrapper" onClick={handleClose} aria-hidden="true" className="fixed top-0 right-0 bg-black bg-opacity-60 h-full w-full flex items-center justify-center" style={{ 'zIndex': 1000 }}>
            <div className="relative p-0 md:w-[600px] w-[330px] max-w-full max-h-full">

                <div className="bg-white rounded-[20px] overflow-hidden shadow dark:bg-gray-700">
                    <div className="flex md:flex-row flex-col flex-wrap justify-start bg-gray-700">


                        <div className="flex flex-col md:w-[100%] w-full md:h-[270px] h-[200px] justify-start bg-white md:pr-4 pr-2 pt-4 md:pb-6 pb-2">

                            <div className="h-[30px] w-full flex flex-row justify-start items-center">
                                <div className="flex-1 justify-between"></div>
                                <h1 className="mt-0 text-[20px]">Share with friends</h1>
                                <div className="flex-1 justify-between"></div>

                                <div className="md:flex hidden justify-end">
                                    <button onClick={() => onClose()} type="button" className="text-black bg-gray-500 h-[30px] w-[30px] hover:bg-gray-600 hover:text-gray-900 rounded-full text-sm inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                        <svg className="w-[15px] h-[15px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                            </div>

                            <hr className="mr-0 mt-4 h-[2px] border-t-0 bg-gray-200" />


                            <div className="flex flex-col justify-center items-center md:ml-[40px] ml-[25px] overflow-auto md:mt-4 mt-0">

                                <div className="flex gap-6 mt-6">
                                    <FacebookShareButton
                                        url={shareLink}
                                        quote={'next-share is a social share buttons for your next React apps.'}
                                        hashtag={'#nextshare'} >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>

                                    <WhatsappShareButton
                                        /* Url you want to share */
                                        url={shareLink}
                                        title={'next-share is a social share buttons for your next React apps.'}
                                        separator=":: " >
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                    <LinkedinShareButton
                                        url={shareLink} >
                                        <LinkedinIcon size={32} round />
                                    </LinkedinShareButton>
                                </div>

                                <div className="w-[50%] h-[48px] mt-10 rounded-[10px] flex items-center px-2 border border-[#616161]">
                                    <div className="w-[80%]  text-[14px]">
                                        <p className="truncate text-[14px]">{shareLink}</p>
                                    </div>
                                    <button onClick={() => {
                                        setIsCopied(true)
                                        navigator.clipboard.writeText(shareLink)
                                    }}
                                        className="w-[20%] custom-button"
                                        title={isCopied ? 'copied' : 'copy'}>
                                        <span className="text-[18px] text-[#28a745]">copy</span>
                                    </button>

                                </div>

                            </div>

                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShareModal;
