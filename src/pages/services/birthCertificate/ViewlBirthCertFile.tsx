import { Navigate, useParams } from 'react-router-dom';
import { getSingleBirtCert } from '../../../services/getSingleBirtCert';
import { Loading, serverURL } from '../../../hooks/imports';
import { useRef } from 'react';
import { useActivityMutation } from '../../../services/sendActivity';
import { Tooltip } from 'flowbite-react';
import { MdFileDownload } from "../../../hooks/icons";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


function ViewlBirthCertFile() {
    const { id } = useParams();
    const contentRef = useRef<HTMLDivElement>(null);  // Reference to the certificate content

    //mutation
    const activityMutation = useActivityMutation();

    const { data,isLoading } = getSingleBirtCert(id as string)

        const handlePrint = async () => {
        const element = contentRef.current; // Get the content to be captured
    
        // Check if element is null
        if (!element) {
            console.error('Element not found');
            return;
        }
    
        // Temporarily hide overflow
        const originalOverflow = element.style.overflow;
        element.style.overflow = 'hidden';
    
        try {
            // Capture the screenshot and convert it to a canvas
            const canvas = await html2canvas(element, {
                useCORS: true, // To handle cross-origin images
            });
    
            // Convert the canvas to an image
            const imageData = canvas.toDataURL('image/png');
    
            // Reset the overflow style
            element.style.overflow = originalOverflow;
    
            // Create a new PDF
            const pdf = new jsPDF();
    
            // Calculate the margin (20px is about 5.6mm)
            const margin = 5.6; // In mm
    
            // A4 size is 210mm x 297mm
            const pageWidth = 210;
            const pageHeight = 297;
    
            // Add the screenshot as an image to the PDF (with margin)
            // Adjust the image position (x, y) and size (width, height) to fit within the margins
            pdf.addImage(imageData, 'PNG', margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
    
            // Save the PDF
            pdf.save(`${data?.one_last}-birth-certificate.pdf`); // Filename
            
            activityMutation.mutate(`Birth certificate printed for ${data?.one_first} (Registry No. ${data?.registryNumber})`);
        } catch (error) {
            console.error('Error capturing screenshot:', error);
        }
    };
    
    if(isLoading) return <Loading/>
    
    if(!id){
        <Navigate to='*'/>
    }

    return (
        <div className='w-full flex flex-col'>
            <div className="w-full flex items-end justify-end px-4">
                <Tooltip content="Download">
                    <button onClick={handlePrint} className='p-2.5 ms-2 text-sm font-medium text-white bg-darkCyan rounded-md drop-shadow-md border border-darkCyan hover:bg-darkBlueTeel'>
                        <MdFileDownload />
                        <span className="sr-only">Download</span>
                    </button>
                </Tooltip>
            </div>
            <figure ref={contentRef} className='flex items-center justify-center'>
                <img 
                    src={`${serverURL}/${data?.scannedFile}`}
                    className='object-cover'
                    loading='lazy'
                />
            </figure>
        </div>
    )
}

export default ViewlBirthCertFile