function BirthCertInputs() {
    return (
        <div className="w-[65rem] m-3 h-full border-b-0 border-s-0 border-4 border-green bg-gray-100">
            <div className="grid grid-cols-4 border-s-4 border-green w-full overflow-auto">
                <div className="col-span-3 border-e-4 border-green w-full overflow-auto">
                    <div className="flex items-center py-2 px-5 justify-between">
                        <div className="flex flex-col text-[12px] text-green">
                            <span>
                                Municipal Form No. 01
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
                                <label htmlFor="province" className="text-green text-sm">
                                    Province
                                </label>
                                <input type="text" id="province" className="flex-1 border-x-0 border-t-0 border-green h-7 focus:outline-none focus:ring-transparent focus:border-green text-sm" />
                            </div>
                            <div className="flex flex-row items-end gap-2">
                                <label htmlFor="cityAndMunicipality" className="text-green text-sm">
                                    City/Municiplity
                                </label>
                                <input type="text" id="cityAndMunicipality" className="flex-1 border-x-0 border-t-0 border-green h-7 focus:outline-none focus:ring-transparent focus:border-green text-sm"/>
                            </div>
                        </div>
                        <div className="col-span-1 border-s-2 border-green px-5 py-2 ">
                            <label htmlFor="registryNumber" className="text-green text-sm">
                                Registry No.
                            </label>
                            <input type="number" id="registryNumber" className="w-full border-0 focus:outline-none focus:ring-transparent"/>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col items-center px-2 py-2">
                    <label htmlFor="remarks" className="text-green text-xl font-semibold uppercase">
                        Remarks/Annotation
                    </label>
                    <textarea 
                        id="remarks" 
                        name="remarks"
                        className="w-full text-sm rounded-sm border-0 min-h-60 max-h-60 focus:outline-none focus:ring-transparent"
                    ></textarea>
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
                                    <label htmlFor="first" className="text-green text-sm">
                                        (First)
                                    </label>
                                    <input type="text" id="first" className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"/>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <label htmlFor="middle" className="text-green text-sm">
                                        (Middle)
                                    </label>
                                    <input type="text" id="middle" className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"/>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <label htmlFor="last" className="text-green text-sm">
                                        (Last)
                                    </label>
                                    <input type="text" id="last" className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"/>
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
                                            <label htmlFor="male" className="text-green text-sm cursor-pointer">Male</label>
                                            <input type="checkbox" id="male" className="cursor-pointer"/>
                                        </div>
                                        <div className="flex flex-row-reverse items-center gap-2">
                                            <label htmlFor="female" className="text-green text-sm cursor-pointer">Female</label>
                                            <input type="checkbox" id="female" className="cursor-pointer"/>
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
                                            <label htmlFor="day" className="text-green text-sm">
                                                (day)
                                            </label>
                                            <input type="number" id="day" className="w-16 h-7 text-sm border-none focus:outline-none focus:ring-transparent"/>
                                        </div>
                                        <div className="flex flex-col text-center gap-1">
                                            <label htmlFor="month" className="text-green text-sm">
                                                (month)
                                            </label>
                                            <input type="number" id="month" className="w-16 h-7 text-sm border-none focus:outline-none focus:ring-transparent"/>
                                        </div>
                                        <div className="flex flex-col text-center gap-1">
                                            <label htmlFor="year" className="text-green text-sm">
                                                (year)
                                            </label>
                                            <input type="number" id="year" className="w-16 h-7 text-sm border-none focus:outline-none focus:ring-transparent"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* number 4 */}
                            <div className="flex flex-row gap-5 p-2 border-b-2 border-green">
                                <div>
                                    <span className="text-green font-semibold uppercase">4. Place of Birth</span>
                                </div>
                                <div className="flex flex-col flex-1 justify-between gap-2">
                                    <label htmlFor="name_of_place" className="text-sm text-green">
                                        (Name of Hospital/Clinic/Institution/House No., Street, Barangay)
                                    </label>
                                    <input type="text" id="name_of_place" className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"/>
                                </div>
                                <div className="flex flex-col flex-1 justify-between">
                                    <label htmlFor="city_Municipality" className="text-green text-sm">
                                        (City/Municipality)
                                    </label>
                                    <input type="text" id="city_Municipality" className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"/>
                                </div>
                                <div className="flex flex-col justify-between flex-1">
                                    <label htmlFor="province" className="text-green text-sm">
                                        (Province)
                                    </label>
                                    <input type="text" id="province" className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"/>
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
                                                <label htmlFor="single" className="text-green text-sm cursor-pointer">1. Single</label>
                                                <input type="checkbox" id="single" className="cursor-pointer"/>
                                            </div>
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <label htmlFor="twin" className="text-green text-sm cursor-pointer">2. Twin</label>
                                                <input type="checkbox" id="twin" className="cursor-pointer"/>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <label htmlFor="triplet" className="text-green text-sm cursor-pointer">3. Triplet Etc.</label>
                                                <input type="checkbox" id="triplet" className="cursor-pointer"/>
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
                                            <label htmlFor="first" className="text-green text-sm cursor-pointer">1. First</label>
                                            <input type="checkbox" id="first" className="cursor-pointer"/>
                                        </div>
                                        <div className="flex flex-row-reverse items-center gap-2">
                                            <label htmlFor="second" className="text-green text-sm cursor-pointer">2. Second</label>
                                            <input type="checkbox" id="second" className="cursor-pointer"/>
                                        </div>
                                        <div className="flex flex-row-reverse items-center gap-2">
                                            <input type='text' className="h-7  text-sm border-x-0 border-t-0 border-green focus:outline-none focus:ring-transparent focus:border-green"/>
                                            <label htmlFor="others" className="text-green text-sm cursor-pointer">3. Others</label>
                                            <input type="checkbox" id="others" className="cursor-pointer"/>
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
                                        <label htmlFor="birthOrder" className="text-green text-sm">
                                            (first, second, third, etc.) 
                                        </label>
                                        <input type="text" id="birthOrder" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent"/>
                                    </div>
                                </div>
                                <div className="col-span-1 p-2">
                                    <div>
                                        <span className="text-green font-semibold">
                                            d. <span className="uppercase">WEIGHT AT BIRTH</span>
                                        </span>
                                    </div>
                                    <div className="flex flex-row-reverse items-end gap-2">
                                        <label htmlFor="grams" className="text-green text-sm">
                                            grams 
                                        </label>
                                        <input type="text" id="grams" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent"/>
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
                                    <label htmlFor="first" className="text-green text-sm">
                                        (First)
                                    </label>
                                    <input type="text" id="first" className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"/>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <label htmlFor="middle" className="text-green text-sm">
                                        (Middle)
                                    </label>
                                    <input type="text" id="middle" className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"/>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <label htmlFor="last" className="text-green text-sm">
                                        (Last)
                                    </label>
                                    <input type="text" id="last" className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"/>
                                </div>
                            </div>
                            {/* number 7 */}
                            <div className="grid grid-cols-3 border-b-2 border-green">
                                <div className="col-span-2 border-e-2 border-green p-2">
                                    <div className="flex flex-col items-start gap-2">
                                        <label htmlFor="citizenship" className="text-green font-semibold uppercase">
                                            7. CITIZENSHIP
                                        </label>
                                        <input type="text" id="citizenship" className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"/>
                                    </div>
                                </div>
                                <div className="col-span-1 p-2">
                                    <div className="flex flex-col items-start gap-2">
                                        <label htmlFor="religion" className="text-green font-semibold uppercase">
                                            8. RELIGION
                                        </label>
                                        <input type="text" id="religion" className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"/>
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
                                        <label htmlFor="total_number" className="text-sm text-green">
                                            Total number of children born alive:
                                        </label>
                                        <input type="text" id="total_number" className="w-full border-x-0 border-t-0 border-green focus:outline-none focus:ring-transparent focus:border-green h-7 text-sm mt-7"/>
                                    </div>
                                </div>
                                <div className="col-span-1 border-x-2 p-2 border-green">
                                    <div>
                                        <span className="text-green font-semibold">
                                            b.
                                        </span>
                                    </div>
                                    <div>
                                        <label htmlFor="number9_b" className="text-sm text-green">
                                            No. of Children still living including this birth:
                                        </label>
                                        <input type="text" id="number9_b" className="w-full border-x-0 border-t-0 border-green focus:outline-none focus:ring-transparent focus:border-green h-7 text-sm"/>
                                    </div>
                                </div>
                                <div className="col-span-1 p-2">
                                    <div>
                                        <span className="text-green font-semibold">
                                            c.
                                        </span>
                                    </div>
                                    <div>
                                        <label htmlFor="number9_b" className="text-sm text-green">
                                            No. of children born alive but are now dead:
                                        </label>
                                        <input type="text" id="number9_b" className="w-full border-x-0 border-t-0 border-green focus:outline-none focus:ring-transparent focus:border-green h-7 text-sm"/>
                                    </div>
                                </div>
                            </div>
                            {/* number 10 */}
                            <div className="grid grid-cols-3 border-b-2 border-green">
                                <div className="col-span-2 border-e-2 border-green p-2">
                                    <div className="flex flex-col items-start gap-2">
                                        <label htmlFor="citizenship" className="text-green font-semibold uppercase">
                                            10. OCCUPATION
                                        </label>
                                        <input type="text" id="citizenship" className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"/>
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
                                        <label htmlFor="years" className="text-green text-sm">
                                            years 
                                        </label>
                                        <input type="text" id="years" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-14"/>
                                    </div>
                                </div>
                            </div>
                            {/* number 12 */}
                            <div className="flex flex-row gap-5 p-2">
                                <div>
                                    <span className="text-green font-semibold uppercase">12. Residence</span>
                                </div>
                                <div className="flex flex-col flex-1 justify-between gap-2">
                                    <label htmlFor="name_of_place_2" className="text-sm text-green">
                                        (House No., Street, Barangay)
                                    </label>
                                    <input type="text" id="name_of_place_2" className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"/>
                                </div>
                                <div className="flex flex-col flex-1 justify-between">
                                    <label htmlFor="city_Municipality_2" className="text-green text-sm">
                                        (City/Municipality)
                                    </label>
                                    <input type="text" id="city_Municipality_2" className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"/>
                                </div>
                                <div className="flex flex-col justify-between flex-1">
                                    <label htmlFor="province_2" className="text-green text-sm">
                                        (Province)
                                    </label>
                                    <input type="text" id="province_2" className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"/>
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
                                    <label htmlFor="first" className="text-green text-sm">
                                        (First)
                                    </label>
                                    <input type="text" id="first" className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"/>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <label htmlFor="middle" className="text-green text-sm">
                                        (Middle)
                                    </label>
                                    <input type="text" id="middle" className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"/>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <label htmlFor="last" className="text-green text-sm">
                                        (Last)
                                    </label>
                                    <input type="text" id="last" className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"/>
                                </div>
                            </div>
                            {/* number 14 */}
                            <div className="grid grid-cols-3 border-b-2 border-green">
                                <div className="col-span-2 border-e-2 border-green p-2">
                                    <div className="flex flex-col items-start gap-2">
                                        <label htmlFor="citizenship" className="text-green font-semibold uppercase">
                                            14. CITIZENSHIP
                                        </label>
                                        <input type="text" id="citizenship" className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"/>
                                    </div>
                                </div>
                                <div className="col-span-1 p-2">
                                    <div className="flex flex-col items-start gap-2">
                                        <label htmlFor="religion" className="text-green font-semibold uppercase">
                                            15. RELIGION
                                        </label>
                                        <input type="text" id="religion" className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"/>
                                    </div>
                                </div>
                            </div>
                            {/* number 16 */}
                            <div className="grid grid-cols-3">
                                <div className="col-span-2 border-e-2 border-green p-2">
                                    <div className="flex flex-col items-start gap-2">
                                        <label htmlFor="citizenship" className="text-green font-semibold uppercase">
                                            16. OCCUPATION
                                        </label>
                                        <input type="text" id="citizenship" className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"/>
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
                                        <label htmlFor="years" className="text-green text-sm">
                                            years 
                                        </label>
                                        <input type="text" id="years" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-14"/>
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
                            <input type="text" id="last" className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"/>
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
                                <label htmlFor="physician" className="text-sm text-green cursor-pointer">1. Physician</label>
                                <input type="checkbox" id="physician" className="cursor-pointer"/>
                            </div>
                            <div className="flex flex-row-reverse items-center gap-2">
                                <label htmlFor="nurse" className="text-sm text-green cursor-pointer">2. Nurse</label>
                                <input type="checkbox" id="nurse" className="cursor-pointer"/>
                            </div>
                            <div className="flex flex-row-reverse items-center gap-2">
                                <label htmlFor="midwife" className="text-sm text-green cursor-pointer">3. Midwife</label>
                                <input type="checkbox" id="midwife" className="cursor-pointer"/>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[3.6rem]">
                            <div className="flex flex-row-reverse items-center gap-2">
                                <label htmlFor="traditionMidWife" className="text-sm text-green cursor-pointer">4. Hilot (traditional Midwife)</label>
                                <input type="checkbox" id="traditionMidWife" className="cursor-pointer"/>
                            </div>
                            <div className="flex flex-row-reverse items-center gap-2">
                                <label htmlFor="nurse" className="text-sm text-green cursor-pointer">5. Others (Specify)</label>
                                <input type="checkbox" id="nurse" className="cursor-pointer"/>
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
                            <input type="text" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-28"/>
                            <span className="text-sm text-green">o’clock am/pm on the date stated above.</span>
                        </div>
                        <div className="grid grid-cols-2 mt-2 gap-10">
                            <div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="signature" className="text-sm font-medium text-green">Signature</label>
                                    <div className="relative w-full">
                                        <input 
                                            type="file" 
                                            id="signature"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                            Choose File
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                    <input type="text" id="nameInPrint" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="titleOrPosition" className="text-sm text-green w-40">Title or Position</label>
                                    <input type="text" id="titleOrPosition" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
                                </div>
                            </div>
                            <div className="pe-2">
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="address" className="text-sm text-green">Address</label>
                                    <input type="text" id="address" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="date" className="text-sm text-green">Date</label>
                                    <input type="text" id="date" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
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
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="signature_2" className="text-sm font-medium text-green">Signature</label>
                                    <div className="relative w-full">
                                        <input 
                                            type="file" 
                                            id="signature_2"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                            Choose File
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                    <input type="text" id="nameInPrint" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="titleOrPosition" className="text-sm text-green w-80">Relationship to the child</label>
                                    <input type="text" id="titleOrPosition" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
                                </div>
                            </div>
                            <div className="pe-2">
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="address" className="text-sm text-green">Address</label>
                                    <input type="text" id="address" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="date" className="text-sm text-green">Date</label>
                                    <input type="text" id="date" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
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
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="signature_2" className="text-sm font-medium text-green">Signature</label>
                                    <div className="relative w-full">
                                        <input 
                                            type="file" 
                                            id="signature_2"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                            Choose File
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                    <input type="text" id="nameInPrint" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="titleOrPosition" className="text-sm text-green w-40">Title of Position</label>
                                    <input type="text" id="titleOrPosition" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="date" className="text-sm text-green">Date</label>
                                    <input type="text" id="date" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
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
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="signature_2" className="text-sm font-medium text-green">Signature</label>
                                    <div className="relative w-full">
                                        <input 
                                            type="file" 
                                            id="signature_2"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                            Choose File
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                    <input type="text" id="nameInPrint" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="titleOrPosition" className="text-sm text-green w-40">Title of Position</label>
                                    <input type="text" id="titleOrPosition" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="date" className="text-sm text-green">Date</label>
                                    <input type="text" id="date" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"/>
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
                        <input type="text" className="border-2 border-gray-500 h-9 focus:border-gray-500 focus:outline-none focus:ring-transparent"/>
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
                        <input type="text" className="h-7 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" maxLength={7}/>
                    </div>
                    <div className="px-5 mt-2 flex flex-col">
                        <span className="text-green text-sm">48</span>
                        <input type="text" className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" maxLength={7}/>
                    </div>
                    <div className="px-5 mt-2 flex gap-2">
                        <div className="flex flex-col">
                            <span className="text-green text-sm">49</span>
                            <input type="text" className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" maxLength={1}/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-green text-sm">50</span>
                            <input type="text" className="h-7 w-32 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" maxLength={6}/>
                        </div>
                    </div>
                    <div className="px-5 mt-2">
                        <div className="flex flex-col">
                            <span className="text-green text-sm">56</span>
                            <input type="text" className="h-7 w-28 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" maxLength={5}/>
                        </div>
                    </div>
                    <div className="flex flex-col px-5 mt-2">
                        <span className="text-green text-sm">61</span>
                        <input type="text" className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" maxLength={1}/>
                    </div>
                    <div className="px-5 mt-2 flex flex-row gap-2">
                        <div className="flex flex-col">
                            <span className="text-green text-sm">62</span>
                            <input type="text" className="h-7 w-20 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" maxLength={2}/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-green text-sm">64</span>
                            <input type="text" className="h-7 w-28 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" maxLength={4}/>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default BirthCertInputs