import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";





@Injectable()
export class AuthService {

    constructor(
        private readonly userServive: UserService,
        private readonly jwtService: JwtService
        ) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userServive.findUserByName(username)
        if(user?.password !== pass) {
            throw new UnauthorizedException();
        }
        
        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}