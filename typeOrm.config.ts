import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
// import { Post } from './src/posts/entities/post.entity';
// import { CreateUserSchema1715845358766 } from './migrations/1715845358766-create_user_schema';
import { config } from 'dotenv';
import { ConfigEnum } from 'src/common/enums/config.enum';
// import { CreateUserTable1629772862101 } from 'src/migrations/1716572894988-CreateUser';
import { CreateUserTable1716740234475 } from 'src/migrations/1716740234475-CreateUserTable';
// import { AddedWeight1715845543414 } from './migrations/1715845543414-added_weight';
// import { CreateAdminTable1716735234496 } from 'src/migrations/1716735234496-CreateAdminTable';
import { CreatePostTable1716739104281 } from 'src/migrations/1716739104281-CreatePostTable';

config();
const configService = new ConfigService();
console.log(configService.get(ConfigEnum.POSTGRES_HOST));

const options: DataSourceOptions = {
  type: 'postgres',
  host: configService.get(ConfigEnum.POSTGRES_HOST),
  port: parseInt(configService.get(ConfigEnum.POSTGRES_PORT)),
  username: configService.get(ConfigEnum.POSTGRES_USER),
  database: configService.get(ConfigEnum.POSTGRES_DB),
  password: configService.get(ConfigEnum.POSTGRES_PASSWORD),
  entities: [User],
  migrations: [CreateUserTable1716740234475, CreatePostTable1716739104281],
};
export default new DataSource(options);