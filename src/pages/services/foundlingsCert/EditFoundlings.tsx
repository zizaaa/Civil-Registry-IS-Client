import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleFoundlingsCert } from '../../../services/getSingleFoundlingsCert';
import { FoundlingsTypes } from '../../../types/foundLingTypes';
import { errorToast, LoaderDefault, Loading, serverURL, successToast } from '../../../hooks/imports';
import axios, { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useActivityMutation } from '../../../services/sendActivity';

function EditFoundlings() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [foundlingCredentials, setFounlingCredentials] = useState<FoundlingsTypes>({
        province:"",
        cityOrMunicipality:"",
        registryNumber:"",
        one_name:"",
        two_sex:"",
        three_age:"",
        four_dateAndTime:"",
        five_place:"",
        six_eyesColor:"",
        seven_hairColor:"",
        eight_bodyFeature:"",
        nine_condition:"",
        ten_name:"",
        ten_address:"",
        ten_telephone:"",
        ten_occupation:"",
        eleven_name:"",
        eleven_address:"",
        eleven_telephone:"",
        eleven_occupation:"",
        twelve_address:"",
        twelve_dateIssued:"",
        twelve_placeIssued:"",
        twelve_firstLine:"",
        twelve_secondLine:"",
        twelve_thirdLine:"",
        twelve_fourthLine:"",
        twelve_printedName:"",
        thirteen_certification:"",
        thirteen_printedName:"",
    });

    const { data, isLoading } = getSingleFoundlingsCert(id as string);
    const activityMutation = useActivityMutation();

    const mutation = useMutation({
        mutationFn: async (formData:FoundlingsTypes) =>{
            const { data } = await axios.post(`${serverURL}/api/cris/foundling-certificate/update/${id}`, {formData}, {  withCredentials:true })
            
            return data;
        },
        onError:(error)=>{
            if(isAxiosError(error)){
                return errorToast(error.response?.data.error)
            }
            return errorToast("Something went wrong during registering foundlings certificate.");
        },
        onSuccess: (data)=>{
            successToast(`${data.message}`);
            activityMutation.mutate(`Foundling certificate updated with REGISTRY Number: ${foundlingCredentials.registryNumber}`);
            navigate('/birth-certificate');
        }
    });

    const handleSubmit = () =>{
        mutation.mutate(foundlingCredentials)
    }

    useEffect(()=>{
        if (!isLoading && data) {
            for (const [dataKey, dataValue] of Object.entries(data)) {
                setFounlingCredentials((prev) => ({
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
                <div className="border-b-2 border-gray-700 w-full overflow-auto">
                    <div className="flex items-center py-2 px-5 justify-between">
                        <div className="flex flex-col text-[12px] text-gray-800">
                            <span>
                                Municipal Form No. 0{!isLoading && (data?.id)}
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
                                <label htmlFor="province" className="text-gray-800 text-sm">
                                    Province
                                </label>
                                <input 
                                    type="text"
                                    id="province" 
                                    className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    value={foundlingCredentials.province}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, province:e.target.value.toLocaleUpperCase()}))}}
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
                                    value={foundlingCredentials.cityOrMunicipality}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, cityOrMunicipality:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                        </div>
                        <div className="col-span-1 border-s-2 border-gray-700 px-5 py-2 ">
                            <label htmlFor="registryNumber" className="text-gray-800 text-sm">
                                Registry No.
                            </label>
                            <input 
                                type="text" 
                                id="registryNumber" 
                                className="w-full border-0 focus:outline-none focus:ring-transparent" 
                                value={foundlingCredentials.registryNumber}
                                onChange={(e)=>{setFounlingCredentials(prev => ({...prev, registryNumber:e.target.value.toLocaleUpperCase()}))}}
                            />
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
                                <input 
                                    type="text"
                                    id="one_name_child" 
                                    className="flex-1 border-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    value={foundlingCredentials.one_name}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, one_name:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                            <div className="flex flex-col px-2 w-60">
                                <label htmlFor="one_sex_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    2. Sex
                                </label>
                                <input 
                                    type="text"
                                    id="one_sex_child" 
                                    className="flex-1 border-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    value={foundlingCredentials.two_sex}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, two_sex:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                        </div>
                        
                            {/* number 3 and  4 */}
                        <div className="flex flex-row border-b-2 border-gray-800">
                            <div className="flex flex-col px-2 border-e-2 border-gray-800 flex-1">
                                <label htmlFor="one_age_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    3. Age when found
                                </label>
                                <input 
                                    type="text"
                                    id="one_age_child" 
                                    className="flex-1 border-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    value={foundlingCredentials.three_age}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, three_age:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                            <div className="flex flex-col px-2 w-96">
                                <label htmlFor="one_dateAndTime_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    4. Date and time when found
                                </label>
                                <input 
                                    type="text"
                                    id="one_dateAndTime_child" 
                                    className="flex-1 border-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    value={foundlingCredentials.four_dateAndTime}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, four_dateAndTime:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                        </div>

                            {/* number 5 */}
                        <div className="flex flex-col px-2 border-b-2 border-gray-800 flex-1">
                            <label htmlFor="one_placeWhereFound_child" className="text-gray-800 text-sm uppercase font-semibold">
                                5. Place where found
                            </label>
                            <input 
                                type="text"
                                id="one_placeWhereFound_child" 
                                className="flex-1 border-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                value={foundlingCredentials.five_place}
                                onChange={(e)=>{setFounlingCredentials(prev => ({...prev, five_place:e.target.value.toLocaleUpperCase()}))}}
                            />
                        </div>

                        {/* number 6 and  7 */}
                        <div className="flex flex-row border-b-2 border-gray-800">
                            <div className="flex flex-col px-2 border-e-2 border-gray-800 flex-1">
                                <label htmlFor="one_eyesColor_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    6. Color of the eyes
                                </label>
                                <input 
                                    type="text"
                                    id="one_eyesColor_child" 
                                    className="flex-1 border-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    value={foundlingCredentials.six_eyesColor}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, six_eyesColor:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                            <div className="flex flex-col px-2 w-72">
                                <label htmlFor="one_hairColor_child" className="text-gray-800 text-sm uppercase font-semibold">
                                    7. color of the hair
                                </label>
                                <input 
                                    type="text"
                                    id="one_hairColor_child" 
                                    className="flex-1 border-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    value={foundlingCredentials.seven_hairColor}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, seven_hairColor:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                        </div>
                        
                            {/* number 8 */}
                        <div className="flex flex-col px-2 border-b-2 border-gray-800 flex-1">
                            <label htmlFor="one_bodyFeatures_child" className="text-gray-800 text-sm uppercase font-semibold">
                                8. Distinct body features or marks
                            </label>
                            <input 
                                type="text"
                                id="one_bodyFeatures_child" 
                                className="flex-1 border-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                value={foundlingCredentials.eight_bodyFeature}
                                onChange={(e)=>{setFounlingCredentials(prev => ({...prev, eight_bodyFeature:e.target.value.toLocaleUpperCase()}))}}
                            />
                        </div>
                        
                            {/* number 9 */}
                        <div className="flex flex-col px-2 flex-1">
                            <label htmlFor="one_childCondition_child" className="text-gray-800 text-sm uppercase font-semibold">
                                9. Condition of the child when found
                            </label>
                            <input 
                                type="text"
                                id="one_childCondition_child" 
                                className="flex-1 border-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                value={foundlingCredentials.nine_condition}
                                onChange={(e)=>{setFounlingCredentials(prev => ({...prev, nine_condition:e.target.value.toLocaleUpperCase()}))}}
                            />
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
                            <input 
                                type="text"
                                id="ten_name_finder" 
                                className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                value={foundlingCredentials.ten_name}
                                onChange={(e)=>{setFounlingCredentials(prev => ({...prev, ten_name:e.target.value.toLocaleUpperCase()}))}}
                            />
                        </div>
                        <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                            <label htmlFor="ten_address_finder" className="text-gray-800 text-sm font-medium">
                                Address
                            </label>
                            <input 
                                type="text"
                                id="ten_address_finder" 
                                className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                value={foundlingCredentials.ten_address}
                                onChange={(e)=>{setFounlingCredentials(prev => ({...prev, ten_address:e.target.value.toLocaleUpperCase()}))}}
                            />
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                                <label htmlFor="ten_telephone_finder" className="text-gray-800 text-sm font-medium">
                                    Telephone No. (if any)
                                </label>
                                <input 
                                    type="text"
                                    id="ten_telephone_finder" 
                                    className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                    value={foundlingCredentials.ten_telephone}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, ten_telephone:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                            <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                                <label htmlFor="ten_occupation_finder" className="text-gray-800 text-sm font-medium">
                                    Occupation
                                </label>
                                <input 
                                    type="text"
                                    id="ten_occupation_finder" 
                                    className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                    value={foundlingCredentials.ten_occupation}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, ten_occupation:e.target.value.toLocaleUpperCase()}))}}
                                />
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
                            <input 
                                type="text"
                                id="eleven_name_finder" 
                                className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                value={foundlingCredentials.eleven_name}
                                onChange={(e)=>{setFounlingCredentials(prev => ({...prev, eleven_name:e.target.value.toLocaleUpperCase()}))}}
                            />
                        </div>
                        <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                            <label htmlFor="eleven_address_finder" className="text-gray-800 text-sm font-medium">
                                Address
                            </label>
                            <input 
                                type="text"
                                id="eleven_address_finder" 
                                className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                value={foundlingCredentials.eleven_address}
                                onChange={(e)=>{setFounlingCredentials(prev => ({...prev, eleven_address:e.target.value.toLocaleUpperCase()}))}}
                            />
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                                <label htmlFor="eleven_telephone_finder" className="text-gray-800 text-sm font-medium">
                                    Telephone No. (if any)
                                </label>
                                <input 
                                    type="text"
                                    id="eleven_telephone_finder" 
                                    className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                    value={foundlingCredentials.eleven_telephone}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, eleven_telephone:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                            <div className="flex flex-row items-end gap-2 mb-2 w-full ps-5">
                                <label htmlFor="eleven_occupation_finder" className="text-gray-800 text-sm font-medium">
                                    Occupation
                                </label>
                                <input 
                                    type="text"
                                    id="eleven_occupation_finder" 
                                    className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                    value={foundlingCredentials.eleven_occupation}
                                    onChange={(e)=>{setFounlingCredentials(prev => ({...prev, eleven_occupation:e.target.value.toLocaleUpperCase()}))}}
                                />
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
                                    <label htmlFor="twelve_signature" className="text-sm font-medium text-gray-800">(Signature of informant)</label>
                                    <div className="relative mt-5 w-full">
                                        <div className="text-gray-700 text-xs text-center font-medium py-1 px-2 border-b-[1px] border-gray-800 cursor-pointer hover:border-gray-600">
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end gap-2 mb-2 w-96 pe-5">
                                    <label htmlFor="twelve_CommunityTax" className="text-gray-800 text-sm font-medium">
                                        Address
                                    </label>
                                    <input 
                                        type="text"
                                        id="twelve_CommunityTax" 
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                        value={foundlingCredentials.twelve_address}
                                        onChange={(e)=>{setFounlingCredentials(prev => ({...prev, twelve_address:e.target.value.toLocaleUpperCase()}))}}
                                    />
                                </div>
                                <div className="flex flex-row items-end gap-2 mb-2 w-96 pe-5">
                                    <label htmlFor="twelve_DateIssued" className="text-gray-800 text-sm font-medium">
                                        Date Issued
                                    </label>
                                    <input 
                                        type="text"
                                        id="twelve_DateIssued" 
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                        value={foundlingCredentials.twelve_dateIssued}
                                        onChange={(e)=>{setFounlingCredentials(prev => ({...prev, twelve_dateIssued:e.target.value.toLocaleUpperCase()}))}}
                                    />
                                </div>
                                <div className="flex flex-row items-end gap-2 mb-2 w-96 pe-5">
                                    <label htmlFor="twelve_PlacedIssued" className="text-gray-800 text-sm font-medium">
                                        Place Issued
                                    </label>
                                    <input 
                                        type="text"
                                        id="twelve_PlacedIssued" 
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                        value={foundlingCredentials.twelve_placeIssued}
                                        onChange={(e)=>{setFounlingCredentials(prev => ({...prev, twelve_placeIssued:e.target.value.toLocaleUpperCase()}))}}
                                    />
                                </div>
                            </div>
                            <div  className="p-1">
                                <div className="flex flex-row items-end pe-5">
                                    <span className="uppercase font-bold ps-10 text-gray-800">Subscribed and sworn</span>
                                    <span className="text-gray-800 ms-2">
                                        to before me this
                                    </span>
                                    <input 
                                        type="text"
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-30" 
                                        value={foundlingCredentials.twelve_firstLine}
                                        onChange={(e)=>{setFounlingCredentials(prev => ({...prev, twelve_firstLine:e.target.value.toLocaleUpperCase()}))}}
                                    />
                                    <span className="text-gray-800 ms-2">
                                        day of
                                    </span>
                                    <input 
                                        type="text"
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-30" 
                                        value={foundlingCredentials.twelve_secondLine}
                                        onChange={(e)=>{setFounlingCredentials(prev => ({...prev, twelve_secondLine:e.target.value.toLocaleUpperCase()}))}}
                                    />
                                    <span>,</span>
                                </div>
                                <div className="flex flex-row items-end pe-5">
                                    <input 
                                        type="text"
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-30" 
                                        value={foundlingCredentials.twelve_thirdLine}
                                        onChange={(e)=>{setFounlingCredentials(prev => ({...prev, twelve_thirdLine:e.target.value.toLocaleUpperCase()}))}}
                                    />
                                    <span>at</span>
                                    <input 
                                        type="text"
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-96" 
                                        value={foundlingCredentials.twelve_fourthLine}
                                        onChange={(e)=>{setFounlingCredentials(prev => ({...prev, twelve_fourthLine:e.target.value.toLocaleUpperCase()}))}}
                                    />
                                    <span>, Philippines.</span>
                                </div>
                                <div className="flex flex-col items-end justify-end mt-5 pe-5">
                                    <div>
                                        <div className="flex flex-row items-center justify-center gap-2 relative">
                                            <div className="relative mt-5 w-28">
                                                
                                            </div>
                                        </div>
                                        <div className="flex flex-col-reverse items-center justify-center w-96">
                                            <label htmlFor="twelve_Name" className="text-sm text-gray-800 font-semibold">Signature over printed name of the Civil Registrar</label>
                                            <input 
                                                type="text" 
                                                id="twelve_Name" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                                value={foundlingCredentials.twelve_printedName}
                                                onChange={(e)=>{setFounlingCredentials(prev => ({...prev, twelve_printedName:e.target.value.toLocaleUpperCase()}))}}
                                            />
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
                        <div  className="ps-5">
                            <input 
                                type="text"
                                className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-96" 
                                value={foundlingCredentials.thirteen_certification}
                                onChange={(e)=>{setFounlingCredentials(prev => ({...prev, thirteen_certification:e.target.value.toLocaleUpperCase()}))}}
                            />
                            <span className="ps-2">
                                and properly recorded in the Registar of Foundling.
                            </span>
                        </div>
                        <div className="flex flex-col items-end justify-end mt-10 pe-5">
                            <div>
                                <div className="flex flex-row items-center justify-center gap-2 relative">
                                    <div className="relative mt-5 w-28">
                                        
                                    </div>
                                </div>
                                <div className="flex flex-col-reverse items-center justify-center w-96">
                                    <label htmlFor="thirteen_Name" className="text-sm text-gray-800 font-semibold">Signature over printed name of the Civil Registrar</label>
                                    <input 
                                        type="text" 
                                        id="thirteen_Name" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        value={foundlingCredentials.thirteen_printedName}
                                        onChange={(e)=>{setFounlingCredentials(prev => ({...prev, thirteen_printedName:e.target.value.toLocaleUpperCase()}))}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[65rem] flex items-end justify-end py-5">
                <button 
                    className="drop-shadow-md rounded-sm bg-darkCyan w-28 h-10 text-white disabled:cursor-not-allowed" 
                    onClick={handleSubmit}
                    // disabled={isFormEmpty(foundlingCredentials)}
                >
                    {mutation.isPending ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <LoaderDefault/>
                        </div>
                    ) : (
                        'Update'
                    )}
                </button>
            </div>
        </div>
    )
}

export default EditFoundlings