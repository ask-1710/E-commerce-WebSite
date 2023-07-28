import { User } from "../Users/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderdetails.entity";
import { TrackOrder } from "../Tracking/trackOrder.entity";

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    orderID: number;

    @ManyToOne(type => User, user=>user.orders, {
        cascade: ["update"],
    }) 
    user: User ;

    @OneToOne(()=>OrderDetails, {
        cascade: ["insert","soft-remove","remove"],
    }) 
    @JoinColumn()
    details: OrderDetails ;

    @OneToOne(()=>TrackOrder, {
        cascade: ['insert','remove','soft-remove'],
    })
    @JoinColumn()
    trackOrder: TrackOrder ;

}