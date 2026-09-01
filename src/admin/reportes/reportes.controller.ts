import { Controller, Get, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { FiltrosReportesDto } from './dto/filtros-reportes.dto';


@Controller('reportes')
export class ReportesController {


  constructor(
    private readonly reportesService: ReportesService
  ) {}



  // 📊 DASHBOARD PRINCIPAL
  @Get('dashboard')
  getDashboard(
    @Query() filtros: FiltrosReportesDto
  ) {

    return this.reportesService.getDashboard(
      filtros.inicio,
      filtros.fin
    );

  }




  // 💰 INGRESOS DIARIOS
  @Get('ingresos-diarios')
  getIngresosDiarios(
    @Query() filtros: FiltrosReportesDto
  ) {

    return this.reportesService.getIngresosDiarios(
      filtros.inicio,
      filtros.fin
    );

  }





  // 💳 MÉTODOS DE PAGO
  @Get('metodos-pago')
  getMetodosPago(
    @Query() filtros: FiltrosReportesDto
  ) {

    return this.reportesService.getMetodosPago(
      filtros.inicio,
      filtros.fin
    );

  }





  // 📄 RESUMEN CONTRATOS
  @Get('contratos-resumen')
  getContratosResumen(
    @Query() filtros: FiltrosReportesDto
  ) {

    return this.reportesService.getContratosResumen(
      filtros.inicio,
      filtros.fin
    );

  }





  // 📌 CONTRATOS POR ESTADO
  @Get('contratos-estado')
  getContratosEstado(
    @Query() filtros: FiltrosReportesDto
  ) {

    return this.reportesService.getContratosEstado(
      filtros.inicio,
      filtros.fin
    );

  }





  // 🎉 EVENTOS TOP
  @Get('eventos-top')
  getEventosTop(
    @Query() filtros: FiltrosReportesDto
  ) {

    return this.reportesService.getEventosTop(
      filtros.inicio,
      filtros.fin
    );

  }





  // 👥 CLIENTES TOP
  @Get('clientes-top')
  getClientesTop(
    @Query() filtros: FiltrosReportesDto
  ) {

    return this.reportesService.getClientesTop(
      filtros.inicio,
      filtros.fin
    );

  }





  // 📅 RESERVAS POR MES
  @Get('reservas-mes')
  getReservasMes(
    @Query() filtros: FiltrosReportesDto
  ) {

    return this.reportesService.getReservasMes(
      filtros.inicio,
      filtros.fin
    );

  }





  // 💵 INGRESOS POR CATEGORÍA
  @Get('categorias-ingresos')
  getIngresosCategoria(
    @Query() filtros: FiltrosReportesDto
  ) {

    return this.reportesService.getIngresosCategoria(
      filtros.inicio,
      filtros.fin
    );

  }


  @Get('pdf')
generarPDF(
 @Query('desde') desde:string,
 @Query('hasta') hasta:string
){

 return this.reportesService.getReportePDF(
    desde,
    hasta
 );

}

}