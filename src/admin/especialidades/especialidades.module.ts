import { Module } from '@nestjs/common';
import { EspecialidadsModule } from './especialidads/especialidads.module';
import { CategoriasEspecialidadsModule } from './categorias_especialidads/categorias_especialidads.module';

@Module({
    imports:[
        EspecialidadsModule,
        CategoriasEspecialidadsModule
    ],
    exports:[
        EspecialidadsModule,
        CategoriasEspecialidadsModule
    ]
})
export class EspecialidadesModule {}
