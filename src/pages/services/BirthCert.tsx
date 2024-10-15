import { CustomFlowbiteTheme, FloatingLabel, Pagination } from 'flowbite-react';
import { useState } from 'react';
import { AiFillPrinter, IoSearch } from '../../hooks/icons'

function BirthCert() {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const onPageChange = (page: number) => setCurrentPage(page);

    return (
        <section>
            <h1 className='text-3xl font-semibold text-darkCyan flex flex-col'>
                Registering and Issuance of <span>Live Birth Certificate</span>
            </h1>
            <div className='flex items-center justify-between mt-5 px-2'>
                <div className='flex flex-row items-end gap-2'>
                    <div>
                        <FloatingLabel
                            label="From"
                            variant="standard"
                            className="border-gray-300 focus:border-darkCyan"
                        />
                    </div>
                    <div>
                        <FloatingLabel
                            label="To"
                            variant="standard"
                            className="border-gray-300 focus:border-darkCyan"
                        />
                    </div>
                </div>
                <div className=''>
                    <button className="p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel">
                        <IoSearch/>
                        <span className="sr-only">Search</span>
                    </button>
                    <button className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                        <AiFillPrinter/>
                        <span className="sr-only">Print</span>
                    </button>
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
                                <button className='bg-[#0E7490] text-white px-3 py-1 rounded-sm drop-shadow-md'>View</button>
                            </td>
                        </tr>
                        <tr className='bg-[#F7FAFC] hover:bg-[#145C7F11] transition-colors'>
                            <td className='px-3 py-2'>002</td>
                            <td className='px-3 py-2'>Jane</td>
                            <td className='px-3 py-2'>Roe</td>
                            <td className='px-3 py-2'>Johnson</td>
                            <td className='px-3 py-2'>456</td>
                            <td className='px-3 py-2'>Oak St.</td>
                            <td className='px-3 py-2'>Barangay 2</td>
                            <td className='px-3 py-2 text-center'>
                                <button className='bg-[#0E7490] text-white px-3 py-1 rounded-sm drop-shadow-md'>View</button>
                            </td>
                        </tr>
                        <tr className='bg-[#F7FAFC] hover:bg-[#145C7F11] transition-colors'>
                            <td className='px-3 py-2'>003</td>
                            <td className='px-3 py-2'>Jane</td>
                            <td className='px-3 py-2'>Roe</td>
                            <td className='px-3 py-2'>Johnson</td>
                            <td className='px-3 py-2'>456</td>
                            <td className='px-3 py-2'>Oak St.</td>
                            <td className='px-3 py-2'>Barangay 2</td>
                            <td className='px-3 py-2 text-center'>
                                <button className='bg-[#0E7490] text-white px-3 py-1 rounded-sm drop-shadow-md'>View</button>
                            </td>
                        </tr>
                        <tr className='bg-[#F7FAFC] hover:bg-[#145C7F11] transition-colors'>
                            <td className='px-3 py-2'>003</td>
                            <td className='px-3 py-2'>Jane</td>
                            <td className='px-3 py-2'>Roe</td>
                            <td className='px-3 py-2'>Johnson</td>
                            <td className='px-3 py-2'>456</td>
                            <td className='px-3 py-2'>Oak St.</td>
                            <td className='px-3 py-2'>Barangay 2</td>
                            <td className='px-3 py-2 text-center'>
                                <button className='bg-[#0E7490] text-white px-3 py-1 rounded-sm drop-shadow-md'>View</button>
                            </td>
                        </tr>
                        <tr className='bg-[#F7FAFC] hover:bg-[#145C7F11] transition-colors'>
                            <td className='px-3 py-2'>003</td>
                            <td className='px-3 py-2'>Jane</td>
                            <td className='px-3 py-2'>Roe</td>
                            <td className='px-3 py-2'>Johnson</td>
                            <td className='px-3 py-2'>456</td>
                            <td className='px-3 py-2'>Oak St.</td>
                            <td className='px-3 py-2'>Barangay 2</td>
                            <td className='px-3 py-2 text-center'>
                                <button className='bg-[#0E7490] text-white px-3 py-1 rounded-sm drop-shadow-md'>View</button>
                            </td>
                        </tr>
                        <tr className='bg-[#F7FAFC] hover:bg-[#145C7F11] transition-colors'>
                            <td className='px-3 py-2'>003</td>
                            <td className='px-3 py-2'>Jane</td>
                            <td className='px-3 py-2'>Roe</td>
                            <td className='px-3 py-2'>Johnson</td>
                            <td className='px-3 py-2'>456</td>
                            <td className='px-3 py-2'>Oak St.</td>
                            <td className='px-3 py-2'>Barangay 2</td>
                            <td className='px-3 py-2 text-center'>
                                <button className='bg-[#0E7490] text-white px-3 py-1 rounded-sm drop-shadow-md'>View</button>
                            </td>
                        </tr>
                        <tr className='bg-[#F7FAFC] hover:bg-[#145C7F11] transition-colors'>
                            <td className='px-3 py-2'>003</td>
                            <td className='px-3 py-2'>Jane</td>
                            <td className='px-3 py-2'>Roe</td>
                            <td className='px-3 py-2'>Johnson</td>
                            <td className='px-3 py-2'>456</td>
                            <td className='px-3 py-2'>Oak St.</td>
                            <td className='px-3 py-2'>Barangay 2</td>
                            <td className='px-3 py-2 text-center'>
                                <button className='bg-[#0E7490] text-white px-3 py-1 rounded-sm drop-shadow-md'>View</button>
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

export default BirthCert