import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./task.schema";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Task.name, schema: TaskSchema }
        ])
    ],
    controllers: [ TaskController ],
    providers: [ ConfigService, TaskService ]
})

export class TaskModule { }