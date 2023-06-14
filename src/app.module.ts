import { DataBaseEnvVariable } from './shared/models/config/env-variable-config.model';
import { DeskBookingsModule } from './desk-bookings/desk-bookings.module';
import { OfficeLayoutModule } from './office-layout/office-layout.module';
import { DATABASE } from './shared/constants/config.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './shared/config/configuration';
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
    DeskBookingsModule,
    RoomsModule,
    DesksModule,
    OfficeLayoutModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { } 
