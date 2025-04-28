import { errorHandler } from '../utils/errorHandler';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userValidator = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	const schema = Joi.object({
		name: Joi.string().required().messages({
			'string.base': 'Name must be a string',
			'any.required': 'Name is required',
		}),
		email: Joi.string().email().required().messages({
			'string.email': 'Email must be valid',
			'any.required': 'Email is required',
		}),
		password: Joi.string().min(6).required().messages({
			'string.min': 'Password must be at least 6 characters long',
			'any.required': 'Password is required',
		}),
	});

	await schema.validateAsync(req.body, { abortEarly: false });
	next();
});

const loginValidation = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	const schema = Joi.object({
		name: Joi.string().max(200).required().messages({
			'string.base': `"name" must be a string`,
			'string.empty': `"name" cannot be empty`,
			'string.max': `"name" must be at most 200 characters`,
			'any.required': `"name" is required`,
		}),
		password: Joi.string().min(6).max(100).required().messages({
			'string.base': `"password" must be a string`,
			'string.empty': `"password" cannot be empty`,
			'string.min': `"password" should have at least 6 characters`,
			'string.max': `"password" should not exceed 100 characters`,
			'any.required': `"password" is required`,
		}),
	});

	console.log("here");
	await schema.validateAsync(req.body, { abortEarly: false });
	
	next();
});

export { loginValidation, userValidator };