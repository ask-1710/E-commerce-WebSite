import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from './user.entity'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        
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

}