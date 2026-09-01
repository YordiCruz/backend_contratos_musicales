import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1780699469452 implements MigrationInterface {
    name = 'InitialSchema1780699469452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_07a7a09b04e7b035c9d90cf4984"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "categoria"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_07a7a09b04e7b035c9d90cf4984"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_07a7a09b04e7b035c9d90cf4984" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "categoria" character varying(20) NOT NULL DEFAULT 'normal'`);
        await queryRunner.query(`ALTER TABLE "contratos" ALTER COLUMN "admin_aprobacion" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_07a7a09b04e7b035c9d90cf4984" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_07a7a09b04e7b035c9d90cf4984"`);
        await queryRunner.query(`ALTER TABLE "contratos" ALTER COLUMN "admin_aprobacion" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "categoria"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_07a7a09b04e7b035c9d90cf4984"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_07a7a09b04e7b035c9d90cf4984" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "categoria" character varying(20) NOT NULL DEFAULT 'normal'`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_07a7a09b04e7b035c9d90cf4984" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
