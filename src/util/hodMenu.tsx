import { Dashboard, Description, Folder, Grading, LockPerson, School } from "@mui/icons-material";
import { INavigationItems } from "../interface/navigationitems";

export const HodMenu:INavigationItems[]=[
    {icon:<Dashboard/>,link:'/hod',name:'Overview'},
    {icon:<Folder/>,link:'/hod/semesters',name:'Semesters'},
    {icon:<Folder/>,link:'/hod/department',name:'Department'},
    {icon:<LockPerson/>,link:'/hod/lectures',name:'lectures'},
    {icon:<School/>,link:'/hod/students',name:'Students'},
    {icon:<Description/>,link:'/hod/courses',name:'Courses'},
    {icon:<Grading/>,link:'/hod/reports',name:'Reports'},

]