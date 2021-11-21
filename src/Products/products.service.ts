import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductSchema } from './products.entity'

@Injectable()
export class ProductService {
    // private products: Product[] = [];

    constructor(
        @InjectRepository(ProductSchema)
        private readonly productsRepo: Repository<ProductSchema>,
    ) {}

    insertProduct(name:string,descr:string,price:number): boolean {
        const pdt = this.productsRepo.create({
            name: name,
            description: descr,
            price: price,
        }) ;
                
        this.productsRepo.save(pdt) ;
        const pdtId = this.productsRepo.hasId(pdt) ;
        return pdtId
    }

    getProducts(): Promise<ProductSchema[]>  {
        // const [ allProducts, _ ] = await this.productsRepo.findAndCount();
        return this.productsRepo.find();
    }

    getProductbyTitle(title: string): Promise<ProductSchema> {
        const pdt = this.productsRepo.find({ where: {name: title}}) ;
        console.log('By title') ;
        if (!pdt[0]) { 
            throw new NotFoundException('Product not found');
        }
        return {...pdt[0]} ;

    }
    
    private async findProduct(Id: number): Promise<ProductSchema> {
        const pdt = await this.productsRepo.find({id: Id}) ;
        // console.log(pdt) ;
        if (!pdt) {
            throw new NotFoundException('Product not found');
        }
        return {...pdt[0]}
    }
    
    getProductbyId(Id: number): Promise<ProductSchema> {
        const pdt = this.findProduct(Id) ;
        // console.log(pdt ) ;
        return pdt ;
    }
    
    async updateById(id:number, title:string, descr:string, price:number) {
        // let updatedPdt = this.productsRepo.create();
        const pdt = await this.findProduct(id) ;
        let updatedPdt = {...pdt}
        if (title) {
            updatedPdt.name = title ;
        }
        if(descr) {
            updatedPdt.description = descr ;
        }
        if(price) {
            updatedPdt.price = price ;
        }
        await this.productsRepo.save(updatedPdt) ;
    }

    async deleteById(prodId : number) {
        
        await this.productsRepo.delete({id: prodId}) ;

    }

}