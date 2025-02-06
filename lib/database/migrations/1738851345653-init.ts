import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1738851345653 implements MigrationInterface {
    name = 'Init1738851345653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`quantity\` int NOT NULL, \`salesStartDate\` datetime NOT NULL, \`salesEndDate\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workshop\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`startTime\` datetime NOT NULL, \`endTime\` datetime NOT NULL, \`description\` varchar(255) NOT NULL, \`isPaidFor\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`registration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`userId\` int NULL, \`ticketId\` int NULL, \`workshopId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`speaker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`workshopId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_af6d07a8391d587c4dd40e7a5a9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_6a531e358732cd448437bbe8870\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_8bfc809848d901794f4ff57243e\` FOREIGN KEY (\`workshopId\`) REFERENCES \`workshop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`speaker\` ADD CONSTRAINT \`FK_2750e59edf472a63b066a7e032b\` FOREIGN KEY (\`workshopId\`) REFERENCES \`workshop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`speaker\` DROP FOREIGN KEY \`FK_2750e59edf472a63b066a7e032b\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_8bfc809848d901794f4ff57243e\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_6a531e358732cd448437bbe8870\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_af6d07a8391d587c4dd40e7a5a9\``);
        await queryRunner.query(`DROP TABLE \`speaker\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`registration\``);
        await queryRunner.query(`DROP TABLE \`workshop\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
    }

}
