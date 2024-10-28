import { Tooltip } from "flowbite-react"
import { AiFillPrinter } from '../../../hooks/icons'
import { Navigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import axios from "axios";
import { Loading, serverURL } from "../../../hooks/imports";
import { useQuery } from "@tanstack/react-query";
import { MarriageCertTypes } from "../../../types/marriageCertTypes";
import { useActivityMutation } from "../../../services/sendActivity";

function ViewMarriageCert() {
    const { id } = useParams();
    const activityMutation = useActivityMutation();
    const contentRef = useRef<HTMLDivElement>(null);  // Reference to the certificate content

    // Setup react-to-print for printing the specific certificate content
    const reactToPrintFn = useReactToPrint({
        contentRef, // Correctly pass the contentRef here
    });

    const { data, isLoading } = useQuery({
        queryKey:['marriageCert-single-data'],
        queryFn: async():Promise<MarriageCertTypes>=>{
            const { data } = await axios.get(`${serverURL}/api/cris/marriage-certificate/get-single?id=${id}`, { withCredentials:true });

            return data;
        }
    });
    
    if(isLoading) return <Loading/>
    
    if(!id){
        <Navigate to='*'/>
    }

    const handlePrint = () =>{
        reactToPrintFn();

        activityMutation.mutate(`Marriage certificate printed for ${data?.one_first} & ${data?.one_first_wife} (Registry No. ${data?.RegistryNumber})`);
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
            <div className="w-full overflow-auto border-b-2 border-gray-800">
                    <div className="w-full overflow-auto">
                        <div className="flex items-center py-2 px-5 justify-between">
                            <div className="flex flex-col text-[12px] text-gray-800">
                                <span>
                                    Municipal Form No. 0{id}
                                </span>
                                <span>
                                    (Revised January 2007)
                                </span>
                            </div>
                            <div className="text-[12px] text-gray-800">
                                <span>
                                    (To be accomplished in quadruplicate using black ink)
                                </span>
                            </div>
                        </div>
                        <div className="text-gray-800 w-full flex flex-col items-center justify-center text-center p-2">
                            <span className="text-xl">
                                Republic of the Philippines
                            </span>
                            <span className="text-xl uppercase">
                                Office of the civil registrar general
                            </span>
                            <span className="text-xl font-semibold uppercase">
                                Certificate of Marriage
                            </span>
                        </div>
                        <div className="w-full grid grid-cols-3 overflow-auto">
                            <div className="col-span-2 py-2 px-5">
                                <div className="flex flex-row items-end gap-2 mb-2">
                                    <span className="text-gray-800 text-sm">
                                        Province
                                    </span>
                                    <div 
    
                                        className="flex items-end p-1 flex-1 border-[1px] border-gray-700 h-7 text-sm" 
                                    >
                                        <span>{data?.province}</span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <span className="text-gray-800 text-sm">
                                        City/Municiplity
                                    </span>
                                    <div 
    
                                        className="flex items-end p-1 flex-1 border-[1px] border-gray-700 h-7 text-sm" 
                                    >
                                        <span>{data?.cityOrMunicipality}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 px-5 py-2 ">
                                <span className="text-gray-800 text-sm">
                                    Registry No.
                                </span>
                                <div 

                                    className="flex items-end p-1 flex-1 border-[1px] border-gray-700 text-sm" 
                                >
                                    <span>{data?.RegistryNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Number 1 */}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5">
                        <span className="font-semibold text-gray-800">1. Name of Contracting parties</span>
                    </div>
                    <div className="col-span-2 border-x-2 border-gray-800">
                        <div className="uppercase text-gray-800 font-semibold border-b-2 border-gray-500 w-full text-center">
                            <span>Husband</span>
                        </div>
                        <div className="px-5 py-1">
                            <div className="flex flex-row items-end gap-5">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (First)
                                </span>
                                <div 

                                    className="flex items-end p-1 flex-1 border-[1px] border-gray-700 h-7 text-sm" 
                                >
                                    <span>{data?.one_first}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-end gap-5 my-1">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Middle)
                                </span>
                                <div 

                                    className="flex items-end p-1 flex-1 border-[1px] border-gray-700 h-7 text-sm" 
                                >
                                    <span>{data?.one_middle}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-end gap-5">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Last)
                                </span>
                                <div 

                                    className="flex items-end p-1 flex-1 border-[1px] border-gray-700 h-7 text-sm" 
                                >
                                    <span>{data?.one_last}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="uppercase text-gray-800 font-semibold border-b-2 border-gray-500 w-full text-center">
                            <span>Wife</span>
                        </div>
                        <div className="px-5 py-1">
                            <div className="flex flex-row items-end gap-5">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (First)
                                </span>
                                <div 

                                    className="flex items-end p-1 flex-1 border-[1px] border-gray-700 h-7 text-sm" 
                                >
                                    <span>{data?.one_first_wife}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-end gap-5 my-1">
                                <span  className="text-gray-800 text-sm font-semibold">
                                    (Middle)
                                </span>
                                <div 

                                    className="flex items-end p-1 flex-1 border-[1px] border-gray-700 h-7 text-sm" 
                                >
                                    <span>{data?.one_middle_wife}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-end gap-5">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Last)
                                </span>
                                <div 

                                    className="flex items-end p-1 flex-1 border-[1px] border-gray-700 h-7 text-sm" 
                                >
                                    <span>{data?.one_last_wife}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Number 2a, 2b, 3 */}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            2a. Date of birth
                        </span>
                        <span className="font-semibold text-gray-800 mb-2">
                            2b. Age
                        </span>
                        <span className="font-semibold text-gray-800">
                            3. Place of Birth
                        </span>
                    </div>
                    <div className="col-span-2 border-x-2 border-gray-800">
                        <div className="flex flex-row gap-5 w-full px-5 py-1">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Day)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-20 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.two_day_husband}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Month)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-20 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.two_month_husband}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Year)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-20 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.two_year_husband}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Age)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-20 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.two_age_husband}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 w-full px-5 py-1">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (City/Municipality)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-28 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.three_CityOrMunicipality_husband}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Province)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-28 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.three_Province_husband}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Country)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-28 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.three_Country_husband}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex flex-row gap-5 w-full px-5 py-1">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Day)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-20 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.two_day_wife}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Month)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-20 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.two_month_wife}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Year)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-20 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.two_year_wife}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Age)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-20 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.two_age_wife}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 w-full px-5 py-1">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (City/Municipality)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-28 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.three_CityOrMunicipality_wife}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Province)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-28 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.three_Province_wife}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Country)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-28 border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.three_Country_wife}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* number 4a and 4b */}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            4a. Sex
                        </span>
                        <span className="font-semibold text-gray-800 mb-2">
                            4b. Citizenship
                        </span>
                    </div>
                    <div className="col-span-2 border-x-2 border-gray-800">
                        <div className="flex flex-row gap-5 p-1">
                            <div className="flex flex-col items-center justify-center w-full">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Sex)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-full border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.four_sex_husband}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Citizenship)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-full border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.four_citizenship_husband}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex flex-row gap-5 p-1">
                        <div className="flex flex-col items-center justify-center w-full">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Sex)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-full border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.four_sex_wife}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                                <span className="text-gray-800 text-sm font-semibold">
                                    (Citizenship)
                                </span>
                                <div 

                                    className="flex items-center justify-start p-1 w-full border-[1px] border-gray-700 h-5 text-sm" 
                                >
                                    <span>{data?.four_citizenship_wife}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* number 5*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            5. Residence
                        </span>
                    </div>
                    <div className="col-span-2 p-1 border-x-2 border-gray-800">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] border-gray-700  mt-1 text-sm" 
                            >
                                <span>{data?.five_Residence_husband}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] border-gray-700  mt-1 text-sm" 
                            >
                                <span>{data?.five_Residence_wife}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* number 6*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            6. Religion/
                        </span>
                        <span className="font-semibold text-gray-800">Religious</span>
                        <span className="font-semibold text-gray-800">
                            Sect
                        </span>
                    </div>
                    <div className="col-span-2 p-1 border-x-2 border-gray-800">
                        <div 
                            className="flex items-center justify-start p-1 w-full border-[1px] border-gray-700 mt-1 text-sm" 
                        >
                            <span>{data?.six_Religion_husband}</span>
                        </div>
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <div 
                            className="flex items-center justify-start p-1 w-full border-[1px] border-gray-700 mt-1 text-sm" 
                        >
                            <span>{data?.six_Religion_wife}</span>
                        </div>
                    </div>
                </div>

                {/* number 7*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            7. Civil Status
                        </span>
                    </div>
                    <div className="col-span-2 p-1 border-x-2 border-gray-800">
                        <div 
                            className="flex items-center justify-start p-1 w-full border-[1px] h-7 border-gray-700 text-sm" 
                        >
                            <span>{data?.seven_CivilStatus_husband}</span>
                        </div>
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <div 
                            className="flex items-center justify-start p-1 w-full border-[1px] h-7 border-gray-700 text-sm" 
                        >
                            <span>{data?.seven_CivilStatus_wife}</span>
                        </div>
                    </div>
                </div>

                {/* number 8*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            8. Name of Father
                        </span>
                    </div>
                    <div className="col-span-2 flex flex-row p-1 border-x-2 border-gray-800">
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (First)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.eight_first_husband}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </span>
                            <div 
                                className="flex items-center justify-start border-x-0 p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.eight_middle_husband}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.eight_last_husband}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-row p-1 pe-5">
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (First)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.eight_first_wife}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </span>
                            <div 
                                className="flex items-center justify-start border-x-0 p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.eight_middle_wife}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.eight_last_wife}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* number 9*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            9. Citizenship
                        </span>
                    </div>
                    <div className="col-span-2 p-1 border-x-2 border-gray-800">
                        <div 
                            className="flex items-center justify-start p-1 w-full border-[1px] h-7 border-gray-700 text-sm" 
                        >
                            <span>{data?.nine_Citizenship_husband}</span>
                        </div>
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <div 
                            className="flex items-center justify-start p-1 w-full border-[1px] h-7 border-gray-700 text-sm" 
                        >
                            <span>{data?.nine_Citizenship_wife}</span>
                        </div>
                    </div>
                </div>

                {/* number 10*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            10. Name of Mother
                        </span>
                    </div>
                    <div className="col-span-2 flex flex-row p-1 border-x-2 border-gray-800">
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (First)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.ten_first_husband}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </span>
                            <div 
                                className="flex items-center justify-start border-x-0 p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.ten_middle_husband}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.ten_last_husband}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-row p-1 pe-5">
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (First)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.ten_first_wife}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </span>
                            <div 
                                className="flex items-center justify-start border-x-0 p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.ten_middle_wife}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.ten_last_wife}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* number 11*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            11. Citizenship
                        </span>
                    </div>
                    <div className="col-span-2 p-1 border-x-2 border-gray-800">
                        <div 
                            className="flex items-center justify-start p-1 w-full border-[1px] h-7 border-gray-700 text-sm" 
                        >
                            <span>{data?.eleven_Citizenship_husband}</span>
                        </div>
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <div 
                            className="flex items-center justify-start p-1 w-full border-[1px] h-7 border-gray-700 text-sm" 
                        >
                            <span>{data?.eleven_Citizenship_wife}</span>
                        </div>
                    </div>
                </div>

                {/* number 12*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            12. Name of Person/Wali Who Gave Consent or Advice
                        </span>
                    </div>
                    <div className="col-span-2 flex flex-row p-1 border-x-2 border-gray-800">
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (First)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.twelve_first_husband}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </span>
                            <div 
                                className="flex items-center justify-start border-x-0 p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.twelve_middle_husband}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.twelve_last_husband}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-row p-1">
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (First)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.twelve_first_wife}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </span>
                            <div 
                                className="flex items-center justify-start border-x-0 p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.twelve_middle_wife}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-5 border-gray-700 text-sm" 
                            >
                                <span>{data?.twelve_last_wife}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* number 13*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            13. Relationship
                        </span>
                    </div>
                    <div className="col-span-2 p-1 border-x-2 border-gray-800">
                        <div 
                            className="flex items-center justify-start p-1 w-full border-[1px] h-7 border-gray-700 text-sm" 
                        >
                            <span>{data?.thirteen_relationship_husband}</span>
                        </div>
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <div 
                            className="flex items-center justify-start p-1 w-full border-[1px] h-7 border-gray-700 text-sm" 
                        >
                            <span>{data?.thirteen_relationship_wife}</span>
                        </div>
                    </div>
                </div>

                {/* number 14*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800 ">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            14. Residence
                        </span>
                    </div>
                    <div className="col-span-2 p-1 border-x-2 border-gray-800">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] mt-1 border-gray-700 text-sm" 
                            >
                                <span>{data?.fourteen_Residence_husband}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] mt-1 border-gray-700 text-sm" 
                            >
                                <span>{data?.fourteen_Residence_wife}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* number 15*/}
                <div className="grid grid-cols-5 pe-5">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            15. Place of Marriage
                        </span>
                    </div>
                    <div className="col-span-4 p-1 flex flex-row items-end w-full">
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Office of the House/Church/Mosque)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] border-gray-700 text-sm" 
                            >
                                <span>{data?.fifteen_Office}</span>
                            </div>
                        </div>
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <span className="text-gray-800 text-sm font-semibold">
                                (City/Municipality)
                            </span>
                            <div 
                                className="flex items-center border-x-0 justify-start p-1 w-full border-[1px] border-gray-700 text-sm" 
                            >
                                <span>{data?.fifteen_CityOrMunicipality}</span>
                            </div>
                        </div>
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Province)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] border-gray-700 text-sm" 
                            >
                                <span>{data?.fifteen_Province}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Number 16 and 17*/}
                <div className="grid grid-cols-5 pe-5">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            16. Date of Marriage
                        </span>
                    </div>
                    <div className="col-span-2 p-1 flex flex-row items-end">
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Day)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-6 border-gray-700 text-sm" 
                            >
                                <span>{data?.sixteen_Day}</span>
                            </div>
                        </div>
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Month)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] border-x-0 h-6 border-gray-700 text-sm" 
                            >
                                <span>{data?.sixteen_Month}</span>
                            </div>
                        </div>
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <span className="text-gray-800 text-sm font-semibold">
                                (Year)
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 w-full border-[1px] h-6 border-gray-700 text-sm" 
                            >
                                <span>{data?.sixteen_Year}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex flex-row items-end gap-2 p-1">
                            <span className="text-gray-800 text-sm font-semibold">
                                17. Time of Marriage
                            </span>
                            <div 
                                className="flex items-center justify-start p-1 flex-1 border-[1px] h-6 border-gray-700 text-sm" 
                            >
                                <span>{data?.seventeen_Time}</span>
                            </div>
                            <span className="text-sm">am/pm</span>
                        </div>
                    </div>
                </div>

                {/* Number 18 */}
                <div className="flex flex-col">
                    <span className="uppercase font-semibold text-gray-800 py-1 px-5">
                        18. Certification of The Contracting Parties
                    </span>
                    <div className="w-full p-1 text-sm ps-10 pe-5">
                        <div className="flex gap-1">
                            <span className="indent-28">THIS IS CERTIFY, That I</span>
                            <div 
                                className="flex items-center justify-start p-1 flex-1 border-[1px] h-6 border-gray-700 text-sm" 
                            >
                                <span>{data?.eighteen_nameOne}</span>
                            </div>
                            <span>and, I</span>
                            <div 
                                className="flex items-center justify-start p-1 flex-1 border-[1px] h-6 border-gray-700 text-sm" 
                            >
                                <span>{data?.eighteen_nameTwo}</span>
                            </div>
                            <span>, both of legal</span>
                        </div>
                        <div>
                            <span className="me-3">age, of our own free will and accord, and in the presence of the person solemnizing this marriage and of the witness named below, take each other as husband and wife and certifying further that we</span>
                            <input 
                                type="checkbox" 
                                id="entered" 
                                checked={data?.eighteen_decision === 'agree'}
                                disabled
                            />
                            <span className="ms-1 me-3">have entered, a copy of which is hereto attached</span>
                            <input 
                                type="checkbox" 
                                id="entered" 
                                checked={data?.eighteen_decision === 'disagree'}
                                disabled
                            />
                            <span className="ms-1">have not entered into a marriage settlement.</span>
                        </div>
                        <div className="pe-5 mt-2 flex">
                            <span className="font-semibold uppercase ps-28">IN WITNESS WHEREOF, </span>
                            <span>we have signed/maked with our fingerprint this certificate in quadruplicate this</span>
                            <div 
                                className="flex items-center justify-end p-1 w-20 border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                            >
                                <span>{data?.eighteen_day}</span>
                            </div>
                            <span>, day of</span>
                            <div 
                                className="flex items-center justify-end p-1 w-20 border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                            >
                                <span>{data?.eighteen_dayOf}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 mt-5 px-5 gap-5">
                            <div className="col-span-1 flex flex-col items-center">
                                <figure 
                                    className="flex items-center justify-center p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <img 
                                        src={`${serverURL}/${data?.eighteenHusbandSignature}`}
                                        className="w-20"
                                    />
                                </figure>
                                <span className="text-sm font-medium text-gray-800">
                                    (Signature of Husband)
                                </span>
                            </div>
                            <div className="col-span-1 flex flex-col items-center">
                                <figure 
                                    className="flex items-center justify-center p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <img 
                                        src={`${serverURL}/${data?.eighteenWifeSignature}`}
                                        className="w-20"
                                    />
                                </figure>
                                <span className="text-sm font-medium text-gray-800">
                                    (Signature of Wife)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Number 19 */}
                <div className="flex flex-col">
                    <span className="uppercase font-semibold text-gray-800 py-1 px-5">
                        19. Certification of the selemnizing officer:
                    </span>
                    <div>
                        <div className="text-sm pe-5 ps-11">
                            <span className="uppercase font-semibold">THIS IS TO CERTIFY: THAT BEFORE ME</span>
                            <span>, on the date and place above-written, personally appreared the aboce-mentioned parties, with their mutual consent, lawfully joined together in marriage which was solemnized by me in the presence of the witnesses name below, all of legal age.</span>
                        </div>
                    </div>
                    <div className="px-5 mt-2">
                        <div className="flex flex-row items-end gap-1 text-sm">
                            <input 
                                type="checkbox" 
                                id="letter_A" 
                                checked={data?.nineteen_choices === 'A'}
                                disabled
                            />
                            <span>
                                a. Marriage License No.
                            </span>
                            <div 
                                className="flex items-center justify-center p-1 w-36 border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                            >
                                <span>{data?.nineteen_choose_A_first}</span>
                            </div>
                            <span>
                                issued on
                            </span>
                            <div 
                                className="flex items-center justify-center p-1 w-36 border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                            >
                                <span>{data?.nineteen_choose_A_second}</span>
                            </div>
                            <span>
                                . at
                            </span>
                            <div 
                                className="flex items-center justify-center p-1 w-36 border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                            >
                                <span>{data?.nineteen_choose_A_third}</span>
                            </div>
                            <span>
                                in favor of said parties, was exhibited to me.
                            </span>
                        </div>
                        <div className="flex flex-row items-end gap-1 text-sm">
                            <input 
                                type="checkbox" 
                                id="letter_B" 
                                checked={data?.nineteen_choices === 'B'}
                                disabled
                            />
                            <span>
                                b. no marriage license was necessary, the marriage being solemnized under Art
                            </span>
                            <div 
                                className="flex items-center justify-center p-1 w-36 border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                            >
                                <span>{data?.nineteen_choose_B}</span>
                            </div>
                            <span>
                                of Executive Order No. 209.
                            </span>
                        </div>
                        <div className="flex flex-row items-end gap-1 text-sm mt-1">
                            <input 
                                type="checkbox" 
                                id="letter_C" 
                                checked={data?.nineteen_choices === 'C'}
                                disabled
                            />
                            <span>
                                c. the marriage was solemnized in accordance with the provisions of the Presidential Decree No. 1083.
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-5 mt-5 pe-5 ps-14">
                            <div className="col-span-1">
                                <figure 
                                    className="flex items-center justify-center p-1 w-full h-6" 
                                >
                                    <img 
                                        src={`${serverURL}/${data?.eighteenWifeSignature}`}
                                        className="w-20"
                                    />
                                </figure>
                                <div className="flex flex-col-reverse items-center justify-center">
                                    <span className="text-[12px] text-gray-800 font-semibold">
                                        (Signature Over Printed Name of Solemnized Officer)
                                    </span>
                                    <div 
                                        className="flex items-center justify-center p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                    >
                                        <span>{data?.nineteen_PrintedName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col-reverse items-center justify-center mt-5">
                                    <span className="text-[12px] text-gray-800 font-semibold">
                                        (Position/Designation)
                                    </span>
                                    <div 
                                        className="flex items-center justify-center p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                    >
                                        <span>{data?.nineteen_Position}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col-reverse items-center justify-center mt-5 text-center">
                                    <span className="text-[12px] text-gray-800 font-semibold">
                                        (Religion/Religious, Registry No. and Expiration Date, if applicable)
                                    </span>
                                    <div 
                                        className="flex items-center justify-center p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                    >
                                        <span>{data?.nineteen_Religion}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Number 20 a */}
                <div className="flex flex-col py-1 border-b-2 border-gray-800">
                    <span className="text-gray-800 px-5">
                        20a. WITNESSES (Print Name and Sign): Additional at the back
                    </span>
                    <div className="grid grid-cols-4 gap-5 pe-5">
                        <div className="col-span-1 ps-14">
                            <figure 
                                className="flex items-center justify-center p-1 w-full h-6" 
                            >
                                <img 
                                    src={`${serverURL}/${data?.twentySignatureOne}`}
                                    className="w-20"
                                />
                            </figure>
                            <div className="flex flex-col-reverse items-center justify-center">
                                <div 
                                    className="flex items-center justify-center p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <span>{data?.twenty_nameOne}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <figure 
                                className="flex items-center justify-center p-1 w-full h-6" 
                            >
                                <img 
                                    src={`${serverURL}/${data?.twentySignatureTwo}`}
                                    className="w-20"
                                />
                            </figure>
                            <div className="flex flex-col-reverse items-center justify-center">
                                <div 
                                    className="flex items-center justify-center p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <span>{data?.twenty_nameTwo}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <figure 
                                className="flex items-center justify-center p-1 w-full h-6" 
                            >
                                <img 
                                    src={`${serverURL}/${data?.twentySignatureThree}`}
                                    className="w-20"
                                />
                            </figure>
                            <div className="flex flex-col-reverse items-center justify-center">
                                <div 
                                    className="flex items-center justify-center p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <span>{data?.twenty_nameThree}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <figure 
                                className="flex items-center justify-center p-1 w-full h-6" 
                            >
                                <img 
                                    src={`${serverURL}/${data?.twentySignatureFour}`}
                                    className="w-20"
                                />
                            </figure>
                            <div className="flex flex-col-reverse items-center justify-center">
                                <div 
                                    className="flex items-center justify-center p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <span>{data?.twenty_nameFour}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* number 21 */}
                <div className="grid grid-cols-2 px-5 gap-5 pt-1 pb-5">
                    <div className="col-span-1">
                        <span className="uppercase font-semibold text-gray-800">
                            21. Recieved By:
                        </span>
                        <div className="pe-4">
                            <div className="flex flex-row items-end gap-2 relative">
                                <span className="text-sm font-medium text-gray-800">Signature</span>
                                <figure 
                                    className="flex items-center justify-start p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <img 
                                        src={`${serverURL}/${data?.twentyOneSignature}`}
                                        className="w-20 ms-10"
                                    />
                                </figure>
                            </div>
                            <div className="flex flex-row items-end">
                                <span className="text-sm text-gray-800 w-36">Name in Print</span>
                                <div 
                                    className="flex items-center justify-start p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <span>{data?.twentyOne_NameInPrint}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-end">
                                <span className="text-sm text-gray-800 w-40">Title of Position</span>
                                <div 
                                    className="flex items-center justify-start p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <span>{data?.twentyOne_TitleOfPosition}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-end gap-2">
                                <span className="text-sm text-gray-800">Date</span>
                                <div 
                                    className="flex items-center justify-start p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <span>{data?.twentyOne_Date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <span className="uppercase font-semibold text-gray-800">
                            22. Registered By the Civil Registrar:
                        </span>
                        <div className="pe-4">
                            <div className="flex flex-row items-end gap-2 relative">
                                <span className="text-sm font-medium text-gray-800">Signature</span>
                                <figure 
                                    className="flex items-center justify-start p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <img 
                                        src={`${serverURL}/${data?.twentyTwoSignature}`}
                                        className="w-20 ms-10"
                                    />
                                </figure>
                            </div>
                            <div className="flex flex-row items-end">
                                <span className="text-sm text-gray-800 w-36">Name in Print</span>
                                <div 
                                    className="flex items-center justify-start p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <span>{data?.twentyTwo_NameInPrint}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-end">
                                <span className="text-sm text-gray-800 w-40">Title of Position</span>
                                <div 
                                    className="flex items-center justify-start p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <span>{data?.twentyTwo_TitleAndPosition}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-end gap-2">
                                <span className="text-sm text-gray-800">Date</span>
                                <div 
                                    className="flex items-center justify-start p-1 w-full border-[1px] h-6 border-gray-700 text-sm border-x-0 border-t-0" 
                                >
                                    <span>{data?.twentyTwo_Date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMarriageCert