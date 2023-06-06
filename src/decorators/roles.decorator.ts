import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/role.enum";

export const RULES_KEY = "roles"
export const Roles = (...roles: Role[]) => SetMetadata(RULES_KEY, roles);