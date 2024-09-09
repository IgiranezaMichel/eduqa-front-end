export interface IState{
    content:any,
    refresh:()=>void,
    update:(data:any)=>void
}