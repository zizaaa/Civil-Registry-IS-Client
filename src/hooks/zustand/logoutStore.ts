import { create } from "zustand";

interface logOutStoreType{
    showLogoutModal:boolean;
    logOutModalSetter: (bool:boolean) => void;
}

const logoutStore = create<logOutStoreType>((set)=>({
    showLogoutModal:false,

    logOutModalSetter: (bool)=>{
        set({showLogoutModal:bool})
    }
}));

export default logoutStore;