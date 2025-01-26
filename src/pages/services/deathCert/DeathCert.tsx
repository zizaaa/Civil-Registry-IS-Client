import { Tooltip, Pagination } from 'flowbite-react';
import { useState, useCallback } from 'react';
import { IoArchive, IoMdPersonAdd, IoSearch, MdFileDownload } from '../../../hooks/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderDefault, Loading, serverURL } from '../../../hooks/imports';
import * as XLSX from 'xlsx'; // Import the XLSX library
import { DeathCertData } from '../../../types/deathCertTypes';
import debounce from 'lodash.debounce';
import { FaEdit,FaEye } from "../../../hooks/icons"
import { useActivityMutation } from '../../../services/sendActivity';
import { useArchiveMutation } from '../../../hooks/archive';
interface SearchType{
    id:number;
    one_first:string;
    one_middle:string;
    one_last:string;
    registryNumber:string;
    scannedFile:string | null;
}

function DeathCert() {
    const [searchResult, setSearchResult] = useState<SearchType[]>([]);
    const [searchIsLoading, setSearchIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for input
    const navigate = useNavigate();
    const itemsPerPage = 10; // Number of records per page

    // Query the API including the currentSearchTerm
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['death-certificates', currentPage],
        queryFn: async () => {
            const response = await axios.get(`${serverURL}/api/cris/death-certificate/get-all`, {
                params: {
                    page: currentPage,
                    limit: itemsPerPage
                },
                withCredentials: true,
            });

            return response.data;
        }
    });

    const activityMutation = useActivityMutation();

    const archive = useArchiveMutation(refetch, activityMutation, 'Death certificate');
    
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

         // Function to handle the search operation
        const performSearch = async (term: string) => {
            setSearchIsLoading(true);
    
            if(!term) return;
    
            try {
                const { data } = await axios.get(`${serverURL}/api/cris/death-certificate/search`,{
                    params:{
                        searchTerm:term
                    },
                    withCredentials: true,
                })
                setSearchResult(data);
            } catch (error) {
                console.error(error);
            }
            setSearchIsLoading(false)
        };
    
        // Create a debounced version of the search function
        const debouncedSearch = useCallback(debounce(performSearch, 300), []);
    
        // Handle input changes
        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchTerm(value); // Update the local state
            debouncedSearch(value); // Trigger the debounced search
        };

    // search navigate
    const handleNavigateSearchedData = (searchedData:SearchType) =>{
        if(searchedData.scannedFile){
            navigate(`preview/file/${searchedData.id}`)
        }else{
            navigate( `preview/${searchedData.id}`)
        }
    }
    
    // Function to handle the download of data as Excel
    const handleDownload = () => {
        if (data && data.data) {
            const formattedData = data.data.map((cert: DeathCertData) => ({
                "Registry No.": cert.registryNumber || 'N/A',
                "First Name": cert.one_first || 'N/A',
                "Last Name": cert.one_last || 'N/A',
                "Middle Name": cert.one_middle || 'N/A',
                "Address (House No., Street, Barangay)": cert.eight_houseNo || 'N/A',
                "City/Municipality": cert.eight_cityOrMunicipality || 'N/A',
                "Province": cert.eight_province || 'N/A',
            }));

            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Death Certificates");
            XLSX.writeFile(workbook, "death_certificates.xlsx");

            activityMutation.mutate("Downloaded Death certificates data");
        }
    };

    const handleArchive = (id:number) =>{
        archive.mutate({type:'death_certificates',  certificate_id:id as number})
    }

    if (isLoading) return <Loading/>;

    const totalPages = Math.ceil((data?.total || 0) / itemsPerPage); // Calculate total pages

    return (
        <section>
            <h1 className='text-3xl font-semibold text-darkCyan flex flex-col'>
                Registering and Issuance of <span>Death Certificate</span>
            </h1>
            <div className='flex items-end justify-between mt-5 px-2'>
                {/* Search Input */}
                <div className='flex items-end relative w-72'>
                    <div className='group w-full flex flex-row items-end border-b-2 border-gray-300 focus-within:border-darkCyan'>
                        <span className="py-2.5 ps-2 font-medium text-gray-400 group-focus-within:text-darkCyan">
                            <IoSearch />
                            <span className="sr-only">Search</span>
                        </span>
                        <input 
                            type='text'
                            value={searchTerm}  // Bind input to searchTerm state
                            onChange={handleSearchChange}  // Update searchTerm on change
                            placeholder='Search for Registry No. or Name'
                            className='h-9 w-full border-0 bg-transparent focus:outline-none focus:border-transparent focus:ring-0'
                        />
                    </div>
                    {/* <button
                        className="p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel"
                        onClick={handleSearchClick} // Trigger search on button click
                    >
                        <IoSearch />
                        <span className="sr-only">Search</span>
                    </button> */}
                    {/* suggestions */}
                    <div className={`bg-white absolute -bottom-[11.3rem] rounded-b-sm left-0 right-0 p-3 h-44 drop-shadow-md border-t-0 border-[1px] border-slate-200 overflow-y-auto ${searchTerm.length > 0 ? '':'hidden'}`}>
                        {
                            searchIsLoading ?
                            (
                                <div className='w-full h-full flex items-center justify-center'>
                                    <LoaderDefault/>
                                </div>
                            ):(
                                searchResult.length > 0 ?
                                (
                                    searchResult.map((data, index)=>(
                                        <div key={index} onClick={()=>{handleNavigateSearchedData(data)}} className='flex items-center gap-5 border-b-[1px] border-slate-300 p-1 cursor-pointer'>
                                            <p>{data.registryNumber}</p>
                                            <p>{`${data.one_first} ${data.one_middle} ${data.one_last}`}</p>
                                        </div>
                                    ))
                                ):(
                                    <div className='w-full h-full flex items-center justify-center text-sm font-medium text-gray-500'>
                                        <p>No data</p>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
                <div className='flex items-center gap-1'>
                    <Tooltip content="Download">
                        <button onClick={handleDownload} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                            <MdFileDownload />
                            <span className="sr-only">Download</span>
                        </button>
                    </Tooltip>

                    <Tooltip content="Register">
                        <button onClick={() => navigate('/death-certificate/registering-death-certificate')} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
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
                            <th className='px-2 py-2 text-left'>Middle</th>
                            <th className='px-2 py-2 text-left'>Last</th>
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
                                    data?.data?.map((cert: DeathCertData) => (
                                        <tr key={cert.id} className='bg-white hover:bg-[#145C7F11] transition-colors'>
                                            <td className='px-3 py-2'>{cert.registryNumber  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.one_first  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.one_middle || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.one_last  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.eight_houseNo  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.eight_cityOrMunicipality  || 'N/A'}</td>
                                            <td className='px-3 py-2'>{cert.eight_province  || 'N/A'}</td>
                                            <td className='flex flex-row items-center justify-center gap-2 px-3 py-2 text-center'>
                                                <Tooltip content="View">
                                                    <button onClick={()=>{navigate(!cert.scannedFile ? `preview/${cert.id}`:`preview/file/${cert.id}`)}} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                                                        <FaEye />
                                                        <span className="sr-only">View</span>
                                                    </button>
                                                </Tooltip>
                                                <Tooltip content="Edit">
                                                    <button onClick={()=>{navigate(!cert.scannedFile ? `edit/${cert.id}`:`edit/file/${cert.id}`)}} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                                                        <FaEdit />
                                                        <span className="sr-only">Edit</span>
                                                    </button>
                                                </Tooltip>
                                                <Tooltip content="Archive">
                                                    <button onClick={()=>{handleArchive(cert.id as number)}} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-red-bg-red-700 hover:bg-darkBlueTeel'>
                                                        <IoArchive />
                                                        <span className="sr-only">Archive</span>
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

export default DeathCert;