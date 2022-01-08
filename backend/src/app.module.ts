import { Logger as NestLogger, Module } from '@nestjs/common';
import {
    ConfigModule as NestConfigModule,
    ConfigService as NestConfigService,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as MySQLStore from 'express-mysql-session';
import { WinstonModule } from 'nest-winston';
import { NestSessionOptions, SessionModule } from 'nestjs-session';

import { TypeormConfigService } from './config/typeorm-config/typeorm-config.service';
import { WinstonConfigService } from './config/winston-config/winston-config.service';
import { DateUtilsModule } from './shared/utils/date-utils/date-utils.module';
import { UserModule } from './api/users/user.module';
import {AuthModule} from './api/auth/auth.module';

@Module({
    imports: [
        NestConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useClass: TypeormConfigService,
            inject: [NestConfigService, NestLogger],
        }),
        WinstonModule.forRootAsync({
            useClass: WinstonConfigService,
            inject: [NestConfigService],
            imports: [DateUtilsModule],
        }),
        SessionModule.forRootAsync({
            useFactory: async (
                configService: NestConfigService,
            ): Promise<NestSessionOptions> => {
                // Options for Store
                const storeOptions = {
                    host: configService.get('MYSQL_HOST'),
                    port: Number(configService.get('MYSQL_PORT')),
                    user: configService.get('MYSQL_USERNAME'),
                    password: configService.get('MYSQL_PASSWORD'),
                    database: configService.get('MYSQL_DATABASE'),
                };

                return {
                    session: {
                        name: configService.get('SESS_NAME'),
                        secret: configService.get('SESS_SECRET'),
                        saveUninitialized: false,
                        resave: false,
                        store: new MySQLStore(storeOptions),
                        cookie: {
                            sameSite: true,
                            secure: false,
                            maxAge:
                                Number(configService.get('SESS_EXPIRE')) *
                                60 *
                                24 *
                                24,
                        },
                    },
                };
            },
            inject: [NestConfigService],
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [NestConfigModule],
})
export class AppModule {}
