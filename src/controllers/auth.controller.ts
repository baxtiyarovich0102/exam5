import bcrypt from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'
import { errorHandler } from '../utils/errorHandler'


let register = errorHandler(async (req: Request, res: Response, next: NextFunction) =>{
    let body = req.body
    
    console.log(body);
    
    let user = await User.findOne({where: {name: body.name}})
    if(user) throw new Error('Name already exists')

    
    let salt = process.env.HASH_SALT as string
    body.password = await bcrypt.hash(body.password, +salt)

    let data = await User.create(body)
    console.log(data);
    
    res.status(201).json({message: "Successfully registered", data})
} )


let login = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    let {name, password} = req.body
    let data: any = await User.findOne({ where: { name } })
	if (!data) throw new Error('User not found')

    
    let checker = await bcrypt.compare(password, data.password)
    if(!checker) {throw new Error("Wrong password")}


    const signToken = (payload: { userId: number; name: string }) => {
        const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
          expiresIn: '24h',
        });
        return token;
      };
      
      const payload = {
        userId: data.id,
        name: data.name,
      };
      
      const token = signToken(payload);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 36000 * 1000,
      });


      res.status(200).json({
		message: 'Successfully Logged In',
		token,
	})

})


export default {
    register, login
}