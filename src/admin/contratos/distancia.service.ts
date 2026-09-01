import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DistanciaService {
  private apiKey = process.env.GOOGLE_MAPS_API_KEY;

  async calcularTiempoYDistancia(
    origen: { lat: number; lng: number },
    destino: { lat: number; lng: number }
  ) {
    try {
      // Convertimos los objetos en strings "lat,lng" para la API de Google
      const origenStr = `${origen.lat},${origen.lng}`;
      const destinoStr = `${destino.lat},${destino.lng}`;

      const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;
      const { data } = await axios.get(url, {
        params: {
          origins: origenStr,
          destinations: destinoStr,
          key: this.apiKey,
        },
      });

      if (data.status !== 'OK') {
        throw new BadRequestException(`Error en Distance Matrix: ${data.status}`);
      }

      const elemento = data.rows[0].elements[0];

      if (elemento.status !== 'OK') {
        throw new BadRequestException(`Error en Distance Matrix Element: ${elemento.status}`);
      }

      return {
        distancia_metros: elemento.distance.value,
        tiempo_segundos: elemento.duration.value,
        distancia_texto: elemento.distance.text,
        tiempo_texto: elemento.duration.text,
      };
    } catch (error: any) {
      // Captura errores de axios y de la API de Google
      throw new BadRequestException(error.message || 'Error desconocido en Distance Matrix');
    }
  }
}