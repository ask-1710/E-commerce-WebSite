import { Controller, Post ,Body, Get ,Param,Patch,Delete, UseGuards } from "@nestjs/common";
import { ShopperJwtAuthGuard } from "src/auth/shopper-jwt-auth.gaurd";
import { OrdersService } from "./orders.service";
import { Request } from "@nestjs/common";
import { User } from "src/Users/user.entity";

@Controller()
export class OrdersController {
    constructor(
        private readonly orderService: OrdersService
    ) {}

    @Get('orders')
    getallOrders() {
        return this.orderService.getAllOrders();
    }

    @UseGuards(ShopperJwtAuthGuard)
    @Get('myorders') 
    getProductbyId(@Request() req): Promise<User> {
        console.log(req.user.id) ; 
        return this.orderService.getOrdersByUID(req.user.id) ;
    }

    // @Patch(':id')
    // updateProduct(@Param('id') pdtId:number, @Body('title') pdtTitle:string, @Body('description') descr: string, @Body('price') price: number, @Body('categoryname') categoryname:string) {
    //     this.pdtservice.updateById(pdtId, pdtTitle, descr, price, categoryname);
    //     return null ;
    // }

}

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrdersService,
    ) {}

    // @Get(':id/')
    // getOrderedProducts(@Param('id') detId:number) {
    //     return this.orderService.getProductsOrdered(detId) ;
    // }

    @Get(':id') 
    getOrderDetails(@Param('id') orderId: number) {
        return this.orderService.getOrderDetails(orderId) ;
    }

    @UseGuards(ShopperJwtAuthGuard) // 
    @Post()
    makeOrder(@Request() req, @Body('products') products:number[], @Body('qty') qty: number[] , @Body('tax') orderTax: number) {
        let user = req.user ;
        return this.orderService.insertOrder(user.id , products, qty,orderTax) ;
    }

    @Delete(':id')  // done
    deleteOrder(@Param('id') orderId: number) {
        return this.orderService.deleteById(orderId) ;
        
    }

}

