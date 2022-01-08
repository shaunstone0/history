import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import {
    WinstonModuleOptions,
    WinstonModuleOptionsFactory,
} from 'nest-winston';
import * as winston from 'winston';
import { format } from 'winston';
import {
    ConsoleTransportInstance,
    FileTransportInstance,
} from 'winston/lib/winston/transports';

import { DateUtilsService } from '../../shared/utils/date-utils/date-utils.service';

/**
 * used to configure Winston Logger
 * @class WinstonConfigService
 * @classdesc used to create configurations for winston logger
 */

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
    public developmentArray = [new winston.transports.Console()];
    // TODO: add Live array when moving to production
    public liveArray = [];

    public debugOutput: string;
    public loggerLevel: string;

    constructor(
        private dateUtilsService: DateUtilsService,
        nestConfigService: NestConfigService,
    ) {
        this.debugOutput = nestConfigService.get<string>('DEBUG_OUTPUT');
        this.loggerLevel = nestConfigService.get<string>('LEVEL');
    }

    public createWinstonModuleOptions(): WinstonModuleOptions {
        const dateString = this.dateUtilsService.getLoggerDateString();
        const winstonFormat = winston.format;
        const transports = this.createTransports(this.debugOutput);

        const loggerFormat = winstonFormat.printf(
            ({ level, message, timestamp, context }) => {
                const contextString = `\x1b[1m\x1b[34m[${context}]\x1b[0m`;

                return `[ ${level} ] ${timestamp} - ${contextString} : ${message}`;
            },
        );

        return {
            level: this.loggerLevel,
            format: winstonFormat.combine(
                format((info) => {
                    info.level = info.level.toUpperCase();
                    return info;
                })(),
                winstonFormat.colorize(),
                winstonFormat.timestamp({ format: dateString }),
                loggerFormat,
                winstonFormat.errors({ stack: true }),
                winstonFormat.align(),
            ),
            transports,
        };
    }

    private createTransports(
        debugOutput: string,
    ): ConsoleTransportInstance[] | FileTransportInstance[] {
        // change debug output from string to boolean...
        const debugOutputBoolean = JSON.parse(debugOutput);
        // create transportArray...
        let transportArray: ConsoleTransportInstance[] = [];

        // set Transport Array...
        if (debugOutputBoolean) {
            transportArray = this.developmentArray;
        } else if (!debugOutputBoolean) {
            transportArray = this.liveArray;
        }

        return transportArray;
    }
}
