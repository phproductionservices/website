import { MigrationInterface, QueryRunner } from "typeorm";

export class DataWorkshop1739833801256 implements MigrationInterface {
    name = 'DataWorkshop1739833801256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`workshopsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_a10d1559b55473df63e061b4666\` FOREIGN KEY (\`workshopsId\`) REFERENCES \`workshop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_a10d1559b55473df63e061b4666\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`workshopsId\``);
    }

}
