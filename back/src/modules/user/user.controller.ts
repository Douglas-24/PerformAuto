import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { apiResponse } from 'src/core/utils/ApiResponse';
import { passwordGenerate } from 'src/core/utils/generator';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post()
    async postUser(@Body() user: Omit<CreateUserDto, 'password'> ):Promise<successfulResponse>{
        const passGenerate = passwordGenerate()
        const userUpdate:CreateUserDto = {...user, password: passGenerate}
        const userCreate = await this.userService.createUser(userUpdate)    
        return apiResponse(201, "Usuario creado correctamente", userCreate)
    }

    @Put(':id')
    async updateUser(@Param('id') id:number, @Body() user: UpdateUserDto):Promise<successfulResponse>{
        const updateUser = await this.userService.updateUser(+id, user)
        return apiResponse(200, "Usuario actualizado", updateUser)
    }


    @Get()
    async getAllUser():Promise<successfulResponse>{
        const allUsers = await this.userService.getAllUser()        
        return apiResponse(200, "Lista de usuarios",allUsers)
    }


    @Get(':id')
    async getUserById(@Param('id') id:string):Promise<successfulResponse>{
        const user = await this.userService.getUser(+id)
        return apiResponse(200,"Usuario obtenido", user)
    }


    @Delete(':id')
    async deleteUSer(@Param('id') id:string):Promise<successfulResponse>{
        const user = await this.userService.deleteUser(+id)
        return apiResponse(200,'Usuario eliminado correctamente', user)
    }
    
}
