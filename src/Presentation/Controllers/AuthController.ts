import { BaseHttpController, controller, httpPost } from "inversify-express-utils";
import { Request, Response } from 'express'
import { AuthService } from "../../Infra/Data/Services/AuthService";

@controller('')
export class AuthController extends BaseHttpController {
    private _service: AuthService
    constructor() {
        super()
        this._service = new AuthService()
    }

    @httpPost('/singIn')
    public async singIn(req: Request, res: Response) {
        const token = await this._service.singIn(req.body.email, req.body.password)
        return this.ok({ token })
    }

    @httpPost('/singUp')
    public async singUp(req: Request, res: Response) {
        const user = await this._service.singUp(req.body)
        return this.ok(user.toObject())
    }

}