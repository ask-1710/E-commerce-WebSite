import { Products } from "../Products/products.entity";
import { User } from "../Users/user.entity";
import { Entity, PrimaryGeneratedColumn , OneToOne , ManyToMany, JoinTable, JoinColumn } from "typeorm";

@Entity()
export class WishList {

    @OneToOne(type=>User, {
        cascade: ['insert','update'],
        primary: true ,
    })
    @JoinColumn({name: "id"})
    id: User ;
    
    @ManyToMany(type=>Products, {
        cascade: true, 
    }) 
    @JoinTable()
    products: Products[];

}