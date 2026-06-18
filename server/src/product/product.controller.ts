import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // POST na http://localhost:3000/product tworzy produkt
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // GET na http://localhost:3000/product pobiera wszystkie nieusunięte
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
  ) {
    return this.productService.findAll(+page, +limit, search);
  }

  // PATCH na http://localhost:3000/product/123 edytuje produkt o id 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  // DELETE na http://localhost:3000/product/123 miekko usuwa produkt o id 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id); 
  }
}