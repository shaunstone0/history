import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function createSwaggerDocument(
    app: INestApplication,
    swaggerConfig: Omit<OpenAPIObject, 'paths'>,
): OpenAPIObject {
    return SwaggerModule.createDocument(app, swaggerConfig);
}
