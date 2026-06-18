import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Zwraca wszystkie produkty, które nie sa usunięte, przyjmuje stronę, limit i szukane słowo
  async findAll(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit; // Obliczamy, ile rekordów pominąć (Offset)

    const [items, total] = await this.productRepository.findAndCount({
      where: { 
        isDeleted: false,
        ...(search ? { title: ILike(`%${search}%`) } : {})
      },
      take: limit, 
      skip: skip,  
    });

    // zwraca obiekt
    return {
      data: items,
      meta: {
        totalItems: total,
        currentPage: page,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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