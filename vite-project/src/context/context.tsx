import { createContext, PropsWithChildren, ReactNode, useContext } from "react";
import { User, contextValues } from "../types/types";
import axios from "axios";
import jwt from 'jsonwebtoken';

export const myContext = createContext<contextValues | undefined>(undefined);

export const useAppContext = () => {
        const context = useContext(myContext);
        if(!context){
            throw new Error('This context cant be used outside context provider')
        }
        return context
    
}

const ContextProvider = ({children}: PropsWithChildren) => {

    async function submitLogin(userLogin: User): Promise<any> {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', userLogin, {
                withCredentials: true, 
            })
            console.log(response.data.success)
            return response
        } catch (error) {
            console.error(error)
            return false
        }
    }

    // async function submitRegistration(userRegistration: any): Promise<boolean> {
    //     try {
    //         const response = await axios.post('http://localhost:3000/auth/regiser', userRegistration);
    //         const success = response.data.success
    //         return success
    //     } catch (error) {
    //         console.error(error)
    //         return false
    //     }
    // }

    async function googleSignIn(): Promise<string | void>{
    try{
        window.location.href = 'http://localhost:3000/auth/google';
        const res = await axios.get('http://localhost:3000/auth/google/callback');
        // const getUserInfo = await axios.get('http:localhost:3000/user')
    }
    catch(error){
        console.error(error)
    }
}
    
    return(
        <myContext.Provider value={{
            submitLogin,
            googleSignIn
        }}>
            {children}
        </myContext.Provider>
    )
}

export default ContextProvider