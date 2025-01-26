import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { serverURL } from "./imports";

interface DataType {
    type: string;
    certificate_id: number;
}

export const useArchiveMutation = (refetch:()=>void, activityMutation: UseMutationResult<void, Error, string>, type:string) => {
    return useMutation({
        mutationFn: async (archiveData: DataType) => {
            const { data } = await axios.post(
                `${serverURL}/api/cris/archive`,
                archiveData,
                { withCredentials: true }
            );
            return data;
        },
        onError(error){
            console.error(error)
        },
        onSuccess(){
            activityMutation.mutate(`${type} successfully archived`);
            refetch();
        }
    });
};
