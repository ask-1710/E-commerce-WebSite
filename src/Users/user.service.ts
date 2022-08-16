import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from './user.entity'
import { passwordStrength } from 'check-password-strength' ;
import { Seller } from "./seller.entity";
import { isEmail, isMobilePhone } from "class-validator";
const bcrypt = require('bcrypt') ;

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

    async insertUser(firstName:string,middleName:string,lastName:string,dob:string,email:string,mobile:string, password: string, permaddr: string,city:string, pincode: string,state:string,country:string,cardID:string,gender:string) {
        if(!firstName || !dob || !email || !mobile || !password || !permaddr || !city || !state || !gender || !cardID) {
            throw new BadRequestException('Request body format: \
            { \
                firstName: string ,\
                middleName: string(optional),\
                lastName: string(optional),\
                DOB: string,\
                email: string,\
                mobile: string,\
                password: string,\
                permanent_addr: string,\
                city: string,\
                pincode: string,\
                state: string(default: India),\
                country: string,\
                cardId: string,\
                gender: string\
            ') ;
        }
        const val = this.checkPassword(password) ;
        if(val == 'Weak' || val=='Too weak') {
            throw new BadRequestException('Use a stronger password !!');
        }
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
            gender: gender,
            orders: []
        }) ;
        
        await this.usersRepo.save(usr) ;

        return 'User account created' ;

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
   
    async updateById( id:number, email:string, mobile: string, permaddr:string,city:string,pincode:string,state:string,country:string ) {
        
        const updatedUser = await this.usersRepo.findOne(id) ;
        if(email && isEmail(email)) updatedUser.email=email;
        if(mobile && isMobilePhone(mobile, 'en-IN')) updatedUser.mobile=mobile;
        if(permaddr) updatedUser.permanent_addr=permaddr;
        if(city) updatedUser.city=city;
        if(pincode) updatedUser.pincode=pincode;
        if(state) updatedUser.state=state;
        if(country) updatedUser.country=country;
        // separate function to reset password

        await this.usersRepo.save(updatedUser) ;
    }

    async deleteById(userID : number) {
        
        await this.usersRepo.delete({id: userID}) ;

        return 'Your account is deleted !' ;

    }

    private checkPassword(password:string) {
        console.log('Password is ',passwordStrength(password).value)
        return passwordStrength(password).value ;
    }

    async changePassword(userId:number, oldpassword:string, newpassword:string) {
        const user = await this.usersRepo.findOne(userId) ;

        const match = await bcrypt.compare(oldpassword, user.password);

        if(!match) {
            return new BadRequestException('Incorrect Credentials')
        }

        const val = this.checkPassword(newpassword) ;
        if(val == 'Weak' || val=='Too weak') {
            return new BadRequestException('Use a stronger password !!') ;
        }
        user.password = newpassword ;
        this.usersRepo.save(user) 
        return 'Password changed !!' ;        
    }

    async createSellerAccount(userId: number, pickupAddr: string, pickupCity: string, pickupPincode: string, pickupState: string, pickupCountry: string, pancardId: string) {
        if(!pickupAddr || !pickupCity || !pickupPincode || !pickupState || !pancardId) {
            throw new BadRequestException('Request Body format : \
            {\
                pickupAddr: string,\
                pickupCity: string,\
                pickupPincode: string,\
                pickupState: string,\
                pickupCountry: string(default: India),\
                pancardId: string\
            }\
            ')
        }
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