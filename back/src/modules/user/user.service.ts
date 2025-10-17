import { All, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/core/interfaces/user.interfaces';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/ApiResponse';
@Injectable()
export class UserService {

    constructor(private readonly prisma : PrismaService){}

    async createUser (user: User):Promise<successfulResponse>{
        const createUser = await this.prisma.user.create({data: user})
        return apiResponse(201, "Usuario creado correctamente", createUser)
    }

    async updateUser (id:number, user:User):Promise<successfulResponse>{
        const userFind = await this.prisma.user.findUnique({where: {id}})
        if(userFind) throw new NotFoundException('Usuario no encontrado')
        const updateUser = await this.prisma.user.update({
            where: {id: id},
            data: user
        })
        return apiResponse(200, "Usuario actualizado", updateUser)
    }

    async getUser(id:number):Promise<successfulResponse>{
        const user = await this.prisma.user.findUnique({where: {id}})
        if(!user) throw new NotFoundException('Usuario no encontrado')
        return apiResponse(200,"Usuario obtenido", user)
    }

    async getAllUser():Promise<successfulResponse>{
        const allUsers = await this.prisma.user.findMany()
        return apiResponse(200, "Lista de usuarios",allUsers)
    }

    async deleteUser(id:number):Promise<successfulResponse>{
        const user = await this.prisma.user.findUnique({where: {id}})
        if(!user) throw new NotFoundException('Usuario no encontrado')
        await this.prisma.user.delete({where: {id:id}})
        return apiResponse(200,'Usuario eliminado correctamente')
    }
}
