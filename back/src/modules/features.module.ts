import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { CarsModule } from './cars/cars.module';
import { MailModule } from './mail/mail.module';
import { TypeServiceModule } from './type_service/type_service.module';
import { ServiceModule } from './service/service.module';
@Module({
    imports:[UserModule, AuthModule, CarsModule, MailModule, TypeServiceModule, ServiceModule],
})

export class FeaturesModule { }