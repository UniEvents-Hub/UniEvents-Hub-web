"use client";

import React from "react";

export default function Loader({ message }: { message?: string }) {
    return (
        <div className="fixed top-0 left-0 bg-[#007a33] bg-opacity-80 h-full w-full flex flex-col items-center justify-center" style={{ zIndex: 100 }}>
            <div className="relative flex justify-center items-center">
                <div className="absolute animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-[#f2cd00]"></div>
                <img src="/uofa-logo-1.png" className="h-28 w-28" />
            </div>
            <p className="text-2xl mt-10 text-[#f2cd00]">{message ? message : 'Loading....'}</p>
            {/* <div className="flex flex-col items-center justify-center">
                <svg className="w-1/2 h-1/2 bounce-scale" viewBox="0 0 41 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.67628 12.5535L15.4176 25.284C16.8374 26.6594 18.7373 27.4286 20.7148 27.4286C22.6924 27.4286 24.5923 26.6594 26.0121 25.284L38.7534 12.5535C40.0559 11.1275 40.7577 9.25449 40.7128 7.32443C40.6679 5.39437 39.8797 3.55598 38.5123 2.19197C37.1449 0.827971 35.3036 0.0434569 33.3718 0.00175181C31.44 -0.0399533 29.5666 0.664364 28.1415 1.96808L20.7236 9.37964L13.2882 1.96808C11.8631 0.664364 9.98966 -0.0399533 8.05788 0.00175181C6.1261 0.0434569 4.28486 0.827971 2.91744 2.19197C1.55002 3.55598 0.761795 5.39437 0.716874 7.32443C0.671954 9.25449 1.3738 11.1275 2.67628 12.5535" fill="#8283DC" />
                </svg>

                {message && <p className="text-lg mt-10">{message}</p>}
            </div> */}
        </div>
    );
}
