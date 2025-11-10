import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/apiResponse';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { MailService } from '../mail/mail.service';
@Injectable()
export class UserService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService
    ) { }

    async createUser(user: CreateUserDto, verified:boolean = false): Promise<User> {
        const pass = user.password
        const hash = await bcrypt.hash(pass, 10);
        user.password = hash
        user.account_verified = verified
        const createUser = await this.prisma.user.create({ data: user })
        if(verified)this.mailService.sendWelcone(user.email,`${user.name} ${user.lastname}`, pass)
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
                rol: true,
                account_verified: true
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
