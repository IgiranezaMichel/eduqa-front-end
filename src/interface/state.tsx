export interface IState{
    content:any,
    refresh:(data?:any)=>void,
    update:(data:any)=>void
}