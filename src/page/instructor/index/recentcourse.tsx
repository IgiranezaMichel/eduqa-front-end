import { ArrowRight } from "@mui/icons-material"

export const RecentCourse=()=>{
    return <>
    <div className="flex justify-between my-3">
        <div className="font-bold text-xl">Your Recent Course </div>
        <button className="rounded-md p-2 font-bold border border-blue-950 hover:bg-blue-600">View all <ArrowRight/></button>
    </div>
    </>
}