import { Injectable } from '@nestjs/common';
import { LoggerDateEnum } from '../../enums/global/global-enum';

@Injectable()
export class DateUtilsService {
    public loggerDateEnum = LoggerDateEnum;
    public getLoggerDateString(): string {
        return this.loggerDateEnum.LOGGER_DATE;
    }
}
