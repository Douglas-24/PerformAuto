import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import type { User } from 'src/core/interfaces/user.interfaces';
import { apiResponse } from 'src/core/utils/ApiResponse';
import { JwtAuthGuard } from 'src/core/guards/auth.guard';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async postUser(@Body() user:User ):Promise<successfulResponse>{
        const userCreate = await this.userService.createUser(user)    
        return apiResponse(201, "Usuario creado correctamente", userCreate)
    }
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateUser(@Param('id') id:number, @Body() user: User):Promise<successfulResponse>{
        const updateUser = await this.userService.updateUser(+id, user)
        return apiResponse(200, "Usuario actualizado", updateUser)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUser():Promise<successfulResponse>{
        const allUsers = await this.userService.getAllUser()
        console.log('entra');
        
        return apiResponse(200, "Lista de usuarios",allUsers)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Param('id') id:string):Promise<successfulResponse>{
        const user = await this.userService.getUser(+id)
        return apiResponse(200,"Usuario obtenido", user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUSer(@Param('id') id:string):Promise<successfulResponse>{
        const user = await this.userService.deleteUser(+id)
        return apiResponse(200,'Usuario eliminado correctamente', user)
    }
    
}
