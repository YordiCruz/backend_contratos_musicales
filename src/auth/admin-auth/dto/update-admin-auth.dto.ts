import { PartialType } from '@nestjs/swagger';
import { AdminLoginDto } from './admin-login.dto';

export class UpdateAdminAuthDto extends PartialType(AdminLoginDto) {}
