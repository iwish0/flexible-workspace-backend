import { DeskBookingsModule } from './desk-bookings/desk-bookings.module';
import { OfficeLayoutModule } from './office-layout/office-layout.module';
import { DesksModule } from './desks/desks.module';
import { RoomsModule } from './rooms/rooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_HOST, { dbName: process.env.DATABASE_NAME }),
    DeskBookingsModule,
    RoomsModule,
    DesksModule,
    OfficeLayoutModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { } 
