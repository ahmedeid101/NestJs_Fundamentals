import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP(6)';
@Entity({name: 'reviews'})
export class Review{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    rating: number;

    @CreateDateColumn({type: 'timestamp', default: ()=> CURRENT_TIMESTAMP})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamp', default: () => CURRENT_TIMESTAMP, onUpdate: CURRENT_TIMESTAMP})
    updatedAt: Date
}