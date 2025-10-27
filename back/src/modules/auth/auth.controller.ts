import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { apiResponse } from 'src/core/utils/ApiResponse';
import type { User } from 'src/core/interfaces/user.interfaces';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { Public } from 'src/core/decorators/public.decorator';

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
        const token = await this.authService.register(userRegister)
        return apiResponse(200, 'Registro completado correctamente', token)
    }
}
