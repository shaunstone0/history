import { Module } from '@nestjs/common';
import {
    ConfigModule as NestConfigModule,
    ConfigService as NestConfigService,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormConfigService } from './config/typeorm-config/typeorm-config.service';
import { WinstonConfigService } from './config/winston-config/winston-config.service';
import { DateUtilsModule } from './shared/utils/date-utils/date-utils.module';

@Module({
    imports: [
        NestConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useClass: TypeormConfigService,
            inject: [NestConfigService],
        }),
        WinstonModule.forRootAsync({
            useClass: WinstonConfigService,
            imports: [DateUtilsModule],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, NestConfigModule],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
