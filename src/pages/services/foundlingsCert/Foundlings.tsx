import { Tooltip, Pagination } from 'flowbite-react';
import { useState } from 'react';
import { IoMdPersonAdd, IoSearch, MdFileDownload } from '../../../hooks/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderDefault, Loading, serverURL } from '../../../hooks/imports';
import * as XLSX from 'xlsx'; // Import the XLSX library
import { FoundlingsTypes } from '../../../types/foundLingTypes';

function Foundlings() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for input
    const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(''); // State for current search term
    const navigate = useNavigate();
    const itemsPerPage = 10; // Number of records per page

    // Query the API including the currentSearchTerm
    const { data, isLoading, error } = useQuery({
        queryKey: ['foundling-certificates', currentPage, currentSearchTerm],
        queryFn: async () => {
            const response = await axios.get(`${serverURL}/api/cris/foundling-certificate/get-all`, {
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
            const formattedData = data.data.map((cert: FoundlingsTypes) => ({
                "Register No.": cert.registryNumber || 'N/A',
                "Name": cert.one_name || 'N/A',
                "Place where found": cert.five_place || 'N/A',
                "Date and Time when found": cert.four_dateAndTime || 'N/A',
            }));

            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Foundlings Certificates");
            XLSX.writeFile(workbook, "foundlings_certificates.xlsx");
        }
    };

    if (isLoading) return <Loading/>;

    const totalPages = Math.ceil((data?.total || 0) / itemsPerPage); // Calculate total pages

    return (
        <section>
            <h1 className='text-3xl font-semibold text-darkCyan flex flex-col'>
                Registering and Issuance of <span>Foundlings Certificate</span>
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
                        <button onClick={() => navigate('/foundlings/registering-foundlings')} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
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
                            <th rowSpan={1} className='px-2 py-3 text-left'>Register No.</th>
                            <th rowSpan={1} className='px-2 py-2 text-center border-x-[1px]'>Name</th>
                            <th rowSpan={1} className='px-2 py-3 text-center border-x-[1px]'>Place where found</th>
                            <th rowSpan={1} className='px-2 py-3 text-center border-x-[1px]'>Date and time when found</th>
                            <th rowSpan={1} className='px-2 py-3 text-center'>Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {
                            isLoading ? (
                                <LoaderDefault/>
                            ):(
                                data?.data?.length > 0 || error ? (
                                    data?.data?.map((cert: FoundlingsTypes) => (
                                        <tr key={cert.id} className='bg-white hover:bg-[#145C7F11] transition-colors'>
                                            <td className='px-3 py-2'>{cert.registryNumber  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.one_name  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.five_place  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.four_dateAndTime  || 'N/A'}</td>
                                            <td className='px-3 py-2 text-center'>
                                                <button onClick={()=>{navigate(`preview/${cert.id}`)}} className='bg-[#0E7490] text-white px-3 py-1 rounded-sm drop-shadow-md'>View</button>
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

export default Foundlings;