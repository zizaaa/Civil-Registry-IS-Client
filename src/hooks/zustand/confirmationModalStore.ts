import { create } from "zustand";

interface ConfirmationType{
    showConfirmationModal:boolean;
    setShowConfirmationModal: (bool:boolean, endPoint:string, id:number | null) => void;
    endPoint:string;
    id:number | null | string;
}

const confirmationStore = create<ConfirmationType>((set) => ({
    showConfirmationModal: false,
    endPoint: '',
    id: null,

    setShowConfirmationModal: (bool, endPoint, id) => {
        set({
            showConfirmationModal: bool,
            endPoint,
            id,
        });
    },
}));

export default confirmationStore;