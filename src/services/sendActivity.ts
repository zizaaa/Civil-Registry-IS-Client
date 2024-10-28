import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { serverURL } from "../hooks/imports";

export const useActivityMutation = () => {
    return useMutation({
        mutationFn: async (message: string) => {
            await axios.post(
                `${serverURL}/api/cris/recent-activity/add-activity`,
                { message },
                { withCredentials: true }
            );
        },
    });
};
