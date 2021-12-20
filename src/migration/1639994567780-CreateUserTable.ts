import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1639992336834 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `user`(`id` varchar(36) NOT NULL DEFAULT uuid(), `userId` integer NOT NULL,`username` varchar(50) NOT NULL, `password` varchar(200) NOT NULL, `role` varchar(10) NOT NULL, `isActive` boolean NOT NULL DEFAULT false, `createdAt` date NOT NULL DEFAULT CURRENT_TIMESTAMP, `deletedAt` date NULL, `updatedAt` date NULL)',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `user`');
    }
}
