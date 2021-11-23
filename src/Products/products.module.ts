import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductService } from "./products.service";
import { TypeOrmModule  } from "@nestjs/typeorm";
import { Products } from "./products.entity" ;
import { ProductCategory } from "./product_categories.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Products, ProductCategory])],
    controllers: [ProductsController],
    providers: [ProductService],
})

export class ProductsModule {}