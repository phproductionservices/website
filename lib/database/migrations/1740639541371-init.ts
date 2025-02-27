import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1740639541371 implements MigrationInterface {
    name = 'Init1740639541371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`city\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`country\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`registration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`ticketRef\` varchar(255) NOT NULL DEFAULT 'TkT-2025', \`phone\` varchar(255) NULL, \`pricePerTicket\` float NOT NULL, \`amount\` float NOT NULL, \`quantity\` int NOT NULL, \`ticketId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workshop\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`startTime\` varchar(255) NOT NULL, \`endTime\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`isPaidFor\` tinyint NOT NULL DEFAULT 0, \`eventId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`speaker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NULL, \`workshopId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`state\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` enum ('Event', 'Workshop') NOT NULL DEFAULT 'Event', \`name\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`quantity\` int NOT NULL, \`eventId\` int NULL, \`workshopsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_registration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('ADMIN', 'STAFF', 'REFEREE') NOT NULL DEFAULT 'ADMIN', \`fullName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, UNIQUE INDEX \`IDX_0a6cf6eef28ea51b5a64fdadd4\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`eventspeaker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`speakerUrl\` varchar(255) NULL, \`description\` varchar(255) NULL, \`eventId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`overview\` varchar(255) NOT NULL, \`eventType\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`startTime\` datetime NOT NULL, \`endTime\` datetime NOT NULL, \`venue\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`postcode\` varchar(255) NOT NULL, \`eventImageUrl\` varchar(255) NOT NULL, \`isAllowWorkshop\` tinyint NOT NULL DEFAULT 0, \`status\` enum ('Active', 'Upcoming', 'Sold out') NOT NULL DEFAULT 'Active', \`isPaidFor\` tinyint NOT NULL DEFAULT 0, \`city\` varchar(255) NULL, \`state\` varchar(255) NULL, \`country\` varchar(255) NULL, \`description\` varchar(255) NULL, \`organizer\` varchar(255) NULL, \`registeredusersId\` int NULL, UNIQUE INDEX \`IDX_9d0d870657c4fac264cdca048e\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_6a531e358732cd448437bbe8870\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workshop\` ADD CONSTRAINT \`FK_e22f69f5fdcfaba742df4c79840\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`speaker\` ADD CONSTRAINT \`FK_2750e59edf472a63b066a7e032b\` FOREIGN KEY (\`workshopId\`) REFERENCES \`workshop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_cb22a51617991265571be41b74f\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_a10d1559b55473df63e061b4666\` FOREIGN KEY (\`workshopsId\`) REFERENCES \`workshop\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`eventspeaker\` ADD CONSTRAINT \`FK_ff4f02f1555fb75737d53b4ab1d\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_ad0d0f2a1555c29853c9d6012a8\` FOREIGN KEY (\`registeredusersId\`) REFERENCES \`user_registration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_ad0d0f2a1555c29853c9d6012a8\``);
        await queryRunner.query(`ALTER TABLE \`eventspeaker\` DROP FOREIGN KEY \`FK_ff4f02f1555fb75737d53b4ab1d\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_a10d1559b55473df63e061b4666\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_cb22a51617991265571be41b74f\``);
        await queryRunner.query(`ALTER TABLE \`speaker\` DROP FOREIGN KEY \`FK_2750e59edf472a63b066a7e032b\``);
        await queryRunner.query(`ALTER TABLE \`workshop\` DROP FOREIGN KEY \`FK_e22f69f5fdcfaba742df4c79840\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_6a531e358732cd448437bbe8870\``);
        await queryRunner.query(`DROP INDEX \`IDX_9d0d870657c4fac264cdca048e\` ON \`event\``);
        await queryRunner.query(`DROP TABLE \`event\``);
        await queryRunner.query(`DROP TABLE \`eventspeaker\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a6cf6eef28ea51b5a64fdadd4\` ON \`user_registration\``);
        await queryRunner.query(`DROP TABLE \`user_registration\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
        await queryRunner.query(`DROP TABLE \`state\``);
        await queryRunner.query(`DROP TABLE \`speaker\``);
        await queryRunner.query(`DROP TABLE \`workshop\``);
        await queryRunner.query(`DROP TABLE \`registration\``);
        await queryRunner.query(`DROP TABLE \`country\``);
        await queryRunner.query(`DROP TABLE \`city\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
