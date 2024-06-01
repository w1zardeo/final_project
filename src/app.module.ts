import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/types/user.module';
import { PostsModule } from './posts/posts.module';
import { MailModule } from './mailing/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PostsModule,
    MailModule
  ],
  controllers: []
})
export class AppModule {}