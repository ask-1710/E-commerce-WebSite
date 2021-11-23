import { Controller, Post ,Body, Get ,Param,Patch,Delete } from "@nestjs/common";
import { Orders } from "./orders.entity";
import { OrdersService } from "./orders.service";

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}
    
    @Get()
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

    @Post()
    addProduct(@Body('UserID') userid:number,@Body('products') products:number[], @Body('qty') qty: number[], @Body('seller') seller:string, @Body('orderCity') orderCity:string,@Body('orderCountry') orderCountry:string,@Body('orderTax') orderTax: number,@Body('orderShipAddr') orderShipAddr:string,@Body('orderState') orderState:string) {
        this.orderService.insertOrders(userid , products, qty, seller, orderCity, orderCountry, orderTax, orderShipAddr, orderState) ;
    }

    @Get(':id') 
    getProductbyId(@Param('id') userID: number): Promise<Orders[]> {
        return this.orderService.getOrdersByUID(userID);
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

