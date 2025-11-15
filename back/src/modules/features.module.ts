import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { CarsModule } from './cars/cars.module';
import { MailModule } from './mail/mail.module';
import { TypeServiceModule } from './type_service/type_service.module';
import { ServiceModule } from './service/service.module';
import { PartsModule } from './parts/parts.module';
import { PartsTypeServiceModule } from './parts-type-service/parts-type-service.module';
import { PartsServiceModule } from './parts-service/parts-service.module';
@Module({
    imports:[UserModule, AuthModule, CarsModule, MailModule, TypeServiceModule, ServiceModule, PartsModule, PartsTypeServiceModule, PartsServiceModule],
})

export class FeaturesModule { }