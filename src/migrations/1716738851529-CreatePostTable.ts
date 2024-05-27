import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1716738851529 implements MigrationInterface {
    name = "CreatePostTable1716738851529"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "post" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" text,
                "price" double precision NOT NULL,
                CONSTRAINT "PK_post_id" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
