import axios from "axios";
import { serverURL } from "../hooks/imports";
import { useQuery } from "@tanstack/react-query";

export const getSingleBirtCert = (id:string) =>{
    return useQuery({
        queryKey:['single-data'],
        queryFn: async()=>{
            const { data } = await axios.get(`${serverURL}/api/cris/birth-certificate/get-single?id=${id}`, { withCredentials:true });

            return data;
        }
    });
}