import { Products } from 'src/Products/products.entity';
import { ProductCategory } from 'src/Products/product_categories.entity';
import { Column, Entity, PrimaryGeneratedColumn , OneToMany, CreateDateColumn, DeleteDateColumn, BeforeInsert, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';
const bcrypt = require("bcrypt");

@Entity()
export class Seller {

    @OneToOne(type=>User, {
        cascade: ['insert','update'],
        primary: true,
    })
    @JoinColumn({name:"userId"})
    userId: User ;

    @Column()
    pickupAddr: string;
    @Column()
    pickupCity: string;
    @Column()
    pickupPincode: string;
    @Column()
    pickupState: string;
    @Column({default:"India"})
    pickupCountry: string;

    @Column({unique: true, nullable: false})
    pancardId: string ;

    @CreateDateColumn()
    sellerRegistrationDate: Date;
    @DeleteDateColumn()
    sellerDeleteDate: Date;

    @OneToOne(type=>ProductCategory)
    primaryCategory: ProductCategory ;

    @OneToMany(type=>Products, pdt=>pdt.seller, { 
        cascade: true,
    })
    products: Products[] ;

    @BeforeInsert()  
    async hashPanDetals() {
        this.pancardId = await bcrypt.hash(this.pancardId, 10);  
    }

}  
