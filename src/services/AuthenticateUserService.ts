import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
interface IAuthenticateRequeste {
    email: string,
    password: string
}
class AuthenticateUserService{
    async execute({email, password}: IAuthenticateRequeste) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/Password incorrect")
        }

         const passwordMatch = await compare(password, user.password)

         if(!passwordMatch){
            throw new Error("Email/Password incorrect")
         }

         const token = sign({email: user.email},"e742ee9631ef2eb62f41288f15ae5a08", {subject:user.id,expiresIn: "1d"})

         return token
    }
}

export { AuthenticateUserService }