import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { UserController } from './user.controller';




@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name, schema: UserSchema
            }
        ])
    ],
    controllers: [UserController],
    providers: [ConfigService, UserService]
})

export class UserModule { }