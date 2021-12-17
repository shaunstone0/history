import { Inject, Injectable, Logger as NestLogger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

@Injectable()
export class AppService {
    private nestLogger = new NestLogger(AppService.name);
    constructor() {
        this.nestLogger.log('here');
    }
}
