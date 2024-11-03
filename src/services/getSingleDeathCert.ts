import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { serverURL } from "../hooks/imports";

export const getSingleDeathCert = (id:string) =>{
    return useQuery({
        queryKey:['deathCert-single-data'],
        queryFn: async()=>{
            const { data } = await axios.get(`${serverURL}/api/cris/death-certificate/get-single?id=${id}`, { withCredentials:true });

            return data;
        }
    });
}