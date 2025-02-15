import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1739621027482 implements MigrationInterface {
    name = 'Init1739621027482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`registration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`userId\` int NULL, \`eventId\` int NULL, \`ticketId\` int NULL, \`workshopId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`city\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`country\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workshop\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`startTime\` datetime NOT NULL, \`endTime\` datetime NOT NULL, \`description\` varchar(255) NOT NULL, \`isPaidFor\` tinyint NOT NULL DEFAULT 0, \`eventId\` int NULL, \`ticketId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`speaker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`workshopId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`state\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`quantity\` int NOT NULL, \`salesStartDate\` datetime NOT NULL, \`salesEndDate\` datetime NOT NULL, \`eventId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_registration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('ADMIN', 'STAFF', 'REFEREE') NOT NULL DEFAULT 'ADMIN', \`fullName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, UNIQUE INDEX \`IDX_0a6cf6eef28ea51b5a64fdadd4\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`overview\` varchar(255) NOT NULL, \`eventType\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`startTime\` datetime NOT NULL, \`endTime\` datetime NOT NULL, \`venue\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`postcode\` varchar(255) NOT NULL, \`eventImageUrl\` varchar(255) NOT NULL, \`isAllowWorkshop\` tinyint NOT NULL DEFAULT 0, \`status\` enum ('Active', 'Upcoming', 'Sold out') NOT NULL DEFAULT 'Active', \`isPaidFor\` tinyint NOT NULL DEFAULT 0, \`city\` varchar(255) NULL, \`state\` varchar(255) NULL, \`country\` varchar(255) NULL, \`registeredusersId\` int NULL, UNIQUE INDEX \`IDX_9d0d870657c4fac264cdca048e\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_af6d07a8391d587c4dd40e7a5a9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_c9cbfae000488578b2bb322c8bd\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_6a531e358732cd448437bbe8870\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_8bfc809848d901794f4ff57243e\` FOREIGN KEY (\`workshopId\`) REFERENCES \`workshop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workshop\` ADD CONSTRAINT \`FK_e22f69f5fdcfaba742df4c79840\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workshop\` ADD CONSTRAINT \`FK_6a4d90e85a59a203041b9812080\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`speaker\` ADD CONSTRAINT \`FK_2750e59edf472a63b066a7e032b\` FOREIGN KEY (\`workshopId\`) REFERENCES \`workshop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_cb22a51617991265571be41b74f\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_ad0d0f2a1555c29853c9d6012a8\` FOREIGN KEY (\`registeredusersId\`) REFERENCES \`user_registration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_ad0d0f2a1555c29853c9d6012a8\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_cb22a51617991265571be41b74f\``);
        await queryRunner.query(`ALTER TABLE \`speaker\` DROP FOREIGN KEY \`FK_2750e59edf472a63b066a7e032b\``);
        await queryRunner.query(`ALTER TABLE \`workshop\` DROP FOREIGN KEY \`FK_6a4d90e85a59a203041b9812080\``);
        await queryRunner.query(`ALTER TABLE \`workshop\` DROP FOREIGN KEY \`FK_e22f69f5fdcfaba742df4c79840\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_8bfc809848d901794f4ff57243e\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_6a531e358732cd448437bbe8870\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_c9cbfae000488578b2bb322c8bd\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_af6d07a8391d587c4dd40e7a5a9\``);
        await queryRunner.query(`DROP INDEX \`IDX_9d0d870657c4fac264cdca048e\` ON \`event\``);
        await queryRunner.query(`DROP TABLE \`event\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a6cf6eef28ea51b5a64fdadd4\` ON \`user_registration\``);
        await queryRunner.query(`DROP TABLE \`user_registration\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
        await queryRunner.query(`DROP TABLE \`state\``);
        await queryRunner.query(`DROP TABLE \`speaker\``);
        await queryRunner.query(`DROP TABLE \`workshop\``);
        await queryRunner.query(`DROP TABLE \`country\``);
        await queryRunner.query(`DROP TABLE \`city\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`registration\``);
    }

}
