import axios from "axios"

export const Axios=()=> {
    return axios.create({
        baseURL: "http://localhost:8080/api"
    })
}