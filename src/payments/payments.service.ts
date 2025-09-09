import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PaymentsService {
  private preference: Preference;

  constructor() {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error(
        'MP_ACCESS_TOKEN is not defined in environment variables',
      );
    }

    const mercadopago = new MercadoPagoConfig({ accessToken });
    this.preference = new Preference(mercadopago);
  }

  async createPreference(userId: string) {
    const result = await this.preference.create({
      body: {
        items: [
          {
            id: userId, // identificás el pago con el usuario
            title: 'Derecho de publicación',
            unit_price: 100, // 💰 precio fijo de la publicación
            quantity: 1,
          },
        ],
      },
    });

    return { init_point: result.init_point };
  }
}
