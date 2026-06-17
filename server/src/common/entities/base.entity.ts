import { PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Dodany wykrzyknik!

  @CreateDateColumn()
  creationDate!: Date; // Dodany wykrzyknik!

  @Column({ default: false })
  isDeleted!: boolean; // Dodany wykrzyknik!
}