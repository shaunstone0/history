import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { createSwaggerDocument } from './config/utils/swagger-utils';
import {
    swaggerConfig,
    swaggerUrl,
} from './config/swagger-config/swagger-constants';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    // Set up Swagger Documentation
    const document = createSwaggerDocument(app, swaggerConfig);

    SwaggerModule.setup(swaggerUrl, app, document);

    await app.listen(3000);
}
bootstrap();
