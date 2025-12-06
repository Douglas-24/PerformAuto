import { Type } from 'class-transformer';
import {
    IsEnum, IsInt, IsString, IsNotEmpty, IsOptional, IsNumber, MaxLength, IsBoolean,
    IsDate,
    ValidateNested,
} from 'class-validator'
export enum NotificationType {
    INFO = 'INFO',
    WARNING = 'WARNING',
    URGENT = 'URGENT',
    CONFIRMATION = 'CONFIRMATION',
}

export class NotificationFileDto {
    @IsInt()
    notificationId: number;

    @IsString()
    url: string;

    @IsString()
    type: string;

    @IsDate()
    @Type(() => Date)
    uploadedAt: Date;
}

export class CreateNotificationDto {
    @IsEnum(NotificationType)
    typeNotifycation: NotificationType;


    @IsString()
    title: string;

    @IsString()
    message: string;


    @IsOptional()
    @IsInt()
    id_user?: number;

    @IsOptional()
    @IsInt()
    employeeId?: number;
}
