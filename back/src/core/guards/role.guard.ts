
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';;
import { Role } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private allowedRoles: Role[]) { }
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user.user;
        
        if (!user || !this.allowedRoles.includes(user.rol)) {
            throw new ForbiddenException('Acceso denegado: rol insuficiente');
        }
        return true
    }
}   
