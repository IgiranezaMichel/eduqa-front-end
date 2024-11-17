import { useEffect, useState } from "react";
import { CourseReviewDao } from "../../controller/coursereviewdao";
import { StarRate } from "@mui/icons-material";

export const LectureReviews=()=>{
    const [reviews,setReviews]=useState<any>(0);
    useEffect(
        ()=>{
           new CourseReviewDao().getAllLectureReview().then(data=>{
            setReviews(data.data)
           })
        },[]
    )
    return  <section className="flex mt-1">
    <div className="items-center p-2 bg-green-800/10 text-black font-bold mx-2 hover:bg-blue-600">
            <div className="text-xl"><StarRate className="text-3xl" /></div>
        </div>
         <div>
         {[...new Array(5)].map((_,index:any)=><StarRate className={`${index<reviews?'text-yellow-300':'text-gray-300'}`}/>)}
         <p className="text-gray-500 text-sm">Overall reviews</p>
         </div>
    </section>
}