import { MigrationInterface, QueryRunner } from "typeorm";

export class RegistrationTicketNameData1740023406985 implements MigrationInterface {
    name = 'RegistrationTicketNameData1740023406985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`ticketRef\` varchar(255) NOT NULL DEFAULT 'TkT-2025'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`ticketRef\``);
    }

}
