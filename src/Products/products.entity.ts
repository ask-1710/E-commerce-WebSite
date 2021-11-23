import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

    @ManyToOne(type=>ProductCategory, pdtCategory=>pdtCategory.products, {cascade: ["insert", "update"]})
    category: ProductCategory;

    @Column()
    qty: number;

}