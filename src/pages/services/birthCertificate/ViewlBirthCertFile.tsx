import { Navigate, useParams } from 'react-router-dom';
import { getSingleBirtCert } from '../../../services/getSingleBirtCert';
import { Loading, serverURL } from '../../../hooks/imports';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useActivityMutation } from '../../../services/sendActivity';
import { Tooltip } from 'flowbite-react';
import { AiFillPrinter } from "../../../hooks/icons";
function ViewlBirthCertFile() {
    const { id } = useParams();
    const contentRef = useRef<HTMLDivElement>(null);  // Reference to the certificate content

    //mutation
    const activityMutation = useActivityMutation();

    // Setup react-to-print for printing the specific certificate content
    const reactToPrintFn = useReactToPrint({
        contentRef, // Correctly pass the contentRef here
    });

    const { data,isLoading } = getSingleBirtCert(id as string)

    const handlePrint = () =>{
        reactToPrintFn();

        activityMutation.mutate(`Birth certificate printed for ${data?.one_first} (Registry No. ${data?.registryNumber})`);
    }
    
    if(isLoading) return <Loading/>
    
    if(!id){
        <Navigate to='*'/>
    }

    return (
        <div className='w-full flex flex-col'>
            <div className="w-full flex items-end justify-end px-4">
                <Tooltip content="Print">
                    <button onClick={handlePrint} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                        <AiFillPrinter />
                        <span className="sr-only">Print</span>
                    </button>
                </Tooltip>
            </div>
            <figure ref={contentRef} className='flex items-center justify-center'>
                <img 
                    src={`${serverURL}/${data.scannedFile}`}
                    className='object-cover'
                    loading='lazy'
                />
            </figure>
        </div>
    )
}

export default ViewlBirthCertFile