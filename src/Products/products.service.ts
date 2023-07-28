import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seller } from "src/Users/seller.entity";
import { User } from "src/Users/user.entity";
import { Repository } from "typeorm";
import { ProductReviews } from "./product.reviews.entity";
import { Products } from './products.entity'
import { ProductCategory } from "./product_categories.entity";


@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(Products)
        private readonly productsRepo: Repository<Products>,
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepo: Repository<ProductCategory>,
        @InjectRepository(ProductReviews)
        private readonly productReviewsRepo: Repository<ProductReviews>,
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        @InjectRepository(Seller)
        private readonly sellerRepo: Repository<Seller>,
    ) {}

    getProducts(): Promise<Products[]> {
        return this.productsRepo.find();
    }

    async getProductsbyName(name: string): Promise<Products[]> {
        const pdt = this.productsRepo.find({ where: {name: name}}) ;
        if (!pdt) { 
            throw new NotFoundException('Product not found');
        }
        return pdt ;
    }
    
    private async findProduct(Id: number): Promise<Products> {
        const pdt = await this.productsRepo.findOne(Id) ;
        // console.log(pdt) ;
        if (!pdt) {
            throw new NotFoundException('Product not found');
        }
        return {...pdt}
    }

    getProductbyId(Id: number): Promise<Products> {
        const pdt = this.findProduct(Id) ;
        return pdt ;
    }

    private async findCategory(categoryname: string): Promise<ProductCategory>{

        let cat = await this.productCategoryRepo.find({ categoryName: categoryname });
        
        let newCategory: ProductCategory;
        if(!cat[0]) {
            newCategory = new ProductCategory();
            newCategory.categoryName=categoryname ;
        }
        else{
            newCategory = {...cat[0]} ;
        }
        return newCategory ;
    }
    
    async insertProduct(userId: number,name: string, description:string, price: number, categoryname: string, qty: number) {

        if(!userId || !name || !description || !price || !categoryname || !qty) {
            throw new BadRequestException('Request format \
            {\
                name: string,\
                description: string,\
                price: number,\
                categoryname: string,\
                qty: number\
            }\
            ') ;
        }
        
        let newCategory = await this.findCategory(categoryname) ;
        let user = await this.sellerRepo.findOne({
            where: {
                "userId":{
                    "id": userId,
                },
            },
            relations: ['products','userId'],
        }) ;
        const pdt = this.productsRepo.create({
            name: name,
            description: description,
            price: price,
            category: newCategory,
            qty: qty,
            seller: user,
        }) ;
        if(!user.products) {
            user.products = [pdt] ;
            console.log('Created your new list of products!!') ;
        }
        else {
            user.products.push(pdt) ;
            console.log('Added new Product by you!!') ;
        }
        console.log('\n\n Gonna be saved \n\n');

        // let mainUser = await this.usersRepo.findOne(userId, {
        //     relations: ['sellerAccount'],
        // }) ;
        // mainUser.sellerAccount = user ;
        
        // await this.usersRepo.save(mainUser) ;

        await this.sellerRepo.save(user) ;

        return await this.usersRepo.findOne(userId,{
            relations: ['sellerAccount', 'sellerAccount.products'],
        });
    
    }

    async getPdtReviews(prodID: number): Promise<ProductReviews[]> {    
        const pdt = await this.productsRepo.findOne(prodID, {relations:['reviews']}) ;        
        if(!pdt) throw new NotFoundException('Product Not found') ;
        return pdt.reviews;
    }

    async getPdtsByCategory(cat: number): Promise<Products[]> {
        const pdts = await this.productCategoryRepo.findOne(cat,{
            relations:['products']
        }) ;

        if(pdts) {
            return pdts.products ;
        }
        else{
            throw new BadRequestException('Product Category does not Exists') ;
        }
    }

    async getCategories(): Promise<ProductCategory[]> {
        return await this.productCategoryRepo.find()
    }

    async addReview(prodID:number, descr: string, userID: number, rating:number) // add automatic review JwtauthGaurd
    {
        if(!rating || !prodID || !descr) {
            throw new BadRequestException('Request body :\
            {\
                description: string,\
                rating: number\
            }\
            ') ;
        }

        const pdt = await this.productsRepo.findOne(prodID) ;

        if(!pdt) throw new NotFoundException('Product Not Found') ;

        const user = await this.usersRepo.findOne(userID) ;
        
        const pdtReview = new ProductReviews() ;
        pdtReview.product=pdt;
        pdtReview.description=descr;
        pdtReview.rating=rating;
        pdtReview.user = user ;

        await this.productReviewsRepo.save(pdtReview) ;
    }

    async getMyProducts(userId: number) {
        return await this.sellerRepo.findOne({
            where: {
                "userId":{
                    "id": userId,
                },
            },
            relations:['products','products.category','products.reviews','userId'],
        }) ;
    }

    async updateById(userId:number, id:number, name:string, descr:string, price:number) {  // cannot change category -> limitation

        if(!id) {
            throw new BadRequestException('Request body format: \
            {\
                title: string(optional)\
                description: string(optional)\
                price: number(optional)\
            }\
            ') ;
        }

        const pdt = await this.productsRepo.findOne(id, {
            relations: ['category', 'category.products'],
        }) ;


        if(!pdt) return new NotFoundException('Product Not Found') ;

        let updatedPdt = {...pdt} ;
        
        if (name) {
            updatedPdt.name = name ;
        }
        if(descr) {
            updatedPdt.description = descr ;
        }
        if(price) {
            updatedPdt.price = price ;
        }

        let user = await  this.sellerRepo.findOne({
            where: {
                "userId":{
                    "id": userId,
                },
            },
            relations: ['products','userId'],
        });
        var idx: number ;
        for(idx=0;idx<user.products.length ; idx++) {
            if(user.products[idx].id==id) {
                user.products[idx] = updatedPdt ;
                break ;
            }
        }
        
        await this.sellerRepo.save(user) ;        
        await this.productsRepo.save(updatedPdt) ;   
                
        return await this.productsRepo.findOne(id, {
            relations: ['category'],
        }) ;
    }

    async deleteById(userId:number, prodId : number) {        
        let user = await  this.sellerRepo.findOne({
            where: {
                "userId":{
                    "id": userId,
                },
            },
            relations: ['products','userId'],
        });

        let pdt = await this.productsRepo.findOne(prodId, {
            relations: ['category','category.products'],
        }) ;

        if(!pdt) throw new NotFoundException('Product Not Found') ;

        var idx: number ;

        // remove from old category
        let oldCategory = {...pdt.category} ;

        console.log(oldCategory) ;
        for(idx=0;idx<oldCategory.products.length ; idx++) {
            if(oldCategory.products[idx].id == prodId) {
                break ;
            }
        }        
        oldCategory.products.splice(idx,1) ;
        console.log(oldCategory) ;

        await this.productCategoryRepo.save(oldCategory) ;

        console.log(user.products) ;
        for(idx=0;idx<user.products.length;idx++) {
            if(user.products[idx].id == prodId) break;
        }
        user.products.splice(idx, 1) ;
        console.log(user.products) ;

        await this.sellerRepo.save(user) ;

        await this.productsRepo.delete({id:prodId}) ;


        return await  this.sellerRepo.findOne({
            where: {
                "userId":{
                    "id": userId,
                },
            },
            relations: ['products','userId','products.category'],
        });

    }

    async getSeller(pid: number): Promise<Seller> {
        const pdt = await this.productsRepo.findOne(pid, {
            relations:['seller','seller.products']
        })

        if(!pdt) {
            throw new BadRequestException('Product not Found')
        }

        return pdt.seller
    }

}
