import { All, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/ApiResponse';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from '@prisma/client';
@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async createUser(user: CreateUserDto): Promise<User> {
        const createUser = await this.prisma.user.create({ data: user })
        return createUser
    }

    async updateUser(id: number, user: UpdateUserDto): Promise<User> {
        const userFind = await this.prisma.user.findUnique({ where: { id } })
        if (!userFind) throw new NotFoundException('Usuario no encontrado')
        const updateUser = await this.prisma.user.update({
            where: { id: id },
            data: user
        })
        return updateUser
    }

    async getUser(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } })
        if (!user) throw new NotFoundException('Usuario no encontrado')
        return user
    }

    async getAllUser(): Promise<Omit<User, 'password'>[]> {
        const allUsers = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                lastname: true,
                dni: true,
                email: true,
                phone_number: true,
                address: true,
                postal_code: true,
                rol: true
            }
        })
        return allUsers
    }

    async deleteUser(id: number): Promise<successfulResponse> {
        const user = await this.prisma.user.findUnique({ where: { id } })
        if (!user) throw new NotFoundException('Usuario no encontrado')
        await this.prisma.user.delete({ where: { id: id } })
        return apiResponse(200, 'Usuario eliminado correctamente')
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email: email } })
        if (!user) throw new NotFoundException('Usuario no encontrado')
        return user
    }
}
