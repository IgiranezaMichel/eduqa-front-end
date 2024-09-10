import { Add, Close } from "@mui/icons-material"
import { Suggestions } from "../index/component/suggestions"
import { CourseOnTrack } from "../index/component/courseontrack"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { SemesterDao } from "../../../controller/semesterdao"
import { Dialog, IconButton } from "@mui/material"
import { Createsemester } from "../../../form/semester/create"
import { HodOverview } from "../index/component/overview"
import { ISemester } from "../../../interface/semester"

export const HodDisplaySemester = () => {
    const [semesterList, setSemesterList] = useState([])
    const [semester, setSemester] = useState<ISemester>({
        endDate:'',
        id:'',
        name:'',
        startingDate:'',
    })
    useEffect(
        ()=>{
            new SemesterDao().getAllSemester().then((res) => {
                setSemesterList(res.data)
            }).catch((err) => {
                toast.error(err.message);
            })
        },[]
    )
    
    const [openDialog, setOpenDialog] = useState({ open: false, type: 'create' });
 
    
    return <div >

        <div className="flex items-center justify-between clear-both py-3">
            <section>
                <div className="font-bold text-xl">
                    Semesters
                </div>
            </section>
            <section className="flex items-center gap-3">
                <select name="" id="" className="p-2 rounded border border-gray-300">
                    <option value="">Semester filtering</option>
                    {semesterList.map((item:any, index:number) => <option key={item.id+index} value={item.id}>{item.semesterName}</option>)
                    }
                </select>
                <button onClick={() => setOpenDialog({ open: true, type: 'create'})} className="bg-blue-900 text-white p-2 rounded-md"><Add/></button>
            </section>
        </div>

        <HodOverview/>

        <section>
            <div className="flex justify-between mt-5 gap-6">
                <section className=" w-[60%]">
                    <Suggestions />
                </section>
                <section className=" w-[40%]">
                    <CourseOnTrack />
                </section>
            </div>
        </section>
        <Dialog maxWidth='xs' PaperProps={{ className: 'w-full' }} open={openDialog.open}>
            <Createsemester semester={semester}>
                <section className="flex justify-between p-2 items-center mb-4">
                    <div>
                        {openDialog.type == 'create' ? <>
                            <div className="text-blue-900/80 font-bold text-lg">Add new Course</div>
                            <div className="text-sm text-slate-600">
                                Add new student to the list of student fill the form below

                            </div>
                        </> : <>Update Course</>}
                    </div>
                    <IconButton className="bg-blue-200/50" onClick={() => setOpenDialog({ ...openDialog, open: false })}><Close /></IconButton>
                </section>
            </Createsemester>
        </Dialog>
    </div>
}