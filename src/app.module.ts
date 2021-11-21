import { Module } from '@nestjs/common';
import { ProductsModule } from './Products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm' ;
import { User } from './Users/user.entity';
import { ProductSchema  } from './Products/products.entity';
import { UserModule } from './Users/user.module';

@Module({
  imports: [
    
    ProductsModule,

    UserModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'aarthi',
      password: 'Hanuman2001$',
      database: 'ecommsite',
      entities: [ ProductSchema, User ],
      synchronize: true,
    }),

],
  // controllers: [AppController],
  // providers: [AppService], // service for AppController -> passed in constructor in Controller class
})


export class AppModule {}
// controller -> handle requests and send back replies
// providers -> service reaches to DB and renders to controller
// modularity

