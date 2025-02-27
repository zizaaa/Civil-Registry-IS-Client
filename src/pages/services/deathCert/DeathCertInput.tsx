import { useRef, useState } from "react"
import { DeathCertData } from "../../../types/deathCertTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { errorToast, LoaderDefault, serverURL, successToast } from "../../../hooks/imports";
import { Toaster } from "react-hot-toast";
import { useActivityMutation } from "../../../services/sendActivity";

function DeathCertInput() {
    const [deathCertCredentials, setDeathCertCredentials] = useState<DeathCertData>({
        province:"",
        cityOrMunicipality:"",
        registryNumber:"",
        remarksOrAnnotation:"",
        one_first:"",
        one_middle:"",
        one_last:"",
        two_sex:"",
        three_religion:"",
        four_A_completedYears:"",
        four_B_months:"",
        four_B_days:"",
        four_C_time:"",
        five_nameOf:"",
        five_cityOrMunicipality:"",
        five_province:"",
        six_day:"",
        six_month:"",
        six_year:"",
        seven_citizenship:"",
        eight_houseNo:"",
        eight_cityOrMunicipality:"",
        eight_province:"",
        nine_civilStatus:"",
        ten_occupation:"",
        seventeen_I_A:"",
        seventeen_I_B:"",
        seventeen_I_C:"",
        seventeen_II:"",
        seventeen_ContributingToDeath:"",
        seventeen_Interval:"",
        eighteen_A_mannerOfDeath:"",
        eighteen_B_PlaceOfOccurance:"",
        nineTeen_Attendant:"",
        nineTeen_From:"",
        nineTeen_To:"",
        twenty_time:"",
        twenty_nameInPrint:"",
        twenty_TitleOrPosition:"",
        twenty_Address:"",
        twenty_Date:"",
        twenty_ReviewedBy_PrintedName:"",
        twenty_ReviewedBy_Date:"",
        twentyOne_CorpseDisposal:"",
        twentyTwo_Burial_Number:"",
        twentyTwo_Burial_DateIssued:"",
        twentyThree_Autopsy:"",
        twentyFour_NameAndAddress:"",
        twentyFive_NameInPrint:"",
        twentyFive_Relationship:"",
        twentyFive_Address:"",
        twentyFive_Date:"",
        twentySix_NameInPrint:"",
        twentySix_TitleOrPosition:"",
        twentySix_Date:"",
        twentySeven_NameInPrint:"",
        twentySeven_TitleOrPosition:"",
        twentySeven_Date:"",
        populationReference:"",
        fourtyOne:"",
        fourtyEight:"",
        fourtyNine:"",
        fifthy:"",
        fifthyOne:"",
        fifthyFour:"",
        fifthyNine:"",
        sixtyFive:"",
        sixtySix:"",
        seventyOne:"",
        seventyTwo:"",
        seventyFive:"",
        seventyNine:"",
        eighty:"",
        eightyTwo:"",
        eightyThree:"",
        eightyFive:"",
        eightySix:"",
        ninety:"",
    });
    //
    const activityMutation = useActivityMutation();
    //*  number 20 signature
    const twentySignatureRef = useRef<HTMLInputElement | null>(null);
    const [twentySignatureSrc, setTwentySignatureSrc] = useState<string>('');
    const twentyReviewedSignatureRef = useRef<HTMLInputElement | null>(null);
    const [twentyReviewedSignatureSrc, setTwentyReviewedSignatureSrc] = useState<string>('');

    // * Number 21
    const [twentyOneIsOthers, setIsTwentyOneOthers] = useState<boolean>(false);
    
    // * Number 25 Signature
    const twentyFiveSignatureRef = useRef<HTMLInputElement | null>(null);
    const [twentyFiveSignatureSrc, setTwentyFiveSignatureSrc] = useState<string>('');
    
    // * Number 26 Signature
    const twentySixSignatureRef = useRef<HTMLInputElement | null>(null);
    const [twentySixSignatureSrc, setTwentySixSignatureSrc] = useState<string>('');
    
    // * Number 27 Signature
    const twentySevenSignatureRef = useRef<HTMLInputElement | null>(null);
    const [twentySevenSignatureSrc, setTwentySevenSignatureSrc] = useState<string>('');

    //* get form number
    const { data, isLoading, refetch } = useQuery({
        queryKey:['registry-number'],
        queryFn: async()=>{
            const { data } = await axios.get(`${serverURL}/api/cris/death-certificate/form-number`, { withCredentials:true });
            return data.formNumber;
        }
    });

    // * mutation
    const mutation = useMutation({
        mutationFn: async (deathCertData:FormData) =>{
            const { data } = await axios.post(`${serverURL}/api/cris/death-certificate/register`, deathCertData, {  withCredentials:true })
            
            return data;
        },
        onError:(data)=>{
            console.error(data);
            errorToast(`${data.message}`);
        },
        onSuccess: (data)=>{
            successToast(`${data.message}`);
            activityMutation.mutate(`Death Certificate Registered for ${deathCertCredentials.one_first} (Registry No. ${deathCertCredentials.registryNumber})`);
            clearValues();
            refetch();
        }
    });

    //*  file handler
    const handleFileUpload = (fileRef: React.RefObject<HTMLInputElement>, setSrc: React.Dispatch<React.SetStateAction<string>>): void => {
        const file = fileRef.current?.files?.[0];

            if(file){
                const reader = new FileReader();

                reader.onload = (e) =>{
                    setSrc(e.target?.result as string);
                }

                reader.readAsDataURL(file);
            }
    }
    
    //* Number 2 Sex event
    const handleSexChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setDeathCertCredentials(prev => ({...prev, two_sex:e.target.value}))
    }

    //* Number 9 civil status event
    const handleCivilStatusChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setDeathCertCredentials(prev => ({...prev, nine_civilStatus:e.target.value}))
    }

    //* Number 18 Manner of Death
    const handleMannerOfDeath = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setDeathCertCredentials(prev => ({...prev, eighteen_A_mannerOfDeath:e.target.value}))
    }

    // * Number 19 Attendant
    const handleAttendant = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setDeathCertCredentials(prev => ({...prev, nineTeen_Attendant:e.target.value}))
    }

    // * Number 20 signature uploader
    const handleTwentySignature = () =>{
        handleFileUpload(twentySignatureRef,setTwentySignatureSrc)
    }
    const handleTwentyReviewedSignature = () =>{
        handleFileUpload(twentyReviewedSignatureRef,setTwentyReviewedSignatureSrc)
    }

    // * Number 21 change event
    const handleTwentyOneChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) =>{
        
        if(e.target.value === 'Others (specify)'){
            setDeathCertCredentials(prev => ({...prev, twentyOne_CorpseDisposal:''}));
            setIsTwentyOneOthers(true);
            return;
        }

        setIsTwentyOneOthers(false);
        setDeathCertCredentials(prev => ({...prev, twentyOne_CorpseDisposal:e.target.value}));
    }

    // * Number 23 change event
    const handleTwentyThreehangeEvent = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setDeathCertCredentials(prev => ({...prev, twentyThree_Autopsy:e.target.value}));
    }

    // * Number 25 signature uploader
    const handleTwentyFiveSignature = () =>{
        handleFileUpload(twentyFiveSignatureRef,setTwentyFiveSignatureSrc)
    }

    // * Number 26 signature uploader
    const handleTwentySixSignature = () =>{
        handleFileUpload(twentySixSignatureRef,setTwentySixSignatureSrc)
    }

    // * Number 27 signature uploader
    const handleTwentySevenSignature = () =>{
        handleFileUpload(twentySevenSignatureRef,setTwentySevenSignatureSrc)
    }

    //* clear values
    const clearValues = () => {
        setDeathCertCredentials({
            province:"",
            cityOrMunicipality:"",
            registryNumber:"",
            remarksOrAnnotation:"",
            one_first:"",
            one_middle:"",
            one_last:"",
            two_sex:"",
            three_religion:"",
            four_A_completedYears:"",
            four_B_months:"",
            four_B_days:"",
            four_C_time:"",
            five_nameOf:"",
            five_cityOrMunicipality:"",
            five_province:"",
            six_day:"",
            six_month:"",
            six_year:"",
            seven_citizenship:"",
            eight_houseNo:"",
            eight_cityOrMunicipality:"",
            eight_province:"",
            nine_civilStatus:"",
            ten_occupation:"",
            seventeen_I_A:"",
            seventeen_I_B:"",
            seventeen_I_C:"",
            seventeen_II:"",
            seventeen_ContributingToDeath:"",
            seventeen_Interval:"",
            eighteen_A_mannerOfDeath:"",
            eighteen_B_PlaceOfOccurance:"",
            nineTeen_Attendant:"",
            nineTeen_From:"",
            nineTeen_To:"",
            twenty_time:"",
            twenty_nameInPrint:"",
            twenty_TitleOrPosition:"",
            twenty_Address:"",
            twenty_Date:"",
            twenty_ReviewedBy_PrintedName:"",
            twenty_ReviewedBy_Date:"",
            twentyOne_CorpseDisposal:"",
            twentyTwo_Burial_Number:"",
            twentyTwo_Burial_DateIssued:"",
            twentyThree_Autopsy:"",
            twentyFour_NameAndAddress:"",
            twentyFive_NameInPrint:"",
            twentyFive_Relationship:"",
            twentyFive_Address:"",
            twentyFive_Date:"",
            twentySix_NameInPrint:"",
            twentySix_TitleOrPosition:"",
            twentySix_Date:"",
            twentySeven_NameInPrint:"",
            twentySeven_TitleOrPosition:"",
            twentySeven_Date:"",
            populationReference:"",
            fourtyOne:"",
            fourtyEight:"",
            fourtyNine:"",
            fifthy:"",
            fifthyOne:"",
            fifthyFour:"",
            fifthyNine:"",
            sixtyFive:"",
            sixtySix:"",
            seventyOne:"",
            seventyTwo:"",
            seventyFive:"",
            seventyNine:"",
            eighty:"",
            eightyTwo:"",
            eightyThree:"",
            eightyFive:"",
            eightySix:"",
            ninety:"",
        });

        // Clear signature files and image sources with proper checks
        if (twentySignatureRef.current) {
            twentySignatureRef.current.value = "";
        }
        setTwentySignatureSrc("");

        if (twentyReviewedSignatureRef.current) {
            twentyReviewedSignatureRef.current.value = "";
        }
        setTwentyReviewedSignatureSrc("");

        if (twentyFiveSignatureRef.current) {
            twentyFiveSignatureRef.current.value = "";
        }
        setTwentyFiveSignatureSrc("");

        if (twentySixSignatureRef.current) {
            twentySixSignatureRef.current.value = "";
        }
        setTwentySixSignatureSrc("");

        if (twentySevenSignatureRef.current) {
            twentySevenSignatureRef.current.value = "";
        }
        setTwentySevenSignatureSrc("");
    }

    //* submit form
    const isFormEmpty = (formDataObj:DeathCertData) => {
        // Check if every key in the form data is either an empty string or undefined/null
        return Object.values(formDataObj).every((value) => !value || value === '');
    };

    const handleSubmit = () => {
        console.log(twentySignatureRef.current?.files?.[0])
        console.log(twentyReviewedSignatureRef.current?.files?.[0])
        console.log(twentyFiveSignatureRef.current?.files?.[0])
        console.log(twentySixSignatureRef.current?.files?.[0])
        console.log(twentySevenSignatureRef.current?.files?.[0])
        // Initialize FormData object
        const formData = new FormData();

        // Append the credentials from the state
        Object.entries(deathCertCredentials).forEach(([key, value]) => {
            formData.append(key, value || '');
        });

        // Handle files using refs
        formData.append('twentySignature', twentySignatureRef.current?.files?.[0] || '');
        formData.append('twentyReviewedSignature', twentyReviewedSignatureRef.current?.files?.[0] || '');
        formData.append('twentyFiveSignature', twentyFiveSignatureRef.current?.files?.[0] || '');
        formData.append('twentySixSignature', twentySixSignatureRef.current?.files?.[0] || '');
        formData.append('twentySevenSignature', twentySevenSignatureRef.current?.files?.[0] || '');

        // Check if the entire form is empty
        if (isFormEmpty(deathCertCredentials) &&
            !twentySignatureRef.current?.files?.[0] &&
            !twentyReviewedSignatureRef.current?.files?.[0] &&
            !twentyFiveSignatureRef.current?.files?.[0] &&
            !twentySixSignatureRef.current?.files?.[0] &&
            !twentySevenSignatureRef.current?.files?.[0] 
        ) {
            console.log('Empty form');
            return;
        }

        // Call mutation if form is not empty
        mutation.mutate(formData);
    };

    return (
        <div>
            <Toaster/>
            <div className='w-[65rem] m-3 h-full border-b-0 border-s-0 border-2 border-gray-700 bg-gray-100'>
                <div className="grid grid-cols-4 border-s-2 border-b-2 border-gray-700 w-full overflow-auto">
                    <div className="col-span-3 border-e-2 border-gray-700 w-full overflow-auto">
                        <div className="flex items-center py-2 px-5 justify-between">
                            <div className="flex flex-col text-[12px] text-gray-800">
                                <span>
                                    Municipal Form No. 0{!isLoading && (data)}
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
                                        value={deathCertCredentials.province}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, province:e.target.value}))}}
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
                                        value={deathCertCredentials.cityOrMunicipality}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, cityOrMunicipality:e.target.value}))}}
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
                                    value={deathCertCredentials.registryNumber}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, registryNumber:e.target.value}))}}
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
                            onChange={(e)=>{setDeathCertCredentials(prev =>({...prev, remarksOrAnnotation:e.target.value}))}}
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
                                    value={deathCertCredentials.one_first}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, one_first:e.target.value}))}}
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
                                    value={deathCertCredentials.one_middle}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, one_middle:e.target.value}))}}
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
                                    value={deathCertCredentials.one_last}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, one_last:e.target.value}))}}
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
                                            onChange={(e)=>{handleSexChange(e)}}
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
                                            onChange={(e)=>{handleSexChange(e)}}
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
                                        value={deathCertCredentials.three_religion}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, three_religion:e.target.value}))}}
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
                                                value={deathCertCredentials.four_A_completedYears}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, four_A_completedYears:e.target.value}))}}
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
                                                    value={deathCertCredentials.four_B_months}
                                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, four_B_months:e.target.value}))}}
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
                                                    className="w-full h-5 border-none focus:outline-none focus:ring-transparent px-2 text-sm"
                                                    value={deathCertCredentials.four_B_days}
                                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, four_B_days:e.target.value}))}}
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
                                                value={deathCertCredentials.four_C_time}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, four_C_time:e.target.value}))}}
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
                                    value={deathCertCredentials.five_nameOf}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, five_nameOf:e.target.value}))}}
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
                                    value={deathCertCredentials.five_cityOrMunicipality}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, five_cityOrMunicipality:e.target.value}))}}
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
                                    value={deathCertCredentials.five_province}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, five_province:e.target.value}))}}
                                />
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
                                    <label htmlFor="six_day" className="text-gray-800 text-sm">
                                        (day)
                                    </label>
                                    <input 
                                        type="text" 
                                        id="six_day" 
                                        className="w-full border-none focus:outline-none focus:ring-transparent h-5 text-sm"
                                        value={deathCertCredentials.six_day}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, six_day:e.target.value}))}}
                                    />
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <label htmlFor="six_month" className="text-gray-800 text-sm">
                                        (month)
                                    </label>
                                    <input 
                                        type="text" 
                                        id="six_month" 
                                        className="w-full border-none focus:outline-none focus:ring-transparent h-5 text-sm"
                                        value={deathCertCredentials.six_month}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, six_month:e.target.value}))}}
                                    />
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <label htmlFor="six_year" className="text-gray-800 text-sm">
                                        (year)
                                    </label>
                                    <input 
                                        type="text" 
                                        id="six_year" 
                                        className="w-full border-none focus:outline-none focus:ring-transparent h-5 text-sm"
                                        value={deathCertCredentials.six_year}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, six_year:e.target.value}))}}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col items-start p-1">
                                    <label htmlFor="religion" className="text-gray-800 font-semibold uppercase">
                                        7. Citizenship
                                    </label>
                                    <input 
                                        type="text" 
                                        id="religion" 
                                        className="w-full h-5 border-none focus:outline-none focus:ring-transparent text-sm"
                                        value={deathCertCredentials.seven_citizenship}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seven_citizenship:e.target.value}))}}
                                    />
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
                                <label htmlFor="eight_HouseNo" className="text-gray-800 text-sm">
                                    (House no., Street, Barangay)
                                </label>
                                <input 
                                    type="text" 
                                    id="eight_HouseNo" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-5 text-sm"
                                    value={deathCertCredentials.eight_houseNo}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, eight_houseNo:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <label htmlFor="eight_cityOrMunicipality" className="text-gray-800 text-sm">
                                    (City/Municipality)
                                </label>
                                <input 
                                    type="text" 
                                    id="eight_cityOrMunicipality" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-5 text-sm"
                                    value={deathCertCredentials.eight_cityOrMunicipality}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, eight_cityOrMunicipality:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <label htmlFor="eigth_province" className="text-gray-800 text-sm">
                                    (Province)
                                </label>
                                <input 
                                    type="text" 
                                    id="eigth_province" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-5 text-sm"
                                    value={deathCertCredentials.eight_province}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, eight_province:e.target.value}))}}
                                />
                            </div>
                        </div>
                        {/* Number 9 */}
                        <div className="grid grid-cols-3 border-b-2 border-gray-800">
                            <div className="col-span-2 border-e-2 border-gray-800 p-1">
                                <span className="text-gray-800 font-semibold uppercase">
                                    9. Civil status
                                </span>
                                <div className="flex flex-row gap-5">
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="nine_single" className="text-gray-800 text-sm cursor-pointer">1 Single</label>
                                        <input 
                                            type="radio" 
                                            id="nine_single" 
                                            name="civil_status" 
                                            value="single" 
                                            className="cursor-pointer" 
                                            onChange={(e)=>{handleCivilStatusChange(e)}}
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="nine_married" className="text-gray-800 text-sm cursor-pointer">2 Married</label>
                                        <input 
                                            type="radio" 
                                            id="nine_married" 
                                            name="civil_status" 
                                            value="married" 
                                            className="cursor-pointer" 
                                            onChange={(e)=>{handleCivilStatusChange(e)}}
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="nine_widowed" className="text-gray-800 text-sm cursor-pointer">3 Widowed</label>
                                        <input 
                                            type="radio" 
                                            id="nine_widowed" 
                                            name="civil_status" 
                                            value="widowed" 
                                            className="cursor-pointer" 
                                            onChange={(e)=>{handleCivilStatusChange(e)}}
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="nine_others" className="text-gray-800 text-sm cursor-pointer">4 Others</label>
                                        <input 
                                            type="radio" 
                                            id="nine_others" 
                                            name="civil_status" 
                                            value="others" 
                                            className="cursor-pointer" 
                                            onChange={(e)=>{handleCivilStatusChange(e)}}
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="nine_unknown" className="text-gray-800 text-sm cursor-pointer">5 Unknown</label>
                                        <input 
                                            type="radio" 
                                            id="nine_unknown" 
                                            name="civil_status" 
                                            value="unknown" 
                                            className="cursor-pointer" 
                                            onChange={(e)=>{handleCivilStatusChange(e)}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col items-start p-1">
                                    <label htmlFor="ten_occupation" className="text-gray-800 font-semibold uppercase">
                                        10. Occupation
                                    </label>
                                    <input 
                                        type="text" 
                                        id="ten_occupation" 
                                        className="w-full h-5 border-none focus:outline-none focus:ring-transparent text-sm"
                                        value={deathCertCredentials.ten_occupation}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, ten_occupation:e.target.value}))}}
                                    />
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
                                            <input 
                                                type="text"
                                                id="immediateCause" 
                                                className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                                value={deathCertCredentials.seventeen_I_A}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seventeen_I_A:e.target.value}))}}
                                            />
                                        </div>
                                        <div className="flex flex-row items-end gap-2">
                                            <label htmlFor="antecedentCause" className="text-gray-800 text-sm">
                                                Antecedent cause: b.
                                            </label>
                                            <input 
                                                type="text"
                                                id="antecedentCause" 
                                                className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                                value={deathCertCredentials.seventeen_I_B}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seventeen_I_B:e.target.value}))}}
                                            />
                                        </div>
                                        <div className="flex flex-row items-end gap-2">
                                            <label htmlFor="underlyingCause" className="text-gray-800 text-sm">
                                                Underlying cause: c.
                                            </label>
                                            <input 
                                                type="text"
                                                id="underlyingCause" 
                                                className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                                value={deathCertCredentials.seventeen_I_C}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seventeen_I_C:e.target.value}))}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 p-1">
                                    <div className="flex flex-col items-end gap-2 w-full">
                                        <label htmlFor="immediateCause" className="text-gray-800 text-sm w-full">
                                            Interval Between Onset and Death
                                        </label>
                                        <input 
                                            type="text"
                                            id="immediateCause" 
                                            className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm w-full" 
                                            value={deathCertCredentials.seventeen_Interval}
                                            onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seventeen_Interval:e.target.value}))}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="ps-5 mb-1 pe-2">
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="otherSignificantCondition" className="text-gray-800 text-sm">
                                        II. Other significant conditions
                                    </label>
                                    <input 
                                        type="text"
                                        id="otherSignificantCondition" 
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                        value={deathCertCredentials.seventeen_II}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seventeen_II:e.target.value}))}}
                                    />
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="contributingToDeath" className="text-gray-800 text-sm">
                                        Contributing to death:
                                    </label>
                                    <input 
                                        type="text"
                                        id="contributingToDeath" 
                                        className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                        value={deathCertCredentials.seventeen_ContributingToDeath}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seventeen_ContributingToDeath:e.target.value}))}}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Number 18 */}
                        <div className="border-b-2 border-gray-800 p-1">
                            <span className="text-gray-800 uppercase font-semibold">18. Death By Non-Natural Cause</span>
                            <div className="ps-5">
                                <span>a. Manner of Death</span>
                                <div className="flex flex-row gap-2">
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="homicide" className="text-gray-800 text-sm cursor-pointer">1 Homicide</label>
                                        <input 
                                            type="radio" 
                                            id="homicide" 
                                            name="mannerOfDeath" 
                                            value="homicide" 
                                            className="cursor-pointer" 
                                            onChange={(e)=>{handleMannerOfDeath(e)}}
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="suicide" className="text-gray-800 text-sm cursor-pointer">2 Suicide</label>
                                        <input 
                                            type="radio" 
                                            id="suicide" 
                                            name="mannerOfDeath" 
                                            value="suicide" 
                                            className="cursor-pointer" 
                                            onChange={(e)=>{handleMannerOfDeath(e)}}
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="accident" className="text-gray-800 text-sm cursor-pointer">3 Accident</label>
                                        <input 
                                            type="radio" 
                                            id="accident" 
                                            name="mannerOfDeath" 
                                            value="accident" 
                                            className="cursor-pointer" 
                                            onChange={(e)=>{handleMannerOfDeath(e)}}
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <label htmlFor="eighteenOthers" className="text-gray-800 text-sm cursor-pointer">4 Others</label>
                                        <input 
                                            type="radio" 
                                            id="eighteenOthers" 
                                            name="mannerOfDeath" 
                                            value="others" 
                                            className="cursor-pointer" 
                                            onChange={(e)=>{handleMannerOfDeath(e)}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="ps-5 pb-1">
                                <label htmlFor="placeOfOccurance" className="text-gray-800 text-sm cursor-pointer">
                                    b. Place of Occurance (e.g. home, farm, factory, street, seam, etc.)
                                </label>
                                <input 
                                    type="text"
                                    id="placeOfOccurance" 
                                    className="flex-1 border-x-0 border-t-0 border-gray-700 h-7 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                    value={deathCertCredentials.eighteen_B_PlaceOfOccurance}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, eighteen_B_PlaceOfOccurance:e.target.value}))}}
                                />
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
                                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                                                <label htmlFor="privatePhysician" className="text-gray-800 text-sm cursor-pointer">1 Private Physician</label>
                                                <input 
                                                    type="radio" 
                                                    id="privatePhysician" 
                                                    name="attendant" 
                                                    value="Private Physician" 
                                                    className="cursor-pointer" 
                                                    onChange={(e)=>{handleAttendant(e)}}
                                                />
                                            </div>
                                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                                                <label htmlFor="publicHealthOfficer" className="text-gray-800 text-sm cursor-pointer">2 Public Health Officer</label>
                                                <input 
                                                    type="radio" 
                                                    id="publicHealthOfficer" 
                                                    name="attendant" 
                                                    value="Public Health Officer" 
                                                    className="cursor-pointer" 
                                                    onChange={(e)=>{handleAttendant(e)}}
                                                />
                                            </div>
                                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                                                <label htmlFor="hospitalAuthority" className="text-gray-800 text-sm cursor-pointer">3 Hospital Authority</label>
                                                <input 
                                                    type="radio" 
                                                    id="hospitalAuthority" 
                                                    name="attendant" 
                                                    value="Hospital Authority" 
                                                    className="cursor-pointer" 
                                                    onChange={(e)=>{handleAttendant(e)}}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                                                <label htmlFor="none" className="text-gray-800 text-sm cursor-pointer">4 None</label>
                                                <input 
                                                    type="radio" 
                                                    id="none" 
                                                    name="attendant" 
                                                    value="None" 
                                                    className="cursor-pointer" 
                                                    onChange={(e)=>{handleAttendant(e)}}
                                                />
                                            </div>
                                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                                                <label htmlFor="nineTeen_Others" className="text-gray-800 text-sm cursor-pointer">5 Others</label>
                                                <input 
                                                    type="radio" 
                                                    id="nineTeen_Others" 
                                                    name="attendant" 
                                                    value="others" 
                                                    className="cursor-pointer" 
                                                    onChange={(e)=>{handleAttendant(e)}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <span>If attended, state duration:</span>
                                    <div className="flex flex-row  items-end">
                                        <label htmlFor="from">From</label>
                                        <input 
                                            type="text"
                                            id="from" 
                                            className="border-x-0 border-t-0 border-gray-700 h-7 w-24 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                            value={deathCertCredentials.nineTeen_From}
                                            onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, nineTeen_From:e.target.value}))}}
                                        />
                                        <span className="pe-5">,</span>
                                        <input 
                                            type="text"
                                            id="to" 
                                            className="border-x-0 border-t-0 border-gray-700 h-7 w-24 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                            value={deathCertCredentials.nineTeen_To}
                                            onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, nineTeen_To:e.target.value}))}}
                                        />
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
                                <div className="ps-10">
                                    <span>
                                        have attended the deceased and that occured at
                                    </span>
                                    <input 
                                        type="text" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-28"
                                        value={deathCertCredentials.twenty_time}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twenty_time:e.target.value}))}}
                                    />
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
                                            <div className="relative w-full">
                                                <input 
                                                    type="file" 
                                                    id="twentyOne_signature"
                                                    accept=".png"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    ref={twentySignatureRef}
                                                    onChange={handleTwentySignature}
                                                />
                                                <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-gray-800 cursor-pointer hover:border-gray-600">
                                                    Choose File
                                                </div>
                                                {
                                                    twentySignatureSrc && (
                                                        <figure className="absolute -top-3 left-20">
                                                            <img 
                                                                src={`${twentySignatureSrc}`}
                                                                className="h-10 w-28 object-contain"
                                                            />
                                                        </figure>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-end">
                                            <label htmlFor="TwentyOnenameInPrint" className="text-sm text-gray-800 w-36">Name in Print</label>
                                            <input 
                                                type="text" 
                                                id="TwentyOnenameInPrint" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                                value={deathCertCredentials.twenty_nameInPrint}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twenty_nameInPrint:e.target.value}))}}
                                            />
                                        </div>
                                        <div className="flex flex-row items-end">
                                            <label htmlFor="twentyOnetitleOrPosition" className="text-sm text-gray-800 w-40">Title or Position</label>
                                            <input 
                                                type="text" 
                                                id="twentyOnetitleOrPosition" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                                value={deathCertCredentials.twenty_TitleOrPosition}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twenty_TitleOrPosition:e.target.value}))}}
                                            />
                                        </div>
                                        <div className="flex flex-row items-end gap-2">
                                            <label htmlFor="twentyOneAddress" className="text-sm text-gray-800">Address</label>
                                            <input 
                                                type="text" 
                                                id="twentyOneAddress" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                                value={deathCertCredentials.twenty_Address}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twenty_Address:e.target.value}))}}
                                            />
                                        </div>
                                        <div className="flex flex-row items-end gap-2">
                                            <label htmlFor="twentyOnedate" className="text-sm text-gray-800">Date</label>
                                            <input 
                                                type="text" 
                                                id="twentyOnedate" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                                value={deathCertCredentials.twenty_Date}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twenty_Date:e.target.value}))}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 p-1">
                                    <div className="mt-5 border-2 border-gray-800 px-5 py-1">
                                        <span className="uppercase font-bold">Reviewed By:</span>
                                        <div>
                                            <div className="flex flex-row items-center justify-center gap-2 relative">
                                                <div className="relative w-28">
                                                    <input 
                                                        type="file" 
                                                        id="twentyOne_signature"
                                                        accept=".png"
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        ref={twentyReviewedSignatureRef}
                                                        onChange={handleTwentyReviewedSignature}
                                                    />
                                                    <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-gray-800 cursor-pointer hover:border-gray-600">
                                                        Upload signature
                                                    </div>
                                                    {
                                                        twentyReviewedSignatureSrc && (
                                                            <figure className="absolute -top-5 -right-24">
                                                                <img 
                                                                    src={`${twentyReviewedSignatureSrc}`}
                                                                    className="h-10 w-28 object-contain"
                                                                />
                                                            </figure>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex flex-col-reverse items-center justify-center">
                                                <label htmlFor="twentyOnedate" className="text-sm text-gray-800 font-semibold">Signature over printed name of Health Officer</label>
                                                <input 
                                                    type="text" 
                                                    id="twentyOnedate" 
                                                    className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                                    value={deathCertCredentials.twenty_ReviewedBy_PrintedName}
                                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twenty_ReviewedBy_PrintedName:e.target.value}))}}
                                                />
                                            </div>
                                            <div className="flex flex-col-reverse items-center justify-center">
                                                <label htmlFor="twentyOnedate" className="text-sm text-gray-800 font-semibold">Date</label>
                                                <input 
                                                    type="text" 
                                                    id="twentyOnedate" 
                                                    className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-38"
                                                    value={deathCertCredentials.twenty_ReviewedBy_Date}
                                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twenty_ReviewedBy_Date:e.target.value}))}}
                                                />
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
                                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                                                <label htmlFor="burial" className="text-gray-800 text-sm cursor-pointer">Burial</label>
                                                <input 
                                                    type="radio" 
                                                    id="burial" 
                                                    name="corpseDisposal" 
                                                    value="Burial" 
                                                    className="cursor-pointer" 
                                                    onChange={(e)=>{handleTwentyOneChangeEvent(e)}}
                                                />
                                            </div>
                                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                                                <label htmlFor="cremation" className="text-gray-800 text-sm cursor-pointer">Cremation</label>
                                                <input 
                                                    type="radio" 
                                                    id="cremation" 
                                                    name="corpseDisposal" 
                                                    value="Cremation" 
                                                    className="cursor-pointer" 
                                                    onChange={(e)=>{handleTwentyOneChangeEvent(e)}}
                                                />
                                            </div>
                                        </div>
                                        <div className="ps-5">
                                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                                                <label htmlFor="others" className="text-gray-800 text-sm cursor-pointer">Others (specify)</label>
                                                <input 
                                                    type="radio" 
                                                    id="others" 
                                                    name="corpseDisposal" 
                                                    value="Others (specify)" 
                                                    className="cursor-pointer" 
                                                    onChange={(e)=>{handleTwentyOneChangeEvent(e)}}
                                                />
                                            </div>
                                            {
                                                twentyOneIsOthers && (
                                                    <input 
                                                        type="text"
                                                        className="border-x-0 border-t-0 border-gray-700 h-3 w-24 focus:outline-none focus:ring-transparent focus:border-gray-700 text-sm" 
                                                        value={deathCertCredentials.twentyOne_CorpseDisposal}
                                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentyOne_CorpseDisposal:e.target.value}))}}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 border-x-2 border-gray-800 p-1">
                                    <span className="uppercase font-semibold text-gray-800">22. Burial/Cremation Permit</span>
                                    <div className="ps-5">
                                        <div className="flex flex-row items-end justify-start gap-2">
                                            <label htmlFor="twentyTwoNumber" className="text-sm text-gray-800 font-semibold">Number</label>
                                            <input 
                                                type="text" 
                                                id="twentyTwoNumber" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent flex-1"
                                                value={deathCertCredentials.twentyTwo_Burial_Number}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentyTwo_Burial_Number:e.target.value}))}}
                                            />
                                        </div>
                                        <div className="flex flex-row items-end justify-start gap-2">
                                            <label htmlFor="twentyTwoDateIssued" className="text-sm text-gray-800 font-semibold w-32">Date Issued</label>
                                            <input 
                                                type="text" 
                                                id="twentyTwoDateIssued" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                                value={deathCertCredentials.twentyTwo_Burial_DateIssued}
                                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentyTwo_Burial_DateIssued:e.target.value}))}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 p-1">
                                    <span className="uppercase font-semibold text-gray-800">23. Autopsy</span>
                                    <div className="ps-5">
                                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                                            <label htmlFor="isAutopsyYes" className="text-gray-800 text-sm cursor-pointer">1 Yes</label>
                                            <input 
                                                type="radio" 
                                                id="isAutopsyYes" 
                                                name="autopsy" 
                                                value="Yes" 
                                                className="cursor-pointer" 
                                                onChange={(e)=>{handleTwentyThreehangeEvent(e)}}
                                            />
                                        </div>
                                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                                            <label htmlFor="isAutopsyNo" className="text-gray-800 text-sm cursor-pointer">2 No</label>
                                            <input 
                                                type="radio" 
                                                id="isAutopsyNo" 
                                                name="autopsy" 
                                                value="No" 
                                                className="cursor-pointer" 
                                                onChange={(e)=>{handleTwentyThreehangeEvent(e)}}
                                            />
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
                                <input 
                                    type="text" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                    value={deathCertCredentials.twentyFour_NameAndAddress}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentyFour_NameAndAddress:e.target.value}))}}
                                />
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
                                        <label htmlFor="twentyFive_signature" className="text-sm font-medium text-gray-800">Signature</label>
                                        <div className="relative w-full">
                                            <input 
                                                type="file" 
                                                id="twentyFive_signature"
                                                accept=".png"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                ref={twentyFiveSignatureRef}
                                                onChange={handleTwentyFiveSignature}
                                            />
                                            <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-gray-800 cursor-pointer hover:border-gray-600">
                                                Choose File
                                            </div>
                                        </div>
                                        {
                                            twentyFiveSignatureSrc && (
                                                <figure className="absolute -top-5 left-36">
                                                    <img 
                                                        src={`${twentyFiveSignatureSrc}`}
                                                        className="h-10 w-28 object-contain"
                                                    />
                                                </figure>
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="twentyFiveNameInPrint" className="text-sm text-gray-800 w-36">Name in Print</label>
                                        <input 
                                            type="text" 
                                            id="twentyFiveNameInPrint" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                            value={deathCertCredentials.twentyFive_NameInPrint}
                                            onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentyFive_NameInPrint:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="twentyFiveTitleOrPosition" className="text-sm text-gray-800 w-96">Relationship to the deceased</label>
                                        <input 
                                            type="text" 
                                            id="twentyFiveTitleOrPosition" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                            value={deathCertCredentials.twentyFive_Relationship}
                                            onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentyFive_Relationship:e.target.value}))}}
                                        />
                                    </div>
                                </div>
                                <div className="pe-2">
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="TwentyFiveAddress" className="text-sm text-gray-800">Address</label>
                                        <input 
                                            type="text" 
                                            id="TwentyFiveAddress" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                            value={deathCertCredentials.twentyFive_Address}
                                            onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentyFive_Address:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="twentyFiveDate" className="text-sm text-gray-800">Date</label>
                                        <input 
                                            type="text" 
                                            id="twentyFiveDate" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                            value={deathCertCredentials.twentyFive_Date}
                                            onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentyFive_Date:e.target.value}))}}
                                        />
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
                                    <label htmlFor="twentySix_signature" className="text-sm font-medium text-gray-800">Signature</label>
                                    <div className="relative w-full">
                                        <input 
                                            type="file" 
                                            id="twentySix_signature"
                                            accept=".png"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            ref={twentySixSignatureRef}
                                            onChange={handleTwentySixSignature}
                                        />
                                        <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-gray-800 cursor-pointer hover:border-gray-600">
                                            Choose File
                                        </div>
                                    </div>
                                    {
                                        twentySixSignatureSrc && (
                                            <figure className="absolute -top-5 left-36">
                                                <img 
                                                    src={`${twentySixSignatureSrc}`}
                                                    className="h-10 w-28 object-contain"
                                                />
                                            </figure>
                                        )
                                    }
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="twentySixNameInPrint" className="text-sm text-gray-800 w-36">Name in Print</label>
                                    <input 
                                        type="text" 
                                        id="twentySixNameInPrint" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        value={deathCertCredentials.twentySix_NameInPrint}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentySix_NameInPrint:e.target.value}))}}
                                    />
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="twentySixTitleOrPosition" className="text-sm text-gray-800 w-36">Title or Position</label>
                                    <input 
                                        type="text" 
                                        id="twentySixTitleOrPosition" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        value={deathCertCredentials.twentySix_TitleOrPosition}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentySix_TitleOrPosition:e.target.value}))}}
                                    />
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="twentySixDate" className="text-sm text-gray-800">Date</label>
                                    <input 
                                        type="text" 
                                        id="twentySixDate" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        value={deathCertCredentials.twentySix_Date}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentySix_Date:e.target.value}))}}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <span className="font-semibold text-gray-800 uppercase">
                                    27. Recieved at the office of the civil registrar
                                </span>
                                <div className="flex flex-row items-end gap-2 relative">
                                    <label htmlFor="twentySeve_signature" className="text-sm font-medium text-gray-800">Signature</label>
                                    <div className="relative w-full">
                                        <input 
                                            type="file" 
                                            id="twentySeve_signature"
                                            accept=".png"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            ref={twentySevenSignatureRef}
                                            onChange={handleTwentySevenSignature}
                                        />
                                        <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-gray-800 cursor-pointer hover:border-gray-600">
                                            Choose File
                                        </div>
                                    </div>
                                    {
                                        twentySevenSignatureSrc && (
                                            <figure className="absolute -top-5 left-36">
                                                <img 
                                                    src={`${twentySevenSignatureSrc}`}
                                                    className="h-10 w-28 object-contain"
                                                />
                                            </figure>
                                        )
                                    }
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="twentySeveNameInPrint" className="text-sm text-gray-800 w-36">Name in Print</label>
                                    <input 
                                        type="text" 
                                        id="twentySeveNameInPrint" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        value={deathCertCredentials.twentySeven_NameInPrint}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentySeven_NameInPrint:e.target.value}))}}
                                    />
                                </div>
                                <div className="flex flex-row items-end">
                                    <label htmlFor="twentySevenTitleOrPosition" className="text-sm text-gray-800 w-36">Title or Position</label>
                                    <input 
                                        type="text" 
                                        id="twentySevenTitleOrPosition" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        value={deathCertCredentials.twentySeven_TitleOrPosition}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentySeven_TitleOrPosition:e.target.value}))}}
                                    />
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="twentySevenDate" className="text-sm text-gray-800">Date</label>
                                    <input 
                                        type="text" 
                                        id="twentySevenDate" 
                                        className="h-7 text-sm border-x-0 border-t-0 border-gray-800 focus:border-gray-800 focus:outline-none focus:ring-transparent w-full"
                                        value={deathCertCredentials.twentySeven_Date}
                                        onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, twentySeven_Date:e.target.value}))}}
                                    />
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
                            <input 
                                type="text" 
                                className="border-2 border-gray-500 h-9 focus:border-gray-500 focus:outline-none focus:ring-transparent"
                                value={deathCertCredentials.populationReference}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, populationReference:e.target.value}))}}
                            />
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
                            <input 
                                type="text" 
                                className="h-7 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={7}
                                value={deathCertCredentials.fourtyOne}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, fourtyOne:e.target.value}))}}
                            />
                        </div>
                        <div className="px-5 mt-10 flex flex-col">
                            <span className="text-gray-800 text-sm">48</span>
                            <input 
                                type="text" 
                                className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={1}
                                value={deathCertCredentials.fourtyEight}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, fourtyEight:e.target.value}))}}
                            />
                        </div>
                        <div className="px-5 mt-10 flex gap-2">
                            <div className="flex flex-col">
                                <span className="text-gray-800 text-sm">49</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    value={deathCertCredentials.fourtyNine}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, fourtyNine:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-800 text-sm">50</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    value={deathCertCredentials.fifthy}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, fifthy:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-800 text-sm">51</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-28 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={3}
                                    value={deathCertCredentials.fifthyOne}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, fifthyOne:e.target.value}))}}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">54</span>
                            <input 
                                type="text" 
                                className="h-7 w-28 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={5}
                                value={deathCertCredentials.fifthyFour}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, fifthyFour:e.target.value}))}}
                            />
                        </div>
                        <div className="px-5 mt-10 flex flex-row gap-2">
                            <div className="flex flex-col">
                                <span className="text-gray-800 text-sm">59</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-24 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={6}
                                    value={deathCertCredentials.fifthyNine}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, fifthyNine:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-800 text-sm">65</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    value={deathCertCredentials.sixtyFive}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, sixtyFive:e.target.value}))}}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">66</span>
                            <input 
                                type="text" 
                                className="h-7 w-24 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={5}
                                value={deathCertCredentials.sixtySix}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, sixtySix:e.target.value}))}}
                            />
                        </div>
                        <div className="flex flex-row mt-10">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-gray-800 text-sm">71</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    value={deathCertCredentials.seventyOne}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seventyOne:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-gray-800 text-sm">72</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-20 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={3}
                                    value={deathCertCredentials.seventyTwo}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seventyTwo:e.target.value}))}}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">75</span>
                            <input 
                                type="text" 
                                className="h-7 w-24 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={4}
                                value={deathCertCredentials.seventyFive}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seventyFive:e.target.value}))}}
                            />
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">79</span>
                            <input 
                                type="text" 
                                className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={1}
                                value={deathCertCredentials.seventyNine}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, seventyNine:e.target.value}))}}
                            />
                        </div>
                        <div className="flex flex-row mt-10">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-gray-800 text-sm">80</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                    value={deathCertCredentials.eighty}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, eighty:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-gray-800 text-sm">82</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    value={deathCertCredentials.eightyTwo}
                                    onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, eightyTwo:e.target.value}))}}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">83</span>
                            <input 
                                type="text" 
                                className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={2}
                                value={deathCertCredentials.eightyThree}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, eightyThree:e.target.value}))}}
                            />
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">85</span>
                            <input 
                                type="text" 
                                className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={1}
                                value={deathCertCredentials.eightyFive}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, eightyFive:e.target.value}))}}
                            />
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">86</span>
                            <input 
                                type="text" 
                                className="h-7 w-20 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={4}
                                value={deathCertCredentials.eightySix}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, eightySix:e.target.value}))}}
                            />
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-gray-800 text-sm">90</span>
                            <input 
                                type="text" 
                                className="h-7 w-20 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={4}
                                value={deathCertCredentials.ninety}
                                onChange={(e)=>{setDeathCertCredentials(prev => ({...prev, ninety:e.target.value}))}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[65rem] flex items-end justify-end py-5">
                <button 
                    className="drop-shadow-md rounded-sm bg-darkCyan w-28 h-10 text-white disabled:cursor-not-allowed" 
                    onClick={handleSubmit}
                    disabled={isFormEmpty(deathCertCredentials)}
                >
                    {mutation.isPending ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <LoaderDefault/>
                        </div>
                    ) : (
                        'Submit'
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeathCertInput