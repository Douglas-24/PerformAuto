import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import type { User } from 'src/core/interfaces/user.interfaces';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post()
    async postUser(@Body() user:User ):Promise<successfulResponse>{
        return this.userService.createUser(user)    
    }

    @Patch(':id')
    async updateUser(@Param('id') id:number, @Body() user: User){
        return this.userService.updateUser(+id, user)
    }

    @Get()
    async getAllUser(){
        return this.userService.getAllUser()
    }

    @Get(':id')
    async getUserById(@Param('id') id:string){
        return this.userService.getUser(+id)
    }
}
