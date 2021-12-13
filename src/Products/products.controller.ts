import { Controller, Post ,Body, Get ,Param,Patch,Delete, UseGuards , Request} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";
import { Products } from "./products.entity";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly pdtservice: ProductService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get('myproducts')
    getMyProducts(@Request() req) {
        return this.pdtservice.getMyProducts(req.user.id) ;
    }

    @Get()
    getallProducts() {
        return this.pdtservice.getProducts();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addProduct(@Request() req,@Body('name') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number, @Body('category') categoryname: string, @Body('qty') qty: number) {
        return this.pdtservice.insertProduct(req.user.id, prodTitle, prodDesc, prodPrice, categoryname, qty);
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

    @UseGuards(JwtAuthGuard)
    @Patch()
    updateProduct(@Request() req, @Body('productid') pdtId:number, @Body('title') pdtTitle:string, @Body('description') descr: string, @Body('price') price: number) {
        const userId = req.user.id ;
        return this.pdtservice.updateById(userId, pdtId, pdtTitle, descr, price);
        
    }

    @UseGuards(JwtAuthGuard)
    @Delete() 
    deletePdt(@Request() req, @Body('productid') productId:number) {
        const userId = req.user.id ;
        return this.pdtservice.deleteById(userId, productId);
    }
}
