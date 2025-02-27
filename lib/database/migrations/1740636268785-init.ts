import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1740636268785 implements MigrationInterface {
    name = 'Init1740636268785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`eventspeaker\` DROP FOREIGN KEY \`FK_ff4f02f1555fb75737d53b4ab1d\``);
        await queryRunner.query(`ALTER TABLE \`eventspeaker\` ADD CONSTRAINT \`FK_ff4f02f1555fb75737d53b4ab1d\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`eventspeaker\` DROP FOREIGN KEY \`FK_ff4f02f1555fb75737d53b4ab1d\``);
        await queryRunner.query(`ALTER TABLE \`eventspeaker\` ADD CONSTRAINT \`FK_ff4f02f1555fb75737d53b4ab1d\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
