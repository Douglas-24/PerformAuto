import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { CarsModule } from './cars/cars.module';
import { MailModule } from './mail/mail.module';
import { PartsModule } from './parts/parts.module';
import { ServicePartsModule } from './service-parts/servicesParts.module';
import { ServiceWorkshopModule } from './service-workshop/service-workshop.module';
import { EmployeeModule } from './employee/employee.module';
import { AppoimentModule } from './appoiment/appoiment.module';
import { AppointmentSocketGateway } from './sockets/appointment-socket.gateway';
import { NotificationModule } from './notification/notification.module';
import { InvoicesModule } from './invoices/invoices.module';
@Module({
    imports:[UserModule, AuthModule, CarsModule, MailModule, PartsModule, ServicePartsModule, ServiceWorkshopModule, EmployeeModule, AppoimentModule, NotificationModule, InvoicesModule],
    providers: [AppointmentSocketGateway],
})

export class FeaturesModule { }