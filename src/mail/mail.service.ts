import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, RequestTimeoutException } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMail(email: string) {
    try {
      const today = new Date();
      await this.mailerService.sendMail({
        to: email,
        from: `<no-reply@yourdomain.com>`,
        subject: 'New Login Detected',
        template: 'login',
        context: {
          email,
          today,
        },
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new RequestTimeoutException('Failed to send email');
    }
  }
}
