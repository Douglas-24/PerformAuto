import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { CarsModule } from './cars/cars.module';
@Module({
    imports:[UserModule, AuthModule, CarsModule],
})

export class FeaturesModule { }