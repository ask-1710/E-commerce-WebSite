import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/Products/products.entity";
import { User } from "src/Users/user.entity";
import { Repository } from "typeorm";
import { WishList } from "./wishlist.entity";

@Injectable() 
export class WishListService {
    constructor(
        @InjectRepository(WishList)
        private readonly wishlistRepo: Repository<WishList>,
        @InjectRepository(Products)
        private readonly productRepo: Repository<Products>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}
    
    async getAll(userId: number) {
        const user = await this.userRepo.findOne(userId, {
            relations: ['wishlist', 'wishlist.products']
        }) ;
        const products =  user.wishlist.products;
        return products;
    }

    async addProduct(userId: number, prodId: number) {
        const prod = await this.productRepo.findOne(prodId) ;
        if(!prod) throw new NotFoundException('Product does not exist !!') ;

        const wishlist = await this.wishlistRepo.findOne({
                            where:{
                                "id": {"id": userId},
                            },
                            relations: ['id','products'],
                        }) ;
        // console.log(wishlist) ;
      
        if(!wishlist) {
            console.log('New WishList Created !!') ;
            let newWishList = new WishList() ;
            const user = await this.userRepo.findOne(userId) ;
            newWishList.id = user ;
            newWishList.products = [prod] ;
            await this.wishlistRepo.save(newWishList) ;
        }
        else {  
            let modifiedWishlist =  await this.wishlistRepo.findOne({
                                        where: {
                                            "id":{
                                                "id": userId,
                                            }
                                        },
                                        relations:['products','id'],
                                    }) ;
            console.log(modifiedWishlist) ;            
            modifiedWishlist.products.push(prod) ;
            await this.wishlistRepo.save(modifiedWishlist) ;
            console.log('Modified\n') ;
        }
        return await this.wishlistRepo.find({
            where: {
                "id":{
                    "id": userId,
                }
            },
            relations:['products','id'],
        }) ;
    }

    // Delete Product From Wishlist
    async deleteProduct(userId: number, prodId: number) { 
        
        let wishlist = await this.wishlistRepo.findOne({
            where:{
                "id": {
                    "id": userId,
                },
            },
            relations: ['id','products'],
        }) ;

        // console.log('BEFORE\n') ;
        // console.log(wishlist.products);
        

        var idx:number ;
        for(idx=0 ; idx < wishlist.products.length ; idx ++) {
            if(wishlist.products[idx].id == prodId) break;
        }
        // console.log('INDEX',idx) ;

         
        if(idx > -1 && idx < wishlist.products.length)
             wishlist.products.splice(idx,1) ;  // removes the last element since index is -1     
        else 
            throw new NotFoundException('Product does not exist in Wishlist') ;

        // console.log('\nAFTER\n') ;
        // console.log(wishlist.products) ;

        return await this.wishlistRepo.save(wishlist) ;
    }
}