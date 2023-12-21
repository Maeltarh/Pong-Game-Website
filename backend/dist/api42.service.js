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
exports.Api42Service = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const querystring = require("querystring");
const main_1 = require("./main");
let Api42Service = exports.Api42Service = class Api42Service {
    constructor(httpService) {
        this.httpService = httpService;
        this.BASE_URL = 'https://api.intra.42.fr';
        this.httpService = new axios_1.HttpService();
    }
    async getAccessTokenFromCode(code) {
        const REDIRECT_URI = 'http://' + main_1.serverIP + ':3001/auth/callback';
        try {
            const data = querystring.stringify({
                grant_type: 'authorization_code',
                client_id: main_1.CLIENT_ID,
                client_secret: main_1.CLIENT_SECRET,
                code: code,
                redirect_uri: REDIRECT_URI,
            });
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.BASE_URL}/oauth/token`, data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }));
            return response.data.access_token;
        }
        catch (error) {
            console.error("Erreur lors de la demande d'obtention du token :", error.response ? error.response.data : error.message);
            throw new Error("Erreur lors de la demande d'obtention du token");
        }
    }
    async getUserInfo(token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.BASE_URL}/v2/me`, { headers }));
        return response.data;
    }
};
exports.Api42Service = Api42Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], Api42Service);
//# sourceMappingURL=api42.service.js.map