import { Injectable } from "@nestjs/common";

@Injectable()
export class PagosAgeticService {
  async generarQR(dto: { contratoId: string; monto: number }) {
    const transaccion_id = `TEST-${crypto.randomUUID()}`;

    const urlConfirmacion = `https://tu-backend.com/pagos/simular/confirmar/${transaccion_id}`;

    const qrBase64 = this.generarQRBase64(urlConfirmacion);

    return {
      qr: qrBase64,
      transaccion_id,
      monto: dto.monto,
      url: urlConfirmacion,
    };
  }

  private generarQRBase64(texto: string) {
    return `data:image/png;base64,${Buffer.from(texto).toString('base64')}`;
  }


  


}