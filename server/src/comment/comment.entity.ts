import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column('text')
  description!: string;

  @Column()
  creatorUserId!: string;

  // Relacja: Wiele komentarzy należy do jednego produktu
  @ManyToOne(() => Product, (product) => product.comments)
  product!: Product;
}