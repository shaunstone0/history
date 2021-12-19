import { DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

// Initialize Dotenv package that comes directly from NestjsConfigModule.
dotenv.config();

const title = process.env.SWAGGER_DESRIPTION;
const description = process.env.SWAGGER_DESCRIPTION;
const version = process.env.APP_VERSION;

export const swaggerConfig = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

export const swaggerUrl = 'api';
