import { Review } from "src/reviews/review.entity";
import { User } from "src/users/user.entity";
import { CURRENT_TIMESTAMP } from "src/utils/constants";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @OneToMany(()=> Review, (review)=> review.product)
    reviews: Review[];

    @ManyToOne(() => User, (user) => user.products, {eager: true})
    user: User;
}