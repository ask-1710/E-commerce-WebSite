import { User } from "../Users/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class ProductReviews {

    @PrimaryGeneratedColumn()
    reviewID: number ;

    @Column()
    description: string;

    @Column()
    rating: number;

    @Column(CreateDateColumn)
    posted_At: Date;

    @Column(DeleteDateColumn)
    deleted_At: Date ;

    @ManyToOne(type=>Products, prod=>prod.reviews, {cascade: ["insert", "update"]})
    product: Products; 

    @ManyToOne(()=>User)
    user: User ;
}