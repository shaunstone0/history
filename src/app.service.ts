import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class AppService {
    private nestLogger = new NestLogger(AppService.name);
    constructor() {
        this.nestLogger.log('here');
    }
}
