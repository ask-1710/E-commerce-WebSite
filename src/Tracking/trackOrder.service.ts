import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TrackOrder } from "./trackOrder.entity";
import { Orders } from "src/Orders/orders.entity";

@Injectable()
export class TrackerService {
    constructor(
        @InjectRepository(TrackOrder)
        private readonly trackerRepo: Repository<TrackOrder> ,
        @InjectRepository(Orders)
        private readonly ordersRepo: Repository<Orders>,
    ) {}

    async getAll() {
        return await this.trackerRepo.find() ;
    }

    async getTackingDetailsByOrderID(orderId: number): Promise<Orders[]> {
        // const order = await this.ordersRepo.findOne(orderId) ;
        const tracker = await this.ordersRepo.find({where: {orderID: orderId}, relations:['trackOrder']}) ;
        return tracker ;
    }
    
}