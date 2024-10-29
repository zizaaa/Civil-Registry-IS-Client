import axios from "axios";
import { serverURL } from "../hooks/imports";

export async function sessionCookie() {
    try {
        const { data } = await axios.get(`${serverURL}/api/cris/auth-check`, {
            withCredentials: true, // This ensures that cookies are sent with the request
        });

        return data; // Return the response data
    } catch (error) {
        console.error("Error during authentication check:", error);
        return { isAuthenticated: false }; // Return a default value on error
    }
}
