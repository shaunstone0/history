import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './config/winston-config/winston-config.service';
import { getOrmOptionsObject } from './config/utils/typeorm-utils';
import { Connection } from 'typeorm';
import { DateUtilsService } from './shared/utils/date-utils/date-utils.service';
import { DateUtilsModule } from './shared/utils/date-utils/date-utils.module';

@Module({
    imports: [
        NestConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: async () => Object.assign(await getOrmOptionsObject()),
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
