import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Zwraca wszystkie produkty, które nie sa usunięte
  async findAll() {
    return await this.productRepository.find({
      where: { isDeleted: false },
    });
  }

  // tworzy nowy produkt
  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create({
      ...createProductDto,
      creatorUserId: 'admin-id-123', 
    });
    return await this.productRepository.save(newProduct);
  }

  // edytuje produkt
  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Produkt nie istnieje');

    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id } });
  }

  // usuwa produkt w sposób miekki (ustawia isDeleted na true)
  async remove(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Produkt nie istnieje');

    product.isDeleted = true;
    return await this.productRepository.save(product);
  }
}