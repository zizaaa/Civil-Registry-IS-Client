import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { confirmationStore, errorToast, serverURL, successToast } from "../../hooks/imports";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

function DeleteConfirmation() {
    const { showConfirmationModal, endPoint, id, setShowConfirmationModal } = confirmationStore();

    const mutation = useMutation({
        mutationKey:['delete'],
        mutationFn: async()=>{
            const { data } = await axios.post(`${serverURL}${endPoint}/delete`, {id} ,{ withCredentials:true });

            return data;
        },
        onError:(data)=>{
            errorToast(`${data.message}`);
            setShowConfirmationModal(false, '', null)
        },
        onSuccess: (data)=>{
            successToast(`${data.message}`);
            setShowConfirmationModal(false, '', null)
            location.reload();
        }
    });

    const handleDelete = () =>{
        mutation.mutate();
    }
    return (
        <>
            <Modal show={showConfirmationModal} size="md" onClose={() => setShowConfirmationModal(false, '', null)} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this certificate?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={handleDelete}>
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setShowConfirmationModal(false, '', null)}>
                            No, cancel
                        </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteConfirmation