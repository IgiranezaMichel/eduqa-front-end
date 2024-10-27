import { BookSharp, Dashboard, Description, Folder, LocalPostOfficeRounded, LockPerson, PeopleAlt, School } from "@mui/icons-material";
import { INavigationItems } from "../interface/navigationitems";

export const AdminMenu:INavigationItems[]=[
    {icon:<Dashboard/>,link:'/admin',name:'Overview'},
    {icon:<PeopleAlt/>,link:'/admin/user',name:'Users'},
    {icon:<School/>,link:'/admin/student',name:'Student'},
    {icon:<LockPerson/>,link:'/admin/lecture',name:'Lecture'},
    {icon:<LocalPostOfficeRounded/>,link:'/admin/department',name:'Department'},
    {icon:<Folder/>,link:'/admin/semester',name:'Semesters'},
    {icon:<BookSharp/>,link:'/admin/course',name:'Courses'},
    {icon:<Description/>,link:'/admin/report',name:'Reports'},

]