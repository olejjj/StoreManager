import { PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string; 

  @CreateDateColumn()
  creationDate!: Date; 

  @Column({ default: false })
  isDeleted!: boolean; 
}