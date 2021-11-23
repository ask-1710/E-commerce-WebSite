import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class ProductCategory {

    @PrimaryGeneratedColumn()
    categoryID: number;

    @Column({unique: true})
    categoryName: string;

    @OneToMany(type=>Products, products=>products.category)
    products: Products[];

}