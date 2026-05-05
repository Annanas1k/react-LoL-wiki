import { useContext } from "react"
import { LanguageContext } from "../context/createContext"


export const useLanguageContext = () =>{
    return useContext(LanguageContext)
}