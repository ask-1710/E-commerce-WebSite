import { Controller, Post ,Body, Get ,Param,Patch,Delete } from "@nestjs/common";
import { ObjectID } from "typeorm";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly pdtservice: ProductService) {}
   
    @Get()
    getallProducts() {
        return this.pdtservice.getProducts();
    }

    @Post()
    addProduct(@Body('name') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number): any {
        const genId = this.pdtservice.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: genId} ;
    }

    @Get(':id') 
    getProductbyId(@Param('id') pdtId: number) {
        return this.pdtservice.getProductbyId(pdtId);
    }

    @Patch(':id')
    updateProduct(@Param('id') pdtId:number, @Body('title') pdtTitle:string, @Body('description') descr: string, @Body('price') price: number) {
        this.pdtservice.updateById(pdtId, pdtTitle, descr, price);
        return null ;
    }

    @Delete(':id') 
    deletePdt(@Param('id') pdtId: number) {
        this.pdtservice.deleteById(pdtId);
        return null ;
    }
}
