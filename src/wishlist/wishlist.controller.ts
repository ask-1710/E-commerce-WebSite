import { Controller, Get, UseGuards, Request, Post, Patch, Body, Delete, Param } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";
import { WishListService } from "./wishlist.service";

@Controller('mywishlist/')
export class WishListController {

    constructor(
        private readonly wishlistService: WishListService ,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getWishList(@Request() req) {
        // console.log(req.user.id) ;
        return this.wishlistService.getAll(req.user.id) ;
    }

    @UseGuards(JwtAuthGuard)
    @Patch()  
    addProduct(@Request() req, @Body('productid') prodId: number) {
        // console.log(req.user.id) ;
        return this.wishlistService.addProduct(req.user.id, prodId) ;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteProduct(@Request() req, @Body('productid') prodId: number) {
        return this.wishlistService.deleteProduct(req.user.id, prodId) ;
    }
} ;