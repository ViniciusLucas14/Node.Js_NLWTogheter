import { Response } from 'express';
import { Request } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';


class AutheticateUserController {
    async handle(request: Request, response: Response){
        const { email, password } = request.body

        const autenticateUserService = new AuthenticateUserService();

        const token = await autenticateUserService.execute({
            email,
            password
        });

        return response.json(token)
    }
}

export { AutheticateUserController}