import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "./task.schema";
import { ObjectId } from "mongoose";




@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) { }


    @Get()
    async getAllTasks() {
        return await this.taskService.getAllTasks()
    }
    
    @Get(":objectId")
    async getOneTask(@Param() { objectId }) {
        return await this.taskService.getOneTask(objectId);
    }

    @Post('create') 
    async CreateNewTask(@Body() { title, text }: Task) {
        return await this.taskService.createTask({ title, text });
    }

    @Put('update/:objectId')
    async UpdateOneTask(@Param() { objectId }, @Body() { title, text, status }: Task) {
        return await this.taskService.updateTask(objectId, { title, text, status });
    }

    @Patch('change/status/:objectId')
    async ChangeStatusForTask(@Param() { objectId }, @Body() { status }: Task) {
        return await this.taskService.changeStatus(objectId, status)
    }

    @Delete("delete/:objectId") 
    async deleteOneTask(@Param() { objectId }) {
        return await this.taskService.deleteTask(objectId);
    }
    


}