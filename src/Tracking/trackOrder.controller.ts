import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";
import { TrackerService } from "./trackOrder.service";

@Controller('trackOrder')
export class TrackerController {
    constructor(
        private readonly trackerService: TrackerService,
    ) {}

    @Get()
    getAllTrackingInfo() {
        return this.trackerService.getAll() ;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getTrackingInfoByOrder(@Request() req, @Param('id') orderId:number) {
        return this.trackerService.getTackingDetailsByOrderID(orderId) ;
    }

}