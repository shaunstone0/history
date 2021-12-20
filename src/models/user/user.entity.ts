import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { UserEntityInterface } from '../../shared/interfaces/typeorm/user/user-entity-interface';

@Entity({ name: 'user' })
export class User implements UserEntityInterface {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ nullable: false })
    public userId: number;

    @Column({ nullable: false })
    public username: string;

    @Column({ nullable: false })
    public password: string;

    @Column({ nullable: false })
    public role: string;

    @Column({ nullable: false })
    public isActive: boolean;

    @CreateDateColumn({ nullable: false })
    public createdAt: Date;

    @DeleteDateColumn({ nullable: false })
    public deletedAt: Date;

    @UpdateDateColumn({ nullable: false })
    public updatedAt: Date;
}
