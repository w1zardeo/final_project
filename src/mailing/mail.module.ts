import { Module } from '@nestjs/common';
import { MailerService } from './mail.service';

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailModule {}