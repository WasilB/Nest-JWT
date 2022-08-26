import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('productEntity')
export class productEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ nullable: true })
  createdAt: Date;
  @CreateDateColumn({ nullable: true })
  UpdatedAt: Date;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  price: number;
}
