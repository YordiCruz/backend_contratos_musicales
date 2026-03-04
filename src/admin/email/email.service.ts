import { Injectable } from '@nestjs/common';
import { MailtrapClient } from 'mailtrap';

@Injectable()
export class EmailService {
  private client: MailtrapClient;

  constructor() {
    this.client = new MailtrapClient({
      token: process.env.MAILTRAP_API_KEY || '', // tu API token
    });
  }

  async send(to: string, subject: string, html: string) {
    return this.client.send({
      from: { name: 'Eventos App', email: 'no-reply@example.com' },
      to: [{ email: to }],
      subject,
      html,
    });
  }
}