import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BookingsModule } from './bookings/bookings.module';
import { DesksModule } from './desks/desks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_HOST, { dbName: process.env.DATABASE_NAME }),
    BookingsModule,
    RoomsModule,
    DesksModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { } 
