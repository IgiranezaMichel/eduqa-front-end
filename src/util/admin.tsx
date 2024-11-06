import { BookSharp, Dashboard, Description, Folder, LocalPostOfficeRounded, LockPerson, PeopleAlt, School } from "@mui/icons-material";
import { INavigationItems } from "../interface/navigationitems";

export const AdminMenu:INavigationItems[]=[
    {icon:<Dashboard/>,link:'/admin',name:'Overview'},
    {icon:<LocalPostOfficeRounded/>,link:'/admin/department',name:'Department'},
    {icon:<BookSharp/>,link:'/admin/course',name:'Courses'},
    {icon:<LockPerson/>,link:'/admin/lecture',name:'Lecture'},
    {icon:<Folder/>,link:'/admin/semester',name:'Semesters'},
    {icon:<PeopleAlt/>,link:'/admin/user',name:'Users'},
    {icon:<School/>,link:'/admin/student',name:'Student'},
    {icon:<Description/>,link:'/admin/report',name:'Reports'},

]