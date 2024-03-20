import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model, ObjectId } from "mongoose";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private Model: Model<UserDocument>,
    ) { }



    async getOneUser(_id: ObjectId): Promise<User> {
        return await this.Model.findById(_id)
        .select('-__v')
        .select('-password')
        .populate({ path: "tasks", select: { title: 1, text: 1, created_at: 1, status: 1 }});
    }

    findUserAuthorization = async (_id: string): Promise<User> => {
        return await this.Model.findById({_id})
        .select('-__v')
        .select('-password');
    }

    async getAllUsers(): Promise<User[]> {
        return await this.Model.find()
        .select('-__v')
        .select('-password')
        .populate({ path: "tasks", select: { title: 1, text: 1, created_at: 1, status: 1 }});
    }

    async createUser(user: User): Promise<void> {
        await this.Model.create(user)
    }

    async findUserByName(username: string) {
        return await this.Model.findOne({ username });
    }


   

}