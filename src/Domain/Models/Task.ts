import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
    titulo: string;
    descricao: string;
    datahora: Date,
    endereco: {
        cep: string,
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string
    }
}

const schema = new Schema({
    titulo: { type: String },
    descricao: { type: String },
    datahora: { type: Date },
    endereco: {
        cep: String,
        logradouro: String,
        complemento: String,
        bairro: String,
        localidade: String,
        uf: String
    }
})

const TaskModel = model<ITask>('tasks', schema)

export default TaskModel