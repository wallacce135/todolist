import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Task } from 'src/task/task.schema';


@Schema()
export class User {

    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true })
    name: string

    @Prop({ required: false })
    surname?: string

    @Prop({ required: true })
    password: string

    @Prop({ required: false })
    avatar?: string;

    @Prop({ ref: "Task", required: false })
    tasks?: Task[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);