import { Tooltip } from "flowbite-react"
import { AiFillPrinter } from '../../../hooks/icons'
import { Navigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { Loading, serverURL } from "../../../hooks/imports";
import { useActivityMutation } from "../../../services/sendActivity";
import { getSingleFoundlingsCert } from "../../../services/getSingleFoundlingsCert";

function ViewFoundLings() {
    const { id } = useParams();
    const activityMutation = useActivityMutation();
    const contentRef = useRef<HTMLDivElement>(null);  // Reference to the certificate content

    // Setup react-to-print for printing the specific certificate content
    const reactToPrintFn = useReactToPrint({
        contentRef, // Correctly pass the contentRef here
    });

    const { data, isLoading } = getSingleFoundlingsCert(id as string);
    
    if(isLoading) return <Loading/>
    
    if(!id){
        <Navigate to='*'/>
    }

    const handlePrint = () =>{
        reactToPrintFn();

        activityMutation.mutate(`Foundling certificate printed for ${data?.one_name} (Registry No. ${data?.registryNumber})`);
    }

    return (
        <div>
            <div className="w-full flex items-end justify-end px-4">
                <Tooltip content="Print">
                    <button onClick={handlePrint} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                        <AiFillPrinter />
                        <span className="sr-only">Print</span>
                    </button>
                </Tooltip>
            </div>
            <div ref={contentRef} className='w-[65rem] m-3 h-full border-2 border-gray-700 bg-gray-100'>
                <div className="border-b-2 border-gray-700 w-full overflow-auto">
                    <div className="flex items-center py-2 px-5 justify-between">
                        <div className="flex flex-col text-[12px] text-gray-800">
                            <span>
                                Municipal Form No. 0{id}
                            </span>
                            <span>
                                (Revised January 1993)
                            </span>
                        </div>
                        <div className="text-[12px] text-gray-800">
                            <span>
                                (To be accomplished in quadruplicate)
                            </span>
                        </div>
                    </div>
                    <div className="text-gray-800 w-full flex flex-col items-center justify-center text-center border-b-2 border-gray-700 p-2">
                        <span className="text-xl">
                            Republic of the Philippines
                        </span>
                        <span className="text-xl font-semibold uppercase">
                            Certificate of Foundling
                        </span>
                    </div>
                    <div className="grid grid-cols-3 w-full overflow-auto">
                        <div className="col-span-2 py-2 px-5">
                            <div className="flex flex-row items-end gap-2 mb-2">
                                <span className="text-gray-800 text-sm">
                                    Province
                                </span>
                                <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                    <span>{data?.province}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-end gap-2">
                                <span className="text-gray-800 text-sm">
                                    City/Municiplity
                                </span>
                                <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                    <span>{data?.cityOrMunicipality}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 border-s-2 border-gray-700 px-5 py-2 ">
                            <span className="text-gray-800 text-sm">
                                Registry No.
                            </span>
                            <div className="flex items-center flex-1 text-sm" >
                                <span>{data?.registryNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>

            {/* CHILD */}
                <div className="flex flex-row border-b-2 border-gray-900">
                    <div className="flex flex-col items-start justify-center text-sm font-bold border-r-2 border-gray-800 w-10 p-2">
                        <span className="uppercase text-gray-800">C</span>
                        <span className="uppercase text-gray-800">H</span>
                        <span className="uppercase text-gray-800">I</span>
                        <span className="uppercase text-gray-800">L</span>
                        <span className="uppercase text-gray-800">D</span>
                    </div>
                    <div className="flex flex-col w-full">
                            {/* number 1 and  2 */}
                        <div className="flex flex-row border-b-2 border-gray-800">
                            <div className="flex flex-col px-2 border-e-2 border-gray-800 flex-1">
                                <label htmlFor="one_name_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    1. Name
                                </label>
                                <div className="flex items-center h-7 flex-1 text-sm" >
                                    <span>{data?.one_name}</span>
                                </div>
                            </div>
                            <div className="flex flex-col px-2 w-60">
                                <label htmlFor="one_sex_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    2. Sex
                                </label>
                                <div className="flex items-center h-7 flex-1 text-sm" >
                                    <span>{data?.two_sex}</span>
                                </div>
                            </div>
                        </div>
                        
                            {/* number 3 and  4 */}
                        <div className="flex flex-row border-b-2 border-gray-800">
                            <div className="flex flex-col px-2 border-e-2 border-gray-800 flex-1">
                                <label htmlFor="one_age_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    3. Age when found
                                </label>
                                <div className="flex items-center h-7 flex-1" >
                                    <span>{data?.three_age}</span>
                                </div>
                            </div>
                            <div className="flex flex-col px-2 w-96">
                                <label htmlFor="one_dateAndTime_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    4. Date and time when found
                                </label>
                                <div className="flex items-center h-7 flex-1 text-sm" >
                                    <span>{data?.four_dateAndTime}</span>
                                </div>
                            </div>
                        </div>

                            {/* number 5 */}
                        <div className="flex flex-col px-2 border-b-2 border-gray-800 flex-1">
                            <label htmlFor="one_placeWhereFound_child" className="text-gray-800 text-sm uppercase font-semibold">
                                5. Place where found
                            </label>
                            <div className="flex items-center h-7 flex-1 text-sm" >
                                <span>{data?.five_place}</span>
                            </div>
                        </div>

                        {/* number 6 and  7 */}
                        <div className="flex flex-row border-b-2 border-gray-800">
                            <div className="flex flex-col px-2 border-e-2 border-gray-800 flex-1">
                                <label htmlFor="one_eyesColor_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    6. Color of the eyes
                                </label>
                                <div className="flex items-center h-7 flex-1 text-sm" >
                                    <span>{data?.six_eyesColor}</span>
                                </div>
                            </div>
                            <div className="flex flex-col px-2 w-72">
                                <label htmlFor="one_hairColor_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    7. color of the hair
                                </label>
                                <div className="flex items-center h-7 flex-1 text-sm" >
                                    <span>{data?.seven_hairColor}</span>
                                </div>
                            </div>
                        </div>
                        
                            {/* number 8 */}
                        <div className="flex flex-col px-2 border-b-2 border-gray-800 flex-1">
                            <label htmlFor="one_bodyFeatures_child" className="text-gray-800 text-sm uppercase font-semibold">
                                8. Distinct body features or marks
                            </label>
                            <div className="flex items-center h-7 flex-1 text-sm" >
                                <span>{data?.eight_bodyFeature}</span>
                            </div>
                        </div>
                        
                            {/* number 9 */}
                        <div className="flex flex-col px-2 flex-1">
                            <label htmlFor="one_childCondition_child" className="text-gray-800 text-sm uppercase font-semibold">
                                9. Condition of the child when found
                            </label>
                            <div className="flex items-center h-7 flex-1 text-sm" >
                                <span>{data?.nine_condition}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Finder */}
                <div className="flex flex-row border-b-2 border-gray-800">
                    <div className="flex flex-col items-start justify-center text-sm font-bold border-r-2 border-gray-800 w-10 p-2">
                        <span className="uppercase text-gray-800">F</span>
                        <span className="uppercase text-gray-800">I</span>
                        <span className="uppercase text-gray-800">N</span>
                        <span className="uppercase text-gray-800">D</span>
                        <span className="uppercase text-gray-800">E</span>
                        <span className="uppercase text-gray-800">R</span>
                    </div>
                    <div className="w-full p-1">
                        <div className="flex flex-row items-end gap-2 mb-2 w-full">
                            <label htmlFor="ten_name_finder" className="text-gray-800 text-sm font-medium">
                                10. Name
                            </label>
                            <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                <span>{data?.ten_name}</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                            <label htmlFor="ten_address_finder" className="text-gray-800 text-sm font-medium">
                                Address
                            </label>
                            <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                <span>{data?.ten_address}</span>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                                <label htmlFor="ten_telephone_finder" className="text-gray-800 text-sm font-medium">
                                    Telephone No. (if any)
                                </label>
                                <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                <span>{data?.ten_telephone}</span>
                            </div>
                            </div>
                            <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                                <label htmlFor="ten_occupation_finder" className="text-gray-800 text-sm font-medium">
                                    Occupation
                                </label>
                                <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                    <span>{data?.ten_occupation}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Finder */}
                <div className="flex flex-row border-b-2 border-gray-800">
                    <div className="flex flex-col items-start justify-center text-[11px] font-bold border-r-2 border-gray-800 w-10 p-2">
                        <span className="uppercase text-gray-800">I</span>
                        <span className="uppercase text-gray-800">N</span>
                        <span className="uppercase text-gray-800">F</span>
                        <span className="uppercase text-gray-800">O</span>
                        <span className="uppercase text-gray-800">R</span>
                        <span className="uppercase text-gray-800">M</span>
                        <span className="uppercase text-gray-800">A</span>
                        <span className="uppercase text-gray-800">N</span>
                        <span className="uppercase text-gray-800">T</span>
                    </div>
                    <div className="w-full p-1">
                        <div className="flex flex-row items-end gap-2 mb-2 w-full">
                            <label htmlFor="eleven_name_finder" className="text-gray-800 text-sm font-medium">
                                11. Name
                            </label>
                            <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                <span>{data?.eleven_name}</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                            <label htmlFor="eleven_address_finder" className="text-gray-800 text-sm font-medium">
                                Address
                            </label>
                            <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                <span>{data?.eleven_address}</span>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                                <label htmlFor="eleven_telephone_finder" className="text-gray-800 text-sm font-medium">
                                    Telephone No. (if any)
                                </label>
                                <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                    <span>{data?.eleven_telephone}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                                <label htmlFor="eleven_occupation_finder" className="text-gray-800 text-sm font-medium">
                                    Occupation
                                </label>
                                <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                    <span>{data?.eleven_occupation}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  */}
                <div className="flex flex-row border-b-2 border-gray-800">
                    <div className="flex flex-col items-start justify-center text-[11px] font-bold border-r-2 border-gray-800 w-10 p-2"></div>
                    <div className="w-full">
                        <div className="uppercase font-semibold p-1  mb-5">
                            12. Certification
                        </div>
                        <div>
                            <span className="ps-10">
                                This is to certify that the information given above are true and correct to my own knowledge and belief.
                            </span>
                            <div className="flex flex-col items-end justify-end">
                                <div className="flex flex-col-reverse items-center gap-2 relative p-1 w-96 pe-5">
                                    <label htmlFor="twelve_signature" className="text-sm font-medium text-gray-800 border-t-[1px] border-gray-800 w-full text-center">(Signature of informant)</label>
                                    <div className="mt-5">
                                        
                                    </div>
                                </div>
                                <div className="flex flex-row items-end gap-2 mb-2 w-96 pe-5">
                                    <label htmlFor="twelve_CommunityTax" className="text-gray-800 text-sm font-medium">
                                        Address
                                    </label>
                                    <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                        <span>{data?.twelve_address}</span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end gap-2 mb-2 w-96 pe-5">
                                    <label htmlFor="twelve_DateIssued" className="text-gray-800 text-sm font-medium">
                                        Date Issued
                                    </label>
                                    <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                        <span>{data?.twelve_dateIssued}</span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end gap-2 mb-2 w-96 pe-5">
                                    <label htmlFor="twelve_PlacedIssued" className="text-gray-800 text-sm font-medium">
                                        Place Issued
                                    </label>
                                    <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                        <span>{data?.twelve_placeIssued}</span>
                                    </div>
                                </div>
                            </div>
                            <div  className="p-1">
                                <div className="flex flex-row items-end pe-5">
                                    <span className="uppercase font-bold ps-10 text-gray-800">Subscribed and sworn</span>
                                    <span className="text-gray-800 ms-2">
                                        to before me this
                                    </span>
                                    <div className="flex items-center justify-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-30 text-sm px-1" >
                                        <span>{data?.twelve_firstLine}</span>
                                    </div>
                                    <span className="text-gray-800 ms-2">
                                        day of
                                    </span>
                                    <div className="flex items-center justify-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-30 text-sm px-1" >
                                        <span>{data?.twelve_secondLine}</span>
                                    </div>
                                    <span>,</span>
                                </div>
                                <div className="flex flex-row items-end justify-center pe-5">
                                    <div className="flex items-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-30 text-sm px-1 " >
                                        <span>{data?.twelve_thirdLine}</span>
                                    </div>
                                    <span>at</span>
                                    <div className="flex items-center justify-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-30 text-sm px-1" >
                                        <span>{data?.twelve_thirdLine}</span>
                                    </div>
                                    <span>, Philippines.</span>
                                </div>
                                <div className="flex flex-col items-end justify-end mt-5 pe-5">
                                    <div>
                                        <div className="flex items-end justify-center mt-5">
                                            
                                        </div>
                                        <div className="flex flex-col-reverse items-center justify-center w-96">
                                            <label htmlFor="twelve_Name" className="text-sm text-gray-800 font-semibold">Signature over printed name of the Civil Registrar</label>
                                            <div className="flex items-center justify-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-30 w-full text-sm px-1" >
                                                <span>{data?.twelve_printedName}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Civil Registrar */}
                <div className="flex flex-row border-b-2 border-gray-800">
                    <div className="flex flex-col items-start justify-center text-[11px] font-bold border-r-2 border-gray-800 w-10 p-2">
                        <span className="uppercase text-gray-800">C</span>
                        <span className="uppercase text-gray-800">I</span>
                        <span className="uppercase text-gray-800">V</span>
                        <span className="uppercase text-gray-800">I</span>
                        <span className="uppercase text-gray-800 mb-2">L</span>
                        <span className="uppercase text-gray-800">R</span>
                        <span className="uppercase text-gray-800">E</span>
                        <span className="uppercase text-gray-800">G</span>
                        <span className="uppercase text-gray-800">I</span>
                        <span className="uppercase text-gray-800">S</span>
                        <span className="uppercase text-gray-800">T</span>
                        <span className="uppercase text-gray-800">R</span>
                        <span className="uppercase text-gray-800">A</span>
                        <span className="uppercase text-gray-800">R</span>
                    </div>
                    <div className="w-full">
                        <div className="uppercase font-semibold p-1 mb-5">
                            13.. Certification of the civil registrar
                        </div>
                        <div className="ps-20">
                            <span className="mt-5">
                                This is to certify that the foundling herein named is reported to this Office for registering on 
                            </span>
                        </div>
                        <div  className="px-5 flex">
                            <div className="flex items-center justify-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-7 text-sm" >
                                <span>{data?.thirteen_certification}</span>
                            </div>
                            <span className="ps-2">
                                and properly recorded in the Registar of Foundling.
                            </span>
                        </div>
                        <div className="flex flex-col items-end justify-end mt-10 pe-5">
                            <div>
                                <div className="flex items-end mt-5 justify-center">
                                    
                                </div>
                                <div className="flex flex-col-reverse items-center justify-center w-96">
                                    <label htmlFor="twelve_Name" className="text-sm text-gray-800 font-semibold">Signature over printed name of the Civil Registrar</label>
                                    <div className="flex items-center justify-center flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-700 h-30 w-full text-sm px-1" >
                                        <span>{data?.thirteen_printedName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewFoundLings