import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { MailService } from '../mail/mail.service'
@Injectable()
export class AuthService {
    constructor( private jwt: JwtService, 
        private userService:UserService,
        private readonly mailService: MailService
    ){}

    async login(email:string, pass:string):Promise<{ access_token: string}> {
        const user = await this.userService.getUserByEmail(email)
        if(!user.account_verified) throw new UnauthorizedException('La cuenta no esta verificada')
        
        const isMatch = await bcrypt.compare(pass, user.password);
         
        if(!isMatch) throw new UnauthorizedException('Creendenciales invalidas')

        const {password, ...payload} = user

        const access_token = await this.jwt.signAsync(payload)
        return {access_token}
    }

    async register(user: User):Promise<string>{
        const registerUser = await this.userService.createUser(user)
        const payload = {userId: registerUser.id}
        const token = this.jwt.sign(payload)
        const url = `http://localhost:3000/api/auth/verify?token=${token}`
        this.mailService.sendVerifyEmail(user.email, user.name, url)
        
        return 'Se te a enviado un correo'
    }

    async verifyAccount(token:string){
        const payload = this.jwt.verify(token)
        const userId = payload.userId

        const user =await this.userService.getUser(userId)
        user.account_verified = true
        await this.userService.updateUser(userId,user)
    }
}
