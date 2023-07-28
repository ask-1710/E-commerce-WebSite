import { Controller, Get, Param, UseGuards, Request, Body, ParseIntPipe } from "@nestjs/common";
import { ShopperJwtAuthGuard } from "src/auth/shopper-jwt-auth.gaurd";
import { TrackerService } from "./trackOrder.service";

@Controller()
export class TrackerController {
    constructor(
        private readonly trackerService: TrackerService,
    ) {}

    @UseGuards(ShopperJwtAuthGuard)
    @Get('trackOrders')
    getAllTrackingInfo(@Request() req) {
        return this.trackerService.getAll(req.user.id) ;
    }

    @Get('trackOrder/:id')
    getTrackingInfoByOrder(@Param('id', ParseIntPipe) orderId:number) {
        return this.trackerService.getTackingDetailsByOrderID(orderId) ;
    }

}