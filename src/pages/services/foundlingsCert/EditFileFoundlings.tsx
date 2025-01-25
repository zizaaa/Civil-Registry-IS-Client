import { useEffect, useRef, useState } from "react"
import { Toaster } from "react-hot-toast"
import { ScannedFileTypes } from "../../../types/foundLingTypes"
import { FaTrashCan } from "react-icons/fa6";
import { FileInput, Label } from "flowbite-react";
import { errorToast, LoaderDefault, Loading, serverURL, successToast } from "../../../hooks/imports";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleFoundlingsCert } from "../../../services/getSingleFoundlingsCert";
import { useActivityMutation } from "../../../services/sendActivity";

function EditFileFoundlings() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [scannedFileData, setScannedFileData] = useState<ScannedFileTypes>({
        one_name:"",
        registryNumber:"",
        five_place:"",
        four_dateAndTime:"",
    })
    const scannedFileRef = useRef<HTMLInputElement | null>(null);
    const [scannedFileSrc, setScannedFileSrc] = useState<string>('');
    const [tempImage, setTemptImage] = useState<string>('');
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const { data, isLoading } = getSingleFoundlingsCert(id as string);
    const activityMutation = useActivityMutation();

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

    // * mutation
    const mutation = useMutation({
        mutationFn: async (formData:ScannedFileTypes|FormData) =>{
            const { data } = await axios.post(`${serverURL}/api/cris/foundling-certificate/update/file/${id}`, formData, {  withCredentials:true })
            
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
            activityMutation.mutate(`Foundling certificate updated with REGISTRY Number: ${scannedFileData.registryNumber}`);
            navigate('/birth-certificate');
        }
    });

    // * submit scanned file
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
                one_name:data.one_name ? data.one_name:"",
                registryNumber:data.registryNumber ? data.registryNumber:"",
                five_place:data.five_place ? data.five_place:"",
                four_dateAndTime:data.four_dateAndTime ? data.four_dateAndTime:"",
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
        <div>
            <Toaster/>
            <div className="px-3">
                <h1 className="text-2xl font-semibold mb-2">Upload scanned file</h1>
                <div className="mb-5">
                    <div className="col-span-1 py-2 ">
                        <label htmlFor="registryNumber" className="text-gray-800 font-semibold uppercase">
                            Registry No.
                        </label>
                        <input 
                            type="text" 
                            id="registryNumber" 
                            className="w-full border-0 focus:outline-none focus:ring-transparent" 
                            value={scannedFileData.registryNumber} 
                            onChange={(e)=>{setScannedFileData(prev => ({...prev, registryNumber:e.target.value.toLocaleUpperCase()}))}}
                        />
                    </div>
                    <div className="flex flex-col p-2 w-full">
                        <div>
                            <span className="text-gray-800 font-semibold uppercase">
                                Name
                            </span>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col items-center flex-1">
                                <input 
                                    type="text" 
                                    id="first" 
                                    className="w-full border-none focus:outline-none focus:ring-transparent h-7 text-sm"
                                    value={scannedFileData.one_name}
                                    onChange={(e)=>{setScannedFileData(prev => ({...prev, one_name:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div>
                            <span className="text-gray-800 font-semibold uppercase">Place where found</span>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col flex-1 justify-between gap-2">
                                <input 
                                    type="text" 
                                    id="name_of_place_2" 
                                    className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                    value={scannedFileData.five_place}
                                    onChange={(e)=>{setScannedFileData(prev =>({...prev, five_place:e.target.value.toLocaleUpperCase()}))}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div>
                            <span className="text-gray-800 font-semibold uppercase">Date and time when found</span>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col flex-1 justify-between gap-2">
                                <input 
                                    type="text" 
                                    id="name_of_place_2" 
                                    className="w-full h-7 text-sm border-none focus:outline-none focus:ring-transparent"
                                    value={scannedFileData.four_dateAndTime}
                                    onChange={(e)=>{setScannedFileData(prev =>({...prev, four_dateAndTime:e.target.value.toLocaleUpperCase()}))}}
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
                        // disabled={isScannedDataEmpty(scannedFileData) || !scannedFileRef.current?.files?.[0]}
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
        </div>
    )
}

export default EditFileFoundlings