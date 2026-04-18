import { Product } from 'src/products/product.entity';
import { Review } from 'src/reviews/review.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import { UserType } from 'src/utils/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: true, length: '150' })
  username!: string;

  @Column({ type: 'varchar', length: '250', unique: true, nullable: true })
  email!: string;

  @Exclude()
  @Column({ nullable: true })
  password!: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.NORMAL_USER })
  userType!: UserType;

  @Column({ nullable: true })
  verificationToken!: string;

  @Column({ default: false, nullable: true })
  isAccountVerified!: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt!: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt!: Date;

  @Column({ default: null, type: 'text', nullable: true })
  profileImage!: string | null;

  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];
}
