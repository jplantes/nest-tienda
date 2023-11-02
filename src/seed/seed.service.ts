import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seedInitial';

@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductsService
  ){}



  async runSeed() {
    await this.insertNewProduct();
    return 'This action adds a new seed';
  }

  private async insertNewProduct() {
    await this.productService.deleteAllProducts();

    const productos = initialData.products;
    const insertPromises = [];
    
    productos.forEach( prod => {
      insertPromises.push(this.productService.create( prod ));
    });

    await Promise.all( insertPromises );

    return true;
  }
}
