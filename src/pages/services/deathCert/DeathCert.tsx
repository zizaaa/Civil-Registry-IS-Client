import { Pagination, Tooltip } from 'flowbite-react';
import { useState } from 'react';
import { IoMdPersonAdd, IoSearch, MdFileDownload } from '../../../hooks/icons';
import { useNavigate } from 'react-router-dom';

function DeathCert() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigate = useNavigate();
    const onPageChange = (page: number) => setCurrentPage(page);

    return (
        <section>
            <h1 className='text-3xl font-semibold text-darkCyan flex flex-col'>
                Registering and Issuance of <span>Death Certificate</span>
            </h1>
            <div className='flex items-end justify-between mt-5 px-2'>
                {/* Search Input */}
                <div className='flex items-end'>
                    <div className='group flex flex-row items-end border-b-2 border-gray-300 focus-within:border-darkCyan'>
                        <input 
                            type='text'
                            placeholder='Search'
                            className='h-9 border-0 bg-transparent focus:outline-none focus:border-transparent focus:ring-0'
                        />
                    </div>
                    <button
                        className="p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel"
                    >
                        <IoSearch />
                        <span className="sr-only">Search</span>
                    </button>
                </div>
                <div className='flex items-center gap-1'>
                    <Tooltip content="Download">
                        <button className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
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
                <table className='w-full border-collapse rounded-lg shadow-md overflow-hidden'>
                    <thead className='bg-gradient-to-r from-darkCyan to-darkBlueTeel text-white'>
                        <tr>
                            <th rowSpan={2} className='px-2 py-3 text-left'>Register No.</th>
                            <th colSpan={3} className='px-2 py-3 text-center border-x-[1px]'>Full Name</th>
                            <th colSpan={3} className='px-2 py-3 text-center border-x-[1px]'>Address</th>
                            <th rowSpan={2} className='px-2 py-3 text-center'>Action</th>
                        </tr>
                        <tr className=''>
                            <th className='px-2 py-2 text-left border-s-[1px]'>First</th>
                            <th className='px-2 py-2 text-left'>Last</th>
                            <th className='px-2 py-2 text-left border-e-[1px]'>Middle</th>
                            <th className='px-2 py-2 text-left border-s-[1px]'>House No.</th>
                            <th className='px-2 py-2 text-left'>Street</th>
                            <th className='px-2 py-2 text-left border-e-[1px]'>Barangay</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-white hover:bg-[#145C7F11] transition-colors'>
                            <td className='px-3 py-2'>001</td>
                            <td className='px-3 py-2'>John</td>
                            <td className='px-3 py-2'>Doe</td>
                            <td className='px-3 py-2'>Smith</td>
                            <td className='px-3 py-2'>123</td>
                            <td className='px-3 py-2'>Main St.</td>
                            <td className='px-3 py-2'>Barangay 1</td>
                            <td className='px-3 py-2 text-center'>
                                <button onClick={()=>{navigate(`/death-certificate/preview/id`)}} className='bg-[#0E7490] text-white px-3 py-1 rounded-sm drop-shadow-md'>View</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
                </div>
            </div>
        </section>
    )
}

export default DeathCert