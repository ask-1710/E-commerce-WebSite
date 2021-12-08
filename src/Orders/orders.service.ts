import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
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

    private async generateOrderAmount(products:Products[], qty: number[], tax: number):Promise<number> {
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

    async getProductsOrdered(orderId: number):Promise<OrderDetails[]> {
        //  RETURNS THE PRODUCTS ORDERED GIVEN THE ORDER DETAILS ID 
            const prod = await this.orderDetailsRepo.find({relations:['products'], where: {id: orderId}}) ;
            return prod ;
    }
    
    async getOrderDetails(orderId: number):Promise<Orders[]> {
        //  RETURNS THE DETAILS GIVEN THE ORDER ID 
        const details = await this.ordersRepo.createQueryBuilder("order")
                                        .leftJoinAndSelect("order.details", "details")
                                        .where("order.orderID LIKE :orderId", {orderId})
                                        .getMany(); 
                                        
        return details ;
    }

    async insertOrders(userID:number,productIDs:number[], qty: number[], seller:string, orderCity:string, orderCountry:string, orderTax: number, orderShipAddr:string, orderState:string) {
        let prod = new Products() ;
        let _orderedProducts= [prod]  ;
        // let someArray: Array<{ id: number, name: string }> = []
        
        for (var i=0;i<productIDs.length;i++) {
            const pid = productIDs[i] ;
            let pdt = await this.productsRepo.findOne(pid) ;
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
            seller: seller,
            orderTax: orderTax,
        });

        // console.log(newDetails) ;
            
        const trackingInfo = this.trackOrderRepo.create({
            orderCity:orderCity,
            orderCountry:orderCountry,
            orderShipAddr:orderShipAddr,
            orderState: orderState,
        });

        // console.log(trackingInfo) ;
        
        const order = this.ordersRepo.create({
            user: user,
            details: newDetails,
            trackOrder: trackingInfo,
        });

        // console.log(order) ;

        await this.ordersRepo.save(order) ;

        const pdts = await this.orderDetailsRepo.find({relations: ['products']}) ;
        // console.log(pdts) ;

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

    async deleteById(OrdersID : number) {
        
        await this.ordersRepo.delete(OrdersID) ;

    }

    async getOrdersByUID(userId:number) {
        const user = await this.usersRepo.findOne(userId, {relations: ['orders','orders.details','orders.details.products']}) ;

        return user ; 
    }

}

