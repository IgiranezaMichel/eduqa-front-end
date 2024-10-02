import { useEffect, useState } from "react"
import { ILectureCourseContent } from "../../interface/lecturecoursecontent"
import JoditEditor from "jodit-react"
import { Button, TextField } from "@mui/material"
import { CourseContentDao } from "../../controller/courseContentDao"
import { toast, Toaster } from "sonner"
import { useLectureCourseContentContext } from "../../context/lecturecoursecontent"
export const CourseContentForm = (prop: { lectureCourseContent: any, className?: any }) => {
    const [courseContent, setCourseContent] = useState<ILectureCourseContent>({
        description: prop.lectureCourseContent.description,
        id: prop.lectureCourseContent.id,
        lectureCourseId: prop.lectureCourseContent.lectureCourseId,
        totalChapter: prop.lectureCourseContent.totalChapter
    })
    const { refresh, content } = useLectureCourseContentContext()
   useEffect(
    ()=>{
        if (Object.keys(content).length != 0) {
            setCourseContent({ ...courseContent, id: content.id })
        }
    },[content]
   )
    const submitFormHandler = (e: any) => {
        e.preventDefault();

        new CourseContentDao().createCourseContent(courseContent)
            .then(data => { refresh(); toast.success(data.data) })
            .catch(err => toast.error(err.response.data))
    }
    return <form onSubmit={submitFormHandler} className={prop.className}>
        <div className="text-center font-bold py-6">
            Add Course content
        </div>
        <div>
            <TextField type="number" label='Total chapter' className="mb-5" fullWidth onChange={e => setCourseContent({ ...courseContent, totalChapter: Number(e.target.value) })} />
        </div>
        <div className="font-bold">
            Course Content
        </div>
        <JoditEditor value={courseContent.description} onChange={e => setCourseContent({ ...courseContent, description: e })} />

        <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new course</Button>
        <Toaster />
    </form>
}