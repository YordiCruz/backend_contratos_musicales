import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ReportesService {

  constructor(
    private dataSource: DataSource
  ) {}

  // =========================================================
  // 📅 FILTROS DE FECHA
  // =========================================================

  private filtroFecha(
    campo: string,
    inicio?: string,
    fin?: string
  ): string {

    return `
      ${inicio
        ? `AND ${campo} >= '${inicio}'`
        : ''
      }

      ${fin
        ? `AND ${campo} < ('${fin}'::date + INTERVAL '1 day')`
        : ''
      }
    `;
  }

  // =========================================================
  // 📊 DASHBOARD PRINCIPAL
  // =========================================================

  async getDashboard(
    inicio?: string,
    fin?: string
  ) {

    const filtroPagos = this.filtroFecha(
      'fecha_pago',
      inicio,
      fin
    );

    const filtroContratos = this.filtroFecha(
      'fecha_evento',
      inicio,
      fin
    );

    const result = await this.dataSource.query(`

      SELECT

      (
        SELECT COALESCE(SUM(monto), 0)
        FROM pagos
        WHERE estado = 'aprobado'
        ${filtroPagos}
      ) AS ingresos_totales,


      (
        SELECT COUNT(*)
        FROM pagos
        WHERE estado = 'aprobado'
        ${filtroPagos}
      ) AS pagos_exitosos,


      (
        SELECT COUNT(*)
        FROM pagos
        WHERE estado = 'pendiente'
        ${filtroPagos}
      ) AS pagos_pendientes,


      (
        SELECT COUNT(*)
        FROM contratos
        WHERE 1 = 1
        ${filtroContratos}
      ) AS total_contratos,


      (
        SELECT COALESCE(SUM(saldo), 0)
        FROM contratos
        WHERE 1 = 1
        ${filtroContratos}
      ) AS saldo_global;

    `);

    return result[0];
  }


  // =========================================================
  // 💰 INGRESOS DIARIOS
  // =========================================================

  async getIngresosDiarios(
    inicio?: string,
    fin?: string
  ) {

    const filtroPagos = this.filtroFecha(
      'fecha_pago',
      inicio,
      fin
    );

    return this.dataSource.query(`

      SELECT

        DATE(fecha_pago) AS fecha,

        COUNT(*) AS cantidad_pagos,

        SUM(monto) AS ingresos_totales

      FROM pagos

      WHERE estado = 'aprobado'

        AND fecha_pago IS NOT NULL

        ${filtroPagos}

      GROUP BY DATE(fecha_pago)

      ORDER BY fecha;

    `);
  }


  // =========================================================
  // 💳 MÉTODOS DE PAGO
  // =========================================================

  async getMetodosPago(
    inicio?: string,
    fin?: string
  ) {

    const filtroPagos = this.filtroFecha(
      'fecha_pago',
      inicio,
      fin
    );

    return this.dataSource.query(`

      SELECT

        metodo AS metodo_pago,

        COUNT(*) AS transacciones,

        SUM(monto) AS total_ingresado

      FROM pagos

      WHERE estado = 'aprobado'

        ${filtroPagos}

      GROUP BY metodo

      ORDER BY total_ingresado DESC;

    `);
  }


  // =========================================================
  // 📄 CONTRATOS RESUMEN
  // =========================================================

  async getContratosResumen(
    inicio?: string,
    fin?: string
  ) {

    const filtroContratos = this.filtroFecha(
      'fecha_evento',
      inicio,
      fin
    );

    const [resumen] = await this.dataSource.query(`

      SELECT

        COUNT(*) AS total_contratos,

        COALESCE(SUM(monto_final), 0)
          AS monto_total_contratos,

        COALESCE(SUM(total_pagado), 0)
          AS total_pagado,

        COALESCE(SUM(saldo), 0)
          AS saldo_global

      FROM contratos

      WHERE 1 = 1

        ${filtroContratos}

    `);

    return resumen;
  }


  // =========================================================
  // 📌 CONTRATOS POR ESTADO
  // =========================================================

  async getContratosEstado(
    inicio?: string,
    fin?: string
  ) {

    const filtroContratos = this.filtroFecha(
      'fecha_evento',
      inicio,
      fin
    );

    return this.dataSource.query(`

      SELECT

        estado,

        COUNT(*) AS total

      FROM contratos

      WHERE 1 = 1

        ${filtroContratos}

      GROUP BY estado

      ORDER BY total DESC;

    `);
  }


  // =========================================================
  // 🎉 EVENTOS MÁS CONTRATADOS
  // =========================================================

  async getEventosTop(
    inicio?: string,
    fin?: string
  ) {

    const filtroContratos = this.filtroFecha(
      'c.fecha_evento',
      inicio,
      fin
    );

    return this.dataSource.query(`

      SELECT

        e.nombre,

        COUNT(*) AS total

      FROM contratos c

      JOIN events e
        ON c."eventoIdEvento" = e.id_evento

      WHERE 1 = 1

        ${filtroContratos}

      GROUP BY e.nombre

      ORDER BY total DESC

      LIMIT 10;

    `);
  }


  // =========================================================
  // 👥 CLIENTES TOP
  // =========================================================

  async getClientesTop(
    inicio?: string,
    fin?: string
  ) {

    const filtroContratos = this.filtroFecha(
      'c.fecha_evento',
      inicio,
      fin
    );

    return this.dataSource.query(`

      SELECT

        CONCAT(
          p.nombre,
          ' ',
          p.apellido
        ) AS cliente,

        COUNT(*) AS total

      FROM contratos c

      JOIN clients cl
        ON c."clienteId" = cl.id

      JOIN persons p
        ON cl.id_persona = p.id

      WHERE 1 = 1

        ${filtroContratos}

      GROUP BY cliente

      ORDER BY total DESC

      LIMIT 10;

    `);
  }


  // =========================================================
  // 📅 RESERVAS POR MES
  // =========================================================

  async getReservasMes(
    inicio?: string,
    fin?: string
  ) {

    const filtroContratos = this.filtroFecha(
      'fecha_evento',
      inicio,
      fin
    );

    return this.dataSource.query(`

      SELECT

        TO_CHAR(fecha_evento, 'Mon') AS mes,

        COUNT(*) AS total,

        EXTRACT(
          MONTH FROM fecha_evento
        ) AS numero

      FROM contratos

      WHERE 1 = 1

        ${filtroContratos}

      GROUP BY numero, mes

      ORDER BY numero;

    `);
  }


  // =========================================================
  // 💵 INGRESOS POR CATEGORÍA
  // =========================================================

  async getIngresosCategoria(
    inicio?: string,
    fin?: string
  ) {

    const filtroPagos = this.filtroFecha(
      'p.fecha_pago',
      inicio,
      fin
    );

    return this.dataSource.query(`

      SELECT

        ec.nombre AS categoria,

        SUM(p.monto) AS ingresos

      FROM pagos p

      JOIN contratos c
        ON p.id_contrato = c.id_contrato

      JOIN events e
        ON c."eventoIdEvento" = e.id_evento

      JOIN categories_events ec
        ON e.id_categoria = ec.id_categoria

      WHERE p.estado = 'aprobado'

        ${filtroPagos}

      GROUP BY ec.nombre

      ORDER BY ingresos DESC;

    `);
  }


  // =========================================================
  // 📄 DATOS PARA REPORTE PDF
  // =========================================================

  async getReportePDF(
    desde?: string,
    hasta?: string
  ) {

    const filtroPagos = this.filtroFecha(
      'p.fecha_pago',
      desde,
      hasta
    );

    const filtroContratos = this.filtroFecha(
      'c.fecha_evento',
      desde,
      hasta
    );


    // =====================================================
    // 📊 RESUMEN GENERAL
    // =====================================================

    const [resumen] = await this.dataSource.query(`

      SELECT

      (
        SELECT COALESCE(SUM(monto), 0)

        FROM pagos p

        WHERE p.estado = 'aprobado'

          ${filtroPagos}

      ) AS ingresos_totales,


      (
        SELECT COUNT(*)

        FROM pagos p

        WHERE p.estado = 'aprobado'

          ${filtroPagos}

      ) AS pagos_exitosos,


      (
        SELECT COUNT(*)

        FROM pagos p

        WHERE p.estado = 'pendiente'

          ${filtroPagos}

      ) AS pagos_pendientes,


      (
        SELECT COUNT(*)

        FROM contratos c

        WHERE 1 = 1

          ${filtroContratos}

      ) AS total_contratos;

    `);


    // =====================================================
    // 💰 INGRESOS DIARIOS
    // =====================================================

    const ingresosDiarios =
      await this.dataSource.query(`

        SELECT

          DATE(p.fecha_pago) AS fecha,

          COUNT(*) AS cantidad_pagos,

          SUM(p.monto) AS ingresos_totales

        FROM pagos p

        WHERE p.estado = 'aprobado'

          ${filtroPagos}

        GROUP BY DATE(p.fecha_pago)

        ORDER BY fecha;

      `);


    // =====================================================
    // 📄 RESUMEN CONTRATOS
    // =====================================================

    const [contratos] =
      await this.dataSource.query(`

        SELECT

          COUNT(*) AS total_contratos,

          COALESCE(
            SUM(monto_final), 0
          ) AS monto_total_contratos,

          COALESCE(
            SUM(total_pagado), 0
          ) AS total_pagado,

          COALESCE(
            SUM(saldo), 0
          ) AS saldo_global

        FROM contratos c

        WHERE 1 = 1

          ${filtroContratos}

      `);


    // =====================================================
    // 🎉 EVENTOS MÁS CONTRATADOS
    // =====================================================

    const eventosTop =
      await this.dataSource.query(`

        SELECT

          e.nombre,

          COUNT(*) AS total

        FROM contratos c

        JOIN events e
          ON c."eventoIdEvento" = e.id_evento

        WHERE 1 = 1

          ${filtroContratos}

        GROUP BY e.nombre

        ORDER BY total DESC

        LIMIT 10;

      `);


    // =====================================================
    // 👥 CLIENTES MÁS ACTIVOS
    // =====================================================

    const clientesTop =
      await this.dataSource.query(`

        SELECT

          CONCAT(
            p.nombre,
            ' ',
            p.apellido
          ) AS cliente,

          COUNT(*) AS total

        FROM contratos c

        JOIN clients cl
          ON c."clienteId" = cl.id

        JOIN persons p
          ON cl.id_persona = p.id

        WHERE 1 = 1

          ${filtroContratos}

        GROUP BY cliente

        ORDER BY total DESC

        LIMIT 10;

      `);


    // =====================================================
    // 💳 MÉTODOS DE PAGO
    // =====================================================

    const metodosPago =
      await this.dataSource.query(`

        SELECT

          metodo AS metodo_pago,

          COUNT(*) AS transacciones,

          SUM(monto) AS total_ingresado

        FROM pagos p

        WHERE p.estado = 'aprobado'

          ${filtroPagos}

        GROUP BY metodo

        ORDER BY total_ingresado DESC;

      `);


    // =====================================================
    // 📌 CONTRATOS POR ESTADO
    // =====================================================

    const contratosEstado =
      await this.dataSource.query(`

        SELECT

          estado,

          COUNT(*) AS total

        FROM contratos c

        WHERE 1 = 1

          ${filtroContratos}

        GROUP BY estado;

      `);


    // =====================================================
    // 📅 RESERVAS POR MES
    // =====================================================

    const reservasMes =
      await this.dataSource.query(`

        SELECT

          TO_CHAR(
            fecha_evento,
            'Mon'
          ) AS mes,

          COUNT(*) AS total,

          EXTRACT(
            MONTH FROM fecha_evento
          ) AS numero

        FROM contratos c

        WHERE 1 = 1

          ${filtroContratos}

        GROUP BY mes, numero

        ORDER BY numero;

      `);


    // =====================================================
    // 💵 INGRESOS POR CATEGORÍA
    // =====================================================

    const categoriasIngreso =
      await this.dataSource.query(`

        SELECT

          ec.nombre AS categoria,

          SUM(p.monto) AS ingresos

        FROM pagos p

        JOIN contratos c
          ON p.id_contrato = c.id_contrato

        JOIN events e
          ON c."eventoIdEvento" = e.id_evento

        JOIN categories_events ec
          ON e.id_categoria = ec.id_categoria

        WHERE p.estado = 'aprobado'

          ${filtroPagos}

        GROUP BY ec.nombre

        ORDER BY ingresos DESC;

      `);


    // =====================================================
    // 📦 RESPUESTA
    // =====================================================

    return {

      rango: {
        desde,
        hasta
      },

      resumen,

      contratos,

      ingresosDiarios,

      eventosTop,

      clientesTop,

      metodosPago,

      contratosEstado,

      reservasMes,

      categoriasIngreso

    };
  }
}