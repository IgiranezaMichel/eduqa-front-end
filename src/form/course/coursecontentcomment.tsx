import { Send } from "@mui/icons-material"
import { Avatar, IconButton, TextField } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { IComment } from "../../interface/coursecomment";
import { LectureCourseProgressCommentDao } from "../../controller/lecturecourseprogresscomment";
import { useAuthenticationContext } from "../../context/authentication";

export const CourseContentComment = (prop: { lectureCourseProgress: any, children: ReactNode }) => {
    const [stompClient, setStompClient] = useState<any>(null);
    const [comment, setComment] = useState<IComment>({
        comment: '',
        lCourseProgressReportId: prop.lectureCourseProgress.id
    });
    const {content}=useAuthenticationContext()
    const [messages,setMessages]=useState<any>([]);
    console.log(content);
    
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe('/user/'+prop.lectureCourseProgress.id+'/queue/messages', (message) => {
                if (message.body) {
                    console.log(message.body);
                    setMessages((prev:any) => [...prev,JSON.parse(message.body)]);}
            });
            setStompClient(client);
        });

        return () => {
            client.disconnect();
        };
    }, []);
    const sendMessage = (e:any) => {
        e.preventDefault()
        stompClient
        if(comment.comment.length>2)
        stompClient.send('/app/create-message', {}, JSON.stringify(comment));
        setComment({...comment,comment:""});
    };
    useEffect(
        ()=>{
            new LectureCourseProgressCommentDao()
            .getLectureCoursesBySemesterId(prop.lectureCourseProgress.id)
            .then((res)=>{
                setMessages(res.data);
            })
        },[]
    )
 
    return <section  className="flex flex-col h-full">
        {prop.children}
        <div className="flex gap-3 text-center m-auto py-3">
            Topic
            <div className="font-bold ">
                {prop.lectureCourseProgress.title}
            </div>
        </div>
        {messages!=undefined&&messages.length!=0&&messages.map((item:any)=><div className={`p-2 ${content.email==item.userEmail?'flex flex-row-reverse':'flex'}`}
        >
                <div className={`max-w-[80%] p-1 rounded-md  ${content.email==item.userEmail?'bg-blue-950/20':'bg-slate-400'}`}style={{clipPath: 'polygon(0 100%, 0 0, 81% 0, 100% 0, 98% 8%, 98% 100%, 84% 100%)'}}>
                {content.email!=item.userEmail&&<p className="font-bold">{item.userName}</p>}
                <section className="flex gap-2">
                <Avatar src={item.userPhoto}/>
                <div className={`p-1 rounded-md`}>{item.comment}</div>
                </section>
                </div>
        </div>)}
        <form className="mt-auto p-1 sticky bottom-0 bg-blue-900" onSubmit={sendMessage} >
            <TextField sx={{color:'!important white'}}
            value={comment.comment}
            onChange={e=>setComment({...comment,comment:e.target.value})}
            className="text-white" placeholder="Enter comment here .." fullWidth
                InputProps={{ endAdornment: <><IconButton type="submit"><Send className="text-white"/></IconButton></> }} />
        </form>
    </section>
}