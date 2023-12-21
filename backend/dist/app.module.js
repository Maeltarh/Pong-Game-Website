"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_controller_2 = require("./app.controller");
const app_service_1 = require("./app.service");
const game_gateway_1 = require("./game.gateway");
const config_1 = require("@nestjs/config");
const api42_service_1 = require("./api42.service");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const entity_1 = require("./entity");
const user_service_1 = require("./user.service");
const histo_service_1 = require("./histo.service");
const mail_service_1 = require("./mail.service");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(), axios_1.HttpModule, typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'mhugueno',
                password: 'test',
                database: 'transBase',
                entities: [__dirname + '/**/*entity{.ts,.js}'],
                synchronize: true,
            }), typeorm_1.TypeOrmModule.forFeature([entity_1.User, entity_1.Historique])],
        controllers: [app_controller_1.AppController, app_controller_2.AppPosController, app_controller_1.AppChatController],
        providers: [app_service_1.AppService, game_gateway_1.EventsGateway, api42_service_1.Api42Service, user_service_1.UserService, histo_service_1.HistoriqueService, mail_service_1.MailService],
        exports: [user_service_1.UserService, histo_service_1.HistoriqueService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map