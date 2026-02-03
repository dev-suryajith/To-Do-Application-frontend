import commonAPI from "./commonAPI"
import serverURL from "./serverURL"


//auth
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/register`, reqBody)
}
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/login`, reqBody)
}


//tsak crud
export const addNewTaskAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${serverURL}/addNewTask`, reqBody, reqHeader)
}
export const getAllTasksAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/getAllTasks`, {}, reqHeader)
}
export const updateTaskAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/updateTask`, reqBody, reqHeader)
}
export const deleteTaskAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/deleteTask/${id}`,{},reqHeader)
}
