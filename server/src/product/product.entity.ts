import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  title!: string; // Dodany wykrzyknik!

  @Column('text')
  description!: string; // Dodany wykrzyknik!

  @Column()
  creatorUserId!: string; // Dodany wykrzyknik!

  @Column()
  imageUrl!: string; // Dodany wykrzyknik!
}