import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./task.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class TaskService {

    constructor(@InjectModel(Task.name) private Model: Model<TaskDocument>) { }

    async getAllTasks(): Promise<Task[]>{
        return await this.Model.find();
    }

    async getOneTask(_id: ObjectId): Promise<Task> {
        return await this.Model.findById(_id);
    }

    async createTask(task: Task): Promise<Task> {
        return await this.Model.create(task);
    }

    async updateTask(_id: ObjectId, task: Task): Promise<Task | Task[]> {
        return await this.Model.findByIdAndUpdate(_id, task);
    }

    async deleteTask(_id: ObjectId): Promise<Task> {
        return await this.Model.findByIdAndDelete(_id);
    }

    async changeStatus(_id: ObjectId, _status: string): Promise<Task> {
        return await this.Model.findByIdAndUpdate(_id, { status: _status });
    }

}