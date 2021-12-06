import { Orders } from 'src/Orders/orders.entity';
import { ProductReviews } from 'src/Products/product.reviews.entity';
import { Column, Entity, PrimaryGeneratedColumn , OneToMany, CreateDateColumn, DeleteDateColumn, BeforeInsert } from 'typeorm';
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

    @Column({length: 10})
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

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

}  


// {
//     "id": 1,
//     "firstName": "mania",
//     "middleName": " ",
//     "lastName": "Singh",
//     "DOB": "14/04/14",
//     "email": "ma@gmail.com",
//     "mobile": "432422313",
//     "password": "padnai",
//     "permanent_addr": "3/411, murat street",
//     "city": "chennai",
//     "pincode": "600006",
//     "state": "TN",
//     "country": "India",
//     "registrationDate": "2021-11-22T08:58:09.261Z",
//     "cardId": "SD213",
//     "deleteTime": null
// }