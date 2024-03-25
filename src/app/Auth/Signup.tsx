"use client";

import React, { useState } from "react";


export default function Signup() {
    const divStyle: React.CSSProperties = {
        backgroundImage: "url('https://www.ualberta.ca/media-library/new-brand/about-us/ua_92_about.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'green', // Fallback color if the image fails to load
        color: 'white',
        padding: '10px',
        
      };
    return (
        <>
            <section className="bg-white dark:white">
    <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5" style= {divStyle} >
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-green-700">UniEventsHub</h2>
                        
                        <p className="mt-3 font-bold text-gray-500 dark:text-yellow-500">Create a free account</p>
                    </div>

                    <div className="mt-8 ">
                        <form>
                            <div>
                                <label htmlFor="first name" className="block mb-2 text-md text-gray-600 dark:text-gray-900">First name</label>
                                <input type="text" name="first name" id="first name" placeholder="example: Jon" className="block font-style: italic w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 placeholder-opacity-50 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div>
                                <label htmlFor="last name" className="block mb-2 text-md text-gray-600 dark:text-gray-900">Last name</label>
                                <input type="text" name="last name" id="last name" placeholder="example: Snow" className="block font-style: italic w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-md text-gray-600 dark:text-gray-900">Email address</label>
                                <input type="email" name="email" id="email" placeholder="jon@example.com" className="block font-style: italic w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-md text-gray-600 dark:text-gray-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="password" className="block font-style: italic w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div>
                                <label htmlFor="confirm password" className="block mb-2 text-md text-gray-600 dark:text-gray-900">Confirm Password</label>
                                <input type="password" name="confirm password" id="confirm password" placeholder="confirm password" className="block font-style: italic w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                            
                            <div className="mt-6">
                                <button
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Sign Up
                                </button>
                            </div>
                            <div className="text-center pt-4 ">
                                <span className="text-gray-500 dark:text-gray-900" >Or, Sign up with</span>
                            </div>

                            <a href="#" className="socialButton googleplus rounded-md text-center" target="_blank">Google</a>

                        </form>
                    </div>
                </div>
        </div>
    </div>
</section>
        </>
    );
}
