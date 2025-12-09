import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataAppointmentCreate, CreateAppoimentServicePartDto } from './dto/create-appoiment.dto';
import { UpdateAppoimentDto, UpdateAppoimentServicePartDto } from './dto/update-appoiment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Appoiment, Employee, StateServie } from '@prisma/client';
import { EmployeeService } from '../employee/employee.service';
import { DataServiceSelected, StateChangePart } from '../service-parts/dto/TypeServiceParts.dto';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../notification/dto/create-notification.dto';
import { NotificationSocketGateWay } from '../sockets/notifications-socket.gateway';
import { InvoicesService } from '../invoices/invoices.service';
import { CreateInvoiceDto } from '../invoices/dto/create-invoice.dto';
interface MechanicData {
  id: number,
  fullName: string
}
interface MechanicAppointment {
  mechanic: MechanicData
  appointment: Appoiment[]
}
interface MechanicSlot {
  mechanic: MechanicData
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
    private employeeService: EmployeeService,
    private notificationService: NotificationService,
    private socketService: NotificationSocketGateWay,
    private invoiceService: InvoicesService

  ) { }

  async create(createAppoimentDto: DataAppointmentCreate): Promise<Appoiment> {
    const appointmentCarActive = await this.prisma.appoiment.findFirst({ where: { carId: createAppoimentDto.appoinment.carId } })
    if (appointmentCarActive?.state == StateServie.STARTED || appointmentCarActive?.state == StateServie.PENDING) {
      throw new BadRequestException('Ya existe una cita con este coche')
    }
    const appoiment = await this.prisma.appoiment.create({
      data: createAppoimentDto.appoinment
    })
    await this.agregateServicesSelectedAppoinment(appoiment.id, createAppoimentDto.servicesSelected)

    await this.notificationService.createNotificationForUser({
      notification: {
        typeNotifycation: NotificationType.INFO,
        title: 'Cita solicitada correctamente',
        message: 'Gracias por confiar en nosotros, la cita la podras ver en el apartado de citas',
        id_user: appoiment.clientId
      }
    })
    await this.notificationService.createNotificationForUser({
      notification: {
        typeNotifycation: NotificationType.INFO,
        title: 'Nueva cita asignada',
        message: 'Se te a asignado una nueva cita, cosultarlo en el partado de citas',
        employeeId: appoiment.mechanicId
      }
    })
    return appoiment
  }

  async agregateServicesSelectedAppoinment(id_appoinment: number, servicesSelectedAppoinment: DataServiceSelected[]) {
    const createAppoinmtentServices: { id_appoiment: number, id_service: number }[] = []
    for (const selected of servicesSelectedAppoinment) {
      if (selected.service.id) {
        createAppoinmtentServices.push({ id_appoiment: id_appoinment, id_service: selected.service.id })
      }
    }
    await this.prisma.appoimentService.createMany({ data: createAppoinmtentServices })
    await this.aggregatePartsServiceAppointment(id_appoinment, servicesSelectedAppoinment)
  }

  async aggregatePartsServiceAppointment(id_appoiment: number, partsServices: DataServiceSelected[]) {
    const appoinmentServices = await this.prisma.appoimentService.findMany({ where: { id_appoiment: id_appoiment } })
    const partsServicesAppointment: CreateAppoimentServicePartDto[] = []
    for (const services of partsServices) {
      const service = appoinmentServices.filter(a => a.id_service == services.service.id)
      for (const part of services.parts) {
        partsServicesAppointment.push({
          appoimentServiceId: service[0].id,
          partId: part.idPart,
          quantity: 0,
          replaced: false,
          statePart: part.acctionPart
        })
      }
    }

    await this.prisma.appoimentServicePart.createMany({ data: partsServicesAppointment })
  }

  // Cliente confirma si se cambia o no la pieza
  async confirmUrgentChangePart(id:number, data:{confirmChange:boolean, mechanicId:number}){
    const confirmChangeAcction = await this.prisma.partChangeUrgent.update({
      where: {id},
      data: {
        clientConfirmed: data.confirmChange, 
        confirmedAt: new Date()
      },
      include: {
            appoimentServicePart: true
        }
    })
    const appoimentServicePartId = confirmChangeAcction.appoimentServicePartId;
    const newState = data.confirmChange ? StateChangePart.SHOULD_CHANGE : StateChangePart.NO_CHANGE;

    const updateState = await this.prisma.appoimentServicePart.update({
      where: {id: appoimentServicePartId},
      data: {
        statePart: newState,
      }
    })
    const messageAction = data.confirmChange ? 'aceptar' : 'rechazar';
    const actionState = data.confirmChange ? 'proceder con' : 'ignorar';
    this.notificationService.createNotificationForUser({
       notification: {
        typeNotifycation: NotificationType.INFO,
        title: `El cliente ya a decidio si realizar o no el cambio de la pieza`,
        message: `El cliente a decido ${messageAction} el cambio de la pieza. Puede ${actionState} el cambio. `,
        employeeId: data.mechanicId
      }
    })
    this.socketService.refreshDataEmployee(data.mechanicId)
    return confirmChangeAcction
  }

  // Que es lo que pas cuando se confirma el cambio

  async updatePartServiceAppointment(id: number, dataPart: UpdateAppoimentServicePartDto) {
    console.log(dataPart);
    if (dataPart.mechanicMessage && dataPart.urlImg)
      await this.uploadImgPartChangeUrgent(id, dataPart.mechanicMessage, dataPart.urlImg)
    const part = await this.prisma.parts.findFirst({ where: { id: dataPart.partId } })
    const appoinmentService = await this.prisma.appoimentService.findFirst({ where: { id: dataPart.appoimentServiceId } })
    if (!part && !appoinmentService) throw new NotFoundException('No se podido encontrar la pieza de la cita')
    const partServiceAppointment = await this.prisma.appoimentServicePart.update({
      where: { id: id },
      data: {
        quantity: dataPart.quantity,
        replaced: dataPart.replaced,
        statePart: dataPart.statePart,
        part: { connect: { id: dataPart.partId } },
        appoimentService: { connect: { id: dataPart.appoimentServiceId } }
      }
    })
    return partServiceAppointment
  }


  // Metodo para subir la imagen y descripcion del porque deberia cambiar el cliente la pieza
  async uploadImgPartChangeUrgent(id_appoimentServicePart: number, mechanicMessage: string, urlImg: string) {
    const partDetail = await this.prisma.appoimentServicePart.findUnique({
      where: { id: id_appoimentServicePart },
      select: {
        appoimentService: {
          select: {
            appoiment: {
              select: {
                client: {
                  select: {
                    id: true,
                    email: true,
                    name: true,
                  }
                },
                mechanic: {
                  select: {
                    id: true,
                    name: true,
                    lastname: true
                  }
                }
              }
            }
          }
        }
      }
    })
    const changePart = await this.prisma.partChangeUrgent.create({
      data: {
        appoimentServicePartId: id_appoimentServicePart,
        mechanicMessage: mechanicMessage,
        urlImg: urlImg
      }
    })
    const mecanic = partDetail?.appoimentService.appoiment.mechanic
    const client = partDetail?.appoimentService.appoiment.client.id
    await this.notificationService.createNotificationForUser({
      notification: {
        typeNotifycation: NotificationType.INFO,
        title: `El mecanico ${mecanic?.name} ${mecanic?.lastname} te a enviado un mensaje`,
        message: 'Parece ser que el mecanico a visto un cambio de pieza urgente miralo',
        id_user: client
      }
    })
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

  async getAllCarWithAppointment(id_car: number) {
    const appoiment = await this.prisma.appoiment.findFirst({
      where: {
        carId: id_car,
        state: {
          in: [StateServie.STARTED, StateServie.PENDING]
        }
      },
      include: {
        car: true
      }
    })
    return appoiment
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

  async finishAppointment(id: number, updateAppoimentDto: UpdateAppoimentDto): Promise<Appoiment> {
    await this.findOne(id)
    const updated = await this.prisma.appoiment.update({
      where: { id },
      data: {
        state: updateAppoimentDto.state
      },
    });

    if(updateAppoimentDto.state == StateServie.FINISH){
      await this.notificationService.createNotificationForUser({
        notification: {
          title: 'Su cita acaba de finalizar',
          message: 'Su coche ya esta disponible para la recogida',
          typeNotifycation:NotificationType.INFO,
          id_user:updated.clientId 
        }
      })
      const invoice:CreateInvoiceDto = {
        id_appoiment: id,
        userId: updated.clientId,
        total_cost: 0,
        notes: updateAppoimentDto.notes ? updateAppoimentDto.notes : ''
      }
      await this.invoiceService.create(invoice)
      await this.notificationService.createNotificationForUser({
        notification: {
          title: 'Tu factura esta lista',
          message: 'Puedes ver la factura de la cita en la seccion de citas',
          typeNotifycation:NotificationType.INFO,
          id_user:updated.clientId 
        }
      })

    }
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
        invoice: true,
        services: { 
          include: {
            services: true,
            parts_used: {
              include: {
                part: true,
                urgentChangePart: {
                  orderBy: {
                    createdAt: 'desc',
                  }
                }
              }
            }
          }
        }
      }
    })
  }

  async findAllApoimentMechanic(id_mecanic: number) {
    return this.prisma.appoiment.findMany({
      where: { mechanicId: id_mecanic },
      include: {
        client: true,
        car: true,
        mechanic: true,
        invoice: true,
      },
    })
  }

  async getServicesPartAppointment(id_appointment: number) {
    await this.findOne(id_appointment)
    return await this.prisma.appoimentService.findMany({
      where: { id_appoiment: id_appointment },
      include: {
        services: true,
        parts_used: {
          include: {
            part: true,
            urgentChangePart:true
          }
        }
      }
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
    const mechanicAppoiment: MechanicAppointment[] = []
    for (const mechanic of mechanics) {
      const appoiment = appoimentDay.filter(a => a.mechanicId === mechanic.id)
      mechanicAppoiment.push({
        mechanic: {
          id: mechanic.id,
          fullName: mechanic.name + ' ' + mechanic.lastname
        }, appointment: appoiment
      })
    }


    return mechanicAppoiment
  }



  // Horas y fechas libres dependiendo de las citas que tenga el mecanico
  mechaniclAvailability(durationStimatedAppoiment: number, appoimentMechanic: MechanicAppointment[], startDay: Date, endDay: Date): MechanicSlot[] {
    const availableDates: MechanicSlot[] = []
    const now = new Date()
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
        const filtered = this.filterPastSlots(available, now)
        availableDates.push({ mechanic: mechanic.mechanic, slot: filtered })
        continue
      }

      // Hueco antes de la primera cita
      if (appoimentOrder.length > 0) {
        const firtsAppoiment = appoimentOrder[0].appoiment_date
        const diffHour = (firtsAppoiment.getTime() - startDay.getTime()) / 3600000
        if (diffHour >= durationStimatedAppoiment) available.push(new Date(startDay))
      } else {
        available.push(new Date(startDay))
        const filtered = this.filterPastSlots(available, now)
        availableDates.push({ mechanic: mechanic.mechanic, slot: filtered })
        continue
      }

      // Hueco entre citas
      for (let i = 0; i < appoimentOrder.length - 1; i++) {
        const endAppoiment = new Date(appoimentOrder[i].appoiment_date)
        endAppoiment.setHours(endAppoiment.getHours() + appoimentOrder[i].duration)

        const nextAppoiment = appoimentOrder[i + 1].appoiment_date
        const diffHour = (nextAppoiment.getTime() - endAppoiment.getTime()) / 3600000
        if (diffHour >= durationStimatedAppoiment) available.push(new Date(endAppoiment))

      }

      // Hueco despues de la ultima cita
      const lastAppoiment = appoimentOrder[appoimentOrder.length - 1]
      const endAppoiment = new Date(lastAppoiment.appoiment_date)
      endAppoiment.setHours(endAppoiment.getHours() + lastAppoiment.duration)
      const diffHourEnd = (endDay.getTime() - endAppoiment.getTime()) / 3600000
      if (diffHourEnd >= durationStimatedAppoiment) available.push(new Date(endAppoiment))
      const filtered = this.filterPastSlots(available, now)
      availableDates.push({ mechanic: mechanic.mechanic, slot: filtered })
    }
    return availableDates
  }

  // Filtrar si se esta pidiendo el mismo dia una cita, omitir horas anteriores respecto a la hora en que pedimos la cita
  filterPastSlots(slots: Date[], now: Date): Date[] {
    return slots.filter(s => {
      const isSameDay =
        s.getFullYear() === now.getFullYear() &&
        s.getMonth() === now.getMonth() &&
        s.getDate() === now.getDate()

      return !isSameDay || s.getTime() >= now.getTime()
    })

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
