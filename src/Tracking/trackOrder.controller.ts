import { Controller, Get, Param, UseGuards, Request, Body } from "@nestjs/common";
import { ShopperJwtAuthGuard } from "src/auth/shopper-jwt-auth.gaurd";
import { TrackerService } from "./trackOrder.service";

@Controller('trackOrder')
export class TrackerController {
    constructor(
        private readonly trackerService: TrackerService,
    ) {}

    @UseGuards(ShopperJwtAuthGuard)
    @Get()
    getAllTrackingInfo(@Request() req) {
        return this.trackerService.getAll(req.user.id) ;
    }

    @Get('id')
    getTrackingInfoByOrder(@Param('id') orderId:number) {
        return this.trackerService.getTackingDetailsByOrderID(orderId) ;
    }

}