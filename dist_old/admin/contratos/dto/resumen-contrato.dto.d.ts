export interface InvitacionDTO {
    nombre: string;
    especialidad: string;
    estado: 'aceptado' | 'rechazado' | 'pendiente';
}
export interface SugerenciaDTO {
    especialidad: string;
    candidatos: {
        id: string;
        nombre: string;
        tipo: 'primario' | 'secundario';
    }[];
}
export interface ResumenContratoDTO {
    contratoId: string;
    aceptados: InvitacionDTO[];
    rechazados: InvitacionDTO[];
    pendientes: InvitacionDTO[];
    faltantes: string[];
    sugerencias: SugerenciaDTO[];
}
