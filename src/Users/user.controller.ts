import { Controller, Post ,Body, Get ,Param,Patch,Delete, UseGuards } from "@nestjs/common";
import { ShopperJwtAuthGuard } from "src/auth/shopper-jwt-auth.gaurd";
import { UserService } from "./user.service";
import { Request } from '@nestjs/common' ;
import { SellerJwtAuthGuard } from "src/auth/seller-jwt-auth.gaurd";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}
   
    @Get()
    getallUsers() {
        return this.userService.getAll();
    }
}

@Controller('user') 
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UseGuards(ShopperJwtAuthGuard)
    @Get()
    getUser(@Request() req) {
        return this.userService.findUser(req.user.id) ;
    }
    
    @Post()
    addUser(@Body('firstName') firstname:string,  @Body('middleName') middlename: string,@Body('lastName') lastname:string, @Body('DOB') dob:string, @Body('email') email:string, @Body('mobile') mobile:string ,@Body('password') password:string, @Body('permanent_addr') permaddr:string, @Body('city') city:string, @Body('pincode') pincode:string, @Body('state') state:string, @Body('country') country:string, @Body('cardId') cardID:string ,@Body('gender') gender:string) {
        return this.userService.insertUser(firstname,middlename,lastname,dob,email,mobile,password,permaddr,city,pincode,state,country,cardID,gender);
              
    }

    @UseGuards(ShopperJwtAuthGuard)
    @Patch()
    updateUser(@Request() req, @Body('email') email:string, @Body('mobile') mobile:string, @Body('permanent_addr') permaddr:string, @Body('city') city:string, @Body('pincode') pincode:string, @Body('state') state:string, @Body('country') country:string) {
        return this.userService.updateById(req.user.id,email,mobile,permaddr,city,pincode,state,country);
    }

    @UseGuards(ShopperJwtAuthGuard)
    @Delete() 
    deleteUser(@Request() req) {
        return this.userService.deleteById(req.user.id);
        
    }

    @UseGuards(ShopperJwtAuthGuard) 
    @Patch('/changepassword')
    changePassword(@Request() req, @Body('oldpassword') oldpassword:string , @Body('newpassword') newpassword:string) {
        // console.log('User ', req.user.id) ;
        return this.userService.changePassword(req.user.id, oldpassword, newpassword) ;
    }
    
    @UseGuards(SellerJwtAuthGuard)
    @Post('/sellerAccount')
    createSellerAccount(@Request() req, @Body('pickupAddr') pickupAddr: string, @Body('pickupCity') pickupCity: string, @Body('pickupState') pickupState: string, @Body('pickupCountry') pickupCountry: string, @Body('pickupPincode') pickupPincode: string, @Body('cardId') pancardId:string ) {
        return this.userService.createSellerAccount(req.user.id, pickupAddr, pickupCity, pickupPincode, pickupState, pickupCountry, pancardId) ;        
    }

}
