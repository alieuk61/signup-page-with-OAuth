import { createContext, PropsWithChildren, ReactNode, useContext } from "react";
import { User, contextValues } from "../types/types";
import axios from "axios";

export const myContext = createContext<contextValues | undefined>(undefined);

export const useAppContext = () => {
        const context = useContext(myContext);
        if(!context){
            throw new Error('This context cant be used outside context provider')
        }
        return context
    
}

const ContextProvider = ({children}: PropsWithChildren) => {

    async function submitLogin(userLogin: User): Promise<boolean> {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', userLogin, {
                withCredentials: true, 
            })
            console.log(response.data.success)
            return response.data.success
        } catch (error) {
            console.error(error)
            return false
        }
    }

    // async function submitRegistration(userRegistration: idkyet): Promise<boolean> {
    //     try {
    //         const response = await axios.post('http://localhost:3000/auth/regiser', userRegistration);
    //         const success = response.data.success
    //         return success
    //     } catch (error) {
    //         console.error(error)
    //         return false
    //     }
    // }
    
    return(
        <myContext.Provider value={{
            submitLogin
        }}>
            {children}
        </myContext.Provider>
    )
}

export default ContextProvider