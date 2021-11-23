import { Controller, Get, Param } from "@nestjs/common";
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

    @Get(':id')
    getTrackingInfoByOrder(@Param('id') orderId:number) {
        return this.trackerService.getTackingDetailsByOrderID(orderId) ;
    }

}