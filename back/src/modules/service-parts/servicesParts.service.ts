import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicesPartsDto } from './dto/create-service-parts.dto';
import { UpdatePartsTypeServiceDto } from './dto/update-parts-type-service.dto';
import { Parts, PartsService } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DataDto, DataPartChange, StateChangePart } from './dto/TypeServiceParts.dto';
@Injectable()
export class ServicesParts {

  constructor(
    private prisma: PrismaService,
    // private readonly changePart: ValueChangePartService
  ) { }

  async findOne(id: number): Promise<PartsService> {
    const partTypeService = await this.prisma.partsService.findUnique({ where: { id } })
    if (!partTypeService) throw new NotFoundException("No se a encontrado la pieza en el servicio")
    return partTypeService
  }

  async update(id: number, updatePartsTypeServiceDto: UpdatePartsTypeServiceDto) {
    const part = await this.prisma.parts.findUnique({ where: { id: updatePartsTypeServiceDto.partId } })
    if (!part) throw new NotFoundException("Pieza no encontrada")
    const typeService = await this.prisma.service.findUnique({ where: { id: updatePartsTypeServiceDto.typeServiceId } })
    if (!typeService) throw new NotFoundException('Tipo de servicio no encontrado')
    const updatePart = await this.prisma.partsService.update({
      where: { id },
      data: updatePartsTypeServiceDto
    })
    return updatePart
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.partsService.delete({ where: { id: id } })
  }

  async createPartTypeService(createPartTypeService: CreateServicesPartsDto): Promise<PartsService> {

    const part = await this.prisma.parts.findUnique({ where: { id: createPartTypeService.partId } })
    if (!part) throw new NotFoundException("Pieza no encontrada")
    const typeService = await this.prisma.service.findUnique({ where: { id: createPartTypeService.typeServiceId } })
    if (!typeService) throw new NotFoundException('Tipo de servicio no encontrado')
    const partTypeService = await this.prisma.partsService.create({ data: createPartTypeService })
    return partTypeService
  }
  async getAllTypeServicesWithParts() {
    const allPart = await this.prisma.service.findMany({
      include: {
        parts: {
          include: {
            part: true
          }
        }
      }
    })
    return allPart
  }

  async getAllPartService(idTypeService: number) {
    const allPart = await this.prisma.service.findFirst({
      where: { id: idTypeService },
      include: {
        parts: {
          include: {
            part: true
          }
        }
      }
    })
    return allPart
  }

  async needChangeParts(idServiceSelect: number, dataUserCar: DataDto) {
    let returnInfoParts: DataPartChange[] = []
    const service = await this.getAllPartService(idServiceSelect)
    const parts = service?.parts ? service.parts.map(p => p.part) : [];
    for (let i = 0; i < parts.length; i++) {
      const changePart = await this.indicateChangePart(parts[i], dataUserCar)

      const dataPartChange: DataPartChange = this.generateDataPartChange(parts[i], changePart.changePartKm, changePart.changeTime, changePart.review)
      returnInfoParts.push(dataPartChange)
    }
    return returnInfoParts

  }

  // Camvbio de pieza segun km y tiempo
  async indicateChangePart(part: Parts, dataUserCar: DataDto): Promise<{ changePartKm: boolean, changeTime: boolean, review: boolean }> {
    let changePartTime: boolean = false
    let changePartKm: boolean = false

    if (part.frequency_km == 0 || part.frequency_time == '.') return { changePartKm: changePartKm, changeTime: changePartTime, review: false }

    const lastReplacement = await this.getAppoimentWithUsedPartReplaced(part.id, dataUserCar.userId, dataUserCar.carId)
    if (!lastReplacement) {
      const lastAppoiment = await this.getLastAppoimentCar(dataUserCar.carId)
      if (!lastAppoiment) {
        return { changePartKm: changePartKm, changeTime: changePartTime, review: true }
      } else {
        const kmDifferece = dataUserCar.carCurrentMillage - lastAppoiment.mileage_at_delivery
        changePartKm = kmDifferece >= part.frequency_km
        changePartTime = this.timeReview(lastAppoiment.appoiment_date, part.frequency_time)
      }
    } else if (lastReplacement) {
      changePartTime = this.timeReview(lastReplacement.appoiment_date, part.frequency_time)
      const kmDifferece = dataUserCar.carCurrentMillage - lastReplacement.mileage_at_delivery
      changePartKm = kmDifferece >= part.frequency_km
    }
    return { changePartKm: changePartKm, changeTime: changePartTime, review: false }
  }

  generateDataPartChange(part: Parts, changePartKm: boolean, changePartTime: boolean, review: boolean): DataPartChange {
    let observation: string
    let state: StateChangePart
    if(review){
      state = StateChangePart.REVIEW
      observation = 'No tenemos registros anteriores de mantenimiento o citas para este coche, te recomendamos realizar una revisión general.'
    } else if (part.frequency_km == 0 || part.frequency_time == '.') {
      state = StateChangePart.REVIEW
      observation = 'La pieza no tiene intervalos en los que se cambiar, sera revisada por el mecanico, en caso de que se deba cambiar se le notificara'
    } else if (changePartKm && changePartTime) {
      state = StateChangePart.SHOULD_CHANGE;
      observation = `La pieza ha superado tanto el kilometraje (${part.frequency_km} km) como el tiempo recomendado (${part.frequency_time}).`;
    } else if (changePartKm) {
      state = StateChangePart.SHOULD_CHANGE;
      observation = `La pieza ha superado el kilometraje recomendado (${part.frequency_km} km).`;
    } else if (changePartTime) {
      state = StateChangePart.SHOULD_CHANGE;
      observation = `La pieza ha superado el tiempo recomendado (${part.frequency_time}).`;
    } else {
      state = StateChangePart.NO_CHANGE;
      observation = `La pieza está dentro de los límites de uso recomendados. No se requiere cambio.`;
    }

    return {
      idPart: part.id,
      namePart: part.name,
      price: part.price,
      acctionPart: state,
      observation
    }
  }


  async getLastAppoimentCar(idCar: number) {
    const appoiment = await this.prisma.appoiment.findFirst({
      where: {
        carId: idCar
      },
      orderBy: {
        appoiment_date: 'desc'
      }
    })
    return appoiment
  }

  // Obtener la ultima cita realizada con esa pieza a cambiar o revisar
  async getAppoimentWithUsedPartReplaced(idPart: number, idUser: number, idCar: number) {
    const serviceWithPart = await this.prisma.appoiment.findFirst({
      where: {
        clientId: idUser,
        carId: idCar,
        services: {
          some: {
            parts_used: {
              some: {
                partId: idPart,
              }
            }
          }
        }
      },
      orderBy: {
        appoiment_date: 'desc'
      },
      include: {
        services: {
          include: {
            parts_used: {
              where: {
                partId: idPart,
              },
              include: {
                part: true
              }
            }
          }
        },
      }
    })

    return serviceWithPart
  }

  async servicePreviouslyProvided(idService: number, idUser: number, idCar: number) {
    const appoimentWithChangePart = await this.prisma.appoiment.findMany({
      where: {
        clientId: idUser,
        carId: idCar,
        services: {
          some: {
            id_service: idService,
          },
        },
      },
      orderBy: {
        appoiment_date: 'desc',
      },
      include: {
        services: {
          where: {
            id_service: idService,
          },
          include: {
            parts_used: {
              include: {
                part: {
                  select: {
                    id: true,
                    name: true,
                    reference: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return appoimentWithChangePart[0]
  }



  // Comprobar mediante la revision del coche y el tiempo de frecuencia la revision o cambio de una pieza o servicio
  timeReview(lastRevisionCarService: Date, frequency_time_service: string): boolean {
    const splitFrequency: string[] = frequency_time_service.split(" ")
    const timeFrequency: number = parseInt(splitFrequency[0])

    const dateNow: Date = new Date
    const differenceYear: number = dateNow.getFullYear() - lastRevisionCarService.getFullYear()
    const differenceMoth: number = dateNow.getMonth() - lastRevisionCarService.getMonth()

    const totalMoth = differenceYear * 12 + differenceMoth
    if (splitFrequency[1] == 'Meses') {
      return totalMoth > timeFrequency
    } else if (splitFrequency[1] == 'Años') {
      return differenceYear > timeFrequency
    }

    return false
  }

}



