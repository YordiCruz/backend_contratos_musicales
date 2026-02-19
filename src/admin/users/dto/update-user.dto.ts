import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDataDto } from './create-user-data.dto';

export class UpdateUserDto extends PartialType(CreateUserDataDto) {

}
