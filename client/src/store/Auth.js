import { createContext, useContext, useState } from "react";

// createContext
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({children}) => {
    const demoVal = "Anmol"
    return (
        <AuthContext.Provider value={{demoVal}}>
            {children}
        </AuthContext.Provider>
    )
}

// Consumer
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}
