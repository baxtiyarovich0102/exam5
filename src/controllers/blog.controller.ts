import { Request, Response, NextFunction } from 'express'
import { usersBlog } from '../models/usersBlog.model'
import { Blog } from '../models/blog.model'
import { User } from '../models/user.model'
import { errorHandler } from '../utils/errorHandler'


let createBlog = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	let body: any = req.body
	if (!body.title) throw new Error('title is required')


	let blog: any = await Blog.create(body)

	let obj = {
		user_id: req.user.id,
		blog_id: blog.id,
		role: 'owner',
	}
	let blogUser = await usersBlog.create(obj)

	res.status(201).json({ message: 'Succes', blogUser })
})


let getMyBlogs = errorHandler(async (req: Request, res: Response , next: NextFunction) => {
	let blogUsers = await usersBlog.findAll({
		attributes: ['user_id'],
		where: { user_id: req.user.id, role: 'owner' },
		include: [{ model: Blog, as: 'blog' }],
	})
	res.status(200).json({ message: 'Success', blogUsers })
})


let getMyJoinedBlogs = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    let blogUsers = await usersBlog.findAll({
        attributes: ["user_id"],
        where: { user_id: req.user.id, role: "user" }, 
        include: [{ model: Blog, as: "blog" }],
    });

    res.status(200).json({ message: "Success", blogUsers });
});


let getBlogInfo = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	let id = req.params.id
	let blog = await usersBlog.findOne({
		where: { blog_id: id },
		attributes: ['id', 'role'],
		include: [
			{ model: Blog, as: 'blog' },
			{ model: User, as: 'user'},
		],
	})
	res.status(200).json({ message: 'Success', blog })
})


let updateBlog = errorHandler(async (req: Request, res: Response, next: NextFunction) => {

	if (req.user == null) throw new Error('You cannot update')
	let [updated] = await Blog.update(req.body, {
		where: { id: req.params.id },
	})

	if (updated) {
		let blog = await Blog.findOne({ where: { id: req.params.id } })
		res.status(200).json({ message: 'Success', blog })
	} else {
		throw new Error('Blog is not updated')
	}
})


let deleteBlog = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	if (req.user == null) throw new Error('You cannot delete')

	let id = req.params.id
	await usersBlog.destroy({ where: { blog_id: req.params.id } });
    await Blog.destroy({ where: { id: req.params.id } });

	res.status(200).json({ message: 'Successfully deleted' })
})



let joinBlog = errorHandler(async (req: Request, res: Response, next: NextFunction) => {

    let blog_id = req.params.id

    let user_id = req.user.id

    let obj = {blog_id, user_id, role: 'user'}

    let joins = await usersBlog.create(obj)

    res.status(200).json({message: "Successfully joined", joins})

})



export default {
	createBlog,
	getMyBlogs,
	getMyJoinedBlogs,
	getBlogInfo,
	updateBlog,
	deleteBlog,
    joinBlog
}