import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) { }
  async create(createInvoiceDto: CreateInvoiceDto) {
    const totalCost = await this.getAppointmentTotalCost(createInvoiceDto.id_appoiment)
    if (totalCost) {
      createInvoiceDto.total_cost = totalCost.totalCost
      createInvoiceDto.userId = totalCost.id_user
    }
    const invoice = await this.prisma.invoice.create({
      data: createInvoiceDto
    })
    return invoice;
  }

  async findAllUserInvoice(userId: number) {
    const allInvoices = await this.prisma.invoice.findMany({
      where: { userId: userId },
      select: {
        appoiment: {
          select: {
            mechanic: {
              select: {
                name: true,
                lastname: true,
              },
            },
            appoiment_date: true
          },
          include: {
            car: true
          }
        },
        total_cost: true,
        date_invoice_issuance: true
      }
    });

    return allInvoices;
  }

  async findOneInvoice(id: number) {
    return await this.prisma.invoice.findFirst({
      where: { id_appoiment: id },
      include: {
        appoiment: {
          include: {
            services: {
              include: {
                services: true,
                parts_used: {
                  include: {
                    part: true,
                    urgentChangePart: {
                      select: {
                        mechanicMessage: true,
                        clientConfirmed: true,
                        confirmedAt: true,
                        createdAt: true,
                        urlImg: true,
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async getAppointmentTotalCost(appointmentId: number): Promise<{ id_user: number, totalCost: number } | null> {
    const appointment = await this.prisma.appoiment.findUnique({
      where: { id: appointmentId },
      select: {
        client: {
          select: {
            id: true
          }
        },
        services: {
          select: {
            services: {
              select: {
                price: true,
              },
            },
            parts_used: {
              where: {
                replaced: true,
              },
              select: {
                quantity: true,
                part: {
                  select: {
                    price: true,
                  },
                },
                urgentChangePart: {
                  where: {
                    clientConfirmed: true,
                  },
                  select: {
                    id: true
                  }
                }
              },
            },
          },
        },
      },
    });
    if (!appointment || appointment.services.length === 0) {
      return null;
    }
    let totalCost = 0;


    for (const appointmentService of appointment.services) {

      if (appointmentService.services && appointmentService.services.price) {
        totalCost += appointmentService.services.price;
      }
      for (const partUsed of appointmentService.parts_used) {
        const partPrice = partUsed.part.price;
        const partQuantity = partUsed.quantity;
        let cost = partPrice * partQuantity;
        totalCost += cost;
      }
    }

    return { id_user: appointment.client.id, totalCost: totalCost };
  }
}
