import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP(6)';

@Entity({name: 'products'})
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @CreateDateColumn({type: 'timestamp', default: () => CURRENT_TIMESTAMP})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamp', default: () => CURRENT_TIMESTAMP, onUpdate: CURRENT_TIMESTAMP})
    updatedAt: Date
}