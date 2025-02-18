import { MigrationInterface, QueryRunner } from "typeorm";

export class InitData1739832960950 implements MigrationInterface {
    name = 'InitData1739832960950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workshop\` DROP FOREIGN KEY \`FK_6a4d90e85a59a203041b9812080\``);
        await queryRunner.query(`DROP INDEX \`REL_6a4d90e85a59a203041b981208\` ON \`workshop\``);
        await queryRunner.query(`ALTER TABLE \`workshop\` DROP COLUMN \`ticketId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workshop\` ADD \`ticketId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6a4d90e85a59a203041b981208\` ON \`workshop\` (\`ticketId\`)`);
        await queryRunner.query(`ALTER TABLE \`workshop\` ADD CONSTRAINT \`FK_6a4d90e85a59a203041b9812080\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
