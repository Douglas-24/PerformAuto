import { successfulResponse } from "../interfaces/successfulResponse.interface";

export function apiResponse (statusCode:number, message:string, data ?:any ):successfulResponse {
    const response:successfulResponse = {
        statusCode: statusCode,
        message: message,
        data: data
    }
    return response
}