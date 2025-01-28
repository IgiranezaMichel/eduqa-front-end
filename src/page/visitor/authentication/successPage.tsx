import { useEffect, useRef, useState } from "react"
import { UserDao } from "../../../controller/userDao"
import { AuthProvider } from "../../../context/authentication";
import { LinearProgress } from "@mui/material";

export const SuccessAuthenticationPage=()=>{
    const [isLoading,setIsLoading]=useState(true);
    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(10);
  
    const progressRef =useRef(() => {});
     useEffect(() => {
      progressRef.current = () => {
        if (progress === 100) {
          setProgress(0);
          setBuffer(10);
        } else {
          setProgress(progress + 1);
          if (buffer < 100 && progress % 5 === 0) {
            const newBuffer = buffer + 1 + Math.random() * 10;
            setBuffer(newBuffer > 100 ? 100 : newBuffer);
          }
        }
      };
    });
  
    useEffect(() => {
      const timer = setInterval(() => {
        progressRef.current();
      }, 100);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
    useEffect(
        ()=>{
            const userData=new UserDao().successLogin();
            userData.then(()=>{setIsLoading(false)}
            )
            .catch(err=>{console.log(err);setIsLoading(false)})
        }
    );
    
    return <AuthProvider>
    {isLoading?<div className="h-screen w-screen flex justify-center items-center">
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </div>:<></>}
    </AuthProvider>
}