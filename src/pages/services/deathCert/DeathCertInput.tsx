import { useState } from "react"

function DeathCertInput() {
    const [deathCertCredentials, setDeathCertCredentials] = useState({
        province:"",
        cityOrMunicipality:"",
        registryNumber:"",
        remarksOrAnnotation:"",
        one_name_first:"",
        one_name_middle:"",
        one_name_last:"",
        two_sex:"",
        three_religion:"",
        four_A_completedYears:"",
        four_B_months:"",
        four_B_days:"",
        four_C_time:"",
    });
    return (
        <div>
            <div className='w-[65rem] m-3 h-full border-b-0 border-s-0 border-2 border-gray-700 bg-gray-100'>
                <div className="grid grid-cols-4 border-s-2 border-b-2 border-gray-700 w-full overflow-auto">
                    <div className="col-span-3 border-e-2 border-gray-700 w-full overflow-auto">
                        <div className="flex items-center py-2 px-5 justify-between">
                            <div className="flex flex-col text-[12px] text-gray-800">
                                <span>
                                    Municipal Form No. 01
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
                                    <label htmlFor="province" className="text-gray-800 text-sm">
                                        Province
                                    </label>
                                    <input 
                                        type="text"
                                        id="province" 
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    />
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="cityAndMunicipality" className="text-gray-800 text-sm">
                                        City/Municiplity
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cityAndMunicipality" 
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 border-s-2 border-gray-700 px-5 py-2 ">
                                <label htmlFor="registryNumber" className="text-gray-800 text-sm">
                                    Registry No.
                                </label>
                                <input 
                                    type="number" 
                                    id="registryNumber" 
                                    className="w-full border-0 focus:outline-none focus:ring-transparent" 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col items-center px-2 py-2">
                        <label htmlFor="remarks" className="text-gray-800 text-xl font-semibold uppercase">
                            Remarks/Annotation
                        </label>
                        <textarea 
                            id="remarks" 
                            name="remarks"
                            className="w-full text-sm rounded-sm border-0 min-h-60 max-h-60 focus:outline-none focus:ring-transparent"
                        ></textarea>
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
                                <label htmlFor="first" className="text-gray-800 text-sm">
                                    (First)
                                </label>
                                <input 
                                    type="text" 
                                    id="first" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                />
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <label htmlFor="middle" className="text-gray-800 text-sm">
                                    (Middle)
                                </label>
                                <input 
                                    type="text" 
                                    id="middle" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                />
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <label htmlFor="last" className="text-gray-800 text-sm">
                                    (Last)
                                </label>
                                <input 
                                    type="text" 
                                    id="last" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                />
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
                                <div className="flex flex-row gap-2 mt-2">
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="male" className="text-gray-800 text-sm cursor-pointer">Male</label>
                                        <input 
                                            type="radio" 
                                            id="male" 
                                            name="sex" 
                                            value="male" 
                                            className="cursor-pointer" 
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="female" className="text-gray-800 text-sm cursor-pointer">Female</label>
                                        <input 
                                            type="radio" 
                                            id="female" 
                                            name="sex" 
                                            value="female" 
                                            className="cursor-pointer" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 border-x-2 border-gray-800 p-1">
                                <div className="flex flex-col items-start">
                                    <label htmlFor="religion" className="text-gray-800 font-semibold uppercase">
                                        3. RELIGION
                                    </label>
                                    <input 
                                        type="text" 
                                        id="religion" 
                                        className="w-full h-5 border-none focus:outline-none focus:ring-transparent text-sm"
                                    />
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
                                        <div className="px-2 flex items-center justify-center border-e-2 border-gray-800">
                                            <span>2</span>
                                        </div>
                                        <div className="p-1">
                                            <label htmlFor="completedYears" className="text-gray-800 text-[12px]">
                                                Completed years
                                            </label>
                                            <input 
                                                type="text" 
                                                id="completedYears" 
                                                className="w-full h-5 border-none focus:outline-none focus:ring-transparent text-sm"
                                            />
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
                                            <div className="px-2 flex items-center justify-center border-e-2 border-gray-800">
                                                <span>1</span>
                                            </div>
                                            <div className="p-1">
                                                <label htmlFor="four_b_months" className="text-gray-800 text-[12px]">
                                                    Months
                                                </label>
                                                <input 
                                                    type="text" 
                                                    id="four_b_months" 
                                                    className="w-full h-5 border-none focus:outline-none focus:ring-transparent text-sm"
                                                />
                                            </div>
                                            <div className="px-2 flex items-center justify-center border-x-2 border-gray-800">
                                                <span>0</span>
                                            </div>
                                            <div className="p-1">
                                                <label htmlFor="four_b_days" className="text-gray-800 text-[12px]">
                                                    Days
                                                </label>
                                                <input 
                                                    type="text" 
                                                    id="four_b_days" 
                                                    className="w-full h-5 border-none focus:outline-none focus:ring-transparent text-sm"
                                                />
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
                                        <div className="p-1 text-center">
                                            <label htmlFor="completedYears" className="text-gray-800 text-[12px]">
                                                Hrs/Min/Sec
                                            </label>
                                            <input 
                                                type="text" 
                                                id="completedYears" 
                                                className="w-full h-5 border-none focus:outline-none focus:ring-transparent text-sm"
                                            />
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
                            <div className="flex flex-col items-center w-72">
                                <label htmlFor="five_nameOf" className="text-gray-800 text-sm">
                                    (Name of Hospital/Clinic/Institution/House no., Street, Barangay)
                                </label>
                                <input 
                                    type="text" 
                                    id="five_nameOf" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-5 text-sm"
                                />
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <label htmlFor="five_cityOrMunicipality" className="text-gray-800 text-sm">
                                    (City/Municipality)
                                </label>
                                <input 
                                    type="text" 
                                    id="five_cityOrMunicipality" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-5 text-sm"
                                />
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <label htmlFor="five_province" className="text-gray-800 text-sm">
                                    (Province)
                                </label>
                                <input 
                                    type="text" 
                                    id="five_province" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-5 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    {/* left part */}
                    <div className="col-span-1">
                        left side
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeathCertInput