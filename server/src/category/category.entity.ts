import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name!: string;

  // Relacja: Wiele kategorii ma Wiele produktów (N:N)
  @ManyToMany(() => Product, (product) => product.categories)
  products!: Product[];
}