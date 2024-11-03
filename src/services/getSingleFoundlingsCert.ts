import { useQuery } from "@tanstack/react-query";
import { FoundlingsTypes } from "../types/foundLingTypes";
import axios from "axios";
import { serverURL } from "../hooks/imports";

export const getSingleFoundlingsCert = (id:string) =>{
    return useQuery({
        queryKey:['foundling-single-data'],
        queryFn: async():Promise<FoundlingsTypes>=>{
            const { data } = await axios.get(`${serverURL}/api/cris/foundling-certificate/get-single?id=${id}`, { withCredentials:true });

            return data;
        }
    });
}