import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/Products/products.entity";
import { User } from "src/Users/user.entity";
import { WishList } from "./wishlist.entity";
import { WishListController } from "./wishlist.controller";
import { WishListService } from "./wishlist.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Products, WishList]),
    ],
    providers: [WishListService] ,
    controllers: [WishListController],
})

export class WishListModule {}