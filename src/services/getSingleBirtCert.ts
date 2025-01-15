import axios from "axios";
import { serverURL } from "../hooks/imports";
import { useQuery } from "@tanstack/react-query";
import { BirthCertDataType } from "../types/birthCerthTypes";

export const getSingleBirtCert = (id:string) =>{
    return useQuery({
        queryKey:['single-data'],
        queryFn: async(): Promise<BirthCertDataType>=>{
            const { data } = await axios.get(`${serverURL}/api/cris/birth-certificate/get-single?id=${id}`, { withCredentials:true });

            return data;
        }
    });
}