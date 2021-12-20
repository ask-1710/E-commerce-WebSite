import { Module } from "@nestjs/common";
import { TypeOrmModule  } from "@nestjs/typeorm";
import { Products}  from '../Products/products.entity' ;
import { Orders } from "./orders.entity";
import { OrderDetails } from "./orderdetails.entity";
import { TrackOrder } from "src/Tracking/trackOrder.entity";
import { OrderController, OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { User } from "src/Users/user.entity";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Orders, OrderDetails, Products, TrackOrder, User]), 
        AuthModule,
    ],
    controllers: [OrdersController, OrderController],
    providers: [OrdersService],
})

export class OrdersModule {}