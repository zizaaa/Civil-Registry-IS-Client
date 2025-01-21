import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { getSingleMarriageCert } from '../../../services/getSingleMarriageCert';
import { useNavigate, useParams } from 'react-router-dom';
import { MarriageCertTypes } from '../../../types/marriageCertTypes';
import { errorToast, LoaderDefault, Loading, serverURL, successToast } from '../../../hooks/imports';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

function EditMarriageCert() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [marriageCertCredentials, setMarriageCertCredentials] = useState<MarriageCertTypes>({
        province:"",
        cityOrMunicipality:"",
        RegistryNumber:"",
        one_first:"",
        one_middle:"",
        one_last:"",
        one_first_wife:"",
        one_middle_wife:"",
        one_last_wife:"",
        two_day_husband:"",
        two_month_husband:"",
        two_year_husband:"",
        two_age_husband:"",
        two_day_wife:"",
        two_month_wife:"",
        two_year_wife:"",
        two_age_wife:"",
        three_CityOrMunicipality_husband:"",
        three_Province_husband:"",
        three_Country_husband:"",
        three_CityOrMunicipality_wife:"",
        three_Province_wife:"",
        three_Country_wife:"",
        four_sex_husband:"",
        four_citizenship_husband:"",
        four_sex_wife:"",
        four_citizenship_wife:"",
        five_Residence_husband:"",
        five_Residence_wife:"",
        six_Religion_husband:"",
        six_Religion_wife:"",
        seven_CivilStatus_husband:"",
        seven_CivilStatus_wife:"",
        eight_first_husband:"",
        eight_middle_husband:"",
        eight_last_husband:"",
        eight_first_wife:"",
        eight_middle_wife:"",
        eight_last_wife:"",
        nine_Citizenship_husband:"",
        nine_Citizenship_wife:"",
        ten_first_husband:"",
        ten_middle_husband:"",
        ten_last_husband:"",
        ten_first_wife:"",
        ten_middle_wife:"",
        ten_last_wife:"",
        eleven_Citizenship_husband:"",
        eleven_Citizenship_wife:"",
        twelve_first_husband:"",
        twelve_middle_husband:"",
        twelve_last_husband:"",
        twelve_first_wife:"",
        twelve_middle_wife:"",
        twelve_last_wife:"",
        thirteen_relationship_husband:"",
        thirteen_relationship_wife:"",
        fourteen_Residence_husband:"",
        fourteen_Residence_wife:"",
        fifteen_Office:"",
        fifteen_CityOrMunicipality:"",
        fifteen_Province:"",
        sixteen_Day:"",
        sixteen_Month:"",
        sixteen_Year:"",
        seventeen_Time:"",
        eighteen_nameOne:"",
        eighteen_nameTwo:"",
        eighteen_decision:"",
        eighteen_day:"",
        eighteen_dayOf:"",
        nineteen_choices:"",
        nineteen_choose_A_first:"",
        nineteen_choose_A_second:"",
        nineteen_choose_A_third:"",
        nineteen_choose_B:"",
        nineteen_PrintedName:"",
        nineteen_Position:"",
        nineteen_Religion:"",
        twenty_nameOne:"",
        twenty_nameTwo:"",
        twenty_nameThree:"",
        twenty_nameFour:"",
        twentyOne_NameInPrint:"",
        twentyOne_TitleOfPosition:"",
        twentyOne_Date:"",
        twentyTwo_NameInPrint:"",
        twentyTwo_TitleAndPosition:"",
        twentyTwo_Date:"",
    });

    const { data, isLoading } = getSingleMarriageCert(id as string);

    const handleDecision = (e: React.ChangeEvent<HTMLInputElement>)=>{
        console.log('click')
        setMarriageCertCredentials(prev => ({...prev, eighteen_decision:e.target.value}));
    }

    const handleNineTeenDecision = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setMarriageCertCredentials(prev => ({...prev, nineteen_choices:e.target.value}));
    }

    const mutation = useMutation({
        mutationFn: async(formData:MarriageCertTypes)=>{
            const { data } = await axios.post(`${serverURL}/api/cris/marriage-certificate/update/${id}`,{formData},{ withCredentials:true });
            
            return data;
        },
        onSuccess(data) {
            successToast(`${data.message}`);
            navigate('/marriage-certificate');
        },
        onError(error){
            errorToast(`${error.message}`)
            console.error(error);
        }
    })

    const handleUpdate = () =>{
        mutation.mutate(marriageCertCredentials);
    }
    
    useEffect(()=>{
        if (!isLoading && data) {
            for (const [dataKey, dataValue] of Object.entries(data)) {
                setMarriageCertCredentials((prev) => ({
                    ...prev,
                    [dataKey]: dataValue ?? '', // Use computed property name for dynamic keys
                }));
            }
        }
    },[data, isLoading])

    if (isLoading && id) {
        return <Loading />;
    } else if (!id) {
        navigate('/birth-certificate');
    }

    return (
        <div>
            <Toaster/>
            <div className='w-[65rem] m-3 h-full border-2 border-gray-700 bg-gray-100'>
            <div className="w-full overflow-auto border-b-2 border-gray-800">
                    <div className="w-full overflow-auto">
                        <div className="flex items-center py-2 px-5 justify-between">
                            <div className="flex flex-col text-[12px] text-gray-800">
                                <span>
                                    Municipal Form No. 0{!isLoading && (data?.id)}
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
                                        value={marriageCertCredentials.province}
                                        onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, province:e.target.value.toUpperCase()}))}}
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
                                        value={marriageCertCredentials.cityOrMunicipality}
                                        onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, cityOrMunicipality:e.target.value.toUpperCase()}))}}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 px-5 py-2 ">
                                <label htmlFor="registryNumber" className="text-gray-800 text-sm">
                                    Registry No.
                                </label>
                                <input 
                                    type="text" 
                                    id="registryNumber" 
                                    className="w-full border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    value={marriageCertCredentials.RegistryNumber}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, RegistryNumber:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.one_first}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, one_first:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.one_middle}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, one_middle:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.one_last}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, one_last:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.one_first_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, one_first_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.one_middle_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, one_middle_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.one_last_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, one_last_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.two_day_husband}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, two_day_husband:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.two_month_husband}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, two_month_husband:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.two_year_husband}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, two_year_husband:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.two_age_husband}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, two_age_husband:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.three_CityOrMunicipality_husband}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, three_CityOrMunicipality_husband:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.three_Province_husband}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, three_Province_husband:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.three_Country_husband}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, three_Country_husband:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.two_day_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, two_day_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.two_month_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, two_month_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.two_year_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, two_year_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.two_age_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, two_age_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.three_CityOrMunicipality_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, three_CityOrMunicipality_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.three_Province_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, three_Province_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.three_Country_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, three_Country_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.four_sex_husband}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, four_sex_husband:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.four_citizenship_husband}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, four_citizenship_husband:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.four_sex_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, four_sex_wife:e.target.value.toUpperCase()}))}}
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
                                    value={marriageCertCredentials.four_citizenship_wife}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, four_citizenship_wife:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.five_Residence_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, five_Residence_husband:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="five_HouseNo_wife" className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </label>
                            <input 
                                type="text" 
                                id="five_HouseNo_wife" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                value={marriageCertCredentials.five_Residence_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, five_Residence_wife:e.target.value.toUpperCase()}))}}
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
                            value={marriageCertCredentials.six_Religion_husband}
                            onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, six_Religion_husband:e.target.value.toUpperCase()}))}}
                        />
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <input 
                            type="text" 
                            id="six_religion_wife" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full mt-2"
                            value={marriageCertCredentials.six_Religion_wife}
                            onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, six_Religion_wife:e.target.value.toUpperCase()}))}}
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
                            value={marriageCertCredentials.seven_CivilStatus_husband}
                            onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, seven_CivilStatus_husband:e.target.value.toUpperCase()}))}}
                        />
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <input 
                            type="text" 
                            id="seven_wife" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                            value={marriageCertCredentials.seven_CivilStatus_wife}
                            onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, seven_CivilStatus_wife:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.eight_first_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eight_first_husband:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.eight_middle_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eight_middle_husband:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.eight_last_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eight_last_husband:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-row p-1 pe-5">
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="eight_first_wife" className="text-gray-800 text-sm font-semibold">
                                (First)
                            </label>
                            <input 
                                type="text" 
                                id="eight_first_wife" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                value={marriageCertCredentials.eight_first_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eight_first_wife:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.eight_middle_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eight_middle_wife:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.eight_last_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eight_last_wife:e.target.value.toUpperCase()}))}}
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
                            value={marriageCertCredentials.nine_Citizenship_husband}
                            onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, nine_Citizenship_husband:e.target.value.toUpperCase()}))}}
                        />
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <input 
                            type="text" 
                            id="nine_wife" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                            value={marriageCertCredentials.nine_Citizenship_wife}
                            onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, nine_Citizenship_wife:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.ten_first_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, ten_first_husband:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.ten_middle_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, ten_middle_husband:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.ten_last_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, ten_last_husband:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-row p-1 pe-5">
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="ten_first_wife" className="text-gray-800 text-sm font-semibold">
                                (First)
                            </label>
                            <input 
                                type="text" 
                                id="ten_first_wife" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                value={marriageCertCredentials.ten_first_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, ten_first_wife:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.ten_middle_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, ten_middle_wife:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.ten_last_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, ten_last_wife:e.target.value.toUpperCase()}))}}
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
                            value={marriageCertCredentials.eleven_Citizenship_husband}
                            onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eleven_Citizenship_husband:e.target.value.toUpperCase()}))}}
                        />
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <input 
                            type="text" 
                            id="eleven_wife" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                            value={marriageCertCredentials.eleven_Citizenship_wife}
                            onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eleven_Citizenship_wife:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.twelve_first_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twelve_first_husband:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.twelve_middle_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twelve_middle_husband:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.twelve_last_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twelve_last_husband:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.twelve_first_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twelve_first_wife:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.twelve_middle_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twelve_middle_wife:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center pe-5">
                            <label htmlFor="twelve_last_wife" className="text-gray-800 text-sm font-semibold">
                                (Last)
                            </label>
                            <input 
                                type="text" 
                                id="twelve_last_wife" 
                                className=" border-gray-700 h-5 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                value={marriageCertCredentials.twelve_last_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twelve_last_wife:e.target.value.toUpperCase()}))}}
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
                            value={marriageCertCredentials.thirteen_relationship_husband}
                            onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, thirteen_relationship_husband:e.target.value.toUpperCase()}))}}
                        />
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <input 
                            type="text" 
                            id="thirteen_wife" 
                            className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                            value={marriageCertCredentials.thirteen_relationship_wife}
                            onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, thirteen_relationship_wife:e.target.value.toUpperCase()}))}}
                        />
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
                            <label htmlFor="fourteen_HouseNo_husband" className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </label>
                            <input 
                                type="text" 
                                id="fourteen_HouseNo_husband" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                value={marriageCertCredentials.fourteen_Residence_husband}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, fourteen_Residence_husband:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 p-1 pe-5">
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="fourteen_HouseNo_wife" className="text-gray-800 text-sm font-semibold">
                                (House No, Street, City/Municipality, Province, Country)
                            </label>
                            <input 
                                type="text" 
                                id="fourteen_HouseNo_wife" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                value={marriageCertCredentials.fourteen_Residence_wife}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, fourteen_Residence_wife:e.target.value.toUpperCase()}))}}
                            />
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
                            <label htmlFor="fifteen_officeOf" className="text-gray-800 text-sm font-semibold">
                                (Office of the House/Church/Mosque)
                            </label>
                            <input 
                                type="text" 
                                id="fifteen_officeOf" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full"
                                value={marriageCertCredentials.fifteen_Office}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, fifteen_Office:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.fifteen_CityOrMunicipality}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, fifteen_CityOrMunicipality:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.fifteen_Province}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, fifteen_Province:e.target.value.toUpperCase()}))}}
                            />
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
                            <label htmlFor="sixteen_day" className="text-gray-800 text-sm font-semibold">
                                (Day)
                            </label>
                            <input 
                                type="text" 
                                id="sixteen_day" 
                                className=" border-gray-700 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full h-7"
                                value={marriageCertCredentials.sixteen_Day}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, sixteen_Day:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.sixteen_Month}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, sixteen_Month:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.sixteen_Year}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, sixteen_Year:e.target.value.toUpperCase()}))}}
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
                                value={marriageCertCredentials.seventeen_Time}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, seventeen_Time:e.target.value.toUpperCase()}))}}
                            />
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
                            <input 
                                type="text" 
                                className="h-7 text-sm border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent flex-1"
                                value={marriageCertCredentials.eighteen_nameOne}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eighteen_nameOne:e.target.value.toUpperCase()}))}}
                            />
                            <span>and, I</span>
                            <input 
                                type="text" 
                                className="h-7 text-sm border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent flex-1"
                                value={marriageCertCredentials.eighteen_nameTwo}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eighteen_nameTwo:e.target.value.toUpperCase()}))}}
                            />
                            <span>, both of legal</span>
                        </div>
                        <div>
                            <span className="me-3">age, of our own free will and accord, and in the presence of the person solemnizing this marriage and of the witness named below, take each other as husband and wife and certifying further that we</span>
                            <input 
                                type="radio" 
                                id="entered" 
                                name="eighteen" 
                                value="agree" 
                                className="cursor-pointer" 
                                onChange={(e)=>{handleDecision(e)}}
                                checked={marriageCertCredentials.eighteen_decision === 'agree'}
                            />
                            <span className="ms-1 me-3">have entered, a copy of which is hereto attached</span>
                            <input 
                                type="radio" 
                                id="entered" 
                                name="eighteen" 
                                value="disagree" 
                                className="cursor-pointer" 
                                onChange={(e)=>{handleDecision(e)}}
                                checked={marriageCertCredentials.eighteen_decision === 'disagree'}
                            />
                            <span className="ms-1">have not entered into a marriage settlement.</span>
                        </div>
                        <div className="pe-5 mt-2">
                            <span className="font-semibold uppercase ps-28">IN WITNESS WHEREOF, </span>
                            <span>we have signed/maked with our fingerprint this certificate in quadruplicate this</span>
                            <input 
                                type="text" 
                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-20"
                                value={marriageCertCredentials.eighteen_day}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eighteen_day:e.target.value.toUpperCase()}))}}
                            />
                            <span>, day of</span>
                            <input 
                                type="text" 
                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-20"
                                value={marriageCertCredentials.eighteen_dayOf}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, eighteen_dayOf:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                        <div className="grid grid-cols-2 mt-5 px-5 gap-5">
                            <div className="col-span-1 flex flex-col items-center">
                                <div className="relative w-full">
                                    <div className="text-gray-700 mt-4 text-xs text-center font-medium py-1 px-2 border-b-[1px] border-gray-800 cursor-pointer hover:border-gray-600">
                                        
                                    </div>
                                </div>
                                <label htmlFor="eighteen_signature_husband" className="text-sm font-medium text-gray-800">
                                        (Signature of Husband)
                                </label>
                            </div>
                            <div className="col-span-1 flex flex-col items-center">
                                <div className="relative w-full">
                                    <div className="text-gray-700 mt-4 text-xs text-center font-medium py-1 px-2 border-b-[1px] border-gray-800 cursor-pointer hover:border-gray-600">
                                        
                                    </div>
                                </div>
                                <label htmlFor="eighteen_signature_husband" className="text-sm font-medium text-gray-800">
                                    (Signature of Wife)
                                </label>
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
                                type="radio" 
                                id="letter_A" 
                                name="nineTeen" 
                                value="A" 
                                className="cursor-pointer me-2" 
                                onChange={(e)=>{handleNineTeenDecision(e)}}
                                checked={marriageCertCredentials.nineteen_choices === 'A'}
                            />
                            <span>
                                a. Marriage License No.
                            </span>
                            <input 
                                type="text" 
                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-36"
                                value={marriageCertCredentials.nineteen_choose_A_first}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, nineteen_choose_A_first:e.target.value.toUpperCase()}))}}
                            />
                            <span>
                                issued on
                            </span>
                            <input 
                                type="text" 
                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-36"
                                value={marriageCertCredentials.nineteen_choose_A_second}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, nineteen_choose_A_second:e.target.value.toUpperCase()}))}}
                            />
                            <span>
                                . at
                            </span>
                            <input 
                                type="text" 
                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-40"
                                value={marriageCertCredentials.nineteen_choose_A_third}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, nineteen_choose_A_third:e.target.value.toUpperCase()}))}}
                            />
                            <span>
                                in favor of said parties, was exhibited to me.
                            </span>
                        </div>
                        <div className="flex flex-row items-end gap-1 text-sm">
                            <input 
                                type="radio" 
                                id="letter_B" 
                                name="nineTeen" 
                                value="B" 
                                className="cursor-pointer me-2" 
                                onChange={(e)=>{handleNineTeenDecision(e)}}
                                checked={marriageCertCredentials.nineteen_choices === 'B'}
                            />
                            <span>
                                b. no marriage license was necessary, the marriage being solemnized under Art
                            </span>
                            <input 
                                type="text" className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-36"
                                value={marriageCertCredentials.nineteen_choose_B}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, nineteen_choose_B:e.target.value.toUpperCase()}))}}
                            />
                            <span>
                                of Executive Order No. 209.
                            </span>
                        </div>
                        <div className="flex flex-row items-end gap-1 text-sm mt-1">
                            <input 
                                type="radio" 
                                id="letter_C" 
                                name="nineTeen" 
                                value="C" 
                                className="cursor-pointer me-2" 
                                onChange={(e)=>{handleNineTeenDecision(e)}}
                                checked={marriageCertCredentials.nineteen_choices === 'C'}
                            />
                            <span>
                                c. the marriage was solemnized in accordance with the provisions of the Presidential Decree No. 1083.
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-5 mt-5 pe-5 ps-14">
                            <div className="col-span-1">
                                <div className="mt-5 flex flex-col-reverse items-center justify-center">
                                    <label htmlFor="nineteen_nameOverSignature" className="text-[12px] text-gray-800 font-semibold">
                                        (Signature Over Printed Name of Solemnized Officer)
                                    </label>
                                    <input 
                                        type="text" 
                                        id="nineteen_nameOverSignature" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        value={marriageCertCredentials.nineteen_PrintedName}
                                        onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, nineteen_PrintedName:e.target.value.toUpperCase()}))}}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col-reverse items-center justify-center mt-5">
                                    <label htmlFor="ninteen_positionOrDesignation" className="text-[12px] text-gray-800 font-semibold">
                                        (Position/Designation)
                                    </label>
                                    <input 
                                        type="text" 
                                        id="ninteen_positionOrDesignation" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        value={marriageCertCredentials.nineteen_Position}
                                        onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, nineteen_Position:e.target.value.toUpperCase()}))}}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col-reverse items-center justify-center mt-5 text-center">
                                    <label htmlFor="nineteen_religion" className="text-[12px] text-gray-800 font-semibold">
                                        (Religion/Religious, Registry No. and Expiration Date, if applicable)
                                    </label>
                                    <input 
                                        type="text" 
                                        id="nineteen_religion" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        value={marriageCertCredentials.nineteen_Religion}
                                        onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, nineteen_Religion:e.target.value.toUpperCase()}))}}
                                    />
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
                            <input 
                                type="text" 
                                id="twenty_A_first_blank" 
                                className="h-7 mt-5 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                value={marriageCertCredentials.twenty_nameOne}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twenty_nameOne:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                        <div className="col-span-1">
                            <input 
                                type="text" 
                                id="twenty_A_second_blank" 
                                className="h-7 mt-5 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                value={marriageCertCredentials.twenty_nameTwo}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twenty_nameTwo:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                        <div className="col-span-1">
                            <input 
                                type="text" 
                                id="twenty_A_thirdblank" 
                                className="h-7 mt-5 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                value={marriageCertCredentials.twenty_nameThree}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twenty_nameThree:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                        <div className="col-span-1">
                            <input 
                                type="text" 
                                id="twenty_A_four_blank" 
                                className="h-7 mt-5 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                value={marriageCertCredentials.twenty_nameFour}
                                onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twenty_nameFour:e.target.value.toUpperCase()}))}}
                            />
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
                                <label htmlFor="twentyOne_signature" className="text-sm font-medium text-gray-800">Signature</label>
                                <div className="relative w-full">
                                    <input 
                                        type="text" 
                                        id="TwentyOnenameInPrint" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row items-end">
                                <label htmlFor="TwentyOnenameInPrint" className="text-sm text-gray-800 w-36">Name in Print</label>
                                <input 
                                    type="text" 
                                    id="TwentyOnenameInPrint" 
                                    className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                    value={marriageCertCredentials.twentyOne_NameInPrint}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twentyOne_NameInPrint:e.target.value.toUpperCase()}))}}
                                />
                            </div>
                            <div className="flex flex-row items-end">
                                <label htmlFor="twentyOnetitleOrPosition" className="text-sm text-gray-800 w-40">Title of Position</label>
                                <input 
                                    type="text" 
                                    id="twentyOnetitleOrPosition" 
                                    className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                    value={marriageCertCredentials.twentyOne_TitleOfPosition}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twentyOne_TitleOfPosition:e.target.value.toUpperCase()}))}}
                                />
                            </div>
                            <div className="flex flex-row items-end gap-2">
                                <label htmlFor="twentyOnedate" className="text-sm text-gray-800">Date</label>
                                <input 
                                    type="text" 
                                    id="twentyOnedate" 
                                    className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                    value={marriageCertCredentials.twentyOne_Date}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twentyOne_Date:e.target.value.toUpperCase()}))}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <span className="uppercase font-semibold text-gray-800">
                            22. Registered By the Civil Registrar:
                        </span>
                        <div className="pe-4">
                            <div className="flex flex-row items-end gap-2 relative">
                                <label htmlFor="twentyTwo_signature" className="text-sm font-medium text-gray-800">Signature</label>
                                <div className="relative w-full">
                                    <input 
                                        type="text" 
                                        id="TwentyOnenameInPrint" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row items-end">
                                <label htmlFor="TwentyTwonameInPrint" className="text-sm text-gray-800 w-36">Name in Print</label>
                                <input 
                                    type="text" 
                                    id="TwentyTwonameInPrint" 
                                    className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                    value={marriageCertCredentials.twentyTwo_NameInPrint}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twentyTwo_NameInPrint:e.target.value.toUpperCase()}))}}
                                />
                            </div>
                            <div className="flex flex-row items-end">
                                <label htmlFor="twentyTwotitleOrPosition" className="text-sm text-gray-800 w-40">Title of Position</label>
                                <input 
                                    type="text" 
                                    id="twentyTwotitleOrPosition" 
                                    className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                    value={marriageCertCredentials.twentyTwo_TitleAndPosition}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twentyTwo_TitleAndPosition:e.target.value.toUpperCase()}))}}
                                />
                            </div>
                            <div className="flex flex-row items-end gap-2">
                                <label htmlFor="twentyTwodate" className="text-sm text-gray-800">Date</label>
                                <input 
                                    type="text" 
                                    id="twentyTwodate" 
                                    className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                    value={marriageCertCredentials.twentyTwo_Date}
                                    onChange={(e)=>{setMarriageCertCredentials(prev => ({...prev, twentyTwo_Date:e.target.value.toUpperCase()}))}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[65rem] flex items-end justify-end py-5">
                <button 
                    className="drop-shadow-md rounded-sm bg-darkCyan w-28 h-10 text-white disabled:cursor-not-allowed" 
                    onClick={handleUpdate}
                    // disabled={isFormEmpty(marriageCertCredentials)}
                >
                    {mutation.isPending ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <LoaderDefault
                            />
                        </div>
                    ) : (
                        'Update'
                    )}
                </button>
            </div>
        </div>
    )
}

export default EditMarriageCert