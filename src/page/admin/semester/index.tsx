import { useEffect, useState } from "react"
import { Navigation } from "../../../component/navigation"
import { AdminMenu } from "../../../util/admin"
import { HodOverview } from "../../hod/index/component/overview"
import { SemesterDao } from "../../../controller/semesterdao"
import { toast } from "sonner"
import { DisplaySemesterCourses } from "./courses"
import { DisplayStudent } from "./student"
import { Role } from "../../../enum/role"
import { Dialog, IconButton } from "@mui/material"
import { Createsemester } from "../../../form/semester/create"
import { Add, Close } from "@mui/icons-material"
export const AdminManageSemester = () => {
    const [semesterList, setSemesterList] = useState([]);
    const [currentSemester, setCurrentSemester] = useState<any>({});
    useEffect(
        () => {
            new SemesterDao().getAllSemester().then((res) => {
                setSemesterList(res.data)
            }).catch((err) => {
                toast.error(err.message);
            });
        }, []
    )
    useEffect(
        () => {

            new SemesterDao().getCurrentSemester()
                .then((res) => {
                    setCurrentSemester(res.data)
                }).catch((err) => {
                    toast.error(err.message);
                })
        }, []
    );
    const handleSemesterChange = (e: any) => {
        new SemesterDao().getSemester(e.target.value).then(data =>
            setCurrentSemester(data.data))
    }
    const [openDialog, setOpenDialog] = useState({ open: false, type: 'create' });
    const [activeBtn, setActiveBtn] = useState("student");
    const activeClass = "bg-blue-900 text-white border border-gray-300 p-2 rounded";
    const inactiveClass = "border border-gray-300 p-2 rounded";
    return <Navigation items={AdminMenu}>
        <div className="flex items-center justify-between clear-both pt-3">
            <div className="font-bold text-xl">
                Semesters
            </div>
            <button onClick={() => setOpenDialog({ open: true, type: 'create' })} className="bg-blue-900 text-white p-2 rounded-md"><Add /></button>
        </div>
        <HodOverview />
        <section className="flex items-center justify-between  gap-2 bg-blue-200">
            <div>
                <button className={activeBtn === "student" ? activeClass : inactiveClass} onClick={() => setActiveBtn("student")}>Registered student</button>
                <button className={activeBtn === "lecture" ? activeClass : inactiveClass} onClick={() => setActiveBtn("lecture")}>Available Lecture</button>
                <button className={activeBtn === "course" ? activeClass : inactiveClass} onClick={() => setActiveBtn("course")}>Available Courses</button>
            </div>
            <select onChange={handleSemesterChange} name="" id="" className="p-1 mx-1 rounded border border-gray-300">
                <option value="">Semester filtering</option>
                {semesterList != undefined && semesterList.length != 0 && semesterList.map((item: any, index: number) => <option key={item.id + index} value={item.id}>{item.semesterName}</option>)
                }
            </select>
        </section>
        {activeBtn == 'student' && <DisplayStudent semester={currentSemester} role={Role.ROLE_STUDENT} />}
        {activeBtn == 'lecture' && <DisplayStudent semester={currentSemester} role={Role.ROLE_INSTRACTOR} />}
        {activeBtn == 'course' && <DisplaySemesterCourses />}
        <Dialog maxWidth='xs' PaperProps={{ className: 'w-full' }} open={openDialog.open}>
            <Createsemester semester={currentSemester}>
                <section className="flex justify-between p-2 items-center mb-4">
                    <div>
                        {openDialog.type == 'create' ? <>
                            <div className="text-blue-900/80 font-bold text-lg">Add new semester</div>
                            <div className="text-sm text-slate-600">
                                Add new semester to the list of semester fill the form below

                            </div>
                        </> : <>Update Course</>}
                    </div>
                    <IconButton className="bg-blue-200/50" onClick={() => setOpenDialog({ ...openDialog, open: false })}><Close /></IconButton>
                </section>
            </Createsemester>
        </Dialog>
    </Navigation>
}