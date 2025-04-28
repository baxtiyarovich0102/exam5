import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { usersBlog } from "../models/usersBlog.model";

let roleChecker = errorHandler(async (req: Request, res: Response, next: NextFunction) => {

    let blogId = req.params.id
    let userId = req.user.id

    let blogUser:any = await usersBlog.findOne({where: {blog_id: blogId, user_id: userId}})

    console.log(req.user);
    if (!blogUser) req.user = null
    
    if(blogUser.role != 'owner') req.user = null
    
    next()
})

export {roleChecker}