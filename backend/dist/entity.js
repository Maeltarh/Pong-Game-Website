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
exports.Historique = exports.User = void 0;
const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');
let User = exports.User = class User {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "padColor", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "balleColor", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], User.prototype, "doubleFap", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], User.prototype, "lvl", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], User.prototype, "progressBar", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], User.prototype, "winRatioW", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], User.prototype, "winRatioL", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], User.prototype, "PP", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], User.prototype, "gameCount", void 0);
__decorate([
    Column({ type: "json", nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    Column({ type: "json", nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "blocked", void 0);
exports.User = User = __decorate([
    Entity()
], User);
let Historique = exports.Historique = class Historique {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Historique.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Historique.prototype, "login", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Historique.prototype, "username", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Historique.prototype, "index", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Historique.prototype, "scoreToi", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Historique.prototype, "scoreLui", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Historique.prototype, "myPP", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Historique.prototype, "oppenent", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Historique.prototype, "oppenentImage", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Historique.prototype, "hisPP", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Historique.prototype, "gain", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Historique.prototype, "result", void 0);
exports.Historique = Historique = __decorate([
    Entity()
], Historique);
//# sourceMappingURL=entity.js.map