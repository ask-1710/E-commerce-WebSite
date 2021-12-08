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
    
    async insertProduct(name: string, description:string, price: number, categoryname: string, qty: number) {
        
        let newCategory = await this.findCategory(categoryname) ;
        
        const pdt = this.productsRepo.create({
            name: name,
            description: description,
            price: price,
            category: newCategory,
            qty: qty,
        }) ;
        console.log('\n\n Gonna be saved \n\n');
        await this.productsRepo.save(pdt) ;
        
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
    
    async updateById(id:number, name:string, descr:string, price:number, categoryname: string) {
        const pdt = await this.findProduct(id) ;
        let updatedPdt = {...pdt}
        let newCategory: ProductCategory;
        if (name) {
            updatedPdt.name = name ;
        }
        if(descr) {
            updatedPdt.description = descr ;
        }
        if(price) {
            updatedPdt.price = price ;
        }
        if(categoryname) {
            // remove from old category
            let oldCategory = {...updatedPdt.category} ;
            oldCategory.products.slice(oldCategory.products.indexOf(pdt),1) ;
            await this.productCategoryRepo.save(oldCategory) ;
            // add to new category
            newCategory = await this.findCategory(categoryname) ;
            updatedPdt.category = newCategory ;
            newCategory.products.push(updatedPdt) ; 
            await this.productCategoryRepo.save(newCategory) ; 
        }

        await this.productsRepo.save(updatedPdt) ;           
    }

    async deleteById(prodId : number) {

        let pdt = await this.findProduct(prodId) ;
        // remove from old category
        let oldCategory = {...pdt.category} ;
        oldCategory.products.slice(oldCategory.products.indexOf(pdt),1) ;
        await this.productCategoryRepo.save(oldCategory) ;

        await this.productsRepo.delete({id: prodId}) ;

    }

}
