import { Contrato } from './contrato.entity';
import { User } from 'src/admin/users/entities/user.entity';
export declare class Pago {
    id_pago: string;
    contrato: Contrato;
    monto: number;
    metodo: string;
    tipo: string;
    referencia: string;
    fecha_pago: Date;
    registrado_por: User;
}
