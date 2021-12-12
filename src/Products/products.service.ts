import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
        const pdt = await this.productsRepo.find({id: Id}) ;
        // console.log(pdt) ;
        if (!pdt) {
            throw new NotFoundException('Product not found');
        }
        return {...pdt[0]}
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
        
        let newCategory = await this.findCategory(categoryname) ;
        let user = await this.usersRepo.findOne(userId, {
            relations: ['products'],
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
        await this.usersRepo.save(user) ;

        return await this.usersRepo.findOne(userId,{
            relations: ['products'],
        });
    
    }

    async getPdtReviews(prodID: number): Promise<Products[]> {
        return await this.productsRepo.find({where:{id: prodID}, relations:['reviews']}) ;        
    }

    async addReview(prodID:number, descr: string, userID: number, rating:number) {
        const pdt = await this.productsRepo.findOne(prodID) ;
        const user = await this.usersRepo.findOne(userID) ;
        
        const pdtReview = new ProductReviews() ;
        pdtReview.product=pdt;
        pdtReview.description=descr;
        pdtReview.rating=rating;
        pdtReview.user = user ;

        await this.productReviewsRepo.save(pdtReview) ;
    }

    async getMyProducts(userId: number) {
        return await this.usersRepo.findOne(userId,{
            relations:['products','products.category','products.reviews'],
        }) ;
    }

    async updateById(userId:number, id:number, name:string, descr:string, price:number) {  // cannot change category -> limitation

        const pdt = await this.productsRepo.findOne(id, {
            relations: ['category', 'category.products'],
        }) ;
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

        let user = await  this.usersRepo.findOne(userId, {
            relations: ['products'],
        });
        var idx: number ;
        for(idx=0;idx<user.products.length ; idx++) {
            if(user.products[idx].id==id) {
                user.products[idx] = updatedPdt ;
                break ;
            }
        }
        
        await this.usersRepo.save(user) ;        
        await this.productsRepo.save(updatedPdt) ;   
                
        return await this.productsRepo.findOne(id, {
            relations: ['category'],
        }) ;
    }

    async deleteById(userId:number, prodId : number) {
        let user = await this.usersRepo.findOne(userId, {
            relations: ['products'],
        }) ;
        let pdt = await this.productsRepo.findOne(prodId, {
            relations: ['category','category.products'],
        }) ;
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

        await this.usersRepo.save(user) ;

        await this.productsRepo.delete({id:prodId}) ;

        return await this.usersRepo.findOne(userId, {
            relations:['products','products.category'],
        }) ;

    }

}
