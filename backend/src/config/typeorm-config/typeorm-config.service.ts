import { Injectable, Logger as NestLogger } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'fs-extra';

import { TypeormTypeNameEnum } from '../enums/config.enums';

/**
 * used to configure Typeorm
 * @class TypeormConfigService
 * @classdesc used to create the connection to Typeorm
 */

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
    private type: TypeormTypeNameEnum.MYSQL;
    private host: string;
    private port: number;
    private username: string;
    private password: string;
    private database: string;
    private entities: string;
    private migrationsDirectory: string;
    private subscribers: string;

    public TypeormTypeNameEnum = TypeormTypeNameEnum;

    public logger = new NestLogger(TypeormConfigService.name);

    constructor(private nestConfigService: NestConfigService) {}

    // This is the function that is called when this class is
    // instantiated. This creates the Typeorm connection.

    public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        await this.getEnvironmentVariables();

        // Create Migrations Directory if It does not Exist
        if (!existsSync('src/migration')) {
            mkdirSync('src/migration');
        }

        this.logger.log('Creating Database Connection Options....');

        return {
            type: this.type,
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password,
            database: this.database,
            entities: [this.entities],
            subscribers: [this.subscribers],
            migrations: ['src/dist//migration/*{.ts, .js}'],
            cli: {
                migrationsDir: '/src/migration',
            },
            synchronize: false,
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
        this.subscribers =
            this.nestConfigService.get<string>('MYSQL_SUBSCRIBERS');
        this.migrationsDirectory = this.nestConfigService.get<string>(
            'CLI_MIGRATIONS_DIRECTORY',
        );
    }
}
