import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { Loading, serverURL } from "../../../hooks/imports";
import { Navigate, useParams } from "react-router-dom";

function ViewBirthCert() {
    const { id } = useParams();

    const { data,isLoading,isError } = useQuery({
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
            <div className="w-[65rem] m-3 h-full border-b-0 border-s-0 border-4 border-green bg-gray-100">
                <div className="grid grid-cols-4 border-s-4 border-green w-full overflow-auto">
                    <div className="col-span-3 border-e-4 border-green w-full overflow-auto">
                        <div className="flex items-center py-2 px-5 justify-between">
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
                        <div className="text-green w-full flex flex-col items-center justify-center text-center border-b-2 border-green p-2">
                            <span className="text-xl">
                                Republic of the Philippines
                            </span>
                            <span className="text-xl uppercase">
                                Office of the civil registrar general
                            </span>
                            <span className="text-xl font-semibold uppercase">
                                Certificate of Live Birth
                            </span>
                            <span className="text-[10px] font-medium w-96 mt-3 mb-5">
                                (Fill out completely, accurately and legibly. Use ink or typewriter.
                                Place X before the appropriate ANSWER IN ITEMS 2, 5A, 5B AND 19A.) 
                            </span>
                        </div>
                        <div className="grid grid-cols-3 w-full overflow-auto">
                            <div className="col-span-2 py-2 px-5">
                                <div className="flex flex-row items-end gap-2 mb-2">
                                    <span className="text-green text-sm">
                                        Province
                                    </span>
                                    <span
                                        className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end text-gray-800" 
                                    >
                                        {data.province}
                                    </span>
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <span className="text-green text-sm">
                                        City/Municiplity
                                    </span>
                                    <span 
                                        className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end text-gray-800" 
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
                                    className="flex-1 h-7 text-sm flex items-end text-gray-800" 
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
                                <div className="flex flex-row gap-1 p-2 border-b-2 border-green w-full">
                                    <div>
                                        <span className="text-green font-semibold uppercase">
                                            1. Name
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (First)
                                        </span>
                                        <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end justify-center text-gray-800" >
                                            {data.one_first}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Middle)
                                        </span>
                                        <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end justify-center text-gray-800" >
                                            {data.one_middle}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Last)
                                        </span>
                                        <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end justify-center text-gray-800" >
                                            {data.one_last}
                                        </span>
                                    </div>
                                </div>
                                {/* number 2 and 3 */}
                                <div className="grid grid-cols-3 border-b-2 border-green w-full">
                                    <div className="flex flex-col p-2 col-span-1">
                                        <div>
                                            <span className="uppercase font-semibold text-green">
                                                2. Sex
                                            </span>
                                        </div>
                                        <div className="flex flex-row gap-2 mt-2">
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <span className="text-green text-sm cursor-pointer">Male</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.two_sex === 'male' ? "/":""}
                                                </span>
                                            </div>
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <span className="text-green text-sm cursor-pointer">Female</span>
                                                <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-10" >
                                                    {data.two_sex === 'female' ? "/":""}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex flex-row p-2 border-s-2 border-green">
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
                                                <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end justify-center text-gray-800" >
                                                    {data.three_day}
                                                </span>
                                            </div>
                                            <div className="flex flex-col text-center gap-1">
                                                <span className="text-green text-sm">
                                                    (month)
                                                </span>
                                                <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end justify-center text-gray-800" >
                                                    {data.three_month}
                                                </span>
                                            </div>
                                            <div className="flex flex-col text-center gap-1">
                                                <span className="text-green text-sm">
                                                    (year)
                                                </span>
                                                <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end justify-center text-gray-800" >
                                                    {data.three_year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* number 4 */}
                                <div className="flex flex-row gap-5 p-2 border-b-2 border-green">
                                    <div>
                                        <span className="text-green font-semibold uppercase">4. Place of Birth</span>
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between gap-2 ">
                                        <span className="text-green text-sm">
                                            (Name of Hospital/Clinic/Institution/House No., Street, Barangay)
                                        </span>
                                        <span className="w-full flex-wrap p-2 text-sm flex items-end justify-center text-gray-800 " >
                                            {data.four_nameOf}
                                        </span>
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <span className="text-green text-sm">
                                            (City/Municipality)
                                        </span>
                                        <span className="w-full flex-wrap p-2 text-sm flex items-end justify-center text-gray-800" >
                                            {data.four_cityOrMunicipality}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-between flex-1">
                                        <span className="text-green text-sm">
                                            (Province)
                                        </span>
                                        <span className="w-full flex-wrap p-2 text-sm flex items-end justify-center text-gray-800" >
                                            {data.four_province}
                                        </span>
                                    </div>
                                </div>
                                {/* number 5 */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-1 border-e-2 border-green flex flex-col p-2">
                                        <div>
                                            <span className="text-green font-semibold">
                                                5a. <span className="uppercase">Type of birth</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2 p-2">
                                            <div className="flex flex-row gap-2">
                                                <div className="flex flex-row-reverse items-center gap-2">
                                                    <span className="text-green text-sm cursor-pointer">1. Single</span>
                                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-7" >
                                                        {data.fiveA_typeOfBirth === 'single' ? "/":""}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row-reverse items-center gap-2">
                                                    <span className="text-green text-sm cursor-pointer">2. Twin</span>
                                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-7" >
                                                        {data.fiveA_typeOfBirth === 'twin' ? "/":""}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <div className="flex flex-row-reverse items-center gap-2">
                                                    <span className="text-green text-sm cursor-pointer">3. Triplet Etc.</span>
                                                    <span className="flex-1 border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-7" >
                                                        {data.fiveA_typeOfBirth === 'triplet' ? "/":""}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 p-2">
                                        <div>
                                            <span className="text-green font-semibold">
                                                b. <span className="uppercase">IF MULTIPLE BIRTH, CHILD WAS</span> 
                                            </span>
                                        </div>
                                        <div className="flex flex-row gap-2 p-2">
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
                                        <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end justify-center text-gray-800" >
                                            {data.six_first}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Middle)
                                        </span>
                                        <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end justify-center text-gray-800" >
                                            {data.six_middle}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Last)
                                        </span>
                                        <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end justify-center text-gray-800" >
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
                                            <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end text-gray-800" >
                                                {data.seven_citizenship}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <span className="text-green font-semibold uppercase">
                                                8. RELIGION
                                            </span>
                                            <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end text-gray-800" >
                                                {data.eight_religion}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* number 9a */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-1 p-2">
                                        <div>
                                            <span className="text-green font-semibold">
                                                9a.
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-green text-sm cursor-pointer">Total number of children born alive:</span>
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-full mt-7" >
                                                {data.nineA_totalNumber}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1 border-x-2 p-2 border-green">
                                        <div>
                                            <span className="text-green font-semibold">
                                                b.
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-green text-sm cursor-pointer">No. of Children still living including this birth:</span>
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-full" >
                                                {data.nineA_totalNumber}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div>
                                            <span className="text-green font-semibold">
                                                c.
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-green text-sm cursor-pointer">No. of children born alive but are now dead:</span>
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 w-full" >
                                                {data.nineA_totalNumber}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* number 10 */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-2 border-e-2 border-green p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <span className="text-green font-semibold uppercase">
                                                10. OCCUPATION
                                            </span>
                                            <span className="w-full flex-wrap p-2 h-7 text-sm flex items-end text-gray-800" >
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
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 min-w-20" >
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
                                    <div className="flex flex-col flex-1 justify-between gap-2">
                                        <span className="text-green text-sm">
                                            (House No., Street, Barangay)
                                        </span>
                                        <span className="w-full flex-wrap p-2 text-sm flex items-end justify-center text-gray-800" >
                                            {data.twelve_house}
                                        </span>
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <span className="text-green text-sm">
                                            (City/Municipality)
                                        </span>
                                        <span className="w-full flex-wrap p-2 text-sm flex items-end justify-center text-gray-800" >
                                            {data.twelve_cityOrMunicipality}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-between flex-1">
                                        <span className="text-green text-sm">
                                            (Province)
                                        </span>
                                        <span className="w-full flex-wrap p-2 text-sm flex items-end justify-center text-gray-800" >
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
                                        <span className="w-full flex-wrap p-2 text-sm flex items-end justify-center text-gray-800" >
                                            {data.thirteen_first}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Middle)
                                        </span>
                                        <span className="w-full flex-wrap p-2 text-sm flex items-end justify-center text-gray-800" >
                                            {data.thirteen_middle}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-green text-sm">
                                            (Last)
                                        </span>
                                        <span className="w-full flex-wrap p-2 text-sm flex items-end justify-center text-gray-800" >
                                            {data.thirteen_last}
                                        </span>
                                    </div>
                                </div>
                                {/* number 14 */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-2 border-e-2 border-green p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <span className="text-green uppercase font-semibold">
                                                14. CITIZENSHIP
                                            </span>
                                            <span className="w-full flex-wrap p-2 text-sm flex items-end text-gray-800" >
                                                {data.fourteen_citizenship}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <span className="text-green uppercase font-semibold">
                                                15. RELIGION
                                            </span>
                                            <span className="w-full flex-wrap p-2 text-sm flex items-end text-gray-800" >
                                                {data.fifteen_religion}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* number 16 */}
                                <div className="grid grid-cols-3">
                                    <div className="col-span-2 border-e-2 border-green p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <span className="text-green uppercase font-semibold">
                                                16. OCCUPATION
                                            </span>
                                            <span className="w-full flex-wrap p-2 text-sm flex items-end text-gray-800" >
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
                                            <span className="border-x-0 border-t-0 border-b-[1px] border-green h-7 text-sm flex items-end justify-center text-gray-800 min-w-20" >
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
                        <div className="border-b-2 border-green ms-4 ps-9 pb-2">
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
                            <div className="grid grid-cols-2 mt-2 gap-10">
                                <div>
                                    <div className="flex flex-row items-end gap-2 relative">
                                        <label htmlFor="signature" className="text-sm font-medium text-green">Signature</label>
                                        <div className="relative w-full">
                                            <input 
                                                type="file" 
                                                id="signature"
                                                accept=".png" 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                                Choose File
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                        <input 
                                            type="text" 
                                            id="nameInPrint" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="titleOrPosition_1" className="text-sm text-green w-40">Title or Position</label>
                                        <input 
                                            type="text" 
                                            id="titleOrPosition_1" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                </div>
                                <div className="pe-2">
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="address" className="text-sm text-green">Address</label>
                                        <input 
                                            type="text" 
                                            id="address" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="date" className="text-sm text-green">Date</label>
                                        <input 
                                            type="text" 
                                            id="date" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
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
                            <div className="grid grid-cols-2 mt-2 gap-10">
                                <div>
                                    <div className="flex flex-row items-end gap-2 relative">
                                        <label htmlFor="signature_2" className="text-sm font-medium text-green">Signature</label>
                                        <div className="relative w-full">
                                            <input 
                                                type="file" 
                                                id="signature_2"
                                                accept=".png"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                                Choose File
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                        <input 
                                            type="text" 
                                            id="nameInPrint" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="titleOrPosition_2" className="text-sm text-green w-80">Relationship to the child</label>
                                        <input 
                                            type="text" 
                                            id="titleOrPosition_2" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                </div>
                                <div className="pe-2">
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="address" className="text-sm text-green">Address</label>
                                        <input 
                                            type="text" 
                                            id="address" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="date" className="text-sm text-green">Date</label>
                                        <input 
                                            type="text" 
                                            id="date" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
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
                                <div className="pe-4 pt-6">
                                    <div className="flex flex-row items-end gap-2 relative">
                                        <label htmlFor="signature_2" className="text-sm font-medium text-green">Signature</label>
                                        <div className="relative w-full">
                                            <input 
                                                type="file" 
                                                id="signature_2"
                                                accept=".png"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                                Choose File
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                        <input 
                                            type="text" 
                                            id="nameInPrint" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="titleOrPosition_3" className="text-sm text-green w-40">Title of Position</label>
                                        <input 
                                            type="text" 
                                            id="titleOrPosition_3" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="date" className="text-sm text-green">Date</label>
                                        <input 
                                            type="text" 
                                            id="date" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 pb-2 ps-6">
                                <div>
                                    <span className="font-semibold text-green uppercase">
                                        22. RECEIVED AT THE OFFICE OF THE CIVIL REGISTRAR
                                    </span>
                                </div>
                                <div className="pe-4">
                                    <div className="flex flex-row items-end gap-2 relative">
                                        <label htmlFor="signature_2" className="text-sm font-medium text-green">Signature</label>
                                        <div className="relative w-full">
                                            <input 
                                                type="file" 
                                                id="signature_2"
                                                accept=".png"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                                Choose File
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                        <input 
                                            type="text" 
                                            id="nameInPrint" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="titleOrPosition_4" className="text-sm text-green w-40">Title of Position</label>
                                        <input 
                                            type="text" 
                                            id="titleOrPosition_4" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
                                    </div>
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="date" className="text-sm text-green">Date</label>
                                        <input 
                                            type="text" 
                                            id="date" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                        />
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
                            <input 
                                type="text" 
                                className="border-2 border-gray-500 h-9 focus:border-gray-500 focus:outline-none focus:ring-transparent"
                            />
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
                            <input 
                                type="text" 
                                className="h-7 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={7}
                            />
                        </div>
                        <div className="px-5 mt-10 flex flex-col">
                            <span className="text-green text-sm">48</span>
                            <input 
                                type="text" 
                                className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={1}
                            />
                        </div>
                        <div className="px-5 mt-10 flex gap-2">
                            <div className="flex flex-col">
                                <span className="text-green text-sm">49</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-green text-sm">50</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-32 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={6}
                                />
                            </div>
                        </div>
                        <div className="px-5 mt-10">
                            <div className="flex flex-col">
                                <span className="text-green text-sm">56</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-28 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={5}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-green text-sm">61</span>
                            <input 
                                type="text" 
                                className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={1}
                            />
                        </div>
                        <div className="px-5 mt-10 flex flex-row gap-2">
                            <div className="flex flex-col">
                                <span className="text-green text-sm">62</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-20 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-green text-sm">64</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-28 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={4}
                                    
                                />
                            </div>
                        </div>
                        <div className="flex flex-row mt-10">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">68</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">69</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    
                                />
                            </div>
                        </div>
                        <div className="flex flex-row mt-10">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">70</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">72</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">74</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row mt-10">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">76</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-20 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={3}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">79</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-green text-sm">81</span>
                            <input 
                                type="text" 
                                className="h-7 w-28 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={5}
                            />
                        </div>
                        <div className="flex flex-row mt-10">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">86</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">87</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    
                                />
                            </div>
                        </div>
                        <div className="flex flex-row mt-10">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">88</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-20 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={3}
                                    
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">91</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                    
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-green text-sm">93</span>
                            <input 
                                type="text" 
                                className="h-7 w-9 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                            />
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-green text-sm">94</span>
                            <input 
                                type="text" 
                                className="h-7 w-9 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBirthCert