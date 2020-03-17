import TaskModel, { ITask } from "../../../Domain/Models/Task"

export class TaskService {

    public async create(data: any): Promise<ITask> {
        const user = await TaskModel.create([data])
        return user[0]
    }

    public async findOne(data: any): Promise<ITask> {
        const user = await TaskModel.findOne(data)
        if (!user)
            throw Error('Not found task')
        return user
    }

    public async findById(id: string): Promise<ITask> {
        const user = await TaskModel.findById(id);
        if (!user) throw Error('Not found task')
        return user
    }

    public async update(id: any, data: any): Promise<void> {
        await TaskModel.updateOne({ _id: id }, data)
        return;
    }

    public async find(data: any, sort = { createdAt: -1 }): Promise<Array<ITask>> {
        return await TaskModel.find(data).sort(sort);
    }
}