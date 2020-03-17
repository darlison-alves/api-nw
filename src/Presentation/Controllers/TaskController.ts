import { BaseHttpController, controller, httpGet, httpPost, requestBody, httpPatch, requestParam } from "inversify-express-utils";
import { TaskService } from "../../Infra/Data/Services/TaskService";
import { Request } from "express";

@controller("/tasks")
export class TaskController extends BaseHttpController {

    private _taskService: TaskService;

    constructor() {
        super()
        this._taskService = new TaskService()
    }

    @httpGet("/")
    public async Get(req: Request) {
        const tasks = await this._taskService.find(req.query)
        return this.ok(tasks)
    }

    @httpGet("/:idTask")
    public async GetTask(@requestParam('idTask') idTask: string) {
        const task = await this._taskService.findById(idTask)
        return this.ok(task)
    }

    @httpPost("")
    public async createTask(@requestBody() body: any) {
        const task = await this._taskService.create(body)
        return this.created("created", task)
    }

    @httpPatch("/:idTask")
    public async update(@requestParam('idTask') idTask: string, @requestBody() body: any) {
        try {
            await this._taskService.update(idTask, body)
            return this.ok()
        } catch (error) {
            return this.badRequest(error.toString())
        }

    }
}