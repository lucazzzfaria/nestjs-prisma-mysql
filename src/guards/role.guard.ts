import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Headers,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { RULES_KEY, Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflactor: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const requeridRoles = this.reflactor.getAllAndOverride<Role[]>(RULES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requeridRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const rulesFiltred = requeridRoles.filter((role) => role === user.role);
    return rulesFiltred.length > 0; 
  }
}
