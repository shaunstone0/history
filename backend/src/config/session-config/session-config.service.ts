// import { ConfigService as NestConfigService } from '@nestjs/config';
// import * as MySQLStore from 'express-mysql-session';
// import { SessionOptions } from 'express-session';
//
// export class SessionConfigService {
//     private sessionName: string;
//     private sessionSecret: string;
//     private sessionExpire: number;
//     private databaseHost: string;
//     private databasePort: number;
//     private databaseUser: string;
//     private databasePassword: string;
//     private database: string;
//
//     constructor(private nestConfigService: NestConfigService) {
//         this.createMysqlConnectionOptions()
//     }
//
//     public async createSessionOptions(): Promise<SessionOptions> {
//         await this.getEnvironmentVariables();
//         const options = await this.createMysqlConnectionOptions();
//
//         return {
//             name: this.sessionName,
//             secret: this.sessionSecret,
//             saveUninitialized: false,
//             resave: false,
//             store: new MySQLStore(options),
//         };
//     }
//
//     public getEnvironmentVariables(): void {
//         this.sessionName = this.nestConfigService.get<string>('SESS_NAME');
//         this.sessionSecret = this.nestConfigService.get<string>('SESS_SECRET');
//         this.sessionExpire = Number(
//             this.nestConfigService.get<string>('SESS_EXPIRE'),
//         );
//         this.databaseHost = this.nestConfigService.get<string>('MYSQL_HOST');
//         this.databasePort = parseInt(
//             this.nestConfigService.get<string>('MYSQL_PORT'),
//             10,
//         );
//         this.databaseUser =
//             this.nestConfigService.get<string>('MYSQL_USERNAME');
//         this.databasePassword =
//             this.nestConfigService.get<string>('MYSQL_PASSWORD');
//         this.database = this.nestConfigService.get<string>('MYSQL_DATABASE');
//     }
//
//     public createMysqlConnectionOptions(): object {
//         return {
//             host: this.databaseHost,
//             port: this.databasePort,
//             user: this.databaseUser,
//             password: this.databasePassword,
//             database: this.database,
//         };
//     }
// }
//
// const sessionService = new SessionConfigService();
//
// export default sessionService;
