import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { TypeormTypeNameEnum } from '../enums/config.enums';

/**
 * used to configure Typeorm
 * @class TypeormConfigService
 * @classdesc used to create the connection to Typeorm
 */

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
    public type: TypeormTypeNameEnum.MYSQL;
    public host: string;
    public port: number;
    public username: string;
    public password: string;
    public database: string;
    public entities: string;
    public migrationsDirectory: string;

    public TypeormTypeNameEnum = TypeormTypeNameEnum;

    constructor(private nestConfigService: NestConfigService) {}

    // This is the function that is called when this class is
    // instantiated. This creates the Typeorm connection.

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        this.getEnvironmentVariables();

        return {
            type: this.type,
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password,
            database: this.database,
            entities: [this.entities],
            cli: {
                migrationsDir: this.migrationsDirectory,
            },
        };
    }
    // Method to get all the environment variables. The Syntax used is from the next documentation.
    // https://docs.nestjs.com/

    private getEnvironmentVariables(): void {
        const mysqlType = this.TypeormTypeNameEnum.MYSQL;
        this.type = this.nestConfigService.get<string>(
            'MYSQL_TYPE',
        ) as typeof mysqlType;
        this.host = this.nestConfigService.get<string>('MYSQL_HOST');
        this.port = parseInt(
            this.nestConfigService.get<string>('MYSQL_PORT'),
            10,
        );
        this.username = this.nestConfigService.get<string>('MYSQL_USERNAME');
        this.password = this.nestConfigService.get<string>('MYSQL_PASSWORD');
        this.database = this.nestConfigService.get<string>('MYSQL_DATABASE');
        this.entities = this.nestConfigService.get<string>('MYSQL_ENTITIES');
        this.migrationsDirectory = this.nestConfigService.get<string>(
            'CLI_MIGRATIONS_DIRECTORY',
        );
    }
}
