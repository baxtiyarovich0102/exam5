import {Request, Response, NextFunction} from "express"
import {User} from "../models/user.model"
import { errorHandler } from "../utils/errorHandler"
import bcrypt from "bcryptjs"
import { where } from "sequelize"
import { any } from "joi"



let getAllUsers = errorHandler(async (req:Request, res:Response, next: NextFunction) => {

    let users: any = await User.findAll()
    res.status(200).json({ message: 'Success', users })

})


let getuserById = errorHandler(async (req:Request, res:Response, next: NextFunction) => {
    let id = req.params.id
    
    let user:any = await User.findOne({where: {id}})
    if (!user) throw new Error("User not found");

    res.status(200).json({ status: 200, message: 'Success', user })
})


let updateUser = errorHandler(async (req: Request, res: Response, next: NextFunction) => {

	let id = req.params.id
    let user: any = await User.findOne({ where: { id } })

    if (!user) throw new Error("User not found");
	if (req.user.id != id) throw new Error('You cannot update')

	let body = req.body

	if (body.password) {
		body.password = bcrypt.hash(
			body.password,
			process.env.HASH_SALT as string,
		)
	}


	let [updated] = await User.update(body, { where: { id } })
	if (updated) {
		let updatedUser = await User.findOne({ where: { id } })
		res.status(200).json({ message: 'Successfully updated', updatedUser })
	} else {
		res.status(404).json({ message: 'User not found' })
	}
    
})



let deleteUser = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	let id = req.params.id
    if(req.user.id != id) throw new Error("You cannot delete")

	let data = await User.destroy({ where: { id } })
    if(!data) throw new Error("User is already deleted")
    res.status(200).json({message: "Successfully deleted"})
})


export default { getAllUsers, getuserById, updateUser, deleteUser }