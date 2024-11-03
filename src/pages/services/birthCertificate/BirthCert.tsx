import { Tooltip, Pagination } from 'flowbite-react';
import { useState } from 'react';
import { FaEye, IoMdPersonAdd, IoSearch, MdFileDownload } from '../../../hooks/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderDefault, Loading, serverURL } from '../../../hooks/imports';
import { BirthCertDataType } from '../../../types/birthCerthTypes';
import * as XLSX from 'xlsx'; // Import the XLSX library

function BirthCert() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for input
    const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(''); // State for current search term
    const navigate = useNavigate();
    const itemsPerPage = 10; // Number of records per page

    // Query the API including the currentSearchTerm
    const { data, isLoading, error } = useQuery({
        queryKey: ['birth-certificates', currentPage, currentSearchTerm],
        queryFn: async () => {
            const response = await axios.get(`${serverURL}/api/cris/birth-certificate/get-all`, {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    searchTerm: currentSearchTerm || '',  // Use currentSearchTerm as a parameter
                },
                withCredentials: true,
            });

            return response.data;
        }
    });

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Function to handle the search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);  // Update searchTerm state on input change
    };

    // Function to handle the search button click
    const handleSearchClick = () => {
        setCurrentSearchTerm(searchTerm);  // Set the current search term on button click
        setCurrentPage(1);  // Reset to the first page when a search is performed
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form submission if it's inside a form
            handleSearchClick(); // Call the search function
        }
    };

    // Function to handle the download of data as Excel
    const handleDownload = () => {
        if (data && data.data) {
            const formattedData = data.data.map((cert: BirthCertDataType) => ({
                "Register No.": cert.registryNumber || 'N/A',
                "First Name": cert.one_first || 'N/A',
                "Last Name": cert.one_last || 'N/A',
                "Middle Name": cert.one_middle || 'N/A',
                "Address (House No., Street, Barangay)": cert.twelve_house || 'N/A',
                "City/Municipality": cert.twelve_cityOrMunicipality || 'N/A',
                "Province": cert.twelve_province || 'N/A',
            }));

            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Birth Certificates");
            XLSX.writeFile(workbook, "birth_certificates.xlsx");
        }
    };

    if (isLoading) return <Loading/>;

    const totalPages = Math.ceil((data?.total || 0) / itemsPerPage); // Calculate total pages

    return (
        <section>
            <h1 className='text-3xl font-semibold text-darkCyan flex flex-col'>
                Registering and Issuance of <span>Live Birth Certificate</span>
            </h1>
            <div className='flex items-end justify-between mt-5 px-2'>
                {/* Search Input */}
                <div className='flex items-end'>
                    <div className='group flex flex-row items-end border-b-2 border-gray-300 focus-within:border-darkCyan'>
                        {/* <span className="py-2.5 ps-2 font-medium text-gray-400 group-focus-within:text-darkCyan">
                            <IoSearch />
                            <span className="sr-only">Search</span>
                        </span> */}
                        <input 
                            type='text'
                            value={searchTerm}  // Bind input to searchTerm state
                            onChange={handleSearchChange}  // Update searchTerm on change
                            onKeyDown={handleKeyDown} 
                            placeholder='Search'
                            className='h-9 border-0 bg-transparent focus:outline-none focus:border-transparent focus:ring-0'
                        />
                    </div>
                    <button
                        className="p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel"
                        onClick={handleSearchClick} // Trigger search on button click
                    >
                        <IoSearch />
                        <span className="sr-only">Search</span>
                    </button>
                </div>
                <div className='flex items-center gap-1'>
                    <Tooltip content="Download">
                        <button onClick={handleDownload} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                            <MdFileDownload />
                            <span className="sr-only">Download</span>
                        </button>
                    </Tooltip>

                    <Tooltip content="Register">
                        <button onClick={() => navigate('/birth-certificate/registering-birth-certificate')} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                            <IoMdPersonAdd />
                            <span className="sr-only">Register</span>
                        </button>
                    </Tooltip>
                </div>
            </div>
            <div className='w-full p-2'>
                {/* Table rendering */}
                <table className='w-full border-collapse rounded-lg shadow-md overflow-hidden'>
                    {/* Table Head */}
                    <thead className='bg-gradient-to-r from-darkCyan to-darkBlueTeel text-white'>
                        <tr>
                            <th rowSpan={2} className='px-2 py-3 text-left'>Registry No.</th>
                            <th colSpan={3} className='px-2 py-3 text-center border-x-[1px]'>Full Name</th>
                            <th colSpan={3} className='px-2 py-3 text-center border-x-[1px]'>Address</th>
                            <th rowSpan={2} className='px-2 py-3 text-center'>Action</th>
                        </tr>
                        {/* Subhead */}
                        <tr>
                            <th className='px-2 py-2 text-left border-s-[1px]'>First</th>
                            <th className='px-2 py-2 text-left'>Last</th>
                            <th className='px-2 py-2 text-left border-e-[1px]'>Middle</th>
                            <th className='px-2 py-2 text-left border-s-[1px]'>House No., Street, Barangay</th>
                            <th className='px-2 py-2 text-left'>City/Municipality</th>
                            <th className='px-2 py-2 text-left border-e-[1px]'>Province</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {
                            isLoading ? (
                                <LoaderDefault/>
                            ):(
                                data?.data?.length > 0 || error ? (
                                    data?.data?.map((cert: BirthCertDataType) => (
                                        <tr key={cert.id} className='bg-white hover:bg-[#145C7F11] transition-colors'>
                                            <td className='px-3 py-2'>{cert.registryNumber  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.one_first  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.one_last  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.one_middle || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.twelve_house  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.twelve_cityOrMunicipality  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.twelve_province  || 'N/A'}</td>
                                            <td className='flex flex-row items-center justify-center gap-2 px-3 py-2 text-center'>
                                                <Tooltip content="View">
                                                    <button onClick={()=>{navigate(!cert.scannedFile ? `preview/${cert.id}`:`preview/file/${cert.id}`)}} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                                                        <FaEye />
                                                        <span className="sr-only">View</span>
                                                    </button>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))
                                ):( 
                                    <tr className='h-28'>
                                        <td colSpan={7} className='px-2 py-3 text-center text-sm font-medium text-gray-800'>No Data Found</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            {data?.total > 0 && (
                <div className="flex overflow-x-auto sm:justify-center">
                <Pagination
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalPages={totalPages} // Pass the calculated total pages
                    showIcons={true}
                />
            </div>
            )}
        </section>
    );
}

export default BirthCert;