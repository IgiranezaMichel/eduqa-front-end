import { Send } from "@mui/icons-material"
import { Avatar, IconButton, TextField } from "@mui/material"
import { ReactNode, useEffect, useRef, useState } from "react"
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { IComment } from "../../interface/coursecomment";
import { LectureCourseProgressCommentDao } from "../../controller/lecturecourseprogresscomment";

export const CourseContentComment = (prop: { lectureCourseProgress: any, children: ReactNode }) => {
    const [stompClient, setStompClient] = useState<any>(null);
    const [comment, setComment] = useState<IComment>({
        comment: '',
        lCourseProgressReportId: prop.lectureCourseProgress.id
    });
    const [messages,setMessages]=useState<any>([]);
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
        stompClient.send('/app/create-message', {}, JSON.stringify(comment));
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
    const containerRef = useRef(null);
    useEffect(
        ()=>{
            if(containerRef.current){
                containerRef.current.scrollBottom = 0;
            }
        },[messages]
    )
    return <section className="flex flex-col h-full">
        {prop.children}
        <div className="flex gap-3 text-center m-auto py-3">
            Topic
            <div className="font-bold ">
                {prop.lectureCourseProgress.title}
            </div>
        </div>
        {messages!=undefined&&messages.length!=0&&messages.map((item:any)=><div className="flex mt-1 mb-1 max-w-[90%]">
                <div className="flex gap-2  h-full">
                <Avatar src={item.userPhoto}/>
                <div className="bg-slate-400 p-1 rounded-md">{item.comment}</div>
                </div>
        </div>)}
        <form className="mt-auto p-1 sticky bottom-0 bg-blue-900" onSubmit={sendMessage} >
            <TextField sx={{color:'!important white'}}
            onChange={e=>setComment({...comment,comment:e.target.value})}
            className="text-white" placeholder="Enter comment here .." fullWidth
                InputProps={{ endAdornment: <><IconButton type="submit"><Send className="text-white"/></IconButton></> }} />
        </form>
    </section>
}