import { Controller, Post ,Body, Get ,Param,Patch,Delete } from "@nestjs/common";
import { Products } from "./products.entity";
// import { ProductCategory  } from "./product_categories.entity";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly pdtservice: ProductService) {}
    
    @Get()
    getallProducts() {
        return this.pdtservice.getProducts();
    }

    @Post()
    addProduct(@Body('name') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number, @Body('category') categoryname: string, @Body('qty') qty: number) {
        this.pdtservice.insertProduct(prodTitle, prodDesc, prodPrice, categoryname, qty);
    }
    @Get(':id')
    getProductById(@Param('id') pdtId:number):Promise<Products> {
        return this.pdtservice.getProductbyId(pdtId) ;
    }
    
    @Get(':name') 
    getProductbyName(@Param('name') pdtName: string): Promise<Products[]> {
        return this.pdtservice.getProductsbyName(pdtName);
    }

    @Get(':id/reviews')
    getProductReviews(@Param('id') productId: number) {
        return this.pdtservice.getPdtReviews(productId) ;
    }

    @Post(':id/reviews')
    addProductReview(@Param('id') productId: number,@Body('description') descr: string, @Body('userID') userID:number, @Body('rating') rating:number ) {
        this.pdtservice.addReview(productId,descr,userID,rating) ;
        return null ;
    }

    @Patch(':id')
    updateProduct(@Param('id') pdtId:number, @Body('title') pdtTitle:string, @Body('description') descr: string, @Body('price') price: number, @Body('categoryname') categoryname:string) {
        this.pdtservice.updateById(pdtId, pdtTitle, descr, price, categoryname);
        return null ;
    }

    @Delete(':id') 
    deletePdt(@Param('id') pdtId: number) {
        this.pdtservice.deleteById(pdtId);
        return null ;
    }
}
