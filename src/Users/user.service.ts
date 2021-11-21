import { Injectable, NotFoundException } from "@nestjs/common";
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
        const pdt = this.usersRepo.create({
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
            cardId: cardID
        }) ;
            
        this.usersRepo.save(pdt) ;
    }
    
    private async findUser(Id: number): Promise<User> {
        const pdt = await this.usersRepo.find({id: Id}) ;
        // console.log(pdt) ;
        if (!pdt) {
            throw new NotFoundException('User not found');
        }
        return {...pdt[0]}
    }  
   
    async updateById( id:number, email:string, mobile: string, password:string,permaddr:string,city:string,pincode:string,state:string,country:string,cardID:string ) {
        // let updatedUser = this.usersRepo.create();
        const pdt = await this.findUser(id) ;
        let updatedUser = {...pdt}
        if(email) updatedUser.email=email;
        if(mobile) updatedUser.mobile=mobile;
        if(password && password!=updatedUser.password) updatedUser.password=password;
        if(permaddr) updatedUser.permanent_addr=permaddr;
        if(city) updatedUser.city=city;
        if(pincode) updatedUser.pincode=pincode;
        if(state) updatedUser.state=state;
        if(country) updatedUser.country=country;
        if(cardID) updatedUser.cardId=cardID;

        await this.usersRepo.save(updatedUser) ;
    }

    async deleteById(userID : number) {
        
        await this.usersRepo.delete({id: userID}) ;

    }

}