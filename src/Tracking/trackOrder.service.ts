import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TrackOrder } from "./trackOrder.entity";
import { Orders } from "src/Orders/orders.entity";
import { User } from "src/Users/user.entity";

@Injectable()
export class TrackerService {
    constructor(
        @InjectRepository(TrackOrder)
        private readonly trackerRepo: Repository<TrackOrder> ,
        @InjectRepository(Orders)
        private readonly ordersRepo: Repository<Orders>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async getAll(userId: number) {
        return await this.userRepo.findOne(userId,
        {
            relations: ['orders','orders.trackOrder','orders.details'],
        }) ;
    }

    async getTackingDetailsByOrderID(orderId: number): Promise<Orders> {
        // const order = await this.ordersRepo.findOne(orderId) ;
        const tracker = await this.ordersRepo.findOne({where: {orderID: orderId}, relations:['trackOrder', 'details','details.products','details.products.seller']}) ;
        if(!tracker) {
            throw new NotFoundException('Order does not exist') ;
        }
        return tracker ;
    }
    
}