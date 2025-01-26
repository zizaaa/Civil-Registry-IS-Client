import { useEffect, useRef, useState } from 'react'
import { ScannedFileTypes } from '../../../types/birthCerthTypes'
import { FileInput, Label } from 'flowbite-react';
import { errorToast, LoaderDefault, Loading, serverURL, successToast } from '../../../hooks/imports';
import { FaTrashCan } from "../../../hooks/icons";
import { useMutation } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleBirtCert } from '../../../services/getSingleBirtCert';
import { Toaster } from 'react-hot-toast';
import { useActivityMutation } from '../../../services/sendActivity';

function EditFIleBirthCert() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [scannedFileData, setScannedFileData] = useState<ScannedFileTypes>({
            one_first:"",
            one_middle:"",
            one_last:"",
            registryNumber:"",
            twelve_house:"",
            twelve_cityOrMunicipality:"",
            twelve_province:"",
    })
    const [tempImage, setTemptImage] = useState<string>('');
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const scannedFileRef = useRef<HTMLInputElement | null>(null);
    const [scannedFileSrc, setScannedFileSrc] = useState<string>('');

    const { data, isLoading } = getSingleBirtCert(id as string)
    const activityMutation = useActivityMutation();

    const handleFileUpload = (fileRef: React.RefObject<HTMLInputElement>, setSrc: React.Dispatch<React.SetStateAction<string>>): void => {
        const file = fileRef.current?.files?.[0];

            if(file){
                const reader = new FileReader();

                reader.onload = (e) =>{
                    setSrc(e.target?.result as string);
                }

                reader.readAsDataURL(file);
                setIsChanged(true);
            }
    }

    const handleScannedFileUpdate = () =>{
        handleFileUpload(scannedFileRef, setScannedFileSrc);
    }

    
    const handleRemoveFilePreview = () =>{
        setScannedFileSrc('');
        if(scannedFileRef.current){
            scannedFileRef.current.value = "";
            setIsChanged(false);
        }
        
        if(tempImage){
            setTemptImage("");
            setIsChanged(false);
        }
    }

    const mutation = useMutation({
        mutationFn: async(formData:ScannedFileTypes|FormData)=>{
            const { data } = await axios.post(`${serverURL}/api/cris/birth-certificate/update/file/${id}`, formData , { withCredentials:true });

            return data;
        },
        onError:(error)=>{
            if(isAxiosError(error)){
                return errorToast(error.response?.data.error)
            }
            return errorToast("Something went wrong during registering birth certificate.");
        },
        onSuccess: (data)=>{
            successToast(`${data.message}`);
            activityMutation.mutate(`Birth certificate updated with REGISTRY Number: ${scannedFileData.registryNumber ? scannedFileData.registryNumber:"N/A"}`);
            navigate('/birth-certificate');
        }
    });

    const handleSubmitScannedFile = () => {
        // If a file is changed, use FormData; otherwise, send scannedFileData directly
        let payload;
    
        if (isChanged) {
            const formData = new FormData();
            // Append all scannedFileData fields
            Object.entries(scannedFileData).forEach(([key, value]) => {
                formData.append(key, value !== null && value !== undefined ? value : '');
            });
    
            // Append the file
            const file = scannedFileRef.current?.files?.[0];
            if (file) {
                console.log("Appending file to FormData:", file);
                formData.append('scannedFile', file);
            }
    
            payload = formData;
        } else {
            // Send data as JSON if no file changes
            payload = scannedFileData;
        }
    
        mutation.mutate(payload); // Send the appropriate payload
    };
    
    useEffect(()=>{
        if(data && !isLoading){
            setScannedFileData({
                one_first:data.one_first ? data.one_first:"",
                one_middle:data.one_middle ? data.one_middle: "",
                one_last:data.one_last ? data.one_last:"",
                registryNumber:data.registryNumber ? data.registryNumber:"",
                twelve_house:data.twelve_house ? data.twelve_house:"",
                twelve_cityOrMunicipality:data.twelve_cityOrMunicipality ? data.twelve_cityOrMunicipality:"",
                twelve_province:data.twelve_province ? data.twelve_province:""
            })
            setTemptImage(data.scannedFile ? data.scannedFile:"");
        }
    },[id,data])

    if(!id){
        navigate('/birth-certificate');
        return;
    }else if(isLoading && !data){
        return <Loading/>
    }

    return (
        <div className="px-3">
            <Toaster/>
            <h1 className="text-2xl font-semibold mb-2">Upload scanned file</h1>
            <div className="mb-5">
                <div className="col-span-1 py-2 ">
                    <label htmlFor="registryNumber" className="text-green font-semibold uppercase">
                        Registry No.
                    </label>
                    <input 
                        type="text" 
                        id="registryNumber" 
                        className="w-full border-0 focus:outline-none focus:ring-transparent" 
                        value={scannedFileData.registryNumber ? scannedFileData.registryNumber.toUpperCase():""} 
                        onChange={(e)=>{setScannedFileData(prev => ({...prev, registryNumber:e.target.value.toUpperCase()}))}}
                    />
                </div>
                <div className="flex flex-col p-2 w-full">
                    <div>
                        <span className="text-green font-semibold uppercase">
                            Child Name
                        </span>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col items-center flex-1">
                            <label htmlFor="first" className="text-green text-sm">
                                (First)
                            </label>
                            <input 
                                type="text" 
                                id="first" 
                                className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                value={scannedFileData.one_first.toUpperCase()}
                                onChange={(e)=>{setScannedFileData(prev => ({...prev, one_first:e.target.value.toUpperCase()}))}}
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
                                value={scannedFileData.one_middle.toUpperCase()}
                                onChange={(e)=>{setScannedFileData(prev => ({...prev, one_middle:e.target.value.toUpperCase()}))}}
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
                                value={scannedFileData.one_last.toUpperCase()}
                                onChange={(e)=>{setScannedFileData(prev => ({...prev, one_last:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-2">
                    <div>
                        <span className="text-green font-semibold uppercase">Mother Residence</span>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col flex-1 justify-between gap-2">
                            <label htmlFor="name_of_place_2" className="text-sm text-green">
                                (House No., Street, Barangay)
                            </label>
                            <input 
                                type="text" 
                                id="name_of_place_2" 
                                className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                value={scannedFileData.twelve_house.toUpperCase()}
                                onChange={(e)=>{setScannedFileData(prev =>({...prev, twelve_house:e.target.value.toUpperCase()}))}}
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
                                value={scannedFileData.twelve_cityOrMunicipality.toUpperCase()}
                                onChange={(e)=>{setScannedFileData(prev =>({...prev, twelve_cityOrMunicipality:e.target.value.toUpperCase()}))}}
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
                                value={scannedFileData.twelve_province.toUpperCase()}
                                onChange={(e)=>{setScannedFileData(prev =>({...prev, twelve_province:e.target.value.toUpperCase()}))}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full items-center justify-center">
                <figure className={`flex items-center justify-center relative ${scannedFileSrc || tempImage ? '':'hidden'}`}>
                    <img src={tempImage ? `${serverURL}/${tempImage}`:scannedFileSrc} alt="scanned file"/>
                    <button onClick={handleRemoveFilePreview} className="absolute -top-1 -right-1 bg-gray-200 p-2 rounded-full text-red-700 drop-shadow-md">
                        <FaTrashCan/>
                    </button>
                </figure>
                <Label
                    htmlFor="dropzone-file"
                    className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${scannedFileSrc || tempImage ? "hidden":""}`}
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
                    </div>
                    <FileInput 
                        id="dropzone-file" 
                        className="hidden" 
                        accept=".png,.jpg,.jpeg"
                        ref={scannedFileRef}
                        onChange={handleScannedFileUpdate}
                    />
                </Label>
            </div>
            <div className="w-full flex justify-end">
                <button
                    className="mt-5 drop-shadow-md rounded-sm bg-darkCyan w-28 h-10 text-white disabled:cursor-not-allowed"
                    onClick={handleSubmitScannedFile}
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

export default EditFIleBirthCert