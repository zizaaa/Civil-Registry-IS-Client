import { useQuery } from '@tanstack/react-query';
import { FaBaby, GiTombstone, FaRing, FaChild, TbReportAnalytics, } from '../hooks/icons';
import axios from 'axios';
import { LoaderDefault, serverURL } from '../hooks/imports';

interface RecentActivity{
    id:number;
    message:string;
    issued_by:string;
    updated_at:string;
    created_at:string;
}

function Home() {
    const { data:recentAct, isLoading:recentActIsLoading } = useQuery({
        queryKey:['recent-act'],
        queryFn: async()=>{
            const { data } = await axios.get(`${serverURL}/api/cris/recent-activity/getAll-activity`, { withCredentials:true });

            return data;
        }
    });

    const formatDate = (timestamp:string) => {
        console.log(timestamp)
        // Parse the timestamp into a JavaScript Date object
        const date = new Date(timestamp);
        console.log(date)
        // Format the date using toLocaleDateString and toLocaleTimeString
        const formattedDate = date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });

        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    
        return `${formattedDate}, ${formattedTime}`;
    };
    
    return (
        <div>
            {/* Generate Report Button */}
            <div className='w-full flex justify-between mb-5'>
                <h1 className='text-3xl font-semibold text-darkCyan'>
                    Vital Records Overview
                </h1>
                <button className='flex items-center gap-2 p-2.5 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                    <TbReportAnalytics />
                    <span className="ml-2">Generate Report</span>
                </button>
            </div>
            <div className='grid grid-cols-4 max-[1000px]:grid-cols-3 max-[800px]:grid-cols-2 gap-5'>
                <div className='bg-white flex flex-col gap-2 py-2 px-3 rounded-md h-36 shadow-lg'>
                    <h1 className='text-lg text-gray-700 font-semibold w-40'>
                        Registered Birth Certificates
                    </h1>
                    <div className='flex flex-row items-center gap-3 w-full h-full'>
                        <span className='text-2xl bg-lightCyan p-2 rounded-full text-darkCyan'>
                            <FaBaby/>
                        </span>
                        <span className='text-3xl font-semibold text-gray-700'>100k</span>
                    </div>
                </div>
                <div className='bg-white flex flex-col gap-2 py-2 px-3 rounded-md h-36 shadow-lg'>
                    <h1 className='text-lg text-gray-700 font-semibold w-40'>
                        Registered Death Certificates
                    </h1>
                    <div className='flex flex-row items-center gap-3 w-full h-full'>
                        <span className='text-2xl bg-[#befcd3] p-2 rounded-full text-[#30aa58]'>
                            <GiTombstone/>
                        </span>
                        <span className='text-3xl font-semibold text-gray-700'>100k</span>
                    </div>
                </div>
                <div className='bg-white flex flex-col gap-2 py-2 px-3 rounded-md h-36 shadow-lg'>
                    <h1 className='text-lg text-gray-700 font-semibold'>
                        Registered Marriage Certificates
                    </h1>
                    <div className='flex flex-row items-center gap-3 w-full h-full'>
                        <span className='text-2xl bg-lightCyan p-2 rounded-full text-darkCyan'>
                            <FaRing/>
                        </span>
                        <span className='text-3xl font-semibold text-gray-700'>100k</span>
                    </div>
                </div>
                <div className='bg-white flex flex-col gap-2 py-2 px-3 rounded-md h-36 shadow-lg'>
                    <h1 className='text-lg text-gray-700 font-semibold w-40'>
                        Registered Foundlings
                    </h1>
                    <div className='flex flex-row items-center gap-3 w-full h-full'>
                        <span className='text-2xl bg-[#befcd3] p-2 rounded-full text-[#30aa58]'>
                            <FaChild/>
                        </span>
                        <span className='text-3xl font-semibold text-gray-700'>100k</span>
                    </div>
                </div>
            </div>
            <div className="recent-activity mt-7 w-full bg-white shadow-lg p-3 rounded-md">
                <h2 className='text-xl font-semibold text-gray-700'>Recent Activity</h2>
                <ul className="activity-log text-sm mt-2 h-96 overflow-auto">
                    {
                        recentActIsLoading ?
                        (
                            <div className='w-full h-full flex items-center justify-center'>
                                <LoaderDefault/>
                            </div>
                        ):(
                            recentAct.map((act:RecentActivity)=>(
                                <li className='hover:bg-lightCyan p-1 flex flex-row gap-1'>
                                    <span className='font-semibold'>
                                        [{formatDate(act.created_at)}]
                                    </span>
                                    <span>
                                        {act.message}
                                    </span>
                                    <span>by</span>
                                    <span className='font-semibold'>
                                        {act.issued_by}
                                    </span>
                                </li>
                            ))
                        )
                    }
                    {/* <li className='hover:bg-lightCyan p-1'>
                        <span className='font-semibold'>[10/19/2024, 10:35 AM] </span>
                        Birth Certificate Issued for John Doe 
                        <span className='font-semibold'> (Registry No. 12345) </span>
                        by 
                        <span className='font-semibold'> Registrar Mary Smith</span>
                    </li>
                    <li className='hover:bg-lightCyan p-1'>
                        <span className='font-semibold'>[10/19/2024, 09:20 AM] </span>
                        Marriage Certificate Registered for Jane
                        <span className='font-semibold'> (Registry No. 67890) </span>
                        by 
                        <span className='font-semibold'> Registrar Alex Johnson</span>
                    </li>
                    <li className='hover:bg-lightCyan p-1'>
                        <span className='font-semibold'>[10/19/2024, 09:20 AM] </span>
                            Death Certificate Registered for Peter Parker
                        <span className='font-semibold'> (Registry No. 67890) </span>
                            by 
                        <span className='font-semibold'> Registrar Alex Johnson</span>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}

export default Home