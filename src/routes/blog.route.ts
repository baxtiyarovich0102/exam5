import { checkToken } from '../middlewares/auth.middleware'
import blogController from "../controllers/blog.controller"
import { Router } from 'express'
import { roleChecker } from '../middlewares/role.middleware'

let route = Router()


route.post("/create", checkToken, blogController.createBlog)
route.get('/get-my-blogs', checkToken, blogController.getMyBlogs)
route.get('/get-my-joined-blogs', checkToken, blogController.getMyJoinedBlogs)
route.get('/get-blog-info/:id', blogController.getBlogInfo)
route.put('/update/:id', checkToken, roleChecker, blogController.updateBlog)
route.delete('/delete/:id', checkToken, roleChecker, blogController.deleteBlog)
route.post("/join-blog/:id", checkToken, blogController.joinBlog)


export default route