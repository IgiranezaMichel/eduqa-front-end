import { BookSharp, Dashboard, Folder,People } from "@mui/icons-material";
import { INavigationItems } from "../interface/navigationitems";

export const InstructorMenu:INavigationItems[]=[
    {icon:<Dashboard/>,link:'/instructor',name:'Overview'},
    {icon:<Folder/>,link:'/instructor/semesters',name:'Semesters'},
    {icon:<People/>,link:'/instructor/student',name:'Student'},
    {icon:<BookSharp/>,link:'/instructor/course',name:'Courses'}
]