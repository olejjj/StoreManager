import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/entities/user.entity';

export const ROLES_KEY = 'roles';
// Ten dekorator pozwoli nam "otagować" endpoint, kto ma do niego dostęp
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);