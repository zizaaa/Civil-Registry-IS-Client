import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react"
import { errorToast, LoaderDefault, serverURL, successToast } from "../../../hooks/imports";
import { Toaster } from "react-hot-toast";
import { BirthCertDataType } from "../../../types/birthCerthTypes";

function BirthCertInputs() {
    const [birthCertCredentials, setBirthCertCredentials] = useState<BirthCertDataType>({
        province:"",
        cityOrMunicipality:"",
        one_first:"",
        one_middle:"",
        one_last:"",
        two_sex:"",
        three_day:"",
        three_month:"",
        three_year:"",
        four_nameOf:"",
        four_cityOrMunicipality:"",
        four_province:"",
        fiveA_typeOfBirth:"",
        fiveB_IfMultiple:"",
        fiveC_birthOrder:"",
        fiveD_weight:"",
        six_first:"",
        six_middle:"",
        six_last:"",
        seven_citizenship:"",
        eight_religion:"",
        nineA_totalNumber:"",
        nineB_numberOfChild:"",
        nineC_numberOfChildDead:"",
        ten_occupation:"",
        eleven_ageAtTheTime:"",
        twelve_house:"",
        twelve_cityOrMunicipality:"",
        twelve_province:"",
        thirteen_first:"",
        thirteen_middle:"",
        thirteen_last:"",
        fourteen_citizenship:"",
        fifteen_religion:"",
        sixteen_occupation:"",
        seventeen_ageAtTheTime:"",
        eighteen_DateAndPlaceOfMarriageOfParents:"",
        nineteenA_attendant:"",
        nineteenB_nameInPrint:"",
        nineteenB_titleAndPosition:"",
        nineteenB_address:"",
        nineteenB_date:"",
        nineteenB_bornAliveAt:"",
        twenty_nameInPrint:"",
        twenty_relationToChild:"",
        twenty_address:"",
        twenty_date:"",
        twentyOne_nameInPrint:"",
        twentyOne_titleOrPosition:"",
        twentyOne_date:"",
        twentyTwo_nameInPrint:"",
        twentyTwo_titleOrPosition:"",
        twentyTwo_date:"",
        remarksAnnotation:"",
        populationReferenceNumber:"",
        fourtyOne:"",
        fourtyEight:"",
        fourtyNine:"",
        fifthy:"",
        fiftySix:"",
        sixtyOne:"",
        sixtyTwo:"",
        sixtyFour:"",
        sixtyEight:"",
        sixtyNine:"",
        seventy:"",
        seventyTwo:"",
        seventyFour:"",
        seventySix:"",
        seventyNine:"",
        eightyOne:"",
        eightySix:"",
        eightySeven:"",
        eightyEight:"",
        ninetyOne:"",
        ninetyThree:"",
        ninetyFour:"",
        registryNumber:""
    });

    //*  number 19 b signature
    const nineteenB_SignatureRef = useRef<HTMLInputElement | null>(null);
    const [nineteenBSignatureSrc, setNineteenBSignatureSrc] = useState<string>('');

    //*  number 20 signature
    const twenty_SignatureRef = useRef<HTMLInputElement | null>(null);
    const [twentySignatureSrc, setTwentySignatureSrc] = useState<string>('');

    //*  number 21 signature
    const twentyOne_SignatureRef = useRef<HTMLInputElement | null>(null);
    const [twentyOneSignatureSrc, setTwentyOneSignatureSrc] = useState<string>('');
    
    //*  number 22 signature
    const twentyTwo_SignatureRef = useRef<HTMLInputElement | null>(null);
    const [twentyTwoSignatureSrc, setTwentyTwoSignatureSrc] = useState<string>('');

    //*  state for number 5 B if others is selected
    const [fiveBIsOthers, setFiveBIsOthers] = useState<boolean>(false);

    //*  state form number 19 A if others is selected
    const [nineTeenAIsOthers, setNineTeenAIsOthers] = useState<boolean>(false);

    //* get registry number
    const { data, isLoading,  refetch } = useQuery({
        queryKey:['registry-number'],
        queryFn: async()=>{
            const { data } = await axios.get(`${serverURL}/api/cris/birth-certificate/registry-number`, { withCredentials:true });
            
            return data.registryNumber;
        }
    });

    // * post request using mutation
    const mutation = useMutation({
        mutationFn: async(birthCertData: FormData)=>{
            const { data } = await axios.post(`${serverURL}/api/cris/birth-certificate/register`, birthCertData , { withCredentials:true });

            return data;
        },
        onError:(data)=>{
            console.error(data);
            errorToast(`${data.message}`);
        },
        onSuccess: (data)=>{
            successToast(`${data.message}`);
            handleCLearValues();
            refetch();
        }
    });

    //*  number 2 sex
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthCertCredentials(prev => ({...prev, two_sex:e.target.value}))
    };

    //*  number 5 A type of birth
    const handleChangeTypeOfBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthCertCredentials(prev => ({...prev, fiveA_typeOfBirth:e.target.value}))
    };
    
    //*  number 5 B if multiple child
    const handleChangeMultipleBirth = (e: React.ChangeEvent<HTMLInputElement>) =>{
        
        if(e.target.value === 'others'){
            return setFiveBIsOthers(true);
        }

        setFiveBIsOthers(false);
        setBirthCertCredentials(prev => ({...prev, fiveB_IfMultiple:e.target.value}))
    }

    //*  number 19 A if others is selected
    const handleChangeAttendant = (e: React.ChangeEvent<HTMLInputElement>)=>{

        if(e.target.value === 'others'){
            return setNineTeenAIsOthers(true);
        }

        setNineTeenAIsOthers(false);
        setBirthCertCredentials(prev => ({...prev, nineteenA_attendant:e.target.value}))
    }

    
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

    //* number 19 B signature handler
    const handleNumberNinteenFileChange = () =>{
        handleFileUpload(nineteenB_SignatureRef, setNineteenBSignatureSrc);
    }

    //* number 20 signature handler
    const handleNumberTwentyFileChange = () =>{
        handleFileUpload(twenty_SignatureRef, setTwentySignatureSrc);
    }

    //* number 21 signature handler
    const handleNumberTwentyOneFileChange = () =>{
        handleFileUpload(twentyOne_SignatureRef, setTwentyOneSignatureSrc);
    }

    //* number 22 signature handler
    const handleNumberTwentyTwoFileChange = () =>{
        handleFileUpload(twentyTwo_SignatureRef, setTwentyTwoSignatureSrc);
    }

    //* clear the values
    const handleCLearValues = () =>{
        setBirthCertCredentials({
            province:"",
            cityOrMunicipality:"",
            one_first:"",
            one_middle:"",
            one_last:"",
            two_sex:"",
            three_day:"",
            three_month:"",
            three_year:"",
            four_nameOf:"",
            four_cityOrMunicipality:"",
            four_province:"",
            fiveA_typeOfBirth:"",
            fiveB_IfMultiple:"",
            fiveC_birthOrder:"",
            fiveD_weight:"",
            six_first:"",
            six_middle:"",
            six_last:"",
            seven_citizenship:"",
            eight_religion:"",
            nineA_totalNumber:"",
            nineB_numberOfChild:"",
            nineC_numberOfChildDead:"",
            ten_occupation:"",
            eleven_ageAtTheTime:"",
            twelve_house:"",
            twelve_cityOrMunicipality:"",
            twelve_province:"",
            thirteen_first:"",
            thirteen_middle:"",
            thirteen_last:"",
            fourteen_citizenship:"",
            fifteen_religion:"",
            sixteen_occupation:"",
            seventeen_ageAtTheTime:"",
            eighteen_DateAndPlaceOfMarriageOfParents:"",
            nineteenA_attendant:"",
            nineteenB_nameInPrint:"",
            nineteenB_titleAndPosition:"",
            nineteenB_address:"",
            nineteenB_date:"",
            nineteenB_bornAliveAt:"",
            twenty_nameInPrint:"",
            twenty_relationToChild:"",
            twenty_address:"",
            twenty_date:"",
            twentyOne_nameInPrint:"",
            twentyOne_titleOrPosition:"",
            twentyOne_date:"",
            twentyTwo_nameInPrint:"",
            twentyTwo_titleOrPosition:"",
            twentyTwo_date:"",
            remarksAnnotation:"",
            populationReferenceNumber:"",
            fourtyOne:"",
            fourtyEight:"",
            fourtyNine:"",
            fifthy:"",
            fiftySix:"",
            sixtyOne:"",
            sixtyTwo:"",
            sixtyFour:"",
            sixtyEight:"",
            sixtyNine:"",
            seventy:"",
            seventyTwo:"",
            seventyFour:"",
            seventySix:"",
            seventyNine:"",
            eightyOne:"",
            eightySix:"",
            eightySeven:"",
            eightyEight:"",
            ninetyOne:"",
            ninetyThree:"",
            ninetyFour:"",
            registryNumber:""
        })

        // Clear signature files and image sources with proper checks
        if (nineteenB_SignatureRef.current) {
            nineteenB_SignatureRef.current.value = "";
        }
        setNineteenBSignatureSrc("");
        
        if (twenty_SignatureRef.current) {
            twenty_SignatureRef.current.value = "";
        }
        setTwentySignatureSrc(""); 
        
        if (twentyOne_SignatureRef.current) {
            twentyOne_SignatureRef.current.value = "";
        }
        setTwentyOneSignatureSrc("");
        
        if (twentyTwo_SignatureRef.current) {
            twentyTwo_SignatureRef.current.value = "";
        }
        setTwentyTwoSignatureSrc("");
    }
    
    const isFormEmpty = (formDataObj:BirthCertDataType) => {
        // Check if every key in the form data is either an empty string or undefined/null
        return Object.values(formDataObj).every((value) => !value || value === '');
    };

    const handleSubmit = () => {
        // Initialize FormData object
        const formData = new FormData();

        // Append the credentials from the state
        Object.entries(birthCertCredentials).forEach(([key, value]) => {
            formData.append(key, value || '');
        });

        // Handle files using refs
        formData.append('nineteenB_Signature', nineteenB_SignatureRef.current?.files?.[0] || '');
        formData.append('twenty_Signature', twenty_SignatureRef.current?.files?.[0] || '');
        formData.append('twentyOne_Signature', twentyOne_SignatureRef.current?.files?.[0] || '');
        formData.append('twentyTwo_Signature', twentyTwo_SignatureRef.current?.files?.[0] || '');

        // Check if the entire form is empty
        if (isFormEmpty(birthCertCredentials) &&
            !nineteenB_SignatureRef.current?.files?.[0] &&
            !twenty_SignatureRef.current?.files?.[0] &&
            !twentyOne_SignatureRef.current?.files?.[0] &&
            !twentyTwo_SignatureRef.current?.files?.[0]) {
            console.log('Empty form');
            return;
        }

        // Call mutation if form is not empty
        mutation.mutate(formData);
    };

    return (
        <div>
            <Toaster/>
            <div className="w-[65rem] m-3 h-full border-b-0 border-s-0 border-4 border-green bg-gray-100">
                <div className="grid grid-cols-4 border-s-4 border-green w-full overflow-auto">
                    <div className="col-span-3 border-e-4 border-green w-full overflow-auto">
                        <div className="flex items-center py-2 px-5 justify-between">
                            <div className="flex flex-col text-[12px] text-green">
                                <span>
                                    Municipal Form No. 0{!isLoading && (data)}
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
                                    <input 
                                        type="text"
                                        id="province" 
                                        className="flex-1 border-x-0 border-t-0 border-green h-7 focus:outline-none focus:ring-transparent focus:border-green text-sm" 
                                        value={birthCertCredentials.province}
                                        onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, province:e.target.value}))}}
                                    />
                                </div>
                                <div className="flex flex-row items-end gap-2">
                                    <label htmlFor="cityAndMunicipality" className="text-green text-sm">
                                        City/Municiplity
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cityAndMunicipality" 
                                        className="flex-1 border-x-0 border-t-0 border-green h-7 focus:outline-none focus:ring-transparent focus:border-green text-sm"
                                        value={birthCertCredentials.cityOrMunicipality}
                                        onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, cityOrMunicipality:e.target.value}))}}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 border-s-2 border-green px-5 py-2 ">
                                <label htmlFor="registryNumber" className="text-green text-sm">
                                    Registry No.
                                </label>
                                <input 
                                    type="number" 
                                    id="registryNumber" 
                                    className="w-full border-0 focus:outline-none focus:ring-transparent" 
                                    value={birthCertCredentials.registryNumber} 
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, registryNumber:e.target.value}))}}
                                />
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
                            value={birthCertCredentials.remarksAnnotation}
                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, remarksAnnotation:e.target.value}))}}
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
                                        <input 
                                            type="text" 
                                            id="first" 
                                            className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                            value={birthCertCredentials.one_first}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, one_first:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <label htmlFor="middle" className="text-green text-sm">
                                            (Middle)
                                        </label>
                                        <input 
                                            type="text" 
                                            id="middle" 
                                            className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                            value={birthCertCredentials.one_middle}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, one_middle:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <label htmlFor="last" className="text-green text-sm">
                                            (Last)
                                        </label>
                                        <input 
                                            type="text" 
                                            id="last" 
                                            className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                            value={birthCertCredentials.one_last}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, one_last:e.target.value}))}}
                                        />
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
                                                <input 
                                                    type="radio" 
                                                    id="male" 
                                                    name="sex" 
                                                    value="male" 
                                                    className="cursor-pointer" 
                                                    onChange={(e)=>{handleChange(e)}}
                                                />
                                            </div>
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <label htmlFor="female" className="text-green text-sm cursor-pointer">Female</label>
                                                <input 
                                                    type="radio" 
                                                    id="female" 
                                                    name="sex" 
                                                    value="female" 
                                                    className="cursor-pointer" 
                                                    onChange={(e)=>{handleChange(e)}}
                                                />
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
                                                <input 
                                                    type="text" 
                                                    id="day" 
                                                    className="w-16 h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                                    value={birthCertCredentials.three_day}
                                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, three_day:e.target.value}))}}
                                                />
                                            </div>
                                            <div className="flex flex-col text-center gap-1">
                                                <label htmlFor="month" className="text-green text-sm">
                                                    (month)
                                                </label>
                                                <input 
                                                    type="text" 
                                                    id="month" 
                                                    className="w-16 h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                                    value={birthCertCredentials.three_month}
                                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, three_month:e.target.value}))}}
                                                />
                                            </div>
                                            <div className="flex flex-col text-center gap-1">
                                                <label htmlFor="year" className="text-green text-sm">
                                                    (year)
                                                </label>
                                                <input 
                                                    type="text" 
                                                    id="year" 
                                                    className="w-16 h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                                    value={birthCertCredentials.three_year}
                                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, three_year:e.target.value}))}}
                                                />
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
                                        <input 
                                            type="text" 
                                            id="name_of_place" 
                                            className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                            value={birthCertCredentials.four_nameOf}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, four_nameOf:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <label htmlFor="city_Municipality" className="text-green text-sm">
                                            (City/Municipality)
                                        </label>
                                        <input 
                                            type="text" 
                                            id="city_Municipality" 
                                            className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                            value={birthCertCredentials.four_cityOrMunicipality}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, four_cityOrMunicipality:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between flex-1">
                                        <label htmlFor="province" className="text-green text-sm">
                                            (Province)
                                        </label>
                                        <input 
                                            type="text" 
                                            id="province" 
                                            className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                            value={birthCertCredentials.four_province}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, four_province:e.target.value}))}}
                                        />
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
                                                    <input 
                                                        type="radio" 
                                                        id="single" 
                                                        className="cursor-pointer"
                                                        name="typeOfBirth"
                                                        value='single'
                                                        onChange={(e)=>{handleChangeTypeOfBirth(e)}}
                                                    />
                                                </div>
                                                <div className="flex flex-row-reverse items-center gap-2">
                                                    <label htmlFor="twin" className="text-green text-sm cursor-pointer">2. Twin</label>
                                                    <input 
                                                        type="radio" 
                                                        id="twin" 
                                                        className="cursor-pointer"
                                                        name="typeOfBirth"
                                                        value='twin'
                                                        onChange={(e)=>{handleChangeTypeOfBirth(e)}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <div className="flex flex-row-reverse items-center gap-2">
                                                    <label htmlFor="triplet" className="text-green text-sm cursor-pointer">3. Triplet Etc.</label>
                                                    <input 
                                                        type="radio" 
                                                        id="triplet" className="cursor-pointer"
                                                        name="typeOfBirth"
                                                        value='triplet'
                                                        onChange={(e)=>{handleChangeTypeOfBirth(e)}}
                                                    />
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
                                                <input 
                                                    type="radio" 
                                                    id="first" 
                                                    className="cursor-pointer"
                                                    name="ifMultiple"
                                                    value='first'
                                                    onChange={(e)=>{handleChangeMultipleBirth(e)}}
                                                />
                                            </div>
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <label htmlFor="second" className="text-green text-sm cursor-pointer">2. Second</label>
                                                <input 
                                                    type="radio" 
                                                    id="second" 
                                                    className="cursor-pointer"
                                                    name="ifMultiple"
                                                    value='second'
                                                    onChange={(e)=>{handleChangeMultipleBirth(e)}}
                                                />
                                            </div>
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                {
                                                    fiveBIsOthers && 
                                                    (
                                                        <input 
                                                            type='text' 
                                                            className="h-7  text-sm border-x-0 border-t-0 border-green focus:outline-none focus:ring-transparent focus:border-green"
                                                            value={birthCertCredentials.fiveB_IfMultiple}
                                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, fiveB_IfMultiple:e.target.value}))}}
                                                        />
                                                    )
                                                }
                                                <label htmlFor="others" className="text-green text-sm cursor-pointer">3. Others</label>
                                                <input 
                                                    type="radio" 
                                                    id="others" 
                                                    className="cursor-pointer"
                                                    name="ifMultiple"
                                                    value='others'
                                                    onChange={(e)=>{handleChangeMultipleBirth(e)}}
                                                />
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
                                            <input 
                                                type="text" 
                                                id="birthOrder" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent"
                                                value={birthCertCredentials.fiveC_birthOrder}
                                                onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, fiveC_birthOrder:e.target.value}))}}
                                            />
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
                                            <input 
                                                type="text" 
                                                id="grams" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent"
                                                value={birthCertCredentials.fiveD_weight}
                                                onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, fiveD_weight:e.target.value}))}}
                                            />
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
                                        <input 
                                            type="text" 
                                            id="first" 
                                            className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                            value={birthCertCredentials.six_first}
                                            onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, six_first:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <label htmlFor="middle" className="text-green text-sm">
                                            (Middle)
                                        </label>
                                        <input 
                                            type="text" 
                                            id="middle" 
                                            className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                            value={birthCertCredentials.six_middle}
                                            onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, six_middle:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <label htmlFor="last" className="text-green text-sm">
                                            (Last)
                                        </label>
                                        <input 
                                            type="text" 
                                            id="last" 
                                            className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                            value={birthCertCredentials.six_last}
                                            onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, six_last:e.target.value}))}}
                                        />
                                    </div>
                                </div>
                                {/* number 7 */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-2 border-e-2 border-green p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <label htmlFor="citizenship" className="text-green font-semibold uppercase">
                                                7. CITIZENSHIP
                                            </label>
                                            <input 
                                                type="text" 
                                                id="citizenship" 
                                                className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"
                                                value={birthCertCredentials.seven_citizenship}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, seven_citizenship:e.target.value}))}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <label htmlFor="religion" className="text-green font-semibold uppercase">
                                                8. RELIGION
                                            </label>
                                            <input 
                                                type="text" 
                                                id="religion" 
                                                className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"
                                                value={birthCertCredentials.eight_religion}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, eight_religion:e.target.value}))}}
                                            />
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
                                            <input 
                                                type="text" 
                                                id="total_number" 
                                                className="w-full border-x-0 border-t-0 border-green focus:outline-none focus:ring-transparent focus:border-green h-7 text-sm mt-7"
                                                value={birthCertCredentials.nineA_totalNumber}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, nineA_totalNumber:e.target.value}))}}
                                            />
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
                                            <input 
                                                type="text" 
                                                id="number9_b" 
                                                className="w-full border-x-0 border-t-0 border-green focus:outline-none focus:ring-transparent focus:border-green h-7 text-sm"
                                                value={birthCertCredentials.nineB_numberOfChild}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, nineB_numberOfChild:e.target.value}))}}
                                            />
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
                                            <input 
                                                type="text" 
                                                id="number9_b" 
                                                className="w-full border-x-0 border-t-0 border-green focus:outline-none focus:ring-transparent focus:border-green h-7 text-sm"
                                                value={birthCertCredentials.nineC_numberOfChildDead}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, nineC_numberOfChildDead:e.target.value}))}}
                                            />
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
                                            <input 
                                                type="text" 
                                                id="citizenship" 
                                                className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"
                                                value={birthCertCredentials.ten_occupation}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, ten_occupation:e.target.value}))}}
                                            />
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
                                            <input 
                                                type="text" 
                                                id="years" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-14"
                                                value={birthCertCredentials.eleven_ageAtTheTime}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, eleven_ageAtTheTime:e.target.value}))}}
                                            />
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
                                        <input 
                                            type="text" 
                                            id="name_of_place_2" 
                                            className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                            value={birthCertCredentials.twelve_house}
                                            onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, twelve_house:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <label htmlFor="city_Municipality_2" className="text-green text-sm">
                                            (City/Municipality)
                                        </label>
                                        <input 
                                            type="text" 
                                            id="city_Municipality_2" 
                                            className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                            value={birthCertCredentials.twelve_cityOrMunicipality}
                                            onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, twelve_cityOrMunicipality:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between flex-1">
                                        <label htmlFor="province_2" className="text-green text-sm">
                                            (Province)
                                        </label>
                                        <input 
                                            type="text" 
                                            id="province_2" 
                                            className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                            value={birthCertCredentials.twelve_province}
                                            onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, twelve_province:e.target.value}))}}
                                        />
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
                                        <input 
                                            type="text" 
                                            id="first" 
                                            className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                            value={birthCertCredentials.thirteen_first}
                                            onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, thirteen_first:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <label htmlFor="middle" className="text-green text-sm">
                                            (Middle)
                                        </label>
                                        <input 
                                            type="text" 
                                            id="middle" 
                                            className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                            value={birthCertCredentials.thirteen_middle}
                                            onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, thirteen_middle:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center flex-1">
                                        <label htmlFor="last" className="text-green text-sm">
                                            (Last)
                                        </label>
                                        <input 
                                            type="text" 
                                            id="last" 
                                            className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                            value={birthCertCredentials.thirteen_last}
                                            onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, thirteen_last:e.target.value}))}}
                                        />
                                    </div>
                                </div>
                                {/* number 14 */}
                                <div className="grid grid-cols-3 border-b-2 border-green">
                                    <div className="col-span-2 border-e-2 border-green p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <label htmlFor="citizenship" className="text-green font-semibold uppercase">
                                                14. CITIZENSHIP
                                            </label>
                                            <input 
                                                type="text" 
                                                id="citizenship" 
                                                className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"
                                                value={birthCertCredentials.fourteen_citizenship}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, fourteen_citizenship:e.target.value}))}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1 p-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <label htmlFor="religion" className="text-green font-semibold uppercase">
                                                15. RELIGION
                                            </label>
                                            <input 
                                                type="text" 
                                                id="religion" 
                                                className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"
                                                value={birthCertCredentials.fifteen_religion}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, fifteen_religion:e.target.value}))}}
                                            />
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
                                            <input 
                                                type="text" 
                                                id="citizenship" 
                                                className="w-full border-none focus:outline-none focus:ring-transparent h-10 text-sm"
                                                value={birthCertCredentials.sixteen_occupation}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, sixteen_occupation:e.target.value}))}}
                                            />
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
                                            <input 
                                                type="text" 
                                                id="years" 
                                                className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-14"
                                                value={birthCertCredentials.seventeen_ageAtTheTime}
                                                onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, seventeen_ageAtTheTime:e.target.value}))}}
                                            />
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
                                <input 
                                    type="text" 
                                    id="last" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                    value={birthCertCredentials.eighteen_DateAndPlaceOfMarriageOfParents}
                                    onChange={(e)=>{setBirthCertCredentials(prev =>({...prev, eighteen_DateAndPlaceOfMarriageOfParents:e.target.value}))}}
                                />
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
                                    <input 
                                        type="radio" 
                                        id="physician" 
                                        className="cursor-pointer"
                                        name="attendant"
                                        value="physician"
                                        onChange={(e)=>{handleChangeAttendant(e)}}
                                    />
                                </div>
                                <div className="flex flex-row-reverse items-center gap-2">
                                    <label htmlFor="nurse" className="text-sm text-green cursor-pointer">2. Nurse</label>
                                    <input 
                                        type="radio" 
                                        id="nurse" 
                                        className="cursor-pointer"
                                        name="attendant"
                                        value="nurse"
                                        onChange={(e)=>{handleChangeAttendant(e)}}
                                    />
                                </div>
                                <div className="flex flex-row-reverse items-center gap-2">
                                    <label htmlFor="midwife" className="text-sm text-green cursor-pointer">3. Midwife</label>
                                    <input 
                                        type="radio" 
                                        id="midwife" 
                                        className="cursor-pointer"
                                        name="attendant"
                                        value="midwife"
                                        onChange={(e)=>{handleChangeAttendant(e)}}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-[3.6rem]">
                                <div className="flex flex-row-reverse items-center gap-2">
                                    <label htmlFor="traditionMidWife" className="text-sm text-green cursor-pointer">4. Hilot (traditional Midwife)</label>
                                    <input 
                                        type="radio" 
                                        id="traditionMidWife" className="cursor-pointer"
                                        name="attendant"
                                        value="traditional Midwife"
                                        onChange={(e)=>{handleChangeAttendant(e)}}
                                    />
                                </div>
                                <div className="flex flex-row-reverse items-center gap-2">
                                    {
                                        nineTeenAIsOthers &&
                                        (
                                            <input 
                                                type="text"
                                                className="h-7  text-sm border-x-0 border-t-0 border-green focus:outline-none focus:ring-transparent focus:border-green"
                                                value={birthCertCredentials.nineteenA_attendant}
                                                onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, nineteenA_attendant:e.target.value}))}}
                                            />
                                        )
                                    }
                                    <label htmlFor="others_2" className="text-sm text-green cursor-pointer">5. Others (Specify)</label>
                                    <input 
                                        type="radio" 
                                        id="others_2" 
                                        className="cursor-pointer"
                                        name="attendant"
                                        value="others"
                                        onChange={(e)=>{handleChangeAttendant(e)}}
                                    />
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
                                <input type="text" className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-28" value={birthCertCredentials.nineteenB_bornAliveAt} onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, nineteenB_bornAliveAt:e.target.value}))}}/>
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
                                                ref={nineteenB_SignatureRef}
                                                onChange={handleNumberNinteenFileChange}
                                            />
                                            <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                                Choose File
                                            </div>
                                        </div>
                                        {
                                            nineteenBSignatureSrc && (
                                                <figure className="absolute right-20">
                                                    <img 
                                                        src={`${nineteenBSignatureSrc}`}
                                                        className="h-10 w-28 object-contain"
                                                    />
                                                </figure>
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                        <input 
                                            type="text" 
                                            id="nameInPrint" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.nineteenB_nameInPrint}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, nineteenB_nameInPrint:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="titleOrPosition_1" className="text-sm text-green w-40">Title or Position</label>
                                        <input 
                                            type="text" 
                                            id="titleOrPosition_1" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.nineteenB_titleAndPosition}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, nineteenB_titleAndPosition:e.target.value}))}}
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
                                            value={birthCertCredentials.nineteenB_address}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, nineteenB_address:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="date" className="text-sm text-green">Date</label>
                                        <input 
                                            type="text" 
                                            id="date" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.nineteenB_date}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, nineteenB_date:e.target.value}))}}
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
                                                ref={twenty_SignatureRef}
                                                onChange={handleNumberTwentyFileChange}
                                            />
                                            <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                                Choose File
                                            </div>
                                        </div>
                                        {
                                            twentySignatureSrc && (
                                                <figure className="absolute right-20">
                                                    <img 
                                                        src={`${twentySignatureSrc}`}
                                                        className="h-10 w-28 object-contain"
                                                    />
                                                </figure>
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                        <input 
                                            type="text" 
                                            id="nameInPrint" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.twenty_nameInPrint}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, twenty_nameInPrint:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="titleOrPosition_2" className="text-sm text-green w-80">Relationship to the child</label>
                                        <input 
                                            type="text" 
                                            id="titleOrPosition_2" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.twenty_relationToChild}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, twenty_relationToChild:e.target.value}))}}
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
                                            value={birthCertCredentials.twenty_address}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, twenty_address:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="date" className="text-sm text-green">Date</label>
                                        <input 
                                            type="text" 
                                            id="date" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.twenty_date}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, twenty_date:e.target.value}))}}
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
                                                ref={twentyOne_SignatureRef}
                                                onChange={handleNumberTwentyOneFileChange}
                                            />
                                            <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                                Choose File
                                            </div>
                                        </div>
                                        {
                                            twentyOneSignatureSrc && (
                                                <figure className="absolute right-20">
                                                    <img 
                                                        src={`${twentyOneSignatureSrc}`}
                                                        className="h-10 w-28 object-contain"
                                                    />
                                                </figure>
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                        <input 
                                            type="text" 
                                            id="nameInPrint" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.twentyOne_nameInPrint}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, twentyOne_nameInPrint:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="titleOrPosition_3" className="text-sm text-green w-40">Title of Position</label>
                                        <input 
                                            type="text" 
                                            id="titleOrPosition_3" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.twentyOne_titleOrPosition}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, twentyOne_titleOrPosition:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="date" className="text-sm text-green">Date</label>
                                        <input 
                                            type="text" 
                                            id="date" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.twentyOne_date}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, twentyOne_date:e.target.value}))}}
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
                                                ref={twentyTwo_SignatureRef}
                                                onChange={handleNumberTwentyTwoFileChange}
                                            />
                                            <div className="text-gray-700 text-xs text-start font-medium py-1 px-2 border-b-[1px] border-green cursor-pointer hover:border-gray-600">
                                                Choose File
                                            </div>
                                        </div>
                                        {
                                            twentyTwoSignatureSrc && (
                                                <figure className="absolute right-20">
                                                    <img 
                                                        src={`${twentyTwoSignatureSrc}`}
                                                        className="h-10 w-28 object-contain"
                                                    />
                                                </figure>
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="nameInPrint" className="text-sm text-green w-36">Name in Print</label>
                                        <input 
                                            type="text" 
                                            id="nameInPrint" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.twentyTwo_nameInPrint}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, twentyTwo_nameInPrint:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <label htmlFor="titleOrPosition_4" className="text-sm text-green w-40">Title of Position</label>
                                        <input 
                                            type="text" 
                                            id="titleOrPosition_4" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.twentyTwo_titleOrPosition}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, twentyTwo_titleOrPosition:e.target.value}))}}
                                        />
                                    </div>
                                    <div className="flex flex-row items-end gap-2">
                                        <label htmlFor="date" className="text-sm text-green">Date</label>
                                        <input 
                                            type="text" 
                                            id="date" 
                                            className="h-7 text-sm border-x-0 border-t-0 border-green focus:border-green focus:outline-none focus:ring-transparent w-full"
                                            value={birthCertCredentials.twentyTwo_date}
                                            onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, twentyTwo_date:e.target.value}))}}
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
                                value={birthCertCredentials.populationReferenceNumber}
                                onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, populationReferenceNumber:e.target.value}))}}
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
                                value={birthCertCredentials.fourtyOne}
                                onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, fourtyOne:e.target.value}))}}
                            />
                        </div>
                        <div className="px-5 mt-10 flex flex-col">
                            <span className="text-green text-sm">48</span>
                            <input 
                                type="text" 
                                className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={1}
                                value={birthCertCredentials.fourtyEight}
                                onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, fourtyEight:e.target.value}))}}
                            />
                        </div>
                        <div className="px-5 mt-10 flex gap-2">
                            <div className="flex flex-col">
                                <span className="text-green text-sm">49</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    value={birthCertCredentials.fourtyNine}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, fourtyNine:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-green text-sm">50</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-32 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={6}
                                    value={birthCertCredentials.fifthy}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, fifthy:e.target.value}))}}
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
                                    value={birthCertCredentials.fiftySix}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, fiftySix:e.target.value}))}}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-green text-sm">61</span>
                            <input 
                                type="text" 
                                className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={1}
                                value={birthCertCredentials.sixtyOne}
                                onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, sixtyOne:e.target.value}))}}
                            />
                        </div>
                        <div className="px-5 mt-10 flex flex-row gap-2">
                            <div className="flex flex-col">
                                <span className="text-green text-sm">62</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-20 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                    value={birthCertCredentials.sixtyTwo}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, sixtyTwo:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-green text-sm">64</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-28 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={4}
                                    value={birthCertCredentials.sixtyFour}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, sixtyFour:e.target.value}))}}
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
                                    value={birthCertCredentials.sixtyEight}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, sixtyEight:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">69</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-10 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    value={birthCertCredentials.sixtyNine}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, sixtyNine:e.target.value}))}}
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
                                    value={birthCertCredentials.seventy}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, seventy:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">72</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                    value={birthCertCredentials.seventyTwo}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, seventyTwo:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">74</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                    value={birthCertCredentials.seventyFour}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, seventyFour:e.target.value}))}}
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
                                    value={birthCertCredentials.seventySix}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, seventySix:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">79</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                    value={birthCertCredentials.seventyNine}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, seventyNine:e.target.value}))}}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-green text-sm">81</span>
                            <input 
                                type="text" 
                                className="h-7 w-28 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={5}
                                value={birthCertCredentials.eightyOne}
                                onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, eightyOne:e.target.value}))}}
                            />
                        </div>
                        <div className="flex flex-row mt-10">
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">86</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    value={birthCertCredentials.eightySix}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, eightySix:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">87</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={1}
                                    value={birthCertCredentials.eightySeven}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, eightySeven:e.target.value}))}}
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
                                    value={birthCertCredentials.eightyEight}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, eightyEight:e.target.value}))}}
                                />
                            </div>
                            <div className="flex flex-col px-5 mt-2">
                                <span className="text-green text-sm">91</span>
                                <input 
                                    type="text" 
                                    className="h-7 w-12 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                    maxLength={2}
                                    value={birthCertCredentials.ninetyOne}
                                    onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, ninetyOne:e.target.value}))}}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-green text-sm">93</span>
                            <input 
                                type="text" 
                                className="h-7 w-9 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={1}
                                value={birthCertCredentials.ninetyThree}
                                onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, ninetyThree:e.target.value}))}}
                            />
                        </div>
                        <div className="flex flex-col px-5 mt-10">
                            <span className="text-green text-sm">94</span>
                            <input 
                                type="text" 
                                className="h-7 w-9 mt-2 border-2 border-gray-500 focus:border-gray-500 focus:outline-none focus:ring-transparent" 
                                maxLength={1}
                                value={birthCertCredentials.ninetyFour}
                                onChange={(e)=>{setBirthCertCredentials(prev => ({...prev, ninetyFour:e.target.value}))}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[65rem] flex items-end justify-end py-5">
                <button 
                    className="drop-shadow-md rounded-sm bg-darkCyan w-28 h-10 text-white disabled:cursor-not-allowed" 
                    onClick={handleSubmit}
                    disabled={isFormEmpty(birthCertCredentials)}
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

export default BirthCertInputs