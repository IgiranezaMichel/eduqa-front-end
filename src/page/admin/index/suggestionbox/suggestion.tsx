import { useEffect, useState } from "react"
import { LectureCourseProgressCommentDao } from "../../../../controller/lecturecourseprogresscomment"
import { SemesterDao } from "../../../../controller/semesterdao"
import { Avatar } from "@mui/material";
import { Link } from "@mui/icons-material";

export const Suggestion = () => {
    const [semester, setSemester] = useState<any>({});
    const [latestComment, setLatestComment] = useState<any>([])
    useEffect(
        () => {
            new SemesterDao().getCurrentSemester().then(data => {
                setSemester(data.data); console.log(data.data);

            })
            if (Object.keys(semester).length != 0) {
                new LectureCourseProgressCommentDao().findLatestMessageForEachCourseContentReport(semester.id)
                    .then(data => {
                        setLatestComment(data.data)
                    });
            }
        }, [semester.id]
    )
    return <section>
       <section className="mb-3">
       <div className="font-bold text-xl">
            Recent suggestions
        </div>
        <div className="text-sm">
        Course progress report in a semester
    </div>
       </section>
        {latestComment != undefined && latestComment.length != 0 && latestComment.map((items: any) => <div key={items.id} className="border border-l-4 border-l-blue-900 p-1">
            <div className="float-end text-sm p-0">
                 <Link className="text-lg"/> 
            </div>
            <div className="flex justify-between clear-both">
                <div>
                    <div className="font-bord">
                        {items.courseName}
                    </div>
                </div>
                <div className="font-bold text-lg ">
                    <div>{items.lectureName}</div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="text-gray-400 flex text-sm font-bold items-center">
                    <Avatar sx={{ width: 20, height: 20 }} src={items.userPhoto} /> {items.comment}
                </div>
                <div className="text-sm italic">
                    {items.timeStamp}
                </div>
            </div>
        </div>)}
    </section>
}