
function MarriageCertInput() {
    return (
        <div>
            <div className='w-[65rem] m-3 h-full border-2 border-gray-700 bg-gray-100'>
            <div className="w-full overflow-auto border-b-2 border-gray-800">
                    <div className="w-full overflow-auto">
                        <div className="flex items-center py-2 px-5 justify-between">
                            <div className="flex flex-col text-[12px] text-gray-800">
                                <span>
                                    Municipal Form No. 01
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
                                    <label htmlFor="province" className="text-gray-800 text-sm">
                                        Province
                                    </label>
                                    <input 
                                        type="text"
                                        id="province" 
                                        className="flex-1  border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    />
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="cityAndMunicipality" className="text-gray-800 text-sm">
                                        City/Municiplity
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cityAndMunicipality" 
                                        className="flex-1 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 px-5 py-2 ">
                                <label htmlFor="registryNumber" className="text-gray-800 text-sm">
                                    Registry No.
                                </label>
                                <input 
                                    type="number" 
                                    id="registryNumber" 
                                    className="w-full border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                />
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
                                <label htmlFor="one_husband_first" className="text-gray-800 text-sm font-semibold">
                                    (First)
                                </label>
                                <input 
                                    type="text" 
                                    id="one_husband_first" 
                                    className="flex-1  border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm"
                                />
                            </div>
                            <div className="flex flex-row items-end gap-5 my-1">
                                <label htmlFor="one_husband_middle" className="text-gray-800 text-sm font-semibold">
                                    (Middle)
                                </label>
                                <input 
                                    type="text" 
                                    id="one_husband_middle" 
                                    className="flex-1  border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm"
                                />
                            </div>
                            <div className="flex flex-row items-end gap-5">
                                <label htmlFor="one_husband_last" className="text-gray-800 text-sm font-semibold">
                                    (Last)
                                </label>
                                <input 
                                    type="text" 
                                    id="one_husband_last" 
                                    className="flex-1  border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="uppercase text-gray-800 font-semibold border-b-2 border-gray-500 w-full text-center">
                            <span>Wife</span>
                        </div>
                        <div className="px-5 py-1">
                            <div className="flex flex-row items-end gap-5">
                                <label htmlFor="one_wife_first" className="text-gray-800 text-sm font-semibold">
                                    (First)
                                </label>
                                <input 
                                    type="text" 
                                    id="one_wife_first" 
                                    className="flex-1  border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm"
                                />
                            </div>
                            <div className="flex flex-row items-end gap-5 my-1">
                                <label htmlFor="one_wife_middle" className="text-gray-800 text-sm font-semibold">
                                    (Middle)
                                </label>
                                <input 
                                    type="text" 
                                    id="one_wife_middle" 
                                    className="flex-1  border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm"
                                />
                            </div>
                            <div className="flex flex-row items-end gap-5">
                                <label htmlFor="one_wife_last" className="text-gray-800 text-sm font-semibold">
                                    (Last)
                                </label>
                                <input 
                                    type="text" 
                                    id="one_wife_last" 
                                    className="flex-1  border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm"
                                />
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
                                <label htmlFor="two_A_husband_day" className="text-gray-800 text-sm font-semibold">
                                    (Day)
                                </label>
                                <input 
                                    type="text" 
                                    id="two_A_husband_day" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="two_A_husband_month" className="text-gray-800 text-sm font-semibold">
                                    (Month)
                                </label>
                                <input 
                                    type="text" 
                                    id="two_A_husband_month" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="two_A_husband_year" className="text-gray-800 text-sm font-semibold">
                                    (Year)
                                </label>
                                <input 
                                    type="text" 
                                    id="two_A_husband_year" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="two_B_husband_age" className="text-gray-800 text-sm font-semibold">
                                    (Age)
                                </label>
                                <input 
                                    type="text" 
                                    id="two_B_husband_age" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 w-full px-5 py-1">
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="three_husband_cityOrMunicipality" className="text-gray-800 text-sm font-semibold">
                                    (City/Municipality)
                                </label>
                                <input 
                                    type="text" 
                                    id="three_husband_cityOrMunicipality" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="three_husband_province" className="text-gray-800 text-sm font-semibold">
                                    (Province)
                                </label>
                                <input 
                                    type="text" 
                                    id="three_husband_province" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="three_husband_country" className="text-gray-800 text-sm font-semibold">
                                    (Country)
                                </label>
                                <input 
                                    type="text" 
                                    id="three_husband_country" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex flex-row gap-5 w-full px-5 py-1">
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="two_A_wife_day" className="text-gray-800 text-sm font-semibold">
                                    (Day)
                                </label>
                                <input 
                                    type="text" 
                                    id="two_A_wife_day" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="two_A_wife_month" className="text-gray-800 text-sm font-semibold">
                                    (Month)
                                </label>
                                <input 
                                    type="text" 
                                    id="two_A_wife_month" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="two_A_wife_year" className="text-gray-800 text-sm font-semibold">
                                    (Year)
                                </label>
                                <input 
                                    type="text" 
                                    id="two_A_wife_year" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="two_B_wife_age" className="text-gray-800 text-sm font-semibold">
                                    (Age)
                                </label>
                                <input 
                                    type="text" 
                                    id="two_B_wife_age" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 w-full px-5 py-1">
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="three_wife_cityOrMunicipality" className="text-gray-800 text-sm font-semibold">
                                    (City/Municipality)
                                </label>
                                <input 
                                    type="text" 
                                    id="three_wife_cityOrMunicipality" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="three_wife_province" className="text-gray-800 text-sm font-semibold">
                                    (Province)
                                </label>
                                <input 
                                    type="text" 
                                    id="three_wife_province" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="three_wife_country" className="text-gray-800 text-sm font-semibold">
                                    (Country)
                                </label>
                                <input 
                                    type="text" 
                                    id="three_wife_country" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
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
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="four_A_Husband" className="text-gray-800 text-sm font-semibold">
                                    (Sex)
                                </label>
                                <input 
                                    type="text" 
                                    id="four_A_Husband" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="four_B_Husband" className="text-gray-800 text-sm font-semibold">
                                    (Citizenship)
                                </label>
                                <input 
                                    type="text" 
                                    id="four_B_Husband" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex flex-row gap-5 p-1">
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="four_A_wife" className="text-gray-800 text-sm font-semibold">
                                    (Sex)
                                </label>
                                <input 
                                    type="text" 
                                    id="four_A_wife" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <label htmlFor="four_B_wife" className="text-gray-800 text-sm font-semibold">
                                    (Citizenship)
                                </label>
                                <input 
                                    type="text" 
                                    id="four_B_wife" 
                                    className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                />
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
                            <label htmlFor="five_HouseNo_husband" className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </label>
                            <input 
                                type="text" 
                                id="five_HouseNo_husband" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 p-1">
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="five_HouseNo_wife" className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </label>
                            <input 
                                type="text" 
                                id="five_HouseNo_wife" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
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
                        <input 
                            type="text" 
                            id="six_religion_husband" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full mt-2"
                        />
                    </div>
                    <div className="col-span-2 p-1">
                        <input 
                            type="text" 
                            id="six_religion_wife" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full mt-2"
                        />
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
                        <input 
                            type="text" 
                            id="seven_husband" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                        />
                    </div>
                    <div className="col-span-2 p-1">
                        <input 
                            type="text" 
                            id="seven_wife" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                        />
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
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="eight_first_husband" className="text-gray-800 text-sm font-semibold">
                                (First)
                            </label>
                            <input 
                                type="text" 
                                id="eight_first_husband" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="eight_middle_husband" className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </label>
                            <input 
                                type="text" 
                                id="eight_middle_husband" 
                                className=" border-gray-700 h-5 border-x-0 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="eight_last_husband" className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </label>
                            <input 
                                type="text" 
                                id="eight_last_husband" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-row p-1">
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="eight_first_wife" className="text-gray-800 text-sm font-semibold">
                                (First)
                            </label>
                            <input 
                                type="text" 
                                id="eight_first_wife" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="eight_middle_wife" className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </label>
                            <input 
                                type="text" 
                                id="eight_middle_wife" 
                                className=" border-gray-700 h-5 border-x-0 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="eight_last_wife" className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </label>
                            <input 
                                type="text" 
                                id="eight_last_wife" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
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
                        <input 
                            type="text" 
                            id="nine_husband" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                        />
                    </div>
                    <div className="col-span-2 p-1">
                        <input 
                            type="text" 
                            id="nine_wife" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                        />
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
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="ten_first_husband" className="text-gray-800 text-sm font-semibold">
                                (First)
                            </label>
                            <input 
                                type="text" 
                                id="ten_first_husband" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="ten_middle_husband" className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </label>
                            <input 
                                type="text" 
                                id="ten_middle_husband" 
                                className=" border-gray-700 h-5 border-x-0 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="ten_last_husband" className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </label>
                            <input 
                                type="text" 
                                id="ten_last_husband" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-row p-1">
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="ten_first_wife" className="text-gray-800 text-sm font-semibold">
                                (First)
                            </label>
                            <input 
                                type="text" 
                                id="ten_first_wife" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="ten_middle_wife" className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </label>
                            <input 
                                type="text" 
                                id="ten_middle_wife" 
                                className=" border-gray-700 h-5 border-x-0 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="ten_last_wife" className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </label>
                            <input 
                                type="text" 
                                id="ten_last_wife" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
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
                        <input 
                            type="text" 
                            id="eleven_husband" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                        />
                    </div>
                    <div className="col-span-2 p-1">
                        <input 
                            type="text" 
                            id="eleven_wife" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                        />
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
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="twelve_first_husband" className="text-gray-800 text-sm font-semibold">
                                (First)
                            </label>
                            <input 
                                type="text" 
                                id="twelve_first_husband" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="twelve_middle_husband" className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </label>
                            <input 
                                type="text" 
                                id="twelve_middle_husband" 
                                className=" border-gray-700 h-5 border-x-0 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="twelve_last_husband" className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </label>
                            <input 
                                type="text" 
                                id="twelve_last_husband" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-row p-1">
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="twelve_first_wife" className="text-gray-800 text-sm font-semibold">
                                (First)
                            </label>
                            <input 
                                type="text" 
                                id="twelve_first_wife" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="twelve_middle_wife" className="text-gray-800 text-sm font-semibold">
                                (Middle)
                            </label>
                            <input 
                                type="text" 
                                id="twelve_middle_wife" 
                                className=" border-gray-700 h-5 border-x-0 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="twelve_last_wife" className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </label>
                            <input 
                                type="text" 
                                id="twelve_last_wife" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
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
                        <input 
                            type="text" 
                            id="thirteen_husband" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                        />
                    </div>
                    <div className="col-span-2 p-1">
                        <input 
                            type="text" 
                            id="thirteen_wife" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                        />
                    </div>
                </div>

                {/* number 14*/}
                <div className="grid grid-cols-5 border-b-2 border-gray-800">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            14. Residence
                        </span>
                    </div>
                    <div className="col-span-2 p-1 border-x-2 border-gray-800">
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="fourteen_HouseNo_husband" className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </label>
                            <input 
                                type="text" 
                                id="fourteen_HouseNo_husband" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 p-1">
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="fourteen_HouseNo_wife" className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </label>
                            <input 
                                type="text" 
                                id="fourteen_HouseNo_wife" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* number 15*/}
                <div className="grid grid-cols-5">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            15. Place of Marriage
                        </span>
                    </div>
                    <div className="col-span-4 p-1 flex flex-row items-end w-full">
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <label htmlFor="fifteen_officeOf" className="text-gray-800 text-sm font-semibold">
                                (Office of the House/Church/Mosque)
                            </label>
                            <input 
                                type="text" 
                                id="fifteen_officeOf" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <label htmlFor="fourteen_cityOrMunicipality" className="text-gray-800 text-sm font-semibold">
                                (City/Municipality)
                            </label>
                            <input 
                                type="text" 
                                id="fourteen_cityOrMunicipality" 
                                className="border-x-0 border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <label htmlFor="fourteen_province" className="text-gray-800 text-sm font-semibold">
                                (Province)
                            </label>
                            <input 
                                type="text" 
                                id="fourteen_province" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Number 16 and 17*/}
                <div className="grid grid-cols-5">
                    <div className="col-span-1 py-1 px-5 flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                            16. Date of Marriage
                        </span>
                    </div>
                    <div className="col-span-2 p-1 flex flex-row items-end">
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <label htmlFor="sixteen_day" className="text-gray-800 text-sm font-semibold">
                                (Day)
                            </label>
                            <input 
                                type="text" 
                                id="sixteen_day" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                            />
                        </div>
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <label htmlFor="sixteen_month" className="text-gray-800 text-sm font-semibold">
                                (Month)
                            </label>
                            <input 
                                type="text" 
                                id="sixteen_month" 
                                className="border-x-0 border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                            />
                        </div>
                        <div className="flex flex-col-reverse items-center justify-center flex-1">
                            <label htmlFor="sixteen_year" className="text-gray-800 text-sm font-semibold">
                                (Year)
                            </label>
                            <input 
                                type="text" 
                                id="sixteen_year" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex flex-row items-end gap-2 p-1">
                            <label htmlFor="seventeen_timeOfMirrage" className="text-gray-800 text-sm font-semibold">
                                17. Time of Marriage
                            </label>
                            <input 
                                type="text" 
                                id="seventeen_timeOfMirrage" 
                                className="flex-1  border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm"
                            />
                            <span className="text-sm">am/pm</span>
                        </div>
                    </div>
                </div>

                {/* Number 18 */}
                <div className="grid grid-cols-5">
                    <span className="uppercase font-semibold text-gray-800 py-1 px-5">
                        18. Certification of The Contracting Parties
                    </span>
                    <div className="flex items-end">
                        <div>THIS IS CERTIFY, That I</div>
                        <input type="text" className="h-7 text-sm border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-28"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarriageCertInput