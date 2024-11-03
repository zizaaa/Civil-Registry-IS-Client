import { useQuery } from "@tanstack/react-query";
import { MarriageCertTypes } from "../types/marriageCertTypes";
import axios from "axios";
import { serverURL } from "../hooks/imports";

export const getSingleMarriageCert = (id:string) =>{
    return useQuery({
        queryKey:['marriageCert-single-data'],
        queryFn: async():Promise<MarriageCertTypes>=>{
            const { data } = await axios.get(`${serverURL}/api/cris/marriage-certificate/get-single?id=${id}`, { withCredentials:true });

            return data;
        }
    });
}