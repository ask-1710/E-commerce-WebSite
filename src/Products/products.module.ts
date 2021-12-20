import { Module } from "@nestjs/common";
import { ProductController, ProductsController } from "./products.controller";
import { ProductService } from "./products.service";
import { TypeOrmModule  } from "@nestjs/typeorm";
import { Products } from "./products.entity" ;
import { ProductCategory } from "./product_categories.entity";
import { ProductReviews } from "./product.reviews.entity";
import { User } from "src/Users/user.entity";
import { Seller } from "src/Users/seller.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Products, ProductCategory,ProductReviews,User,Seller])],
    controllers: [ProductsController, ProductController],
    providers: [ProductService],
})

export class ProductsModule {}