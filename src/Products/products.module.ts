import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductService } from "./products.service";
import { TypeOrmModule  } from "@nestjs/typeorm";
import { ProductSchema } from "./products.entity" ;


@Module({
    imports: [TypeOrmModule.forFeature([ProductSchema])],
    controllers: [ProductsController],
    providers: [ProductService],
})

export class ProductsModule {}