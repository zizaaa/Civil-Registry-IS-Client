import { Pagination, Tooltip } from 'flowbite-react'
import { FaEye, RiInboxUnarchiveFill } from '../../hooks/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderDefault, Loading, serverURL } from '../../hooks/imports';
import { useState } from 'react';
import { BirthCertDataType } from '../../types/birthCerthTypes';
import { FoundlingsTypes } from '../../types/foundLingTypes';
import { DeathCertData } from '../../types/deathCertTypes';
import { MarriageCertTypes } from '../../types/marriageCertTypes';
import { useActivityMutation } from '../../services/sendActivity';

interface archiveData {
    id: number,
    certificate_id: string,
    created_at: string,
    type: string,
    updated_at: string,
    additionalData: BirthCertDataType | FoundlingsTypes | DeathCertData | MarriageCertTypes
}

interface UnarchiveData {
    id:number;
    type:string;
    certificate_id:string;
}

function Archived() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const activityMutation = useActivityMutation();
    
    // Query the API including the currentSearchTerm
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['archived-certificates', currentPage],
        queryFn: async () => {
            const response = await axios.get(`${serverURL}/api/cris/archive/get-all`, {
                params: {
                    page: currentPage,
                    limit: itemsPerPage
                },
                withCredentials: true,
            });

            return response.data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (unarchiveData:UnarchiveData) => {
            await axios.post(
                `${serverURL}/api/cris/unarchive`,
                unarchiveData,
                { withCredentials: true }
            );
            return unarchiveData;
        },
        onError(error){
            console.error(error)
        },
        onSuccess(unarchiveData){
            activityMutation.mutate(`${unarchiveData.type === 'birthcertificate' ? 'Birth Certificate' : unarchiveData.type === 'death_certificates' ? 'Death Certificate' : unarchiveData.type === 'marriage_certificates' ? 'Marriage Certificate' : 'Foundlings'} has been unarchived`);
            refetch();
        }
    });

    const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    function formatDateToYYYYMMDD(timestamp:string) {
        const date = new Date(timestamp); // Convert the timestamp to a Date object
    
        const year = date.getFullYear(); // Get the year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based, so add 1) and pad with 0 if necessary
        const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with 0 if necessary
    
        return `${year}/${month}/${day}`; // Return the formatted string
    }

    if (isLoading) return <Loading/>;

    return (
        <div>
            <div className='w-full p-2'>
                <table className='w-full border-collapse rounded-lg shadow-md overflow-hidden'>
                    <thead className='bg-gradient-to-r from-darkCyan to-darkBlueTeel text-white rounded-t-md'>
                        <tr className='px-2 py-2 text-left border-s-[1px]'>
                            {/* <th className='px-2 py-3 text-left'>
                                <Checkbox 
                                    className='cursor-pointer'
                                    id='selectAll'
                                    name='selectAll'
                                />
                            </th> */}
                            <th className='px-2 py-3 text-left'>Registry Number</th>
                            <th className='px-2 py-3 text-left'>Type</th>
                            <th className='px-2 py-3 text-left'>Name</th>
                            <th className='px-2 py-3 text-left'>Date Archived</th>
                            <th className='px-2 py-3 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <LoaderDefault/>
                            ):(
                                data?.data?.length > 0 || error ? (
                                    data?.data?.map((archive:archiveData) => (
                                        <tr key={archive.id} className='bg-white hover:bg-[#145C7F11] transition-colors'>
                                            <td className="p-2">
                                                {archive.type === 'marriage_certificates' ? (archive.additionalData as MarriageCertTypes).RegistryNumber : (archive.additionalData as BirthCertDataType | FoundlingsTypes | DeathCertData).registryNumber}
                                            </td>
                                            <td className='p-2'>
                                                {archive.type === 'marriage_certificates' ? 'Marriage Certificate' : archive.type === 'birthcertificate' ? 'Birth Certificate' : archive.type === 'death_certificates' ? 'Death Certificate' : 'Foundlings'}  
                                            </td>
                                            <td className='p-2'>
                                                {archive.type === 'marriage_certificates' ? (archive.additionalData as MarriageCertTypes).one_first + ' ' + (archive.additionalData as MarriageCertTypes).one_last : archive.type === 'birthcertificate' ? (archive.additionalData as BirthCertDataType).one_first + ' ' + (archive.additionalData as BirthCertDataType).one_last : archive.type === 'foundlings_certificate' ? (archive.additionalData as FoundlingsTypes).one_name : archive.type === 'death_certificates' ? (archive.additionalData as DeathCertData).one_first + ' ' + (archive.additionalData as DeathCertData).one_last : 'N/A'}
                                            </td>
                                            <td className='p-2'>
                                                {formatDateToYYYYMMDD(archive.created_at)}
                                            </td>
                                            <td className='p-2 flex items-center'>
                                                {/* <Tooltip content="View">
                                                    <button className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                                                        <FaEye />
                                                        <span className="sr-only">View</span>
                                                    </button>
                                                </Tooltip> */}
                                                <Tooltip content="Unarchive">
                                                    <button onClick={()=>{mutation.mutate({id:archive.id, type:archive.type, certificate_id:archive.certificate_id})}} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                                                        <RiInboxUnarchiveFill/>
                                                        <span className="sr-only">Unarchive</span>
                                                    </button>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))
                                ):( 
                                    <tr className='h-28'>
                                        <td colSpan={10} className='px-2 py-3 text-center text-sm font-medium text-gray-800'>No Data Found</td>
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
        </div>
    )
}

export default Archived