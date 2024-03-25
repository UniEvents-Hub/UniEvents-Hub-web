import Head from "next/head";

const Success = () => {
    return (
        <>
            <div className="flex flex-col pl-[300px] pr-[100px] mt-20 w-full overflow-hidden no-scrollbar justify-center items-center">
                <h1 className="text-black text-[20px] font-bold text-center">Thank you, Mahmud hasan. Your order is complete!</h1>
                <h3 className="text-gray-500 text-[18px] text-center">Your confirmation number is #LqC7y</h3>

                <div className='w-[210px] mt-4 mr-4 bg-green-600 h-[50px] rounded-lg p-4 flex justify-center items-center cursor-pointer  hover:bg-green-800'>
                    <span className="mb-0 text-[18px] font-medium text-white dark:text-gray-400">Download Ticket</span>

                </div>

                <div className="h-[240px] mt-20 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <div className="w-[100%] h-[60%] flex">
                        <img
                            className=" w-[50%] h-[150px]"
                            src={"/images/event_banner.jpeg"} alt="" />
                        <div className='w-[60%] ml-6 mt-4'>
                            <a href="#">
                                <h1 className="mb-2 text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Hello Edmonton</h1>
                            </a>
                            <p className="mb-[6px] text-[16px] font-normal text-red-500 dark:text-gray-400">Tuesday, Mar 12, 1:00 PM</p>
                            <div className="flex items-center justify-start mt-2  cursor-pointer hover:underline">
                                <img
                                    src="/images/location_icon.svg"
                                    alt="Description of your image"
                                    className="w-[20px] h-[20px] object-stretch" />
                                <p className="ml-2 text-[14px] font-normal text-black dark:text-gray-400">Universirty Of Alberta</p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <hr className="mr-0 mt-2 h-[2px] border-t-0 bg-gray-200" />


                    <div className="h-[40%] flex justify-between items-center pb-4 ml-10 mr-10 pt-4">

                        <div className='flex items-center'>
                            <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                <img
                                    src="/images/favourite_icon.svg"
                                    alt="Description of your image"
                                    className="w-[20px] h-[20px] object-cover" />
                                {/* <span className="text-[12px]">Save</span> */}

                            </div>
                            <div className='flex flex-col items-start ml-[14px]'>
                                <span className="text-[14px] text-gray-500">Order ID</span>
                                <span className="text-[12px]">16AJPY</span>
                            </div>
                        </div>

                        <div className='flex items-center'>
                            <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                <img
                                    src="/images/favourite_icon.svg"
                                    alt="Description of your image"
                                    className="w-[20px] h-[20px] object-cover" />
                                {/* <span className="text-[12px]">Save</span> */}

                            </div>
                            <div className='flex flex-col items-start ml-[14px]'>
                                <span className="text-[14px] text-gray-500">Total Tickets</span>
                                <span className="text-[12px]">1</span>
                            </div>
                        </div>

                        <div className='flex items-center'>
                            <div className={`h-[40px] w-[40px] rounded-full hover:bg-blue cursor-pointer flex items-center justify-center  border border-gray-300`}>
                                <img
                                    src="/images/favourite_icon.svg"
                                    alt="Description of your image"
                                    className="w-[20px] h-[20px] object-cover" />
                                {/* <span className="text-[12px]">Save</span> */}

                            </div>
                            <div className='flex flex-col items-start ml-[14px]'>
                                <span className="text-[14px] text-gray-500">Paid Amound</span>
                                <span className="text-[12px]">CAD $10</span>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Success;