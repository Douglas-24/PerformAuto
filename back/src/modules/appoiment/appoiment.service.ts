import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppoimentDto } from './dto/create-appoiment.dto';
import { UpdateAppoimentDto } from './dto/update-appoiment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Appoiment, Employee, StateServie } from '@prisma/client';
import { EmployeeService } from '../employee/employee.service';
interface MechanicAppointment{
  mechanicId: number
  appointment: Appoiment[]
}
interface MechanicSlot {
  number: number
  slot: Date[]
}
interface AvailableSlot {
  day: Date
  slot: MechanicSlot[]
}

@Injectable()
export class AppoimentService {
  rangeDateAppoiment: number = 7
  constructor(
    private prisma: PrismaService,
    private employeeService: EmployeeService

  ) { }

  async create(createAppoimentDto: CreateAppoimentDto): Promise<Appoiment> {
    const appoiment = await this.prisma.appoiment.create({
      data: createAppoimentDto,
    })
    return appoiment
  }

  async findAll(): Promise<Appoiment[]> {
    const allAppoiments = await this.prisma.appoiment.findMany({
      include: {
        client: true,
        car: true,
        mechanic: true,
        services: true,
        invoice: true,
      },
    })
    return allAppoiments
  }

  async findOne(id: number): Promise<Appoiment> {
    const appoiment = await this.prisma.appoiment.findUnique({
      where: { id: id },
      include: {
        client: true,
        car: true,
        mechanic: true,
        services: true,
        invoice: true,
      },
    });
    if (!appoiment) throw new NotFoundException('No se ha encontrado la cita')
    return appoiment;
  }

  async update(id: number, updateAppoimentDto: UpdateAppoimentDto): Promise<Appoiment> {
    await this.findOne(id)
    const updated = await this.prisma.appoiment.update({
      where: { id },
      data: updateAppoimentDto,
    });
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)
    await this.prisma.appoiment.delete({ where: { id } })
  }

  async findAllAppoimentClient(id_client: number) {
    return await this.prisma.appoiment.findMany({
      where: { clientId: id_client },
      include: {
        client: true,
        car: true,
        mechanic: true,
        services: true,
        invoice: true,
      },
    })
  }

  async findAllApoimentMechanic(id_mecanic: number) {
    return this.prisma.appoiment.findMany({
      where: { mechanicId: id_mecanic },
      include: {
        client: true,
        car: true,
        mechanic: true,
        services: true,
        invoice: true,
      },
    })
  }


  async setAppointmentDate(startDate: Date, durationStimatedAppoiment: number) {
    const allAppoiment = await this.getAllApoimentByDateRange(startDate)
    const allMecanic = await this.employeeService.getAllMecanic()
    const availableSlots: AvailableSlot[] = []
    const dateInitial = new Date(startDate)

    for (let i = 0; i < this.rangeDateAppoiment; i++) {
      const date = new Date(dateInitial)
      date.setDate(dateInitial.getDate() + i)
      const dayWeek = date.getDay()

      // // Comparar que no sea ni domingo ni sabado
      if (dayWeek != 6 && dayWeek != 0) {
        // Inicio y final de la jornada del mecanico
        const startDay = new Date(date)
        startDay.setHours(8 + 1, 0, 0, 0)

        const endDay = new Date(date)
        endDay.setHours(17 + 1, 59, 59, 999)

        //obtener las citas de esa fecha
        const appoimentDate = allAppoiment.filter(a => a.appoiment_date >= startDay && a.appoiment_date <= endDay)

        //obtener Citas de cada mecanico
        const appoimentMechanic = this.getAppoimentMecanicDay(allMecanic, appoimentDate)

        //determinar si tiene hueco o no en ese dia teniendo en cuenta la duracion estimada de la cita del cliente
        const slotsMap = this.mechaniclAvailability(durationStimatedAppoiment, appoimentMechanic, startDay, endDay)
        availableSlots.push({
          day: date,
          slot: slotsMap
        })
      }
    }

    return availableSlots

  }

  // Citas que tiene el mecanico durante un dia
  getAppoimentMecanicDay(mechanics: Employee[], appoimentDay: Appoiment[]): MechanicAppointment[] {
    const mechanicAppoiment:MechanicAppointment[] = []
    for (const mechanic of mechanics) {
      const appoiment = appoimentDay.filter(a => a.mechanicId === mechanic.id)
      mechanicAppoiment.push({mechanicId: mechanic.id, appointment: appoiment})
    }

    
    return mechanicAppoiment
  }



  // Horas y fechas libres dependiendo de las citas que tenga el mecanico
  mechaniclAvailability(durationStimatedAppoiment: number, appoimentMechanic: MechanicAppointment[], startDay: Date, endDay: Date): MechanicSlot[] {
    const availableDates: MechanicSlot[] = []

    for (const mechanic of appoimentMechanic) {
      const appoimentOrder = mechanic.appointment.sort(
        (a, b) => a.appoiment_date.getTime() - b.appoiment_date.getTime()
      )

      const available: Date[] = []

      // Todo el dia libre
      if (appoimentOrder.length === 0) {
        let slot = new Date(startDay)
        while (slot.getTime() + durationStimatedAppoiment * 3600000 <= endDay.getTime()) {
          available.push(new Date(slot))
          slot = new Date(slot.getTime() + 3600000)
        }
        availableDates.push({number: mechanic.mechanicId, slot: available})
        continue
      }

      // Hueco antes de la primera cita
      if (appoimentOrder.length > 0) {
        const firtsAppoiment = appoimentOrder[0].appoiment_date
        const diffHour = (firtsAppoiment.getTime() - startDay.getTime()) / 3600000
        if (diffHour >= durationStimatedAppoiment) available.push(new Date(startDay))
      } else {
        available.push(new Date(startDay))
        availableDates.push({number: mechanic.mechanicId, slot: available})
        continue
      }

      // Hueco entre citas
      for (let i = 0; i < appoimentOrder.length - 1; i++) {
        const endAppoiment = new Date(appoimentOrder[i].appoiment_date)
        endAppoiment.setHours(endAppoiment.getHours() + parseFloat(appoimentOrder[i].duration))

        const nextAppoiment = appoimentOrder[i + 1].appoiment_date
        const diffHour = (nextAppoiment.getTime() - endAppoiment.getTime()) / 3600000
        if (diffHour >= durationStimatedAppoiment) available.push(new Date(endAppoiment))

      }

      // Hueco despues de la ultima cita
      const lastAppoiment = appoimentOrder[appoimentOrder.length - 1]
      const endAppoiment = new Date(lastAppoiment.appoiment_date)
      endAppoiment.setHours(endAppoiment.getHours() + parseFloat(lastAppoiment.duration))
      const diffHourEnd = (endDay.getTime() - endAppoiment.getTime()) / 3600000
      if (diffHourEnd >= durationStimatedAppoiment) available.push(new Date(endAppoiment))
      availableDates.push({number: mechanic.mechanicId, slot: available})
    }
    return availableDates
  }



  // Obtener todas las citas en un rango de fechas
  async getAllApoimentByDateRange(startDate: Date): Promise<Appoiment[]> {
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + this.rangeDateAppoiment)
    const appoiment = await this.prisma.appoiment.findMany({
      where: {
        appoiment_date: {
          gte: startDate,
          lte: endDate
        },
        state: {
          in: [StateServie.PENDING, StateServie.STARTED]
        }
      },
      include: {
        mechanic: true,
        services: true
      }
    });
    return appoiment
  }

}
