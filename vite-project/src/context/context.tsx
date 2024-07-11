import { createContext, PropsWithChildren, ReactNode } from "react";
import { User, contextValues } from "../types/types";
import axios from "axios";

export const myContext = createContext<contextValues | undefined>(undefined);


const ContextProvider = ({children}: PropsWithChildren) => {

    async function submitLogin(userLogin: User): Promise<boolean> {
        try {
            const response = await axios.post('http://localhost:3000/users', userLogin)
            return response.data.success
        } catch (error) {
            console.error(error)
            return false
        }
    }
    
    return(
        <myContext.Provider value={{
            submitLogin
        }}>
            {children}
        </myContext.Provider>
    )
}

export default ContextProvider