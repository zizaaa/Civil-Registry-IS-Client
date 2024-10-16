import axios from "axios"
import { serverURL } from "../hooks/imports"

export async function sessionCookie(){
    try {
        const { data } = await axios.get(`${serverURL}/api/cris/auth-check`,{ withCredentials: true })
        
        return data    
    } catch (error) {
        console.error(error);
        return {isAuthenticated:false}
    }    
}