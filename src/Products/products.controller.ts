import { Controller, Post ,Body, Get ,Param,Patch,Delete, UseGuards , Request, Req, Render, Res, ParseIntPipe, ParseFloatPipe} from "@nestjs/common";
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
    return this.pdtservice.getMyProducts(req.user.id) ;
    }

    @Get('products')
    getallProducts() {
        return this.pdtservice.getProducts();
    }

    @Get('category/:id/')
    getpdtsByCategory(@Param('id', ParseIntPipe) id:number) {
        return this.pdtservice.getPdtsByCategory(id) ;
    }

    @Get('categories/')
    getCategories() {
        return this.pdtservice.getCategories()
    }

}

@Controller('product') 
export class ProductController {

    constructor(private readonly pdtservice: ProductService) {}

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) pdtId:number):Promise<Products> {
        return this.pdtservice.getProductbyId(pdtId) ;
    }
    
    @UseGuards(SellerJwtAuthGuard)
    @Post()
    addProduct(@Request() req,@Body('name') prodTitle: string, @Body('description') prodDesc: string, @Body('price', ParseFloatPipe) prodPrice: number, @Body('category') categoryname: string, @Body('qty', ParseIntPipe) qty: number) {
        return this.pdtservice.insertProduct(req.user.id, prodTitle, prodDesc, prodPrice, categoryname, qty);
    }

    @UseGuards(SellerJwtAuthGuard)
    @Delete(':id') 
    deletePdt(@Request() req, @Param('id', ParseIntPipe) productId:number) {
        const userId = req.user.id ;
        return this.pdtservice.deleteById(userId, productId);
    }

    @UseGuards(SellerJwtAuthGuard)
    @Patch(':id')
    updateProduct(@Request() req, @Param('id', ParseIntPipe) pdtId:number, @Body('title') pdtTitle:string, @Body('description') descr: string, @Body('price', ParseFloatPipe) price: number) {
        const userId = req.user.id ;
        return this.pdtservice.updateById(userId, pdtId, pdtTitle, descr, price);
        
    }
 
    // @Get('search/:name') 
    // getProductbyName(@Param('name') pdtName: string): Promise<Products[]> {
    //     return this.pdtservice.getProductsbyName(pdtName);
    // }

    @Get(':id/reviews')
    getProductReviews(@Param('id', ParseIntPipe) id: number) {
        return this.pdtservice.getPdtReviews(id) ;
    }

    @Get(':id/seller') 
    getProductSeller(@Param('id', ParseIntPipe) id:number) {
        return this.pdtservice.getSeller(id) 
    }

    @UseGuards(ShopperJwtAuthGuard)
    @Post(':id/reviews')
    addProductReview(@Request() req, @Param('id', ParseIntPipe) id:number,@Body('description') description:string, @Body('rating', ParseIntPipe) rating:number ) {
        const userID = req.user.id ;
        return this.pdtservice.addReview(id,description,userID,rating) ;

    }

}