import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class CreateUserTable1716740234475 implements MigrationInterface {
  name = 'CreateUserTable1716740234475';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Створення таблиці user
    await queryRunner.query(
      `CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "role" character varying NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_user_email" UNIQUE ("email"),
                CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
            )`,
    );

    // Хешування пароля
    const hashedPassword = await bcrypt.hash('test1234', 10);

    // Вставка початкових даних у таблицю admin
    await queryRunner.query(
      `INSERT INTO "user" ("email", "phone", "name", "role", "active", "password") VALUES 
            ('admin1@example.com', '1234567890', 'Admin One', 'admin', true, '${hashedPassword}'),
            ('admin2@example.com', '0987654321', 'Admin Two', 'admin', true, '${hashedPassword}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
