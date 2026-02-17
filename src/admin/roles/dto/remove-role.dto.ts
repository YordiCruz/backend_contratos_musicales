import { IsUUID } from 'class-validator';

export class RemoveRoleDto {
  @IsUUID()
  roleId: string;
}