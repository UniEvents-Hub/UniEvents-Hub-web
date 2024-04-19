"use client";

import React from "react";

export default function ImageModal({ imageUrl, onClose }: any) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
            <div className="bg-white rounded-lg p-10 z-20 w-[60%] h-[60%] relative flex justify-center items-center">
                <button onClick={onClose} className="absolute top-2 right-2 bg-yellow-300 p-2 rounded-[10px] text-gray-700  hover:text-gray-700 focus:outline-none z-30">
                    Close
                </button>
                <img src={imageUrl} alt="Full image" className="max-w-full max-h-full p-2" />
            </div>
        </div>
        // <div className="fixed top-[25%] left-[25%] w-[60%] h-[60%] flex items-center justify-center z-30">
        //     <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        //     <div className="bg-white rounded-lg p-10 z-10">
        //         <button onClick={onClose} className="absolute top-[-18px] right-2 bg-yellow-300 p-2 rounded-[10px] text-gray-700 hover:text-gray-700 focus:outline-none">
        //             Close
        //         </button>
        //         <img src={imageUrl} alt="Full image" className="max-w-full max-h-full p-5" />
        //     </div>
        // </div>
    );
}
