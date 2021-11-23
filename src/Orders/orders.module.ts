import { Module } from "@nestjs/common";
import { TypeOrmModule  } from "@nestjs/typeorm";
import { Products}  from '../Products/products.entity' ;
import { Orders } from "./orders.entity";
import { OrderDetails } from "./orderdetails.entity";
import { TrackOrder } from "src/Tracking/trackOrder.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { User } from "src/Users/user.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Products, TrackOrder, User])],
    controllers: [OrdersController],
    providers: [OrdersService],
})

export class OrdersModule {}