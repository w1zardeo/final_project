import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1716739104281 implements MigrationInterface {
    name = "CreatePostTable1716739104281"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "post" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" text,
                "price" double precision NOT NULL,
                "user_id" INTEGER,
                CONSTRAINT "PK_post_id" PRIMARY KEY ("id")
            )`
        );

        await queryRunner.query(
            `ALTER TABLE "post" 
             ADD CONSTRAINT "FK_post_user_id" 
             FOREIGN KEY ("user_id") REFERENCES "user"("id") 
             ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_post_user_id"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
