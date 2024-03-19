import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';



@Schema()
export class Task {

    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    text: string

    @Prop({ required: true, type: Date, default: Date.now })
    created_at?: Date

    @Prop({ required: true, enum: ['open', 'checked', 'closed'], default: 'open' })
    status?: string
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);