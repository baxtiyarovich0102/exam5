import { errorHandler } from '../utils/errorHandler'
import { Response } from 'express'

const errorController = (error: any, res: Response) => {
	res.status(404).json({ status: 'Failed', message: error.message })
}

export { errorController }