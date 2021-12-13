import { Controller, Post ,Body, Get ,Param,Patch,Delete, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";
import { UserService } from "./user.service";
import { Request } from '@nestjs/common' ;

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
   
    @Get()
    getallUsers() {
        return this.userService.getAll();
    }

    @Post()
    addUser(@Body('firstName') firstname:string, @Body('middleName') middlename: string,@Body('lastName') lastname:string, @Body('DOB') dob:string, @Body('email') email:string, @Body('mobile') mobile:string ,@Body('password') password:string, @Body('permanent_addr') permaddr:string, @Body('city') city:string, @Body('pincode') pincode:string, @Body('state') state:string, @Body('country') country:string, @Body('cardId') cardID:string) {
        this.userService.insertUser(firstname,middlename,lastname,dob,email,mobile,password,permaddr,city,pincode,state,country,cardID);
        return 'User Added';
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/myaccount/update')
    updateUser(@Request() req, @Body('email') email:string, @Body('mobile') mobile:string, @Body('permanent_addr') permaddr:string, @Body('city') city:string, @Body('pincode') pincode:string, @Body('state') state:string, @Body('country') country:string, @Body('cardId') cardID:string) {
        this.userService.updateById(req.user.id,email,mobile,permaddr,city,pincode,state,country,cardID);
        return null ;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/myaccount/delete') 
    deletePdt(@Request() req) {
        this.userService.deleteById(req.user.id);
        return 'Your account is deleted' ;
    }

    @UseGuards(JwtAuthGuard) 
    @Patch('/changepassword/')
    changePassword(@Request() req, @Body('password') password:string) {
        console.log('User ', req.user.id) ;
        return this.userService.changePassword(req.user.id, password) ;
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('/mysellerAccount/')
    createSellerAccount(@Request() req, @Body('pickupAddr') pickupAddr: string, @Body('pickupCity') pickupCity: string, @Body('pickupState') pickupState: string, @Body('pickupCountry') pickupCountry: string, @Body('pickupPincode') pickupPincode: string, @Body('cardId') pancardId:string ) {
        return this.userService.createSellerAccount(req.user.id, pickupAddr, pickupCity, pickupPincode, pickupState, pickupCountry, pancardId) ;        
    }
}
