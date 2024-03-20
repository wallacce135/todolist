import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import {Request, Response, NextFunction } from 'express'
import { firstValueFrom } from "rxjs";
import { User } from "src/user/user.schema";
import { UserService } from "src/user/user.service";



export interface UserRequest extends Request {
    user: User
}



@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
        ) { }

    async use(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

                const token = req.headers.authorization.split(" ")[1];
                const decoded = await this.jwtService.verify(token);

                const user = await this.userService.findUserAuthorization(decoded.sub);

                if(user) {
                    req.user = user
                    next();
                } else {
                    return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized", statusCode: 401})
                }

            } else {
                return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized", statusCode: 401})
            }
        }

        catch(error) {
            throw new HttpException('Something went wrong: ', error.message);
        }

    
    }
    
}

