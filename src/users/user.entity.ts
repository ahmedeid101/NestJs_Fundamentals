import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP(6)';
@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn({type: 'timestamp', default: () => CURRENT_TIMESTAMP})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamp', default: () => CURRENT_TIMESTAMP, onUpdate: CURRENT_TIMESTAMP})
    updatedAt: Date
}