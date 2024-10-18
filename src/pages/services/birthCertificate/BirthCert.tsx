import { Tooltip, Pagination } from 'flowbite-react';
import { useState } from 'react';
import { AiFillPrinter, IoMdPersonAdd, IoSearch } from '../../../hooks/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loading, serverURL } from '../../../hooks/imports';
import { BirthCertDataType } from '../../../types/birthCerthTypes';

function BirthCert() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigate = useNavigate();
    const itemsPerPage = 10; // Number of records per page

    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ['birth-certificates', currentPage],
        queryFn: async () => {
            const response = await axios.get(`${serverURL}/api/cris/birth-certificate/get-all`, {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                },
                withCredentials: true,
            });

            return response.data;
        }
    });

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) return <Loading/>;
    if (error) return <div>Error loading data.</div>;

    const totalPages = Math.ceil((data?.total || 0) / itemsPerPage); // Calculate total pages

    return (
        <section>
            <div className='flex items-end justify-between px-2'>
                <h1 className='text-3xl font-semibold text-darkCyan flex flex-col'>
                    Registering and Issuance of <span>Live Birth Certificate</span>
                </h1>
                <div className='flex items-center gap-1'>
                    <Tooltip content="Search">
                        <button className="p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel">
                            <IoSearch />
                            <span className="sr-only">Search</span>
                        </button>
                    </Tooltip>

                    <Tooltip content="Print">
                        <button className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                            <AiFillPrinter />
                            <span className="sr-only">Print</span>
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
                <table className='w-full border-collapse rounded-lg shadow-md overflow-hidden'>
                    <thead className='bg-gradient-to-r from-darkCyan to-darkBlueTeel text-white'>
                        <tr>
                            <th rowSpan={2} className='px-2 py-3 text-left'>Register No.</th>
                            <th colSpan={3} className='px-2 py-3 text-center border-x-[1px]'>Full Name</th>
                            <th colSpan={3} className='px-2 py-3 text-center border-x-[1px]'>Address</th>
                            <th rowSpan={2} className='px-2 py-3 text-center'>Action</th>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-left border-s-[1px]'>First</th>
                            <th className='px-2 py-2 text-left'>Last</th>
                            <th className='px-2 py-2 text-left border-e-[1px]'>Middle</th>
                            <th className='px-2 py-2 text-left border-s-[1px]'>House No., Street, Barangay</th>
                            <th className='px-2 py-2 text-left'>City/Municipality</th>
                            <th className='px-2 py-2 text-left border-e-[1px]'>Province</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((cert: BirthCertDataType) => (
                            <tr key={cert.id} className='bg-white hover:bg-[#145C7F11] transition-colors'>
                                <td className='px-3 py-2'>{cert.registryNumber  || 'N/A'}</td>
                                <td className='px-3 py-2'>{cert.one_first  || 'N/A'}</td>
                                <td className='px-3 py-2'>{cert.one_last  || 'N/A'}</td>
                                <td className='px-3 py-2'>{cert.one_middle || 'N/A'}</td>
                                <td className='px-3 py-2'>{cert.twelve_house  || 'N/A'}</td>
                                <td className='px-3 py-2'>{cert.twelve_cityOrMunicipality  || 'N/A'}</td>
                                <td className='px-3 py-2'>{cert.twelve_province  || 'N/A'}</td>
                                <td className='px-3 py-2 text-center'>
                                    <button onClick={()=>{navigate(`preview/${cert.id}`)}} className='bg-[#0E7490] text-white px-3 py-1 rounded-sm drop-shadow-md'>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Control with Flowbite */}
                <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        totalPages={totalPages} // Pass the calculated total pages
                        showIcons={true}
                    />
                </div>

                {isFetching && <div className="text-center">Loading more...</div>}
            </div>
        </section>
    );
}

export default BirthCert;
