import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { errorToast, logoutStore, serverURL, successToast } from "../../hooks/imports";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutModal() {
    const { showLogoutModal, logOutModalSetter } = logoutStore();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey:['logout'],
        mutationFn: async()=>{
            const { data } = await axios.post(`${serverURL}/api/cris/logout`, {} ,{ withCredentials:true });

            return data;
        },
        onError:(data)=>{
            errorToast(`${data.message}`);
            logOutModalSetter(false)
        },
        onSuccess:(data)=>{
            successToast(`${data.message}`);
            logOutModalSetter(false)
            return navigate('/form/login');
        }
    });

    const handleLogOut = () =>{
        mutation.mutate();
    }
    return (
        <>
            <Modal show={showLogoutModal} size="md" onClose={() => logOutModalSetter(false)} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to log out?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={handleLogOut}>
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => logOutModalSetter(false)}>
                            No, cancel
                        </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LogoutModal