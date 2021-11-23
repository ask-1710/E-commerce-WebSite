import { Module } from "@nestjs/common";
import { TypeOrmModule  } from "@nestjs/typeorm";
import { Orders } from "src/Orders/orders.entity";
import { TrackOrder } from "./trackOrder.entity";
import { TrackerController } from "./trackOrder.controller";
import { TrackerService } from "./trackOrder.service";

@Module({
    imports: [TypeOrmModule.forFeature([Orders, TrackOrder])],
    controllers: [TrackerController] ,
    providers: [TrackerService],
})
export class TrackerModule {} ;