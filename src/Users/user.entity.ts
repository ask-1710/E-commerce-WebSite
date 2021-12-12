import { Orders } from 'src/Orders/orders.entity';
import { ProductReviews } from 'src/Products/product.reviews.entity';
import { Products } from 'src/Products/products.entity';
import { WishList } from 'src/wishlist/wishlist.entity';
import { Column, Entity, PrimaryGeneratedColumn , OneToMany, CreateDateColumn, DeleteDateColumn, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
const bcrypt = require("bcrypt");

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    firstName: string;

    @Column({length: 50})
    middleName: string;

    @Column({length: 50})
    lastName: string;

    @Column()
    DOB: string;
    
    @Column()
    email: string ;

    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    password: string; 

    @Column({length: 10, unique:true})
    mobile: string ;
    
    @Column()
    permanent_addr: string;

    @Column()
    city: string;

    @Column()
    pincode: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @CreateDateColumn()
    registrationDate: Date;

    @Column()
    cardId: string ;

    @DeleteDateColumn()
    deleteTime: Date;

    @OneToMany(type => Orders, order=>order.user) 
    orders: Orders[];

    @OneToMany(type=>ProductReviews, review=>review.user) 
    reviews: ProductReviews[] ;

    @OneToOne(type=>WishList, wishlist=>wishlist.id)
    wishlist: WishList ;

    @OneToMany(type=>Products, products=>products.seller, { 
        cascade: ['insert','update','remove'],
    })
    products: Products[] ;

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

}  
