import { MigrationInterface, QueryRunner } from "typeorm";

export class RegistrationTicket1740020531713 implements MigrationInterface {
    name = 'RegistrationTicket1740020531713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_8bfc809848d901794f4ff57243e\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_af6d07a8391d587c4dd40e7a5a9\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_c9cbfae000488578b2bb322c8bd\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`eventId\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`workshopId\``);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`pricePerTicket\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`amount\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`quantity\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`pricePerTicket\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`workshopId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`eventId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_c9cbfae000488578b2bb322c8bd\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_af6d07a8391d587c4dd40e7a5a9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_8bfc809848d901794f4ff57243e\` FOREIGN KEY (\`workshopId\`) REFERENCES \`workshop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
