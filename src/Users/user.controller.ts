import { Controller, Post ,Body, Get ,Param,Patch,Delete } from "@nestjs/common";
import { UserService } from "./user.service";

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
        return null;
    }

    @Patch(':id')
    updateUser(@Param('id') userId:number, @Body('email') email:string, @Body('mobile') mobile:string ,@Body('password') password:string, @Body('permanent_addr') permaddr:string, @Body('city') city:string, @Body('pincode') pincode:string, @Body('state') state:string, @Body('country') country:string, @Body('cardId') cardID:string) {
        this.userService.updateById(userId,email,mobile,password,permaddr,city,pincode,state,country,cardID);
        return null ;
    }

    @Delete(':id') 
    deletePdt(@Param('id') userID: number) {
        this.userService.deleteById(userID);
        return null ;
    }
}
