export const getCurrentDate=()=>{
    const date=new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString();
}