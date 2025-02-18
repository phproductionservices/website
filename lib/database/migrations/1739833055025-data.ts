import { MigrationInterface, QueryRunner } from "typeorm";

export class Data1739833055025 implements MigrationInterface {
    name = 'Data1739833055025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`speaker\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`speaker\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NOT NULL`);
    }

}
