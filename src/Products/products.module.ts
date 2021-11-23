import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductService } from "./products.service";
import { TypeOrmModule  } from "@nestjs/typeorm";
import { Products } from "./products.entity" ;
import { ProductCategory } from "./product_categories.entity";
import { ProductReviews } from "./product.reviews.entity";
import { User } from "src/Users/user.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Products, ProductCategory,ProductReviews,User])],
    controllers: [ProductsController],
    providers: [ProductService],
})

export class ProductsModule {}