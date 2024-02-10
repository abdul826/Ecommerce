import { createContext, useState } from "react";

export const SearchContext = createContext("");

export const SearchContextProvider = ({children})=>{

    const [searchVal,setSearchVal] = useState("");

    console.log("SearchVal=>",searchVal);
    return (
        <SearchContext.Provider value={{searchVal,setSearchVal}}>
            {children}
        </SearchContext.Provider>
    )
}