import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import XLSX library for Excel download
import { FaBaby, GiTombstone, FaRing, FaChild, TbReportAnalytics, } from '../hooks/icons';
import { LoaderDefault, serverURL } from '../hooks/imports';

interface RecentActivity {
    id: number;
    message: string;
    issued_by: string;
    updated_at: string;
    created_at: string;
}

interface Certificate {
    birthCertificates: string;
    deathCertificates: string;
    marriageCertificates: string;
    foundlingCertificate: string;
}
function Home() {
    // Fetch Certificates Data
    const { data: certificates, isLoading: certificatesLoading, isError: certificatesError } = useQuery({
        queryKey: ['certificates'],
        queryFn: async (): Promise<Certificate> => {
            const { data } = await axios.get(`${serverURL}/api/cris/reports/all-certificates`, { withCredentials: true });
            return data;
        }
    });

    // Fetch Recent Activity Data
    const { data: recentAct, isLoading: recentActIsLoading } = useQuery({
        queryKey: ['recent-act'],
        queryFn: async () => {
            const { data } = await axios.get(`${serverURL}/api/cris/recent-activity/getAll-activity`, { withCredentials: true });
            return data.reverse();
        }
    });

    // Format Date Helper Function
    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
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

    // Download as Excel Function
    const handleDownloadReports = () => {
        // Prepare data for Excel
        const dataToExport = [
        {
            Category: "Birth Certificates",
            Count: certificates?.birthCertificates || "0"
        },
        {
            Category: "Death Certificates",
            Count: certificates?.deathCertificates || "0"
        },
        {
            Category: "Marriage Certificates",
            Count: certificates?.marriageCertificates || "0"
        },
        {
            Category: "Foundling Certificates",
            Count: certificates?.foundlingCertificate || "0"
        }
        ];

        const activityToExport = recentAct?.map((act: RecentActivity) => ({
            Date: formatDate(act.created_at),
            Message: act.message,
            Issued_By: act.issued_by
        }));

        // Create a new workbook and add data to sheets
        const workbook = XLSX.utils.book_new();
        const certificateSheet = XLSX.utils.json_to_sheet(dataToExport);
        const activitySheet = XLSX.utils.json_to_sheet(activityToExport || []);

        // Append the sheets to the workbook
        XLSX.utils.book_append_sheet(workbook, certificateSheet, "Certificates Report");
        XLSX.utils.book_append_sheet(workbook, activitySheet, "Recent Activities");

        // Write the Excel file
        XLSX.writeFile(workbook, `Vital_Records_Report_${new Date().toLocaleDateString()}.xlsx`);
    };
    return (
        <div>
            {/* Generate Report Button */}
            <div className='w-full flex justify-between mb-5'>
                <h1 className='text-3xl font-semibold text-darkCyan'>
                    Vital Records Overview
                </h1>
                <button onClick={handleDownloadReports} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel flex flex-row items-center gap-1'>
                    <TbReportAnalytics />
                    <span>Download reports</span>
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
                        <span className='text-3xl font-semibold text-gray-700'>
                            {
                                certificatesLoading || certificatesError ? (0):(certificates?.birthCertificates)
                            }
                        </span>
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
                        <span className='text-3xl font-semibold text-gray-700'>
                            {
                                certificatesLoading || certificatesError ? (0):(certificates?.deathCertificates)
                            }
                        </span>
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
                        <span className='text-3xl font-semibold text-gray-700'>
                            {
                                certificatesLoading || certificatesError ? (0):(certificates?.marriageCertificates)
                            }
                        </span>
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
                        <span className='text-3xl font-semibold text-gray-700'>
                            {
                                certificatesLoading || certificatesError ? (0):(certificates?.foundlingCertificate)
                            }
                        </span>
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
                            recentAct.map((act:RecentActivity,index:number)=>(
                                <li key={index} className='hover:bg-lightCyan p-1 flex flex-row gap-1'>
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
                </ul>
            </div>
        </div>
    )
}

export default Home