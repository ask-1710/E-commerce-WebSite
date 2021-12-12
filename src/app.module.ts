import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm' ;
import { User } from './Users/user.entity';
import { Products  } from './Products/products.entity';
import { Orders  } from './Orders/orders.entity';
import { UserModule } from './Users/user.module';
import { ProductsModule } from './Products/products.module';
import { ProductCategory } from './Products/product_categories.entity';
import { OrdersModule } from './Orders/orders.module' ;
import { TrackOrder } from './Tracking/trackOrder.entity';
import { OrderDetails } from './Orders/orderdetails.entity';
import { TrackerModule } from './Tracking/trackOrder.module';
import { ProductReviews } from './Products/product.reviews.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller' ;
import { AppService } from './app.service';
import { WishListModule } from './wishlist/wishlist.module';
import { WishList } from './wishlist/wishlist.entity';

const dotenv = require('dotenv') ;
dotenv.config() ;

@Module({
  imports: [
    
    ProductsModule,

    UserModule,

    OrdersModule,  

    TrackerModule,

    AuthModule,

    WishListModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [ Products, User , ProductCategory, TrackOrder, OrderDetails, Orders , ProductReviews, WishList ],
      synchronize: true,
    }),

  ],
  controllers: [AppController],
  providers: [AppService], // service for AppController -> passed in constructor in Controller class
})


export class AppModule {}
// controller -> handle requests and send back replies
// providers -> service reaches to DB and renders to controller
// modularity

