import { Column, Entity, PrimaryGeneratedColumn , OneToOne , OneToMany, Timestamp, CreateDateColumn, DeleteDateColumn } from 'typeorm';

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
    DOB: Date;
    
    @Column()
    email: string ;

    @Column({length: 10})
    mobile: string ;

    @Column()
    password: string;

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

}
