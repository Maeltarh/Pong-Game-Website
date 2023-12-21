"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const app_service_1 = require("./app.service");
const main_1 = require("./main");
let EventsGateway = exports.EventsGateway = class EventsGateway {
    constructor(appService) {
        this.appService = appService;
        this.clients = new Map();
    }
    afterInit(server) {
        console.log('Init');
    }
    handleConnection(client, ...args) {
        console.log(`Client connected: ${client.id}`);
        this.clients.set(client.id, client);
        client.emit('socketId', client.id);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.appService.handleDisconnect(client);
        this.clients.delete(client.id);
    }
    login(client, data) {
        const { username } = data;
        const result = this.appService.handleLogin(client, data.username, data.choixPseudo, data.defaultImage, data.bool);
        client.emit('loginResponse', result);
    }
    deco(client, data) {
        console.log(`Client disconnected: ${client.id}`);
        this.appService.handleDisconnect(client);
        this.clients.delete(client.id);
    }
    doubleFapOff(client) {
        console.log(`doubleFapOff: ${client.id}`);
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (main_1.userArray[i].socket === client) {
                main_1.userArray[i].getDataUser().setDeuxFap(false);
            }
        }
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "login", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deco'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "deco", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('doubleFapOff'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "doubleFapOff", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3002, { cors: { origin: "*", methods: ["GET", "POST"] } }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], EventsGateway);
exports.default = EventsGateway;
//# sourceMappingURL=game.gateway.js.map