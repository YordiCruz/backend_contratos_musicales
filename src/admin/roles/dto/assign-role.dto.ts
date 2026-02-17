import { IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class AssignRolesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  rolesIds: string[];
}