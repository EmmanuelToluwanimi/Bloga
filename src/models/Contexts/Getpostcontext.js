import { createContext, useContext } from "react";

const getPostContext = createContext();

export function useGetPost() {
    return useContext(getPostContext);
}

export function GetPostProvider({ children }) {



    const value = {

    }

    return <getPostContext.Provider value={value}>
        {children}
    </getPostContext.Provider>
}