import { sign } from 'jsonwebtoken'
import UserModel, { IUser } from "../../../Domain/Models/User";

export class AuthService {

    async singUp(data: any): Promise<IUser> {
        const user = await UserModel.create([data])
        return user[0]
    }

    async singIn(email: string, password: string): Promise<string> {
        const user = await UserModel.findOne({ email })
        if (!user)
            throw Error('Email não encontrado!')

        user.checkPassword(password)

        return sign({
            sub: user._id,
            email: user.email
        }, 'TESTETOKEN')
    }
}