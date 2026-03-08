import { Response } from "express"

type Tresponse<T> = {
    status: number,
    success: boolean,
    message: string,
    data?: any
}

const sendResponse = <T>(res: Response, data: Tresponse<T>)=>{
    const {status, success, message, data: responseData} = data

    res.status(status).json({
        success,
        message,
        data: responseData
    })
}

export default sendResponse;