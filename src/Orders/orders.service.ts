import { BadRequestException, Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Orders } from './orders.entity' ;
import { OrderDetails } from "./orderdetails.entity";
import { User } from "src/Users/user.entity";
import { TrackOrder } from "src/Tracking/trackOrder.entity";
import { Products } from "src/Products/products.entity";
@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Orders)
        private readonly ordersRepo: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepo: Repository<OrderDetails>,
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        @InjectRepository(TrackOrder)
        private readonly trackOrderRepo: Repository<TrackOrder>,
        @InjectRepository(Products)
        private readonly productsRepo: Repository<Products>,
    ) {}

    getAllOrders() {
        return this.ordersRepo.find() ;
    } 

    private async generateOrderAmount(products:Products[], qty: number[], tax: number) {
        let amount = 0 ;
        for (var idx = 0 ; idx < products.length ; idx ++ ) {
            if( products[idx].qty < qty[idx] ) {
                throw NotImplementedException ;
            }
            amount += (products[idx].price * qty[idx]) ;
        }
        amount+=tax ;
        console.log(amount) ;
        return amount ;
    }

    async getProductsOrdered(orderId: number){
        
            const prod = await this.orderDetailsRepo.find({relations:['products'], where: {id: orderId}}) ;

            return (prod ? prod : new NotFoundException('Order does not exist')) ;
    }
    
    async getOrderDetails(orderId: number)  {
        const details = await this.ordersRepo.findOne(orderId,{
            relations:['user','details','details.products','trackOrder']
        })

        if(!details) {
            throw new NotFoundException('Order does not exist') ;
        }

        return details ;
    }

    async insertOrder(userID:number,productIDs:number[], qty: number[], orderTax: number) {
        if(!userID || !productIDs || !qty || !orderTax) {
            throw new BadRequestException('Make sure to enter values for fields : \
            { \
                products: Products[],\
                qty: number[],\
                orderTax: number\
            }') ;
        }
        if(productIDs.length != qty.length) {
            throw new BadRequestException('The length of products and qty do not match') ;
        }
        let prod = new Products() ;
        let _orderedProducts= [prod]  ;
        // let someArray: Array<{ id: number, name: string }> = []
        
        for (var i=0;i<productIDs.length;i++) {
            const pid = productIDs[i] ;
            let pdt = await this.productsRepo.findOne(pid) ;
            if(!pdt) {
                var str = 'Product ' +pid+'does not exist' ;
                throw new NotFoundException(str) ;
            }
            _orderedProducts.push(pdt) ;
        }
        _orderedProducts.splice(0,1) ;

        let orderAmt = await this.generateOrderAmount(_orderedProducts, qty, orderTax) ;
        // console.log(orderAmt) ; 
        let user = await this.usersRepo.findOne(userID) ;
        // console.log(user) ;
       
        let newDetails = this.orderDetailsRepo.create({
            products: _orderedProducts,
            orderAmount: orderAmt,
            orderTax: orderTax,
        });

        // console.log(newDetails) ;

        var myCurrentDate=new Date();
        var myFutureDate=new Date(myCurrentDate);
        myFutureDate.setDate(myFutureDate.getDate()+ 7) ;
        
        const trackingInfo = this.trackOrderRepo.create({
            
            expectedArrival: myFutureDate,           
            orderDelivered: false,
            orderDispatched: false,

        });

        console.log(trackingInfo) ;
        
        const order = this.ordersRepo.create({
            user: user,
            details: newDetails,
            trackOrder: trackingInfo,
        });

        // console.log(order) ;

        await this.ordersRepo.save(order) ;

        // const pdts = await this.orderDetailsRepo.find({relations: ['products','products.seller']}) ;
        // console.log(pdts) ;
        return 'Order Inserted !' ;
    }
       
    // async updateById( id:number, email:string, mobile: string, password:string,permaddr:string,city:string,pincode:string,state:string,country:string,cardID:string ) {
    //     // let updatedOrders = this.ordersRepo.create();
    //     const pdt = await this.findOrders(id) ;
    //     let updatedOrders = {...pdt}
    //     if(email) updatedOrders.email=email;
    //     if(mobile) updatedOrders.mobile=mobile;
    //     if(password && password!=updatedOrders.password) updatedOrders.password=password;
    //     if(permaddr) updatedOrders.permanent_addr=permaddr;
    //     if(city) updatedOrders.city=city;
    //     if(pincode) updatedOrders.pincode=pincode;
    //     if(state) updatedOrders.state=state;
    //     if(country) updatedOrders.country=country;
    //     if(cardID) updatedOrders.cardId=cardID;

    //     await this.ordersRepo.save(updatedOrders) ;
    // }

    async deleteById(orderID : number) {
        const order = await this.ordersRepo.findOne(orderID) ;
        if(!order) {
            throw new NotFoundException('Order not Found') ;
        }
        await this.ordersRepo.delete(orderID) ;
        return 'Order deleted !' ;
    }

    async getOrdersByUID(userId:number) {
        const user = await this.usersRepo.findOne(userId, {relations: ['orders','orders.details','orders.details.products','orders.trackOrder']}) ;
        
        return user ; 
    }

}

