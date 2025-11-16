import { Injectable } from "@nestjs/common";
import { TypeServiceDto } from './dto/TypeServiceParts.dto'; 
import { Car } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()

export class ValueChangePartService {
    constructor(private prisma:PrismaService){}

    needChangePart(car:Car, dataServiceParts:TypeServiceDto){

    }

    calculateMonthsLastReview(lastRevisionCar:Date, frequency_time_change:string){

    }

    partPreviouslyReplaced(serviceProvided:TypeServiceDto, carEnrolment:string, userDni:string){
        
    }
}