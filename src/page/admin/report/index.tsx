/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { CourseReviewDao } from "../../../controller/coursereviewdao"
import { AdminMenu } from "../../../util/admin"
import { useEffect, useState } from "react"
import { Email, Person, Phone, StarRate } from "@mui/icons-material"
export const AdminReport=()=>{
    const [lectureReviewList,setRectureReviewList]=useState<any>([]);
    useEffect(
        ()=>{
            new CourseReviewDao().listOfPrincipleLectureReviews()
            .then(data=>setRectureReviewList(data.data));
        },[]
    )
    return <Navigation items={AdminMenu}>
        <div className="font-bold text-xl py-8">
            Lecture Review Report
        </div>
    <div className="grid lg:grid-cols-4 gap-3 mt-3">
      {
        lectureReviewList!=undefined&&lectureReviewList.length!=0&&
        lectureReviewList.map((data:any)=><section className="border p-1 flex flex-col">
        <Avatar src={data.user.picture} className="m-auto"/>
        <section className="flex m-auto">
            <div>
            <div className="mb-2"><Person/>  {data.user.name}</div>
            <div className="mb-2"><Email/>  {data.user.email}</div>
            <div><Phone/>  {data.user.phoneNumber}</div>
            </div>
        </section>
        <div className="flex justify-between items-center w-full mt-auto">
           <div>
           {
                [...new Array(5)].map((_,index:number)=><span key={index}>
                <StarRate className={`${index<=Number(data.marks)-1?'text-slate-900':'text-slate-300'}`}/>
                </span>
                )
            }
           </div>
            <div>{Number(data.marks)!=0?<>{Number(data.marks)}/5</>:'No review'}</div>
            </div>
        </section>)
      }  
    </div>
    
    </Navigation>
}