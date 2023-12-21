"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMs = exports.channels = exports.CLIENT_SECRET = exports.CLIENT_ID = exports.serverIP = exports.leaderboard = exports.servIP = exports.userArray = exports.userPendingArray = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const cors = require("cors");
const user_1 = require("./user");
const config_1 = require("@nestjs/config");
exports.userPendingArray = [];
exports.userArray = [];
exports.servIP = "";
exports.leaderboard = new user_1.Leaderboard();
exports.channels = [];
exports.DMs = [];
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    exports.serverIP = configService.get('NESTJS_APP_SERVER_IP');
    exports.CLIENT_ID = configService.get('CLIENT_ID');
    exports.CLIENT_SECRET = configService.get('CLIENT_SECRET');
    exports.servIP = exports.serverIP;
    app.use(session({
        secret: 'clef',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(cors({
        origin: 'http://' + exports.serverIP + ':3000',
        credentials: true,
    }));
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map