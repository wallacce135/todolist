import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.schema";


@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }


    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }

    @Get(":objectId")
    async getOneUser(@Param() { objectId }): Promise<User> {
        return await this.userService.getOneUser(objectId);
    }

    @Post('create')
    async createNewUser(@Body() { username, name, surname, password, tasks }: User): Promise<string> {
        await this.userService.createUser({ username, name, surname, password, tasks })
        return "Пользователь успешно создан!";
    }




}