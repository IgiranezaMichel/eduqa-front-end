import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IState } from "../interface/state";
import { UserDao } from "../controller/userDao";
import { Role } from "../enum/role";

export const AuthContext = createContext<IState | undefined>(undefined);
export const useAuthenticationContext = () => {
    const authenticated = useContext(AuthContext);
    if (!authenticated) throw new Error("Not authenticated")
    return authenticated;
}
export const AuthProvider = (prop: { children: ReactNode }) => {
    const location = useLocation();
    const [user, setUser] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigate();
    const [refresh, setRefresh] = useState(false);
    useEffect(
        () => {
            new UserDao().successLogin()
                .then((data) => { setUser(data.data); setIsLoading(false) })
                .catch((err) => {
                    console.log(err)
                    setIsLoading(false);
                    navigation("/");
                })
            if (!isLoading) {
                if (user.role == Role.ROLE_ADMIN) {
                    if (location.pathname == "/")
                        navigation("/admin")
                    else {
                        navigation(location.pathname)
                    }
                }
                else if (user.role == Role.ROLE_HOD) {
                    navigation("/hod")
                }
                else if (user.role == Role.ROLE_INSTRACTOR) {
                    if (location.pathname == "/")
                        navigation("/instructor")
                    else {
                        navigation(location.pathname)
                    }

                }
                else if (user.role == Role.ROLE_STUDENT) {
                    if (location.pathname == "/")
                        navigation("/student")
                    else {
                        navigation(location.pathname)
                    }
                }
                else {
                    navigation("/")
                }
                console.log(user)
            }
        }, [location.pathname, refresh, isLoading])
    const data: IState = {
        content: user,
        update: () => setUser(user),
        refresh: () => setRefresh(!refresh)
    }
    return <>
        {!isLoading ?
            <AuthContext.Provider value={data}>
                {prop.children}
            </AuthContext.Provider> : <div>Is loading</div>
        }
    </>
}