import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import type { User } from 'src/core/interfaces/user.interfaces';
import { apiResponse } from 'src/core/utils/ApiResponse';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post()
    async postUser(@Body() user:User ):Promise<successfulResponse>{
        const userCreate = this.userService.createUser(user)    
        return apiResponse(201, "Usuario creado correctamente", userCreate)
    }

    @Patch(':id')
    async updateUser(@Param('id') id:number, @Body() user: User):Promise<successfulResponse>{
        const updateUser = this.userService.updateUser(+id, user)
        return apiResponse(200, "Usuario actualizado", updateUser)
    }

    @Get()
    async getAllUser():Promise<successfulResponse>{
        const allUsers = this.userService.getAllUser()
        return apiResponse(200, "Lista de usuarios",allUsers)
    }

    @Get(':id')
    async getUserById(@Param('id') id:string):Promise<successfulResponse>{
        const user = this.userService.getUser(+id)
        return apiResponse(200,"Usuario obtenido", user)
    }

    @Delete(':id')
    async deleteUSer(@Param('id') id:string):Promise<successfulResponse>{
        const user = this.userService.deleteUser(+id)
        return apiResponse(200,'Usuario eliminado correctamente', user)
    }
    
}
