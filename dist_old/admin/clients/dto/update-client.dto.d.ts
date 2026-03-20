import { CreateClientDataDto } from './create-client-data.dto';
declare const UpdateClientDto_base: import("@nestjs/common").Type<Omit<CreateClientDataDto, "origen_registro" | "tipo_cliente">>;
export declare class UpdateClientDto extends UpdateClientDto_base {
}
export {};
