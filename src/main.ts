import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import {
    swaggerConfig,
    swaggerUrl,
} from './config/swagger-config/swagger-constants';
import { createSwaggerDocument } from './config/utils/swagger-utils';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    // Set up Swagger Documentation
    const document = createSwaggerDocument(app, swaggerConfig);

    SwaggerModule.setup(swaggerUrl, app, document);

    await app.listen(3000);
}
bootstrap();
