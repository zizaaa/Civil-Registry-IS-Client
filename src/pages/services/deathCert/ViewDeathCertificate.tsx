import { Tooltip } from "flowbite-react"
import { AiFillPrinter } from '../../../hooks/icons'
import { Navigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { Loading, serverURL } from "../../../hooks/imports";
import { useActivityMutation } from "../../../services/sendActivity";
import { getSingleDeathCert } from "../../../services/getSingleDeathCert";

function ViewDeathCertificate() {
    const { id } = useParams();
    const activityMutation = useActivityMutation();
    const contentRef = useRef<HTMLDivElement>(null);  // Reference to the certificate content

    // Setup react-to-print for printing the specific certificate content
    const reactToPrintFn = useReactToPrint({
        contentRef, // Correctly pass the contentRef here
    });

    const { data,isLoading } = getSingleDeathCert(id as string);
    
    if(isLoading) return <Loading/>
    
    if(!id){
        <Navigate to='*'/>
    }

    const handlePrint = () =>{
        reactToPrintFn();

        activityMutation.mutate(`Death certificate printed for ${data?.one_first} (Registry No. ${data?.registryNumber})`);
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
            <div ref={contentRef} className='w-[65rem] m-3 h-full border-b-0 border-s-0 border-2 border-gray-700 bg-gray-100'>
                <div className="grid grid-cols-4 border-s-2 border-b-2 border-gray-700 w-full overflow-auto">
                    <div className="col-span-3 border-e-2 border-gray-700 w-full overflow-auto">
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
                            <span className="text-xl uppercase">
                                Office of the civil registrar general
                            </span>
                            <span className="text-xl font-semibold uppercase">
                                Certificate of Death
                            </span>
                            <span className="text-[10px] font-medium w-96 mt-3 mb-5">
                                (Fill out completely, accurately and legibly. Use ink or typewriter.
                                Place X before the appropriate answer in items 2, 9, 13, 15, 16, 18, 19, 21, and 23) 
                            </span>
                        </div>
                        <div className="grid grid-cols-3 w-full overflow-auto">
                            <div className="col-span-2 py-2 px-5">
                                <div className="flex flex-row items-end gap-2 mb-2">
                                    <span className="text-gray-800 text-sm">
                                        Province
                                    </span>
                                    <span
                                        className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 h-6 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.province}
                                    </span>
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="cityAndMunicipality" className="text-gray-800 text-sm">
                                        City/Municiplity
                                    </label>
                                    <span
                                        className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 h-6 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.cityOrMunicipality}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-1 border-s-2 border-gray-700 px-5 py-2 ">
                                <span className="text-gray-800 text-sm">
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
                    <div className="col-span-1 flex flex-col items-center px-2 py-2">
                        <span className="text-gray-800 text-xl font-semibold uppercase">
                            Remarks/Annotation
                        </span>
                        <span 
                            className="w-full flex-wrap break-all p-2 h-7 text-sm flex items-end text-gray-800" 
                        >
                            {data.remarksOrAnnotation}
                        </span>
                    </div>
                </div>
                {/* 2nd part and left side */}
                <div className="grid grid-cols-4 border-b-2 border-gray-800">
                    {/* 2nd part */}
                    <div className="col-span-3 border-e-2 border-gray-800">
                        {/* number 1 */}
                        <div className="flex flex-row gap-1 p-2 w-full border-b-2 border-gray-800">
                            <div>
                                <span className="text-gray-800 font-semibold uppercase">
                                    1. Name
                                </span>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <span className="text-gray-800 text-sm">
                                    (First)
                                </span>
                                <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                    {data.one_first}
                                </span>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <span className="text-gray-800 text-sm">
                                    (Middle)
                                </span>
                                <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                    {data.one_middle}
                                </span>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <span className="text-gray-800 text-sm">
                                    (Last)
                                </span>
                                <span className="w-full flex-wrap h-6 text-sm flex items-end justify-center text-gray-800" >
                                    {data.one_last}
                                </span>
                            </div>
                        </div>
                        {/* Number 2, 3, 4 */}
                        <div className="grid grid-cols-5 border-b-2 border-gray-800">
                            <div className="col-span-1 p-1">
                                <div>
                                    <span className="uppercase font-semibold text-gray-800">
                                        2. Sex
                                    </span>
                                </div>
                                <div className="flex flex-col pe-10 gap-2">
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">1 Male</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800" >
                                            {data.two_sex === 'male' ? "/":""}
                                        </span>
                                    </div>
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">2 Female</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800" >
                                            {data.two_sex === 'female' ? "/":""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 border-x-2 border-gray-800 p-1">
                                <div className="flex flex-col items-start">
                                    <span className="text-gray-800 font-semibold uppercase">
                                        3. RELIGION
                                    </span>
                                    <span 
                                        className="flex-1 h-6 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.three_religion}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-3 grid grid-cols-10">
                                <div className="col-span-1 p-1 flex items-start gap-1 border-e-2 border-gray-800">
                                    <span className="font-semibold">
                                        4. 
                                    </span>
                                    <div className="flex flex-col leading-[1.1rem] uppercase font-semibold text-lg pt-1">
                                        <span>A</span>
                                        <span>G</span>
                                        <span>E</span>
                                    </div>
                                </div>
                                <div className="col-span-3 flex flex-col">
                                    <div className="border-b-2 border-gray-800">
                                        <span className="text-[13px] p-1">
                                            a. 1 YEAR OR ABOVE
                                        </span>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="px-2 flex items-center justify-center h-[3.4rem] border-e-2 border-gray-800">
                                            <span>2</span>
                                        </div>
                                        <div className="p-1 w-full">
                                            <div className="text-gray-800 text-[12px] flex items-center justify-center w-full">
                                                Completed years
                                            </div>
                                            <span 
                                                className="flex-1 h-6 text-sm flex items-end text-gray-800" 
                                            >
                                                {data.four_A_completedYears}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3 border-x-2 border-gray-800">
                                    <div className="col-span-3 flex flex-col">
                                        <div className="border-b-2 border-gray-800">
                                            <span className="text-[13px] p-1">
                                                b. UNDER 1 YEAR
                                            </span>
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="px-2 flex items-center justify-center h-[3.4rem] border-e-2 border-gray-800">
                                                <span>1</span>
                                            </div>
                                            <div className="p-1 w-full">
                                                <span className="text-gray-800 text-[12px] flex items-center justify-center w-full">
                                                    Months
                                                </span>
                                                <span 
                                                    className="flex-1 h-6 text-sm flex items-end text-gray-800" 
                                                >
                                                    {data.four_B_months}
                                                </span>
                                            </div>
                                            <div className="px-2 flex items-center justify-center border-x-2 border-gray-800">
                                                <span>0</span>
                                            </div>
                                            <div className="p-1 w-full">
                                                <span className="text-gray-800 text-[12px] flex items-center justify-center w-full">
                                                    Days
                                                </span>
                                                <span 
                                                    className="flex-1 h-6 text-sm flex items-end text-gray-800" 
                                                >
                                                    {data.four_B_days}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="border-b-2 border-gray-800">
                                        <span className="text-[13px] p-1">
                                            C. UNDER 1 DAY
                                        </span>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="p-1 w-full">
                                            <span className="text-gray-800 text-[12px] flex items-center justify-center w-full">
                                                Hrs/Min/Sec
                                            </span>
                                            <span 
                                                className="flex-1 h-6 text-sm flex items-end text-gray-800" 
                                            >
                                                {data.four_C_time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Number 5 */}
                        <div className="flex flex-row gap-1 p-2 w-full border-b-2 border-gray-800">
                            <div className="w-24">
                                <span className="text-gray-800 font-semibold uppercase">
                                    5. place of death
                                </span>
                            </div>
                            <div className="flex flex-col items-start justify-start w-72">
                                <span className="text-gray-800 text-sm">
                                    (Name of Hospital/Clinic/Institution/House no., Street, Barangay)
                                </span>
                                <span 
                                    className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                >
                                    {data.five_nameOf}
                                </span>
                            </div>
                            <div className="flex flex-col items-start flex-1">
                                <span className="text-gray-800 text-sm">
                                    (City/Municipality)
                                </span>
                                <span 
                                    className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                >
                                    {data.five_cityOrMunicipality}
                                </span>
                            </div>
                            <div className="flex flex-col items-start flex-1">
                                <span className="text-gray-800 text-sm">
                                    (Province)
                                </span>
                                <span 
                                    className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                >
                                    {data.five_province}
                                </span>
                            </div>
                        </div>
                        {/* Number 6 */}
                        <div className="grid grid-cols-3 border-b-2 border-gray-800">
                            <div className="col-span-2 border-e-2 border-gray-800 flex p-1">
                                <div>
                                    <span className="text-gray-800 font-semibold uppercase">
                                        6. date of death
                                    </span>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <span className="text-gray-800 text-sm">
                                        (day)
                                    </span>
                                    <span 
                                        className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.six_day}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <span className="text-gray-800 text-sm">
                                        (month)
                                    </span>
                                    <span 
                                        className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.six_month}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <span className="text-gray-800 text-sm">
                                        (year)
                                    </span>
                                    <span 
                                        className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.six_year}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col items-start p-1">
                                    <span className="text-gray-800 font-semibold uppercase">
                                        7. Citizenship
                                    </span>
                                    <span 
                                        className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.seven_citizenship}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Number  8 */}
                        <div className="flex flex-row gap-1 p-2 w-full border-b-2 border-gray-800">
                            <div>
                                <span className="text-gray-800 font-semibold uppercase">
                                    8. Residence
                                </span>
                            </div>
                            <div className="flex flex-col items-center w-72">
                                <span className="text-gray-800 text-sm">
                                    (House no., Street, Barangay)
                                </span>
                                <span 
                                    className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                >
                                    {data.eight_houseNo}
                                </span>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <label htmlFor="eight_cityOrMunicipality" className="text-gray-800 text-sm">
                                    (City/Municipality)
                                </label>
                                <span 
                                    className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                >
                                    {data.eight_cityOrMunicipality}
                                </span>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <label htmlFor="eigth_province" className="text-gray-800 text-sm">
                                    (Province)
                                </label>
                                <span 
                                    className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                >
                                    {data.eight_province}
                                </span>
                            </div>
                        </div>
                        {/* Number 9 */}
                        <div className="grid grid-cols-3 border-b-2 border-gray-800">
                            <div className="col-span-2 border-e-2 border-gray-800 p-1">
                                <span className="text-gray-800 font-semibold uppercase">
                                    9. Civil status
                                </span>
                                <div className="flex flex-row items-end gap-5 flex-wrap">
                                    <div className="flex flex-row-reverse items-end gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">1. Single</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.nine_civilStatus === 'single' ? "/":""}
                                        </span>
                                    </div>
                                    <div className="flex flex-row-reverse items-end gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">2. Married</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.nine_civilStatus === 'married' ? "/":""}
                                        </span>
                                    </div>
                                    <div className="flex flex-row-reverse items-end gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">3. Widowed</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.nine_civilStatus === 'widowed' ? "/":""}
                                        </span>
                                    </div>
                                    <div className="flex flex-row-reverse items-end gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">4. Others</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.nine_civilStatus === 'others' ? "/":""}
                                        </span>
                                    </div>
                                    <div className="flex flex-row-reverse items-end gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">5. Unknown</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.nine_civilStatus === 'unknown' ? "/":""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col items-start p-1">
                                    <label htmlFor="ten_occupation" className="text-gray-800 font-semibold uppercase">
                                        10. Occupation
                                    </label>
                                    <span 
                                        className="flex-1 h-5 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.ten_occupation}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Notes */}
                        <div className="flex flex-col items-center border-b-2 border-gray-800 p-1">
                            <span className="uppercase text-gray-800 font-bold">Medical Certificate</span>
                            <span className="text-gray-800 font-semibold">(For Ages 0 to 7 days accomplish items 11-17 at the back)</span>
                        </div>
                        {/* number 17 */}
                        <div className="border-b-2 border-gray-800">
                            <div className="grid grid-cols-3 gap-5">
                                <div className="col-span-2 p-1">
                                    <span className="uppercase text-gray-800 font-semibold">
                                        17. Causes of death
                                    </span>
                                    <div className="ps-5">
                                        <div className="flex flex-row items-end gap-2">
                                            <label htmlFor="immediateCause" className="text-gray-800 text-sm">
                                                I. Immediate cause: a.
                                            </label>
                                            <span
                                                className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 h-6 text-sm flex items-end text-gray-800" 
                                            >
                                                {data.seventeen_I_A}
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-end gap-2">
                                            <label htmlFor="antecedentCause" className="text-gray-800 text-sm">
                                                Antecedent cause: b.
                                            </label>
                                            <span
                                                className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 h-6 text-sm flex items-end text-gray-800" 
                                            >
                                                {data.seventeen_I_B}
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-end gap-2">
                                            <label htmlFor="underlyingCause" className="text-gray-800 text-sm">
                                                Underlying cause: c.
                                            </label>
                                            <span
                                                className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 h-6 text-sm flex items-end text-gray-800" 
                                            >
                                                {data.seventeen_I_C}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 p-1">
                                    <div className="flex flex-col items-end gap-2 w-full">
                                        <label htmlFor="immediateCause" className="text-gray-800 text-sm w-full">
                                            Interval Between Onset and Death
                                        </label>
                                        <span
                                            className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 h-6 text-sm flex items-end text-gray-800 w-full" 
                                        >
                                            {data.seventeen_Interval}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="ps-5 mb-1 pe-2">
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="otherSignificantCondition" className="text-gray-800 text-sm">
                                        II. Other significant conditions
                                    </label>
                                    <span
                                        className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 h-6 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.seventeen_ContributingToDeath}
                                    </span>
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="contributingToDeath" className="text-gray-800 text-sm">
                                        Contributing to death:
                                    </label>
                                    <span
                                        className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 h-6 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.seventeen_ContributingToDeath}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Number 18 */}
                        <div className="border-b-2 border-gray-800 p-1">
                            <span className="text-gray-800 uppercase font-semibold">18. Death By Non-Natural Cause</span>
                            <div className="ps-5">
                                <span>a. Manner of Death</span>
                                <div className="flex flex-row gap-2">
                                    <div className="flex flex-row-reverse items-end gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">1 Homicide</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.eighteen_A_mannerOfDeath === 'homicide' ? "/":""}
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-row-reverse items-end gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">2 Suicide</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.eighteen_A_mannerOfDeath === 'suicide' ? "/":""}
                                        </span>
                                    </div>

                                    <div className="flex flex-row-reverse items-end gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">3 Accident</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.eighteen_A_mannerOfDeath === 'accident' ? "/":""}
                                        </span>
                                    </div>

                                    <div className="flex flex-row-reverse items-end gap-2">
                                        <span className="text-gray-800 text-sm cursor-pointer">4 Others</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.eighteen_A_mannerOfDeath === 'others' ? "/":""}
                                        </span>
                                    </div>

                                </div>
                            </div>
                            <div className="ps-5 pb-1 flex flex-row items-end gap-2">
                                <span className="text-gray-800 text-sm cursor-pointer">
                                    b. Place of Occurance (e.g. home, farm, factory, street, seam, etc.)
                                </span>
                                <span
                                    className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 h-6 text-sm flex items-end text-gray-800" 
                                >
                                    {data.eighteen_B_PlaceOfOccurance}
                                </span>
                            </div>
                        </div>
                        {/* number 19 */}
                        <div className="border-b-2 border-gray-800 p-1">
                            <div className="grid grid-cols-3">
                                <div className="col-span-2 p-1">
                                    <span className="uppercase text-gray-800 font-semibold">
                                        19. Attendant
                                    </span>
                                    <div className="flex gap-5 items-start ps-5">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row-reverse items-end justify-end gap-2">
                                                <span className="text-gray-800 text-sm cursor-pointer">1 Private Physician</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.nineTeen_Attendant === 'Private Physician' ? "/":""}
                                                </span>
                                            </div>
                                            <div className="flex flex-row-reverse items-end justify-end gap-2">
                                                <span className="text-gray-800 text-sm cursor-pointer">2 Public Health Officer</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.nineTeen_Attendant === 'Public Health Officer' ? "/":""}
                                                </span>
                                            </div>
                                            <div className="flex flex-row-reverse items-end justify-end gap-2">
                                                <span className="text-gray-800 text-sm cursor-pointer">3 Hospital Authority</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.nineTeen_Attendant === 'Hospital Authority' ? "/":""}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row-reverse items-end justify-end gap-2">
                                                <span className="text-gray-800 text-sm cursor-pointer">4 None</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.nineTeen_Attendant === 'None' ? "/":""}
                                                </span>
                                            </div>
                                            <div className="flex flex-row-reverse items-end justify-end gap-2">
                                                <span className="text-gray-800 text-sm cursor-pointer">5 Others</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.nineTeen_Attendant === 'others' ? "/":""}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <span>If attended, state duration:</span>
                                    <div className="flex flex-row  items-end">
                                        <label htmlFor="from">From</label>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.nineTeen_From}
                                        </span>
                                        <span className="pe-5">,</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                            {data.nineTeen_To}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* number 20 */}
                        <div className="border-b-2 border-gray-800 p-1">
                            <span className="uppercase text-gray-800 font-medium">
                                20. Certification of Death
                            </span>
                            <div className="ps-5 text-sm flex flex-col">
                                <span>I hereby certify that the foregoing particulars are correct as near as same can be ascertain and I further that I</span>
                                <span className="ps-10">
                                    have not attended the deceased
                                </span>
                                <div className="ps-10 flex flex-row">
                                    <span>
                                        have attended the deceased and that occured at
                                    </span>
                                    <span className="border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-28" >
                                            {data.twenty_time}
                                    </span>
                                    <span>
                                        am/pm on the date indicated above.
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="col-span-1">
                                    <div className="pe-4 pt-6">
                                        <div className="flex flex-row items-end gap-2 relative">
                                            <label htmlFor="twentyOne_signature" className="text-sm font-medium text-gray-800">Signature</label>
                                            <figure className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-start text-gray-800 w-10 " >
                                                <img src={`${serverURL}/${data.twentySignature}`} className="h-7 ps-2"/>
                                            </figure>
                                        </div>
                                        <div className="flex flex-row items-end gap-1">
                                            <span className="text-sm text-gray-800">Name in Print</span>
                                            <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                                {data.twenty_nameInPrint}
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-end">
                                            <span className="text-sm text-gray-800">Title of Position</span>
                                            <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-start ps-2 text-gray-800 h-7 w-10" >
                                                {data.twenty_TitleOrPosition}
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-end">
                                            <span className="text-sm text-gray-800">Address</span>
                                            <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-start ps-2 text-gray-800 h-7 w-10" >
                                                {data.twenty_Address}
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-end">
                                            <span className="text-sm text-gray-800">Date</span>
                                            <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-start ps-2 text-gray-800 h-7 w-10" >
                                                {data.twenty_Date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 p-1">
                                    <div className="mt-5 border-2 border-gray-800 px-5 py-1">
                                        <span className="uppercase font-bold">Reviewed By:</span>
                                        <div className="flex flex-col items-center">
                                            <figure className="flex-1 text-sm flex items-end justify-start text-gray-800 w-20" >
                                                <img src={`${serverURL}/${data.twentyReviewedSignature}`} className="h-10 ps-2"/>
                                            </figure>
                                            <div className="flex flex-col-reverse items-center justify-center">
                                                <label htmlFor="twentyOnedate" className="text-sm text-gray-800 font-semibold">Signature over printed name of Health Officer</label>
                                                <div className="border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center ps-2 text-gray-800 h-7 w-full" >
                                                    <span>{data.twenty_ReviewedBy_PrintedName}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col-reverse items-center justify-center">
                                                <label htmlFor="twentyOnedate" className="text-sm text-gray-800 font-semibold">Date</label>
                                                <div className="border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center ps-2 text-gray-800 h-7 w-48">
                                                    <span>{data.twenty_ReviewedBy_Date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* number 21, 22, 23 */}
                        <div className="border-b-2 border-gray-800">
                            <div className="grid grid-cols-5">
                                <div className="col-span-2 p-1">
                                    <span className="uppercase font-semibold text-gray-800">21. Corpse disposal</span>
                                    <div className="flex flex-row">
                                        <div>
                                            <div className="flex flex-row-reverse items-end justify-end gap-2">
                                                <span className="text-gray-800 text-sm cursor-pointer">Burial</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.twentyOne_CorpseDisposal === 'Burial' ? "/":""}
                                                </span>
                                            </div>

                                            <div className="flex flex-row-reverse items-end justify-end gap-2">
                                                <span className="text-gray-800 text-sm cursor-pointer">Cremation</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.twentyOne_CorpseDisposal === 'Cremation' ? "/":""}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ps-5">
                                            <div className="flex flex-row-reverse items-end justify-end gap-2">
                                                <span className="text-gray-800 text-sm cursor-pointer">Cremation</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.twentyOne_CorpseDisposal !== 'Cremation' && data.twentyOne_CorpseDisposal !== 'Burial' ? "/":""}
                                                </span>
                                            </div>
                                            <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 h-7 " >
                                                {data.twentyOne_CorpseDisposal !== 'Cremation' && data.twentyOne_CorpseDisposal !== 'Burial' ? (data.twentyOne_CorpseDisposal):""}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 border-x-2 border-gray-800 p-1">
                                    <span className="uppercase font-semibold text-gray-800">22. Burial/Cremation Permit</span>
                                    <div className="ps-5">
                                        <div className="flex flex-row items-end justify-start gap-2">
                                            <span className="text-sm text-gray-800 font-semibold">Number</span>
                                            <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-start ps-2 text-gray-800 h-7 w-10" >
                                                {data.twentyTwo_Burial_Number}
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-end justify-start gap-2">
                                            <span className="text-sm text-gray-800 font-semibold">Date Issued</span>
                                            <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-start ps-2 text-gray-800 h-7 w-10" >
                                                {data.twentyTwo_Burial_DateIssued}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 p-1">
                                    <span className="uppercase font-semibold text-gray-800">23. Autopsy</span>
                                    <div className="ps-5">
                                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                                            <label htmlFor="isAutopsyYes" className="text-gray-800 text-sm cursor-pointer">1 Yes</label>
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                {data.twentyThree_Autopsy === 'Yes' ? "/":""}
                                            </span>
                                        </div>
                                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                                            <label htmlFor="isAutopsyNo" className="text-gray-800 text-sm cursor-pointer">2 No</label>
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                {data.twentyThree_Autopsy === 'No' ? "/":""}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* number 24 */}
                        <div className="border-b-2 border-gray-800 p-1">
                            <span className="uppercase font-semibold text-gray-800">
                                24. Name and Address of Cemetery or Crematory
                            </span>
                            <div>
                                <span className="text-sm flex items-end justify-center text-gray-800 h-7 w-full" >
                                    {data.twentyFour_NameAndAddress}
                                </span>
                            </div>
                        </div>
                        {/* number 25 */}
                        <div className="border-b-2 border-gray-800 p-1">
                            <span className="font-semibold text-gray-800 uppercase">
                                25. INFORMANT
                            </span>
                            <div className="grid grid-cols-2 mt-2 gap-10">
                                <div>
                                    <div className="flex flex-row items-end gap-2 relative">
                                        <label htmlFor="twentyOne_signature" className="text-sm font-medium text-gray-800">Signature</label>
                                        <figure className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-start text-gray-800 w-10 " >
                                            <img src={`${serverURL}/${data.twentyFiveSignature}`} className="h-7 ps-2"/>
                                        </figure>
                                    </div>
                                    <div className="flex flex-row items-end gap-1">
                                        <span className="text-sm text-gray-800">Name in Print</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                            {data.twentyFive_NameInPrint}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-end gap-1">
                                        <span className="text-sm text-gray-800">Relationship to the deceased</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                            {data.twentyFive_Relationship}
                                        </span>
                                    </div>
                                </div>
                                <div className="pe-2">
                                    <div className="flex flex-row items-end gap-1">
                                        <span className="text-sm text-gray-800">Address</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                            {data.twentyFive_Address}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-end gap-1">
                                        <span className="text-sm text-gray-800">Date</span>
                                        <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                            {data.twentyFive_Date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* number 26 and 27 */}
                        <div className="grid grid-cols-2 p-1 gap-5">
                            <div className="col-span-1">
                                <span className="font-semibold text-gray-800 uppercase">
                                    26. Prepared by
                                </span>
                                <div className="flex flex-row items-end gap-2 relative">
                                    <label htmlFor="twentyOne_signature" className="text-sm font-medium text-gray-800">Signature</label>
                                    <figure className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-start text-gray-800 w-10 " >
                                        <img src={`${serverURL}/${data.twentySixSignature}`} className="h-7 ps-2"/>
                                    </figure>
                                </div>
                                <div className="flex flex-row items-end gap-1">
                                    <span className="text-sm text-gray-800">Name in Print</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                        {data.twentySix_NameInPrint}
                                    </span>
                                </div>
                                <div className="flex flex-row items-end gap-1">
                                    <span className="text-sm text-gray-800">Title or Position</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                        {data.twentySix_TitleOrPosition}
                                    </span>
                                </div>
                                <div className="flex flex-row items-end gap-1">
                                    <span className="text-sm text-gray-800">Date</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                        {data.twentySix_Date}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <span className="font-semibold text-gray-800 uppercase">
                                    27. Recieved at the office of the civil registrar
                                </span>
                                <div className="flex flex-row items-end gap-2 relative">
                                    <label htmlFor="twentyOne_signature" className="text-sm font-medium text-gray-800">Signature</label>
                                    <figure className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end justify-start text-gray-800 w-10 " >
                                        <img src={`${serverURL}/${data.twentySevenSignature}`} className="h-7 ps-2"/>
                                    </figure>
                                </div>
                                <div className="flex flex-row items-end gap-1">
                                    <span className="text-sm text-gray-800">Name in Print</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                        {data.twentySeven_NameInPrint}
                                    </span>
                                </div>
                                <div className="flex flex-row items-end gap-1">
                                    <span className="text-sm text-gray-800">Title or Position</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                        {data.twentySeven_TitleOrPosition}
                                    </span>
                                </div>
                                <div className="flex flex-row items-end gap-1">
                                    <span className="text-sm text-gray-800">Date</span>
                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-gray-800 text-sm flex items-end h-7 justify-start ps-2 text-gray-800 w-10" >
                                        {data.twentySeven_Date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* left part */}
                    <div className="col-span-1">
                        <div className="p-5 flex flex-col items-center border-b-2 border-gray-800">
                            <div className="flex flex-col items-center leading-3 mb-3">
                                <span className="font-semibold text-gray-800">FOR OCRG USE ONLY:</span>
                                <span className="font-semibold text-gray-800 text-sm">Population reference No.</span>
                            </div>
                            <span className="border-2 border-gray-500 bg-gray-100 px-2 w-56 h-7">
                                {data.populationReference}
                            </span>
                        </div>
                        <div className="px-5 text-sm py-2">
                            <span className="text-gray-800">
                            TO BE FILLED UP AT THE
                            OFFICE OF THE CIVIL
                            REGISTRAR
                            </span>
                        </div>
                        <div className="px-5 mt-2">
                            <span className="text-gray-800 text-sm">41</span>
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
                        <div className="px-5 mt-10 flex flex-col">
                            <span className="text-gray-800 text-sm">48</span>
                            <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                {data.fourtyEight || ''}
                            </span>
                        </div>
                        <div className="px-5 mt-10 flex gap-2">
                            <div className="flex flex-col">
                                <span className="text-gray-800 text-sm">49</span>
                                <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                    {data.fourtyNine || ''}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-800 text-sm">50</span>
                                <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                    {data.fifthy || ''}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-800 text-sm">51</span>
                                <div className="mt-3">
                                    {
                                        data.fifthyOne ? (
                                            data.fifthyOne.split('').map((letter:string, index:number) => (
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
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">54</span>
                            <div className="mt-3">
                                {
                                    data.fifthyFour ? (
                                        data.fifthyFour.split('').map((letter:string, index:number) => (
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
                        <div className="px-5 mt-10 flex flex-row gap-2">
                            <div className="flex flex-col">
                                <span className="text-gray-800 text-sm">59</span>
                                <div className="mt-3">
                                    {
                                        data.fifthyNine ? (
                                            data.fifthyNine.split('').map((letter:string, index:number) => (
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
                            <div className="flex flex-col">
                                <span className="text-gray-800 text-sm">65</span>
                                <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                    {data.sixtyFive || ''}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">66</span>
                            <div className="mt-3">
                                {
                                    data.sixtySix ? (
                                        data.sixtySix.split('').map((letter:string, index:number) => (
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
                        <div className="flex flex-row mt-10">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-gray-800 text-sm">71</span>
                                <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                    {data.seventyOne || ''}
                                </span>
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-gray-800 text-sm">72</span>
                                <div className="mt-3">
                                {
                                    data.seventyTwo ? (
                                        data.seventyTwo.split('').map((letter:string, index:number) => (
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
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">75</span>
                            <div className="mt-3">
                                {
                                    data.seventyFive ? (
                                        data.seventyFive.split('').map((letter:string, index:number) => (
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
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">79</span>
                            <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                {data.seventyNine || ''}
                            </span>
                        </div>
                        <div className="flex flex-row mt-10">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-gray-800 text-sm">80</span>
                                <div className="mt-3">
                                    {
                                        data.eighty ? (
                                            data.eighty.split('').map((letter:string, index:number) => (
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
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-gray-800 text-sm">82</span>
                                <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                    {data.eightyTwo || ''}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">83</span>
                            <div className="mt-3">
                                {
                                    data.eightyThree ? (
                                        data.eightyThree.split('').map((letter:string, index:number) => (
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
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">85</span>
                            <span className="border-2 w-8 mt-1 p-2 h-10 text-center bg-white border-gray-500">
                                {data.eightyFive || ''}
                            </span>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">86</span>
                            <div className="mt-3">
                                {
                                    data.eightySix ? (
                                        data.eightySix.split('').map((letter:string, index:number) => (
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
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">90</span>
                            <div className="mt-3">
                                {
                                    data.ninety ? (
                                        data.ninety.split('').map((letter:string, index:number) => (
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
                </div>
            </div>
        </div>
    )
}

export default ViewDeathCertificate