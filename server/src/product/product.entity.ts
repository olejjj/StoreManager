import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Comment } from '../comment/comment.entity';
import { Category } from '../category/category.entity';

// dziedziczenie z baseentity
@Entity()
export class Product extends BaseEntity {
  @Column()
  title!: string; 

  @Column('text')
  description!: string; 

  @Column()
  creatorUserId!: string; 

  @Column()
  imageUrl!: string; 

  // Relacja: Jeden produkt ma Wiele komentarzy 
  @OneToMany(() => Comment, (comment) => comment.product)
  comments!: Comment[];

  // Relacja: Wiele produktów ma Wiele kategorii
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable() 
  categories!: Category[];
}