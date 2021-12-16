import { Controller, Post ,Body, Get ,Param,Patch,Delete, UseGuards } from "@nestjs/common";
import { ShopperJwtAuthGuard } from "src/auth/shopper-jwt-auth.gaurd";
import { OrdersService } from "./orders.service";
import { Request } from "@nestjs/common";
import { User } from "src/Users/user.entity";

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderService: OrdersService
    ) {}

    @Get('/all')
    getallOrders() {
        return this.orderService.getAllOrders();
    }

    @Get('/details/:id/products/')
    getOrderedProducts(@Param('id') detId:number) {
        return this.orderService.getProductsOrdered(detId) ;
    }

    @Get('/details/:id') 
    getOrderDetails(@Param('id') orderId: number) {
        return this.orderService.getOrderDetails(orderId) ;
    }

    @UseGuards(ShopperJwtAuthGuard)
    @Post()
    makeOrder(@Request() req, @Body('products') products:number[], @Body('qty') qty: number[], @Body('seller') seller:string, @Body('orderCity') orderCity:string,@Body('orderCountry') orderCountry:string,@Body('orderTax') orderTax: number,@Body('orderShipAddr') orderShipAddr:string,@Body('orderState') orderState:string) {
        let user = req.user ;
        this.orderService.insertOrders(user.id , products, qty, seller, orderCity, orderCountry, orderTax, orderShipAddr, orderState) ;
    }

    @UseGuards(ShopperJwtAuthGuard)
    @Get() 
    getProductbyId(@Request() req): Promise<User> {
        console.log(req.user.id) ; 
        return this.orderService.getOrdersByUID(req.user.id) ;
    }

    // @Patch(':id')
    // updateProduct(@Param('id') pdtId:number, @Body('title') pdtTitle:string, @Body('description') descr: string, @Body('price') price: number, @Body('categoryname') categoryname:string) {
    //     this.pdtservice.updateById(pdtId, pdtTitle, descr, price, categoryname);
    //     return null ;
    // }

    @Delete(':id') 
    deletePdt(@Param('id') orderId: number) {
        this.orderService.deleteById(orderId);
        return null ;
    }

}

