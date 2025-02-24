import { MigrationInterface, QueryRunner } from "typeorm";

export class RegistrationTicketName1740021183736 implements MigrationInterface {
    name = 'RegistrationTicketName1740021183736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`name\``);
    }

}
