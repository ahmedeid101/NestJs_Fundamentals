import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { EjsAdapter } from '@nestjs-modules/mailer/adapters/ejs.adapter';
import { join } from 'path';
@Module({
  controllers: [],
  providers: [MailService],
  exports: [MailService],
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get<string>('SMTP_HOST'),
            port: Number(config.get<number>('SMTP_PORT')),
            secure: false,
            auth: {
              user: config.get<string>('SMTP_USERNAME'),
              pass: config.get<string>('SMTP_PASSWORD'),
            },
            connectionTimeout: 5000, // 5 seconds
            greetingTimeout: 5000,
            socketTimeout: 5000,
          },
          template: {
            dir: join(process.cwd(), 'templates'),
            adapter: new EjsAdapter({
              inlineCssEnabled: true,
            }),
          },
        };
      },
    }),
  ],
})
export class MailModule {}
