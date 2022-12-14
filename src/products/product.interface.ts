import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class productInterFace {
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
