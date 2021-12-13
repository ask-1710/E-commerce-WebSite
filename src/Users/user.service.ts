import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from './user.entity'
import { passwordStrength } from 'check-password-strength' ;
import { Seller } from "./seller.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        @InjectRepository(Seller)
        private readonly sellerRepo: Repository<Seller>,
        
    ) {}

    getAll() {
        return this.usersRepo.find() ;        
    }

    insertUser(firstName:string,middleName:string,lastName:string,dob:string,email:string,mobile:string, password: string, permaddr: string,city:string, pincode: string,state:string,country:string,cardID:string) {
        const usr = this.usersRepo.create({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            DOB: dob,
            email: email,
            mobile: mobile,
            password: password,
            permanent_addr: permaddr,
            city: city,
            state: state,
            pincode: pincode,
            country: country,
            cardId: cardID,
            orders: []
        }) ;
        
        this.usersRepo.save(usr) ;
    }

    async findUser(Id: number): Promise<any> {
        const usr = await this.usersRepo.findOne(Id) ;
        // console.log(pdt) ;
        if (!usr) {
            throw new NotFoundException('User not found');
        }
        const {password, ...result} = usr;
        return result;
    }  
   
    async updateById( id:number, email:string, mobile: string, permaddr:string,city:string,pincode:string,state:string,country:string,cardID:string ) {
        // let updatedUser = this.usersRepo.create();
        const updatedUser = await this.usersRepo.findOne(id) ;
        if(email) updatedUser.email=email;
        if(mobile) updatedUser.mobile=mobile;
        if(permaddr) updatedUser.permanent_addr=permaddr;
        if(city) updatedUser.city=city;
        if(pincode) updatedUser.pincode=pincode;
        if(cardID) updatedUser.cardId=cardID ;
        if(state) updatedUser.state=state;
        if(country) updatedUser.country=country;
        // separate function to reset password

        await this.usersRepo.save(updatedUser) ;
    }

    async deleteById(userID : number) {
        
        await this.usersRepo.delete({id: userID}) ;

    }

    private checkPassword(password:string) {
        console.log('Password is ',passwordStrength(password).value)
        return passwordStrength(password).value ;
    }

    async changePassword(userId:number, password:string) {
        const val = this.checkPassword(password) ;
        if(val == 'Weak' || val=='Too weak') {
            return 'Use a stronger password !!' ;
        }
        const user = await this.usersRepo.findOne(userId) ;
        user.password = password ;
        return 'Password changed !!' ;        
    }

    async createSellerAccount(userId: number, pickupAddr: string, pickupCity: string, pickupPincode: string, pickupState: string, pickupCountry: string, pancardId: string) {
        const user = await this.usersRepo.findOne(userId) ;
        let seller = this.sellerRepo.create({
            userId: user,
            pickupAddr: pickupAddr,
            pickupCity: pickupCity,
            pickupPincode: pickupPincode,
            pickupState: pickupState,
            pickupCountry: pickupCountry,
            pancardId: pancardId
        }) ;

        await this.sellerRepo.save(seller) ;

        return await this.usersRepo.findOne(userId, {
            relations: ['sellerAccount'],
        }) ;
    }

}