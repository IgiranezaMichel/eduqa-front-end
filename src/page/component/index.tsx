import { AuthProvider } from "../../context/authentication"
import { OverviewHeading } from "./overview"

export const IndexOverviewHeading=()=>{
    return <AuthProvider>
        <OverviewHeading/>
    </AuthProvider>
}