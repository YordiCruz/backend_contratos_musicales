import { IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class AssignRolesDto {
  @IsUUID('all', { each: true })
  rolesIds: string;
}