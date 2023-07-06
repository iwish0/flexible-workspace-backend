import { AllExceptionsFilter } from './shared/services/error/all-exceptions-filter.service';
import { DataBaseEnvVariable } from './shared/models/config/env-variable-config.model';
import { RoomBookingsModule } from './room-bookings/room-bookings.module';
import { DeskBookingsModule } from './desk-bookings/desk-bookings.module';
import { OfficeLayoutModule } from './office-layout/office-layout.module';
import { DATABASE } from './shared/constants/config.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './shared/config/configuration';
import { AuthGuard } from './shared/guards/auth.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { DesksModule } from './desks/desks.module';
import { RoomsModule } from './rooms/rooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<DataBaseEnvVariable>(DATABASE).host,
        dbName: config.get<DataBaseEnvVariable>(DATABASE).dbName
      })
    }),
    DesksModule,
    RoomsModule,
    DeskBookingsModule,
    RoomBookingsModule,
    OfficeLayoutModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule { } 
