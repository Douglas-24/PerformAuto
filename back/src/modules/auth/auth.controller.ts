import { Body, Controller, Get, Post,Query,Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { apiResponse } from 'src/core/utils/ApiResponse';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { Public } from 'src/core/decorators/public.decorator';
import type { User } from '@prisma/client';
interface credentials {
    email: string,
    dni ?: string,
    password: string
}

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Public()    
    @Post('login')
    async login(@Body() credentials:credentials):Promise<successfulResponse>{
        const token = await this.authService.login(credentials.email, credentials.password)
        return apiResponse(200, 'Sesion iniciada', token)
    }
    
    @Public()
    @Post('register')
    async register(@Body() userRegister:User):Promise<successfulResponse>{
        const register = await this.authService.register(userRegister)
        return apiResponse(200,register)
    }

    @Get('profile')
    async getProfile(@Request() req: {user: User}){
        return req.user
    }
    
    @Public()
    @Get('verify')
    async verifyAccount(@Query('token') token:string):Promise<successfulResponse>{
        const resp = await this.authService.verifyAccount(token)
        return apiResponse(200, 'Cuenta verificada correctamente')
    }

}
