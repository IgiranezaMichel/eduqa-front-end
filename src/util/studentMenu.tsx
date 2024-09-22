import { BookSharp, Dashboard, Folder } from "@mui/icons-material";
import { INavigationItems } from "../interface/navigationitems";

export const StudentMenu:INavigationItems[]=[
    {icon:<Dashboard/>,link:'/student',name:'Overview'},
    {icon:<Folder/>,link:'/student/semesters',name:'Semesters'},
    {icon:<BookSharp/>,link:'/student/course',name:'Courses'}
]