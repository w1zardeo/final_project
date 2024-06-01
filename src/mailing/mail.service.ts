import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigEnum } from 'src/common/enums/config.enum';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ukr.net',
      port: 465,
      secure: true,
      auth: {
        user: configService.get(ConfigEnum.EMAIL_SENDER),
        pass: configService.get(ConfigEnum.EMAIL_PASSWORD),
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: configService.get(ConfigEnum.EMAIL_SENDER),
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }

  async notifyAdmins(adminEmails: string[], newUserInfo: { name: string; email: string }) {
    const subject = 'Новий користувач зареєстрований';
    const text = `Новий користувач зареєстрований: \n\nІм'я: ${newUserInfo.name}\nЕлектронна адреса: ${newUserInfo.email}`;

    const mailPromises = adminEmails.map(email => this.sendMail(email, subject, text));

    try {
      await Promise.all(mailPromises);
      console.log('Сповіщення успішно відправлені всім адміністраторам.');
    } catch (error) {
      console.error('Помилка під час відправки сповіщень:', error);
    }
  }
}