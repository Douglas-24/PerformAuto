import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/interfaces/user.interfaces';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor( private jwt: JwtService, private userService:UserService){}

    async login(email:string, pass:string):Promise<{ access_token: string}> {
        const user = await this.userService.getUserByEmail(email)
        
        const isMatch = await bcrypt.compare(pass, user.password);
        if(!isMatch) throw new UnauthorizedException('Creendenciales invalidas')
        const {password, ...payload} = user

        const access_token = await this.jwt.signAsync(payload)
        return {access_token}
    }

    async register(user: User):Promise<{ access_token: string}>{
        
        const hash = await bcrypt.hash(user.password, 10);
        
        user.password = hash
        const registerUser = await this.userService.createUser(user)
        
        const {password, ...payload} = registerUser
        
        const access_token = await this.jwt.signAsync(payload)
        return {access_token}
    }
}
