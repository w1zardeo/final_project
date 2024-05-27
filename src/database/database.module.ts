import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEnum } from '../common/enums/config.enum';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(ConfigEnum.POSTGRES_HOST),
        port: parseInt(configService.get(ConfigEnum.POSTGRES_PORT)),
        username: configService.get(ConfigEnum.POSTGRES_USER),
        database: configService.get(ConfigEnum.POSTGRES_DB),
        password: configService.get(ConfigEnum.POSTGRES_PASSWORD),
        entities: [],
        logging: true,
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}