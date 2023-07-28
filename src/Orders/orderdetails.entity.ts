import { Products } from "../Products/products.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";

@Entity()
export class OrderDetails {
    @PrimaryGeneratedColumn()
    id: number;

    // @OneToOne(type=>Orders, order=>order.orderID)
    // order: Orders;

    @Column()
    orderAmount: number;

    @Column(CreateDateColumn)
    orderplacedDate: Date;

    @Column()
    orderTax: number;

    @Column(DeleteDateColumn)
    deleted_At: Date ;
    
    @ManyToMany(()=>Products)
    @JoinTable()
    products: Products[] ;

}