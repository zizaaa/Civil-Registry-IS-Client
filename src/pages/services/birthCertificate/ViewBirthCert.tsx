import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { Loading, serverURL } from "../../../hooks/imports";
import { Navigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { Tooltip } from "flowbite-react";
import { AiFillPrinter } from '../../../hooks/icons';

function ViewBirthCert() {
    const { id } = useParams();

    const contentRef = useRef<HTMLDivElement>(null);  // Reference to the certificate content

    // Setup react-to-print for printing the specific certificate content
    const reactToPrintFn = useReactToPrint({
        contentRef, // Correctly pass the contentRef here
    });


    const { data,isLoading } = useQuery({
        queryKey:['single-data'],
        queryFn: async()=>{
            const { data } = await axios.get(`${serverURL}/api/cris/birth-certificate/get-single?id=${id}`, { withCredentials:true });

            return data;
        }
    });
    
    if(isLoading) return <Loading/>
    
    if(!id){
        <Navigate to='*'/>
    }

    console.log(data)
    return (
        <div>
            <div className="w-full flex items-end justify-end px-4">
                <Tooltip content="Print">
                    <button onClick={()=>{reactToPrintFn()}} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                        <AiFillPrinter />
                        <span className="sr-only">Print</span>
                    </button>
                </Tooltip>
            </div>
            <div ref={contentRef} className="w-[65rem] m-3 h-full border-b-0 border-s-0 border-4 border-green bg-gray-100">
                <div className="grid grid-cols-4 border-s-4 border-green w-full overflow-auto">
                    <div className="col-span-3 border-e-4 border-green w-full overflow-auto">
                        <div className="flex items-center pt-1 px-5 justify-between">
                            <div className="flex flex-col text-[12px] text-green">
                                <span>
                                    Municipal Form No. 0{id}
                                </span>
                                <span>
                                    (Revised January 2024)
                                </span>
                            </div>
                            <div className="text-[12px] text-green">
                                <span>
                                    (To be accomplished in quadruplicate)
                                </span>
                            </div>
                        </div>
                        <div className="text-green w-full flex flex-col items-center justify-center text-center border-b-2 border-green px-2">
                            <span className="text-[17px]">
                                Republic of the Philippines
                            </span>
                            <span className="text-[17px] uppercase">
                                Office of the civil registrar general
                            </span>
                            <span className="text-[17px] font-semibold uppercase">
                                Certificate of Live Birth
                            </span>
                            <span className="text-[10px] font-medium w-96 mt-3 mb-5">
                                (Fill out completely, accurately and legibly. Use ink or typewriter.
                                Place X before the appropriate ANSWER IN ITEMS 2, 5A, 5B AND 19A.) 
                            </span>
                        </div>
                        <div className="grid grid-cols-3 w-full overflow-auto">
                            <div className="col-span-2 mt-1 px-5">
                                <div className="flex flex-row items-end gap-2 mb-2">
                                    <span className="text-green text-sm">
                                        Province
                                    </span>
                                    <span
                                        className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-6 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.province}
                                    </span>
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <span className="text-green text-sm">
                                        City/Municiplity
                                    </span>
                                    <span 
                                        className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-6 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.cityOrMunicipality}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-1 border-s-2 border-green px-5 py-2 ">
                                <span className="text-green text-sm">
                                    Registry No.
                                </span>
                                <span 
                                    className="flex-1 h-6 text-sm flex items-end text-gray-800" 
                                >
                                    {data.registryNumber}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col items-center px-2 py-2 break-all">
                        <span className="text-green text-xl font-semibold uppercase">
                            Remarks/Annotation
                        </span>
                        <span 
                            className="w-full flex-wrap p-2 h-7 text-sm flex items-end text-gray-800" 
                        >
                            {data.remarksAnnotation}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t-4 border-green">
                    <div className="col-span-3 border-e-4 border-green">
                        {/* children */}
                        <div className="flex flex-row border-b-2 border-s-4 border-green">
                            <div className="flex flex-col items-start justify-center text-2xl font-semibold border-r-2 border-green w-10 p-2">
                                <span className="uppercase text-green">C</span>
                                <span className="uppercase text-green">H</span>
                                <span className="uppercase text-green">I</span>
                                <span className="uppercase text-green">L</span>
                                <span className="uppercase text-green">D</span>
                            </div>
                            <div className="w-full overflow-auto">
                                {/* number 1 */}
                                <div className="flex flex-row gap-1 px-2  py-1 border-b-2 border-green w-full ">
                                    <div>
                                        <span className="text-green font-semibold uppercase">
                                            1. Name
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (First)
                                        </span>
                                        <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                            {data.one_first}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Middle)
                                        </span>
                                        <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                            {data.one_middle}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Last)
                                        </span>
                                        <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                            {data.one_last}
                                        </span>
                                    </div>
                                </div>
                                {/* number 2 and 3 */}
                                <div className="grid grid-cols-3 border-b-2 border-green w-full">
                                    <div className="flex flex-col px-2 py-1 col-span-1">
                                        <div>
                                            <span className="uppercase font-semibold text-green">
                                                2. Sex
                                            </span>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <span className="text-green text-sm cursor-pointer">Male</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.two_sex === 'male' ? "/":""}
                                                </span>
                                            </div>
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <span className="text-green text-sm cursor-pointer">Female</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.two_sex === 'female' ? "/":""}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex flex-row px-2 py-1 border-s-2 border-green">
                                        <div>
                                            <span className="uppercase font-semibold text-green">
                                                3. Date of birth
                                            </span>
                                        </div>
                                        <div className="flex flex-row justify-evenly flex-1">
                                            <div className="flex flex-col text-center gap-1">
                                                <span className="text-green text-sm">
                                                    (day)
                                                </span>
                                                <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                                    {data.three_day}
                                                </span>
                                            </div>
                                            <div className="flex flex-col text-center gap-1">
                                                <span className="text-green text-sm">
                                                    (month)
                                                </span>
                                                <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                                    {data.three_month}
                                                </span>
                                            </div>
                                            <div className="flex flex-col text-center gap-1">
                                                <span className="text-green text-sm">
                                                    (year)
                                                </span>
                                                <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                                    {data.three_year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* number 4 */}
                                <div className="flex flex-row gap-5 px-2 py-1 border-b-2 border-green">
                                    <div>
                                        <span className="text-green font-semibold uppercase">4. Place of Birth</span>
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <span className="text-green text-[12px]">
                                            (Name of Hospital/Clinic/Institution/House No., Street, Barangay)
                                        </span>
                                        <span className="w-full flex-wrap text-sm flex items-end justify-center text-gray-800 " >
                                            {data.four_nameOf}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <span className="text-green text-sm">
                                            (City/Municipality)
                                        </span>
                                        <span className="w-full flex-wrap text-sm flex items-end justify-center text-gray-800" >
                                            {data.four_cityOrMunicipality}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <span className="text-green text-sm">
                                            (Province)
                                        </span>
                                        <span className="w-full flex-wrap text-sm flex items-end justify-center text-gray-800" >
                                            {data.four_province}
                                        </span>
                                    </div>
                                </div>
                                {/* number 5 */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-1 border-e-2 border-green flex flex-col px-2 py-1">
                                        <div>
                                            <span className="text-green font-semibold">
                                                5a. <span className="uppercase">Type of birth</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row gap-2">
                                                <div className="flex flex-row-reverse items-center gap-2">
                                                    <span className="text-green text-sm cursor-pointer">1. Single</span>
                                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-5 text-sm flex items-end justify-center text-gray-800 w-7" >
                                                        {data.fiveA_typeOfBirth === 'single' ? "/":""}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row-reverse items-center gap-2">
                                                    <span className="text-green text-sm cursor-pointer">2. Twin</span>
                                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-5 text-sm flex items-end justify-center text-gray-800 w-7" >
                                                        {data.fiveA_typeOfBirth === 'twin' ? "/":""}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <div className="flex flex-row-reverse items-center gap-2">
                                                    <span className="text-green text-sm cursor-pointer">3. Triplet Etc.</span>
                                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-5 text-sm flex items-end justify-center text-gray-800 w-7" >
                                                        {data.fiveA_typeOfBirth === 'triplet' ? "/":""}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 px-2 py-1">
                                        <div>
                                            <span className="text-green font-semibold">
                                                b. <span className="uppercase">IF MULTIPLE BIRTH, CHILD WAS</span> 
                                            </span>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <span className="text-green text-sm cursor-pointer">1. First</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-7" >
                                                    {data.fiveB_IfMultiple === 'first' ? "/":""}
                                                </span>
                                            </div>
                                            <div className="flex flex-row-reverse items-center gap-2">
                                            <span className="text-green text-sm cursor-pointer">1. Second</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-7" >
                                                    {data.fiveB_IfMultiple === 'second' ? "/":""}
                                                </span>
                                            </div>
                                            <div className="flex flex-row-reverse items-center gap-2 ">
                                                <span className="border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 min-w-20">
                                                    {data.fiveB_IfMultiple !== 'first' && data.fiveB_IfMultiple !== 'second' ? data.fiveB_IfMultiple:""}
                                                </span>
                                                <span className="text-green text-sm cursor-pointer">3. Others, Specify</span>
                                                <span className="border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-7" >
                                                    {data.fiveB_IfMultiple !== 'first' && data.fiveB_IfMultiple !== 'second' ? "/":""}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* letter c */}
                                <div className="grid grid-cols-3">
                                    <div className="col-span-2 border-e-2 border-green p-2">
                                        <div className="flex flex-row items-start gap-2">
                                            <div>
                                                <span className="text-green font-semibold">
                                                    c. <span className="uppercase">Birth Order</span>
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-sm text-green">
                                                    (live births and fetal deaths including this delivery) 
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row-reverse items-end gap-2">
                                            <span className="text-green text-sm cursor-pointer">(first, second, third, etc.) </span>
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 min-w-20" >
                                                {data.fiveC_birthOrder}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div>
                                            <span className="text-green font-semibold">
                                                d. <span className="uppercase">WEIGHT AT BIRTH</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-row-reverse items-end gap-2">
                                            <span className="text-green text-sm cursor-pointer">grams</span>
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 min-w-20" >
                                                {data.fiveD_weight}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* mother */}
                        <div className="flex flex-row border-b-2 border-s-4 border-green">
                            <div className="flex flex-col items-start justify-center text-2xl font-semibold border-r-2 border-green w-10 p-2">
                                <span className="uppercase text-green">M</span>
                                <span className="uppercase text-green">O</span>
                                <span className="uppercase text-green">T</span>
                                <span className="uppercase text-green">H</span>
                                <span className="uppercase text-green">E</span>
                                <span className="uppercase text-green">R</span>
                            </div>
                            <div className="w-full overflow-auto">
                                {/* number 6 */}
                                <div className="flex flex-row gap-1 p-2 border-b-2 border-green w-full">
                                    <div>
                                        <span className="text-green font-semibold uppercase">
                                            6. Maiden Name
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (First)
                                        </span>
                                        <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                            {data.six_first}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Middle)
                                        </span>
                                        <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                            {data.six_middle}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Last)
                                        </span>
                                        <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                            {data.six_last}
                                        </span>
                                    </div>
                                </div>
                                {/* number 7 */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-2 border-e-2 border-green p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <span className="text-green font-semibold uppercase">
                                                7. CITIZENSHIP
                                            </span>
                                            <span className="w-full flex-wrap text-sm flex items-end text-gray-800" >
                                                {data.seven_citizenship}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <span className="text-green font-semibold uppercase">
                                                8. RELIGION
                                            </span>
                                            <span className="w-full flex-wrap text-sm flex items-end text-gray-800" >
                                                {data.eight_religion}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* number 9a */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-1 p-2">
                                        <div className="flex flex-row gap-1">
                                            <span className="text-green font-semibold">
                                                9a.
                                            </span>
                                            <div className="text-green text-sm cursor-pointer flex items-end relative"> 
                                                Total number of children born alive:
                                                <u className="absolute bottom-0 right-[6.5rem]">{data.nineA_totalNumber}</u>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1 border-x-2 p-2 border-green">
                                        <div className="flex flex-row gap-1">
                                            <span className="text-green font-semibold">
                                                b.
                                            </span>
                                            <div className="text-green text-sm cursor-pointer flex items-end relative"> 
                                                No. of Children still living including this birth:
                                                <u className="absolute bottom-0 right-[0.2rem]">{data.nineB_numberOfChild}</u>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div className="flex flex-row gap-1">
                                            <span className="text-green font-semibold">
                                                c.
                                            </span>
                                            <div className="text-green text-sm cursor-pointer flex items-end relative"> 
                                                No. of children born alive but are now dead:
                                                <u className="absolute bottom-0 right-[3rem]">{data.nineC_numberOfChildDead}</u>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* number 10 */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-2 border-e-2 border-green p-2">
                                        <div className="flex flex-col items-start">
                                            <span className="text-green font-semibold uppercase">
                                                10. OCCUPATION
                                            </span>
                                            <span className="w-full flex-wrap h-6 text-sm flex items-end text-gray-800" >
                                                {data.ten_occupation}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div>
                                            <span className="text-green text-sm">
                                                <span className="font-semibold">11.</span> Age at the time
                                                of this birth:
                                            </span>
                                        </div>
                                        <div className="flex flex-row-reverse items-end gap-2">
                                            <span className="text-green text-sm cursor-pointer">years</span>
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-green h-6 text-sm flex items-end justify-center text-gray-800 min-w-20" >
                                                {data.eleven_ageAtTheTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* number 12 */}
                                <div className="flex flex-row gap-5 p-2">
                                    <div>
                                        <span className="text-green font-semibold uppercase">12. Residence</span>
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <span className="text-green text-sm">
                                            (House No., Street, Barangay)
                                        </span>
                                        <span className="w-full flex-wrap text-sm flex items-end justify-center text-gray-800" >
                                            {data.twelve_house}
                                        </span>
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <span className="text-green text-sm">
                                            (City/Municipality)
                                        </span>
                                        <span className="w-full flex-wrap text-sm flex items-end justify-center text-gray-800" >
                                            {data.twelve_cityOrMunicipality}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-between flex-1">
                                        <span className="text-green text-sm">
                                            (Province)
                                        </span>
                                        <span className="w-full flex-wrap text-sm flex items-end justify-center text-gray-800" >
                                            {data.twelve_cityOrMunicipality}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* father */}
                        <div className="flex border-b-4 border-s-4 border-green">
                            <div className="flex flex-col items-start justify-center text-2xl font-semibold border-r-2 border-green w-10 p-2">
                                <span className="uppercase text-green">F</span>
                                <span className="uppercase text-green">A</span>
                                <span className="uppercase text-green">T</span>
                                <span className="uppercase text-green">H</span>
                                <span className="uppercase text-green">E</span>
                                <span className="uppercase text-green">R</span>
                            </div>
                            <div className="w-full overflow-auto">
                                {/* number 13 */}
                                <div className="flex flex-row gap-1 p-2 border-b-2 border-green w-full">
                                    <div>
                                        <span className="text-green font-semibold uppercase">
                                            13. Name
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (First)
                                        </span>
                                        <span className="w-full flex-wrap text-sm flex items-end justify-center text-gray-800" >
                                            {data.thirteen_first}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Middle)
                                        </span>
                                        <span className="w-full flex-wrap text-sm flex items-end justify-center text-gray-800" >
                                            {data.thirteen_middle}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Last)
                                        </span>
                                        <span className="w-full flex-wrap text-sm flex items-end justify-center text-gray-800" >
                                            {data.thirteen_last}
                                        </span>
                                    </div>
                                </div>
                                {/* number 14 */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-2 border-e-2 border-green p-2">
                                        <div className="flex flex-col items-start">
                                            <span className="text-green uppercase font-semibold">
                                                14. CITIZENSHIP
                                            </span>
                                            <span className="w-full flex-wrap text-sm flex items-end text-gray-800" >
                                                {data.fourteen_citizenship}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div className="flex flex-col items-start">
                                            <span className="text-green uppercase font-semibold">
                                                15. RELIGION
                                            </span>
                                            <span className="w-full flex-wrap text-sm flex items-end text-gray-800" >
                                                {data.fifteen_religion}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* number 16 */}
                                <div className="grid grid-cols-3">
                                    <div className="col-span-2 border-e-2 border-green p-2">
                                        <div className="flex flex-col items-start">
                                            <span className="text-green uppercase font-semibold">
                                                16. OCCUPATION
                                            </span>
                                            <span className="w-full flex-wrap text-sm flex items-end text-gray-800" >
                                                {data.sixteen_occupation}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div>
                                            <span className="text-green text-sm">
                                                <span className="font-semibold">17.</span> Age at the time
                                                of this birth:
                                            </span>
                                        </div>
                                        <div className="flex flex-row-reverse items-end gap-2">
                                            <span className="text-green text-sm cursor-pointer">years</span>
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-center text-gray-800 min-w-20" >
                                                {data.seventeen_ageAtTheTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* number 18 */}
                        <div className="border-b-2 border-green ms-4 ps-9">
                            <div>
                                <span className="text-green text-sm">
                                    <span className="uppercase font-medium">18. DATE AND PLACE OF MARRIAGE OF PARENTS </span>
                                    (If not married, accomplish Affidavit of Acknowledgement/Admission of Paternity at the back.) 
                                </span>
                            </div>
                            <div>
                                <span className="w-full flex-wrap p-2 text-sm flex items-end text-gray-800" >
                                    {data.eighteen_DateAndPlaceOfMarriageOfParents}
                                </span>
                            </div>
                        </div>
                        {/* number 19 */}
                        <div className="border-b-2 border-green ms-4 ps-9 pb-2">
                            <div>
                                <span className="text-green text-sm font-medium">
                                    19a. <span className="uppercase">Attendant</span>
                                </span>
                            </div>
                            <div className="flex flex-row gap-40">
                                <div className="flex flex-row-reverse items-center gap-2">
                                    <span className="text-green text-sm cursor-pointer">1. Physician</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-3 text-sm flex items-end justify-center text-gray-800 w-10" >
                                        {data.nineteenA_attendant === 'physician' ? "/":""}
                                    </span>
                                </div>
                                <div className="flex flex-row-reverse items-center gap-2">
                                    <span className="text-green text-sm cursor-pointer">2. Nurse</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-3 text-sm flex items-end justify-center text-gray-800 w-10" >
                                        {data.nineteenA_attendant === 'nurse' ? "/":""}
                                    </span>
                                </div>
                                <div className="flex flex-row-reverse items-center gap-2">
                                    <span className="text-green text-sm cursor-pointer">3. Midwife</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-3 text-sm flex items-end justify-center text-gray-800 w-10" >
                                        {data.nineteenA_attendant === 'midwife' ? "/":""}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row gap-[3.6rem]">
                                <div className="flex flex-row-reverse items-center gap-2">
                                    <span className="text-green text-sm cursor-pointer">4. Hilot (traditional Midwife)</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-3 text-sm flex items-end justify-center text-gray-800 w-10" >
                                        {data.nineteenA_attendant === 'traditional Midwife' ? "/":""}
                                    </span>
                                </div>
                                <div className="flex flex-row-reverse items-center gap-2">
                                    <span className="text-green text-sm cursor-pointer">5. Others (Specify)</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-3 text-sm flex items-end justify-center text-gray-800 w-10" >
                                        {data.nineteenA_attendant !== 'physician' && data.nineteenA_attendant !== 'nurse' && data.nineteenA_attendant !== 'midwife' && data.nineteenA_attendant !== 'traditional Midwife' ? data.nineteenA_attendant:""}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* number 19b */}
                        <div className="border-b-2 border-green ms-4 ps-9 pb-1">
                            <div>
                                <span className="font-semibold text-green">
                                    19b. <span className="uppercase">CERTIFICATION OF BIRTH</span>
                                </span>
                            </div>
                            <div>
                                <span className="text-sm text-green ps-12">
                                    I hereby certify that I attended the birth of the child who was born alive at
                                </span>
                                <input type="text" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-28 bg-transparent" value={data.nineteenB_bornAliveAt} disabled/>
                                <span className="text-sm text-green">o’clock am/pm on the date stated above.</span>
                            </div>
                            <div className="grid grid-cols-2 gap-10">
                                <div>
                                    <div className="flex flex-row items-end gap-2 relative">
                                        <span className="text-green text-sm font-medium">Signature</span>
                                        <figure className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start text-gray-800 w-10 " >
                                            <img src={`${serverURL}/${data.nineteenB_Signature}`} className="h-7 ps-2"/>
                                        </figure>
                                    </div>
                                    <div className="flex flex-row items-end mt-2">
                                        <span className="text-green text-sm cursor-pointer">Name in Print</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.nineteenB_nameInPrint}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-end mt-2">
                                        <span className="text-green text-sm cursor-pointer">Title or Position</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.nineteenB_titleAndPosition}
                                        </span>
                                    </div>
                                </div>
                                <div className="pe-2">
                                    <div className="flex flex-row items-end gap-2 mt-2">
                                        <span className="text-green text-sm cursor-pointer">Address</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.nineteenB_address}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-end gap-2 mt-2">
                                        <span className="text-green text-sm cursor-pointer">Date</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.nineteenB_date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* number 20 */}
                        <div className="border-b-2 border-green ms-4 ps-9 pb-2">
                            <div>
                                <span className="font-semibold text-green uppercase">
                                    20. INFORMANT
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-10">
                                <div>
                                    <div className="flex flex-row items-end gap-2 relative">
                                        <span className="text-green text-sm font-medium">Signature</span>
                                        <figure className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start text-gray-800 w-10 " >
                                            <img src={`${serverURL}/${data.twenty_Signature}`} className="h-7 ps-2"/>
                                        </figure>
                                    </div>
                                    <div className="flex flex-row items-end mt-2">
                                        <span className="text-green text-sm cursor-pointer">Name in Print</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.twenty_nameInPrint}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-end mt-2">
                                        <span className="text-green text-sm cursor-pointer">Relationship to the child</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.twenty_relationToChild}
                                        </span>
                                    </div>
                                </div>
                                <div className="pe-2 mt-2">
                                    <div className="flex flex-row items-end gap-2">
                                        <span className="text-green text-sm cursor-pointer">Address</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.twenty_address}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-end gap-2 mt-2">
                                        <span className="text-green text-sm cursor-pointer">Date</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.twenty_date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* number 21 and 22 */}
                        <div className="grid grid-cols-2 border-b-2 border-green ms-4 ps-9">
                            <div className="col-span-1 border-e-2 border-green">
                                <div>
                                    <span className="font-semibold text-green uppercase">
                                        21. PREPARED BY
                                    </span>
                                </div>
                                <div className="pe-4">
                                    <div className="flex flex-row items-end gap-2 relative">
                                        <span className="text-green text-sm font-medium">Signature</span>
                                        <figure className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start text-gray-800 w-10 " >
                                            <img src={`${serverURL}/${data.twentyOne_Signature}`} className="h-7 ps-2"/>
                                        </figure>
                                    </div>
                                    <div className="flex flex-row items-end mt-2">
                                        <span className="text-green text-sm cursor-pointer">Name in Print</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.twentyOne_nameInPrint}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-end mt-2">
                                        <span className="text-green text-sm cursor-pointer">Title of Position</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.twentyOne_titleOrPosition}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-end gap-2 mt-1">
                                        <span className="text-green text-sm cursor-pointer">Date</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.twentyOne_date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 pb-2 ps-6">
                                <div>
                                    <span className="font-bold text-green uppercase text-[12px]">
                                        22. RECEIVED AT THE OFFICE OF THE CIVIL REGISTRAR
                                    </span>
                                </div>
                                <div className="pe-4">
                                    <div className="flex flex-row items-end gap-2 relative">
                                        <span className="text-green text-sm font-medium">Signature</span>
                                        <figure className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start text-gray-800 w-10 " >
                                            <img src={`${serverURL}/${data.twentyTwo_Signature}`} className="h-7 ps-2"/>
                                        </figure>
                                    </div>
                                    <div className="flex flex-row items-end mt-2">
                                        <span className="text-green text-sm cursor-pointer">Name in Print</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.twentyTwo_nameInPrint}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-end mt-2">
                                        <span className="text-green text-sm cursor-pointer">Title of Position</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.twentyTwo_titleOrPosition}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-end gap-2 mt-1">
                                        <span className="text-green text-sm cursor-pointer">Date</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green text-sm flex items-end justify-start ps-2 text-gray-800 w-10" >
                                            {data.twentyTwo_date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 bg-[rgb(158,233,162)] border-b-4 border-green">
                        {/* left side */}
                        <div className="p-5 flex flex-col items-center border-b-2 border-green">
                            <div className="flex flex-col items-center leading-3 mb-3">
                                <span className="font-semibold text-green">FOR OCRG USE ONLY:</span>
                                <span className="font-semibold text-green text-sm">Population reference No.</span>
                            </div>
                            <span className="border-2 border-gray-500 bg-gray-100 px-2 w-56 h-7">
                                {data.populationReferenceNumber}
                            </span>
                        </div>
                        <div className="px-5 text-sm py-2">
                            <span className="text-green">
                            TO BE FILLED UP AT THE
                            OFFICE OF THE CIVIL
                            REGISTRAR
                            </span>
                        </div>
                        <div className="px-5 mt-2">
                            <span className="text-green text-sm">41</span>
                            <div className="mt-3">
                                {
                                    data.fourtyOne ? (
                                        data.fourtyOne.split('').map((letter:string, index:number) => (
                                            <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                {letter}
                                            </span>
                                        ))
                                    ):(
                                        <div>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="px-5 mt-6 flex flex-col">
                            <span className="text-green text-sm">48</span>
                            <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                {data.fourtyEight || ''}
                            </span>
                        </div>
                        <div className="px-5 mt-6 flex gap-2">
                            <div className="flex flex-col">
                                <span className="text-green text-sm">49</span>
                                <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                    {data.fourtyNine || ''}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-green text-sm">50</span>
                                <div className="mt-3">
                                    {
                                        data?.fifthy ? 
                                        (
                                            data?.fifthy?.split('').map((letter:string, index:number) => (
                                                <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                    {letter}
                                                </span>
                                            ))
                                        ):(
                                            <div>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="px-5 mt-6">
                            <div className="flex flex-col">
                                <span className="text-green text-sm">56</span>
                                <div className="mt-3">
                                    {
                                        data?.fiftySix ? 
                                        (
                                            data?.fiftySix?.split('').map((letter:string, index:number) => (
                                                <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                    {letter}
                                                </span>
                                            ))
                                        ):(
                                            <div>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-6">
                            <span className="text-green text-sm">61</span>
                            <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                {data.sixtyOne || ''}
                            </span>
                        </div>
                        <div className="px-5 mt-6 flex flex-row gap-2">
                            <div className="flex flex-col">
                                <span className="text-green text-sm">62</span>
                                <div className="mt-3">
                                    {
                                        data?.sixtyTwo ? 
                                        (
                                            data?.sixtyTwo.split('').map((letter:string, index:number) => (
                                                <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                    {letter}
                                                </span>
                                            ))
                                        ):(
                                            <div>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-green text-sm">64</span>
                                <div className="mt-3">
                                    {
                                        data?.sixtyFour ? 
                                        (
                                            data?.sixtyFour.split('').map((letter:string, index:number) => (
                                                <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                    {letter}
                                                </span>
                                            ))
                                        ):(
                                            <div>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row mt-6">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">68</span>
                                <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                    {data.sixtyEight || ''}
                                </span>
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">69</span>
                                <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                    {data.sixtyNine || ''}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row mt-6 gap-5 px-5">
                            <div className="flex flex-col mt-2">
                                <span className="text-green text-sm">70</span>
                                <div className="mt-3">
                                    {
                                        data?.seventy ? 
                                        (
                                            data?.seventy.split('').map((letter:string, index:number) => (
                                                <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                    {letter}
                                                </span>
                                            ))
                                        ):(
                                            <div>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col mt-2">
                                <span className="text-green text-sm">72</span>
                                <div className="mt-3">
                                    {
                                        data?.seventyTwo ? 
                                        (
                                            data?.seventyTwo.split('').map((letter:string, index:number) => (
                                                <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                    {letter}
                                                </span>
                                            ))
                                        ):(
                                            <div>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col mt-2">
                                <span className="text-green text-sm">74</span>
                                <div className="mt-3">
                                    {
                                        data?.seventyFour ? 
                                        (
                                            data?.seventyFour.split('').map((letter:string, index:number) => (
                                                <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                    {letter}
                                                </span>
                                            ))
                                        ):(
                                            <div>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row mt-6">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">76</span>
                                <div className="mt-3">
                                    {
                                        data?.seventySix ? 
                                        (
                                            data?.seventySix.split('').map((letter:string, index:number) => (
                                                <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                    {letter}
                                                </span>
                                            ))
                                        ):(
                                            <div>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">79</span>
                                <div className="mt-3">
                                    {
                                        data?.seventyNine ? 
                                        (
                                            data?.seventyNine.split('').map((letter:string, index:number) => (
                                                <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                    {letter}
                                                </span>
                                            ))
                                        ):(
                                            <div>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-6">
                            <span className="text-green text-sm">81</span>
                            <div className="mt-3">
                                {
                                    data?.eightyOne ? 
                                    (
                                        data?.eightyOne.split('').map((letter:string, index:number) => (
                                            <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                {letter}
                                            </span>
                                        ))
                                    ):(
                                        <div>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex flex-row mt-6">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">86</span>
                                <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                    {data.eightySix || ''}
                                </span>
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">87</span>
                                <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                    {data.eightySeven || ''}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row mt-6">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">88</span>
                                <div className="mt-3">
                                {
                                    data?.eightyEight ? 
                                    (
                                        data?.eightyEight.split('').map((letter:string, index:number) => (
                                            <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                {letter}
                                            </span>
                                        ))
                                    ):(
                                        <div>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                        </div>
                                    )
                                }
                            </div>
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">91</span>
                                <div className="mt-3">
                                    {
                                        data?.ninetyOne ? 
                                        (
                                            data?.ninetyOne.split('').map((letter:string, index:number) => (
                                                <span key={index} className="border-2 p-2 bg-white border-gray-500">
                                                    {letter}
                                                </span>
                                            ))
                                        ):(
                                            <div>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                                <span className="border-2 p-2 bg-white border-gray-500 px-3"></span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-6">
                            <span className="text-green text-sm">93</span>
                            <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                {data.ninetyThree || ''}
                            </span>
                        </div>
                        <div className="flex flex-col px-5 mt-6">
                            <span className="text-green text-sm">94</span>
                            <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                {data.ninetyFour || ''}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBirthCert