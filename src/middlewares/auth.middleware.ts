import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'
import { errorHandler } from '../utils/errorHandler'



let checkToken = errorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token = req.cookies.token

		if (!token) throw new Error('Token is required')
		const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string)


		let user = await User.findOne({ where: { name: decoded.name } })
		if (!user) throw new Error('User not found!')

		req.user = user
		next()
	},
)

export { checkToken }