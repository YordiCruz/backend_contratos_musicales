import { Injectable } from '@nestjs/common';
import { CreateClientAuthDto } from './dto/create-client-auth.dto';
import { UpdateClientAuthDto } from './dto/update-client-auth.dto';

@Injectable()
export class ClientAuthService {
  create(createClientAuthDto: CreateClientAuthDto) {
    return 'This action adds a new clientAuth';
  }

  findAll() {
    return `This action returns all clientAuth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientAuth`;
  }

  update(id: number, updateClientAuthDto: UpdateClientAuthDto) {
    return `This action updates a #${id} clientAuth`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientAuth`;
  }
}
