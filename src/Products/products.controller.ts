import { Controller, Post ,Body, Get ,Param,Patch,Delete, UseGuards , Request, Req, Render, Res} from "@nestjs/common";
import { SellerJwtAuthGuard } from "src/auth/seller-jwt-auth.gaurd";
import { ShopperJwtAuthGuard } from "src/auth/shopper-jwt-auth.gaurd";
import { Products } from "./products.entity";
import { ProductService } from "./products.service";

@Controller()
export class ProductsController {
    constructor(private readonly pdtservice: ProductService) {}
    
    @UseGuards(SellerJwtAuthGuard)
    @Get('myproducts')
    getMyProducts(@Request() req) {
        return {result: this.pdtservice.getMyProducts(req.user.id)} ;
    }

    @Get('products')
    getallProducts() {
        return this.pdtservice.getProducts();
    }

}

@Controller('product') 
export class ProductController {

    constructor(private readonly pdtservice: ProductService) {}

    @Get(':id')
    getProductById(@Param('id') pdtId:number):Promise<Products> {
        return this.pdtservice.getProductbyId(pdtId) ;
    }
    
    @UseGuards(SellerJwtAuthGuard)
    @Post()
    addProduct(@Request() req,@Body('name') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number, @Body('category') categoryname: string, @Body('qty') qty: number) {
        return this.pdtservice.insertProduct(req.user.id, prodTitle, prodDesc, prodPrice, categoryname, qty);
    }

    @UseGuards(SellerJwtAuthGuard)
    @Delete(':id') 
    deletePdt(@Request() req, @Param('productid') productId:number) {
        const userId = req.user.id ;
        return this.pdtservice.deleteById(userId, productId);
    }

    @UseGuards(SellerJwtAuthGuard)
    @Patch(':id')
    updateProduct(@Request() req, @Param('productid') pdtId:number, @Body('title') pdtTitle:string, @Body('description') descr: string, @Body('price') price: number) {
        const userId = req.user.id ;
        return this.pdtservice.updateById(userId, pdtId, pdtTitle, descr, price);
        
    }
 
    // @Get('search/:name') 
    // getProductbyName(@Param('name') pdtName: string): Promise<Products[]> {
    //     return this.pdtservice.getProductsbyName(pdtName);
    // }

    @Get(':id/reviews')
    getProductReviews(@Param('id') productId: number) {
        return this.pdtservice.getPdtReviews(productId) ;
    }

    @UseGuards(ShopperJwtAuthGuard)
    @Post(':id/reviews')
    addProductReview(@Request() req, @Param('id') productId: number,@Body('description') descr: string, @Body('rating') rating:number ) {
        const userID = req.user.id ;
        this.pdtservice.addReview(productId,descr,userID,rating) ;
        return null ;
    }

}