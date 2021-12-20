import { Orders } from "../Orders/orders.entity";
import { Entity, PrimaryGeneratedColumn , OneToOne, Column, OneToMany } from "typeorm";

@Entity()
export class TrackOrder {
    @PrimaryGeneratedColumn()
    orderTrackingID: number;

    @Column({nullable: true})
    expectedArrival: Date;
    
    @Column({default: false})
    orderDelivered: boolean;

    @Column({default:false})
    orderDispatched: boolean;

    @OneToOne(type=>Orders, order=>order.trackOrder) 
    orderInfo: Orders ;
}