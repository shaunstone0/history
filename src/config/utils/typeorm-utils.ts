import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const type = process.env.MYSQL_TYPE.toString() as 'mysql';
const entities = ['dist/**/*.entity{.ts,.js}'];

export function getOrmOptionsObject(): TypeOrmModuleOptions {
    return {
        type,
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT, 10),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities,
        synchronize: false,
    };
}
