import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductReviews } from './product.reviews.entity';
import { ProductCategory } from './product_categories.entity';

@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 500})
    description: string;
    
    @Column()
    price: number;
    
    @CreateDateColumn()
    productCreatedAt: Date;

    @DeleteDateColumn()
    productDeletedAt: Date;

    @Column()
    qty: number;

    @Column({default: 0})
    rating: number ;

    @ManyToOne(type=>ProductCategory, pdtCategory=>pdtCategory.products, {cascade: ["insert", "update"]})
    category: ProductCategory; 

    @OneToMany(type=>ProductReviews,reviews=>reviews.product) 
    reviews: ProductReviews[] ;

}