import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { CarsModule } from './cars/cars.module';
import { MailModule } from './mail/mail.module';
@Module({
    imports:[UserModule, AuthModule, CarsModule, MailModule],
})

export class FeaturesModule { }