import { BookSharp, Dashboard,Handyman,People, PresentToAll } from "@mui/icons-material";
import { INavigationItems } from "../interface/navigationitems";

export const InstructorMenu:INavigationItems[]=[
    {icon:<Dashboard/>,link:'/instructor',name:'Overview'},
    // {icon:<Folder/>,link:'/instructor/semesters',name:'Semesters'},
    {icon:<People/>,link:'/instructor/student',name:'Student'},
    {icon:<PresentToAll/>,link:'/instructor/student/attendance',name:'Attendance'},
    {icon:<Handyman/>,link:'/instructor/student/deliberation',name:'Deliberation'},
    {icon:<BookSharp/>,link:'/instructor/course',name:'Courses'}
]