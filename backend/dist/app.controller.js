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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppChatController = exports.AppController = exports.AppPosController = exports.code = void 0;
const common_1 = require("@nestjs/common");
const game_gateway_1 = require("./game.gateway");
const main_1 = require("./main");
const api42_service_1 = require("./api42.service");
const common_2 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const main_2 = require("./main");
const mail_service_1 = require("./mail.service");
const user_1 = require("./user");
const Channel_1 = require("./Channel");
const Message_1 = require("./Message");
const DM_1 = require("./DM");
let AppPosController = exports.AppPosController = class AppPosController {
    constructor(eventsGateway, userService, mailService) {
        this.eventsGateway = eventsGateway;
        this.userService = userService;
        this.mailService = mailService;
    }
    noDefi(req, res) {
        for (let i = 0; i < main_1.userArray.length; i++) {
            if (req.body.pseudoDefi === main_1.userArray[i].getUsername()) {
                main_1.userArray[i].socket.emit("defisRefusé");
                res.send(true);
                return;
            }
        }
        res.send(false);
    }
    yesDefi(req, res) {
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (req.body.pseudoDefi === main_1.userArray[i].getUsername()) {
                main_1.userArray[i].socket.emit("defisAccepté");
                break;
            }
        }
        let y = 0;
        for (y = 0; y < main_1.userArray.length; y++) {
            if (req.body.clientId === main_1.userArray[y].socket.id) {
                main_1.userArray[y].socket.emit("defisAccepté");
                break;
            }
        }
        main_1.userArray[i].setWinHeight(req.body.winHeight);
        main_1.userArray[i].setWinWidht(req.body.winWidth);
        main_1.userArray[y].setWinHeight(req.body.winHeight);
        main_1.userArray[y].setWinWidht(req.body.winWidth);
        main_1.userArray[i].setOppenent(main_1.userArray[y]);
        main_1.userArray[y].setOppenent(main_1.userArray[i]);
        main_1.userArray[y].setQueue(false);
        main_1.userArray[i].setQueue(false);
        main_1.userArray[i].socket.emit("matchFound", 1);
        main_1.userArray[y].socket.emit("matchFound", 2);
        main_1.userArray[i].setValue(-1);
        main_1.userArray[i].setupValue();
        main_1.userArray[i].setPlayer(2);
        main_1.userArray[i].getOppenent().setPlayer(1);
        main_1.userArray[y].setValue(1);
        main_1.userArray[y].setupValue();
        main_1.userArray[y].setPlayer(1);
        main_1.userArray[y].getOppenent().setPlayer(2);
        main_1.userArray[i].setIsInGane(true);
        main_1.userArray[i].getOppenent().setIsInGane(true);
        main_1.userArray[y].setIsInGane(true);
        main_1.userArray[y].getOppenent().setIsInGane(true);
        main_1.userArray[i].balleCalc();
        main_1.userArray[y].balleCalc();
        res.send("Parce que c'est comme dans Harry Potter enfaite !");
        return;
    }
    defi(req, res) {
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (req.body.user === main_1.userArray[i].getUsername()) {
                for (let y = 0; y < main_1.userArray.length; y++) {
                    if (req.body.clientId === main_1.userArray[y].socket.id) {
                        let user = main_1.userArray[y].getUsername();
                        main_1.userArray[i].socket.emit("demandeDefi", user);
                        res.send(true);
                        return;
                    }
                }
            }
        }
        res.send(false);
        return;
    }
    async pos(req, res) {
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (req.body.clientId === main_1.userArray[i].socket.id)
                break;
        }
        if (i >= main_1.userArray.length) {
            res.send("Parce que c'est comme dans Harry Potter enfaite !");
            return;
        }
        if (main_1.userArray[i].getIsInGame() === true) {
            let y = 0;
            for (y = 0; y < main_1.userArray.length; y++) {
                if (main_1.userArray[i].getOppenent().socket.id === main_1.userArray[y].socket.id)
                    break;
            }
            main_1.userArray[i].setPositionBarVer(req.body.newPosition);
            main_1.userArray[y].getOppenent().setPositionBarVer(req.body.newPosition);
            main_1.userArray[y].socket.emit("barVS", main_1.userArray[i].getPositionBarVer());
            res.send("Parce que c'est comme dans Harry Potter enfaite !");
        }
        else if (main_1.userArray[i].getIsInGame() === false && main_1.userArray[i].getOpTmp().getUsername() !== "") {
            main_1.userArray[i].getDataUser().setWinRatio(1, 0);
            main_1.userArray[i].getDataUser().setProgressBar(25);
            let tmp = main_1.userArray[i].getDataUser().getPP();
            main_1.userArray[i].getDataUser().setHistorique(main_1.userArray[i].getScore(), main_1.userArray[i].getOpTmp().getScore(), main_1.userArray[i].getDataUser().getPP(), main_1.userArray[i].getOpTmp().getUsername(), main_1.userArray[i].getOpTmp().getPP(), "gagné", main_1.userArray[i].getOpTmp().getImage());
            main_1.userArray[i].getDataUser().calcPPW(main_1.userArray[i].getDataUser().getPP(), main_1.userArray[i].getOpTmp().getPP());
            main_1.userArray[i].getDataUser().setGameCount();
            main_1.userArray[i].socket.emit("end", main_1.userArray[i].getPlayer(), main_1.userArray[i].getScore(), main_1.userArray[i].getOpTmp().getScore(), main_1.userArray[i].getDataUser(), main_1.userArray[i].getDataUser().getHistorique());
            main_1.userArray[i].setOppenent(undefined);
            main_1.leaderboard.setLadderData(this.userService, main_1.userArray[i].getDataUser().getPseudo(), main_1.userArray[i].getDataUser().toUser());
            res.send("Parce que c'est comme dans Harry Potter enfaite !");
        }
    }
    matching(req, res) {
        if (main_1.userArray.length <= 1) {
            main_1.userArray[0].setQueue(true);
            res.send("Parce que c'est comme dans Harry Potter enfaite !");
            return;
        }
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (req.body.clientId === main_1.userArray[i].socket.id)
                break;
        }
        if (i >= main_1.userArray.length) {
            res.send("Parce que c'est comme dans Harry Potter enfaite !");
            return;
        }
        let y = 0;
        for (y = 0; y < main_1.userArray.length; y++) {
            if (main_1.userArray[y].getQueue() === true && y != i) {
                main_1.userArray[i].setWinHeight(req.body.winHeight);
                main_1.userArray[i].setWinWidht(req.body.winWidth);
                main_1.userArray[y].setWinHeight(req.body.winHeight);
                main_1.userArray[y].setWinWidht(req.body.winWidth);
                main_1.userArray[i].setOppenent(main_1.userArray[y]);
                main_1.userArray[y].setOppenent(main_1.userArray[i]);
                main_1.userArray[y].setQueue(false);
                main_1.userArray[i].setQueue(false);
                main_1.userArray[i].socket.emit("matchFound", 1);
                main_1.userArray[y].socket.emit("matchFound", 2);
                main_1.userArray[i].setValue(-1);
                main_1.userArray[i].setupValue();
                main_1.userArray[i].setPlayer(2);
                main_1.userArray[i].getOppenent().setPlayer(1);
                main_1.userArray[y].setValue(1);
                main_1.userArray[y].setupValue();
                main_1.userArray[y].setPlayer(1);
                main_1.userArray[y].getOppenent().setPlayer(2);
                main_1.userArray[i].setIsInGane(true);
                main_1.userArray[i].getOppenent().setIsInGane(true);
                main_1.userArray[y].setIsInGane(true);
                main_1.userArray[y].getOppenent().setIsInGane(true);
                main_1.userArray[i].balleCalc();
                main_1.userArray[y].balleCalc();
                res.send("Parce que c'est comme dans Harry Potter enfaite !");
                return;
            }
        }
        main_1.userArray[i].setQueue(true);
        res.send("Parce que c'est comme dans Harry Potter enfaite !");
    }
    async balle(req, res) {
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (req.body.clientId === main_1.userArray[i].socket.id)
                break;
        }
        if (i >= main_1.userArray.length) {
            res.send("Parce que c'est comme dans Harry Potter enfaite !");
            return;
        }
        if ((main_1.userArray[i].getIsInGame() === false && main_1.userArray[i].getOpTmp().getUsername() !== "")) {
            main_1.userArray[i].getDataUser().setWinRatio(1, 0);
            main_1.userArray[i].getDataUser().setProgressBar(25);
            let tmp = main_1.userArray[i].getDataUser().getPP();
            main_1.userArray[i].getDataUser().setHistorique(main_1.userArray[i].getScore(), main_1.userArray[i].getOpTmp().getScore(), main_1.userArray[i].getDataUser().getPP(), main_1.userArray[i].getOpTmp().getUsername(), main_1.userArray[i].getOpTmp().getPP(), "gagné", main_1.userArray[i].getOpTmp().getImage());
            main_1.userArray[i].getDataUser().calcPPW(main_1.userArray[i].getDataUser().getPP(), main_1.userArray[i].getOpTmp().getPP());
            main_1.userArray[i].getDataUser().setGameCount();
            main_1.userArray[i].socket.emit("end", main_1.userArray[i].getPlayer(), main_1.userArray[i].getScore(), main_1.userArray[i].getOpTmp().getScore(), main_1.userArray[i].getDataUser(), main_1.userArray[i].getDataUser().getHistorique());
            main_1.userArray[i].setOppenent(undefined);
            main_1.userArray[i].getOpTmp().setValue("", 0, "", 0);
            main_1.leaderboard.setLadderData(this.userService, main_1.userArray[i].getDataUser().getPseudo(), main_1.userArray[i].getDataUser().toUser());
            res.send("Parce que c'est comme dans Harry Potter enfaite !");
            return;
        }
        else if (main_1.userArray[i].getIsInGame() === false && main_1.userArray[i].getOpTmp().getUsername() === "") {
            return;
        }
        let y = 0;
        for (y = 0; y < main_1.userArray.length; y++) {
            if (main_1.userArray[i].getOppenent().socket.id === main_1.userArray[y].socket.id)
                break;
        }
        main_1.userArray[i].getDataUser().setPadColor(req.body.padColor);
        if ((main_1.userArray[i].getPositionHorOfBalle() < 0)) {
            let win = (main_1.userArray[i].getPositionHorOfBalle() > (((main_1.userArray[i].getWinWidht() / 2.09) / main_1.userArray[i].getWinWidht()) * 100) ? false : true);
            if (win === true) {
                main_1.userArray[i].getOppenent().setScore(main_1.userArray[i].getOppenent().getScore() + 1);
                main_1.userArray[i].socket.emit("scoreUpdate", main_1.userArray[i].getScore(), main_1.userArray[i].getOppenent().getScore());
                main_1.userArray[i].getOppenent().socket.emit("scoreUpdate", main_1.userArray[i].getOppenent().getScore(), main_1.userArray[i].getScore());
            }
            main_1.userArray[i].getPlayer() === 1 ? (main_1.userArray[i].setValue(1), main_1.userArray[y].setValue(-1)) : (main_1.userArray[i].setValue(1), main_1.userArray[y].setValue(-1));
            main_1.userArray[i].setupValue();
            main_1.userArray[y].setupValue();
            main_1.userArray[i].socket.emit("restart", main_1.userArray[i].getPositionBarVer(), main_1.userArray[i].getOppenent().getPositionBarVer());
            main_1.userArray[y].socket.emit("restart", main_1.userArray[y].getPositionBarVer(), main_1.userArray[y].getOppenent().getPositionBarVer());
        }
        if (main_1.userArray[i].getScore() >= main_1.userArray[i].getWinCondition()) {
            main_1.userArray[i].getDataUser().setWinRatio(1, 0);
            main_1.userArray[y].getDataUser().setWinRatio(0, 1);
            main_1.userArray[i].getDataUser().setProgressBar(25);
            main_1.userArray[y].getDataUser().setProgressBar(5);
            let tmp = main_1.userArray[i].getDataUser().getPP();
            main_1.userArray[i].getDataUser().setHistorique(main_1.userArray[i].getScore(), main_1.userArray[y].getScore(), main_1.userArray[i].getDataUser().getPP(), main_1.userArray[y].getDataUser().getPseudo(), main_1.userArray[y].getDataUser().getPP(), "gagné", main_1.userArray[y].getDataUser().getImage());
            main_1.userArray[y].getDataUser().setHistorique(main_1.userArray[y].getScore(), main_1.userArray[i].getScore(), main_1.userArray[y].getDataUser().getPP(), main_1.userArray[i].getDataUser().getPseudo(), main_1.userArray[i].getDataUser().getPP(), "perdu", main_1.userArray[i].getDataUser().getImage());
            main_1.userArray[i].getDataUser().calcPPW(main_1.userArray[i].getDataUser().getPP(), main_1.userArray[y].getDataUser().getPP());
            main_1.userArray[y].getDataUser().calcPPL(main_1.userArray[y].getDataUser().getPP(), tmp);
            main_1.userArray[i].getDataUser().setGameCount();
            main_1.userArray[y].getDataUser().setGameCount();
            main_1.userArray[i].socket.emit("end", main_1.userArray[i].getPlayer(), main_1.userArray[i].getScore(), main_1.userArray[y].getScore(), main_1.userArray[i].getDataUser(), main_1.userArray[i].getDataUser().getHistorique());
            main_1.userArray[y].socket.emit("end", main_1.userArray[i].getPlayer(), main_1.userArray[y].getScore(), main_1.userArray[i].getScore(), main_1.userArray[y].getDataUser(), main_1.userArray[y].getDataUser().getHistorique());
            main_1.userArray[i].setScore(0);
            main_1.userArray[i].getOppenent().setScore(0);
            main_1.userArray[y].setScore(0);
            main_1.userArray[y].getOppenent().setScore(0);
            main_1.userArray[i].setIsInGane(false);
            main_1.userArray[y].setIsInGane(false);
            main_1.userArray[i].setOppenent(undefined);
            main_1.userArray[y].setOppenent(undefined);
            main_1.leaderboard.setLadderData(this.userService, main_1.userArray[i].getDataUser().getPseudo(), main_1.userArray[i].getDataUser().toUser());
            main_1.leaderboard.setLadderData(this.userService, main_1.userArray[y].getDataUser().getPseudo(), main_1.userArray[y].getDataUser().toUser());
        }
        main_1.userArray[i].socket.emit("balle", main_1.userArray[i].getPositionHorOfBalle(), main_1.userArray[i].getPositionVerOfBalle(), main_1.userArray[y].getDataUser().getPadColor());
        main_1.userArray[y].socket.emit("balle", main_1.userArray[y].getPositionHorOfBalle(), main_1.userArray[y].getPositionVerOfBalle(), main_1.userArray[i].getDataUser().getPadColor());
        res.send("Parce que c'est comme dans Harry Potter enfaite !");
    }
    responsive(req, res) {
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (req.body.clientId === main_1.userArray[i].socket.id)
                break;
        }
        if (i >= main_1.userArray.length) {
            res.send("Parce que c'est comme dans Harry Potter enfaite !");
            return;
        }
        main_1.userArray[i].setWinHeight(req.body.winHeight);
        main_1.userArray[i].setWinWidht(req.body.winWidth);
        res.send("Parce que c'est comme dans Harry Potter enfaite !");
    }
    ladder(req, res) {
        res.send(main_1.leaderboard.getLadderData());
    }
    image(req, res) {
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (req.body.clientId === main_1.userArray[i].socket.id)
                break;
        }
        main_1.userArray[i].getDataUser().setImage(req.body.valueImage);
        res.send("Parce que c'est comme dans Harry Potter enfaite !");
    }
    padColor(req, res) {
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (req.body.clientId === main_1.userArray[i].socket.id)
                break;
        }
        main_1.userArray[i].getDataUser().setPadColor(req.body.padColor);
        res.send("Parce que c'est comme dans Harry Potter enfaite !");
    }
    balleColor(req, res) {
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (req.body.clientId === main_1.userArray[i].socket.id)
                break;
        }
        main_1.userArray[i].getDataUser().setBalleColor(req.body.balleColor);
        res.send("Parce que c'est comme dans Harry Potter enfaite !");
    }
    async codeGen(req, res) {
        let tmp = 0;
        tmp = Math.floor(1000 + Math.random() * 9000);
        exports.code = tmp.toString();
        await (this.mailService.sendEmail(req.body.email, 'Code de verification', exports.code));
        res.send("Parce que c'est comme dans Harry Potter enfaite !");
    }
    codeVerif(req, res) {
        if (req.body.code === exports.code) {
            let i = 0;
            for (i = 0; i < main_1.userArray.length; i++) {
                if (req.body.clientId === main_1.userArray[i].socket.id)
                    break;
            }
            main_1.userArray[i].getDataUser().setEmail(req.body.email);
            main_1.userArray[i].getDataUser().setDeuxFap(true);
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
    async pseudoChange(req, res) {
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (req.body.clientId === main_1.userArray[i].socket.id)
                break;
        }
        const user = await (this.userService.findAll());
        let y = 0;
        for (y = 0; y < user.length; y++) {
            if (req.body.pseudoChange === user[y].username) {
                res.send("Pseudo déjà prit ! Choisis autre chose.");
                return;
            }
        }
        main_1.userArray[i].getDataUser().setPseudo(req.body.pseudoChange);
        res.send("Pseudo changé !");
    }
    async isFirstLog(req, res) {
        const users = await (this.userService.findAll());
        for (let i = 0; i < users.length; i++) {
            if (users[i].login === req.body.username) {
                res.send(users[i].username);
                return;
            }
        }
        res.send("");
    }
    async isNameTaken(req, res) {
        for (let i = 0; i < main_1.userArray.length; i++) {
            if (main_1.userArray[i].getUsername() === req.body.choixPseudo) {
                res.send(false);
                return;
            }
        }
        const users = await (this.userService.findAll());
        for (let i = 0; i < users.length; i++) {
            if (users[i].login === req.body.choixPseudo) {
                res.send(false);
                return;
            }
        }
        res.send(true);
    }
};
__decorate([
    (0, common_1.Post)('noDefi'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppPosController.prototype, "noDefi", null);
__decorate([
    (0, common_1.Post)('yesDefi'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppPosController.prototype, "yesDefi", null);
__decorate([
    (0, common_1.Post)('defi'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppPosController.prototype, "defi", null);
__decorate([
    (0, common_1.Post)('pos'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppPosController.prototype, "pos", null);
__decorate([
    (0, common_1.Post)('matching'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppPosController.prototype, "matching", null);
__decorate([
    (0, common_1.Post)('balle'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppPosController.prototype, "balle", null);
__decorate([
    (0, common_1.Post)('responsive'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppPosController.prototype, "responsive", null);
__decorate([
    (0, common_1.Post)('ladder'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppPosController.prototype, "ladder", null);
__decorate([
    (0, common_1.Post)('image'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppPosController.prototype, "image", null);
__decorate([
    (0, common_1.Post)('padColor'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppPosController.prototype, "padColor", null);
__decorate([
    (0, common_1.Post)('balleColor'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppPosController.prototype, "balleColor", null);
__decorate([
    (0, common_1.Post)('codeGen'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppPosController.prototype, "codeGen", null);
__decorate([
    (0, common_1.Post)('codeVerif'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppPosController.prototype, "codeVerif", null);
__decorate([
    (0, common_1.Post)('pseudoChange'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppPosController.prototype, "pseudoChange", null);
__decorate([
    (0, common_1.Post)('isFirstLog'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppPosController.prototype, "isFirstLog", null);
__decorate([
    (0, common_1.Post)('isNameTaken'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppPosController.prototype, "isNameTaken", null);
exports.AppPosController = AppPosController = __decorate([
    (0, common_1.Controller)('game'),
    __param(0, (0, common_1.Inject)(game_gateway_1.EventsGateway)),
    __metadata("design:paramtypes", [game_gateway_1.EventsGateway,
        user_service_1.UserService,
        mail_service_1.MailService])
], AppPosController);
let AppController = exports.AppController = class AppController {
    constructor(eventsGateway, userService, mailService, api42Service) {
        this.eventsGateway = eventsGateway;
        this.userService = userService;
        this.mailService = mailService;
        this.api42Service = api42Service;
    }
    login42config(session) {
        const baseURL = 'https://api.intra.42.fr/oauth/authorize';
        const clientId = 'u-s4t2ud-f11e6dce2420f595159033526a8ba446ca45388a2466b8ad0db1cebbc694bcb9';
        const redirectUri = 'http://' + main_2.serverIP + ':3001/auth/callback';
        return { baseURL, clientId, redirectUri };
    }
    async handleCallback(code, response) {
        const token = await (this.api42Service.getAccessTokenFromCode(code));
        const userProfile = await (this.api42Service.getUserInfo(token));
        const user = await (this.userService.findOne(userProfile.login));
        if (user != undefined) {
            if (user.doubleFap === true) {
                let tmp = 0;
                let code;
                let userN;
                tmp = Math.floor(1000 + Math.random() * 9000);
                code = tmp.toString();
                userN = userProfile.login;
                await (this.mailService.sendEmail(user.email, 'Code de verification', code));
                main_1.userPendingArray.push(new user_1.userPending(userN, code));
                response.redirect(`http://${main_2.serverIP}:3000/?userCode=${code}&loginCodeVerif=${userProfile.login}&imageCodeVerif=${userProfile.image.versions.medium}`);
                return;
            }
        }
        response.redirect(`http://${main_2.serverIP}:3000/?login=${userProfile.login}&image=${userProfile.image.versions.medium}`);
    }
};
__decorate([
    (0, common_1.Get)('login42config'),
    __param(0, (0, common_2.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login42config", null);
__decorate([
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "handleCallback", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)(game_gateway_1.EventsGateway)),
    __metadata("design:paramtypes", [game_gateway_1.EventsGateway,
        user_service_1.UserService,
        mail_service_1.MailService,
        api42_service_1.Api42Service])
], AppController);
let AppChatController = exports.AppChatController = class AppChatController {
    constructor(eventsGateway, userService, mailService) {
        this.eventsGateway = eventsGateway;
        this.userService = userService;
        this.mailService = mailService;
        this.blocked = false;
    }
    async fetchFriendData(req, res) {
        const users = await (this.userService.findAll());
        for (let i = 0; i < users.length; i++) {
            if (req.body.popoverUser === users[i].username) {
                for (let y = 0; y < main_1.userArray.length; y++) {
                    if (req.body.clientId === main_1.userArray[y].socket.id) {
                        main_1.userArray[y].getFriendDataTmp().fetchUser(users[i]);
                        main_1.userArray[y].socket.emit("friendFetch", req.body.popoverUser, main_1.userArray[y].getFriendDataTmp());
                        res.send("succed");
                        return;
                    }
                }
            }
        }
        res.send("failed");
    }
    async friendImage(req, res) {
        const users = await (this.userService.findAll());
        for (let i = 0; i < users.length; i++) {
            if (req.body.friend === users[i].username) {
                for (let y = 0; y < main_1.userArray.length; y++) {
                    if (req.body.friend === main_1.userArray[y].getDataUser().getPseudo()) {
                        if (main_1.userArray[y].getIsInGame() === true) {
                            let tmp = [users[i].image, "en partie"];
                            res.send(tmp);
                            return;
                        }
                        else {
                            let tmp = [users[i].image, "en ligne"];
                            res.send(tmp);
                            return;
                        }
                    }
                }
                let tmp = [users[i].image, "hors ligne"];
                res.send(tmp);
                return;
            }
        }
        res.send("/defaultAvt.jpg");
    }
    submitMessage(req, res) {
        let user = req.body.user;
        let content = req.body.content;
        let channel;
        for (let i = 0; i < main_1.channels.length; i++)
            if (main_1.channels[i].getName() === req.body.channelName)
                channel = main_1.channels[i];
        if (!channel.getMuted().includes(user))
            channel.addMessage(new Message_1.default(user, content));
        else {
            res.send(false);
            return;
        }
        for (let i = 0; i < main_1.userArray.length; i++) {
            if (req.body.clientId !== main_1.userArray[i].socket.id) {
                if (channel.getMembers().includes(main_1.userArray[i].getUsername())) {
                    main_1.userArray[i].socket.emit('message', user, content, channel.getName());
                }
            }
        }
        res.send(true);
    }
    submitDM(req, res) {
        let user = req.body.user;
        let content = req.body.content;
        let channel;
        for (let i = 0; i < main_1.DMs.length; i++)
            if ((main_1.DMs[i].getUser1() === req.body.user && main_1.DMs[i].getUser2() === req.body.otherUser) || (main_1.DMs[i].getUser1() === req.body.otherUser && main_1.DMs[i].getUser2() === req.body.user))
                channel = main_1.DMs[i];
        channel.addMessage(new Message_1.default(user, content));
        for (let i = 0; i < main_1.userArray.length; i++) {
            if (req.body.clientId !== main_1.userArray[i].socket.id) {
                if (main_1.userArray[i].getUsername() === req.body.otherUser) {
                    main_1.userArray[i].socket.emit('directMessage', user, content);
                }
            }
        }
        res.send(true);
    }
    channel(req, res) {
        let chan;
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                if (main_1.channels[i].getType() !== req.body.channelType) {
                    let message = '';
                    if (main_1.channels[i].getType() === 'public')
                        message = "Mais enfin ? C'est un channel public !";
                    else if (main_1.channels[i].getType() === 'private')
                        message = "Mais enfin ? C'est un channel privé !";
                    else
                        message = "Mais enfin ? Il faut un mot de passe !";
                    res.send([false, message]);
                    return;
                }
                if (main_1.channels[i].getType() === 'private' && !main_1.channels[i].getInvited().includes(req.body.user))
                    res.send([false, "Mais enfin ? T'es pas invité !"]);
                else if (main_1.channels[i].getBanned().includes(req.body.user))
                    res.send([false, "Mais enfin ? T'es ban !"]);
                else if (main_1.channels[i].getPassword() !== req.body.channelPassword)
                    res.send([false, "Mais enfin ? T'as pas le bon mot de passe !"]);
                else {
                    main_1.channels[i].addMember(req.body.user);
                    res.send([true, main_1.channels[i]]);
                }
                return;
            }
        }
        chan = new Channel_1.default(req.body.channelName, req.body.channelType, req.body.user, req.body.channelPassword);
        main_1.channels.push(chan);
        res.send([true, chan]);
    }
    dm(req, res) {
        let dm;
        dm = new DM_1.default(req.body.user, req.body.other);
        main_1.DMs.push(dm);
        for (let i = 0; i < main_1.userArray.length; i++) {
            if (main_1.userArray[i].getUsername() === req.body.other)
                main_1.userArray[i].socket.emit('dm', dm);
        }
        res.send(dm);
    }
    kick(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        if (!main_1.channels[i].getAdmins().includes(main_1.userArray[j].getUsername())) {
                            res.send([false, "Vous n'êtes pas un admin !"]);
                            return;
                        }
                    }
                }
                if (main_1.channels[i].getOwner() !== req.body.user) {
                    if (main_1.channels[i].getMembers().includes(req.body.user)) {
                        for (let j = 0; j < main_1.userArray.length; j++) {
                            if (main_1.userArray[j].getUsername() === req.body.user) {
                                if (main_1.userArray[j].socket.id === req.body.clientId) {
                                    res.send([false, "Vous ne pouvez pas vous kick vous même !"]);
                                    return;
                                }
                                main_1.userArray[j].socket.emit('kick', req.body.channelName);
                            }
                        }
                        main_1.channels[i].removeMember(req.body.user);
                        res.send([true, ""]);
                    }
                    else
                        res.send([false, "L'utilisateur n'est pas dans le channel !"]);
                }
                else
                    res.send([false, "Vous ne pouvez pas kick le propriétaire !"]);
                return;
            }
        }
        res.send([true, '']);
    }
    ban(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        if (!main_1.channels[i].getAdmins().includes(main_1.userArray[j].getUsername())) {
                            res.send([false, "Vous n'êtes pas un admin !"]);
                            return;
                        }
                    }
                }
                if (main_1.channels[i].getOwner() !== req.body.user) {
                    if (main_1.channels[i].getMembers().includes(req.body.user)) {
                        for (let j = 0; j < main_1.userArray.length; j++) {
                            if (main_1.userArray[j].getUsername() === req.body.user) {
                                if (main_1.userArray[j].socket.id === req.body.clientId) {
                                    res.send([false, "Vous ne pouvez pas vous bannir vous même !"]);
                                    return;
                                }
                                main_1.userArray[j].socket.emit('kick', req.body.channelName);
                            }
                        }
                        main_1.channels[i].banMember(req.body.user);
                        res.send([true, ""]);
                    }
                    else
                        res.send([false, "L'utilisateur n'est pas dans le channel"]);
                }
                else
                    res.send([false, "Vous ne pouvez pas bannir le propriétaire !"]);
                return;
            }
        }
        res.send([true, '']);
    }
    admin(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        if (!main_1.channels[i].getAdmins().includes(main_1.userArray[j].getUsername())) {
                            res.send([false, "Vous n'êtes pas un admin !"]);
                            return;
                        }
                    }
                }
                if (!main_1.channels[i].getAdmins().includes(req.body.user)) {
                    if (main_1.channels[i].getMembers().includes(req.body.user)) {
                        main_1.channels[i].addAdmin(req.body.user);
                        res.send([true, ""]);
                    }
                    else
                        res.send([false, "L'utilisateur n'est pas dans le channel"]);
                }
                else
                    res.send([false, "L'utilisateur est déjà admin !"]);
                return;
            }
        }
    }
    unadmin(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        if (!main_1.channels[i].getAdmins().includes(main_1.userArray[j].getUsername())) {
                            res.send([false, "Vous n'êtes pas un admin !"]);
                            return;
                        }
                    }
                }
                if (main_1.channels[i].getOwner() !== req.body.user) {
                    if (main_1.channels[i].getMembers().includes(req.body.user)) {
                        for (let j = 0; j < main_1.userArray.length; j++) {
                            if (main_1.userArray[j].getUsername() === req.body.user) {
                                if (main_1.userArray[j].socket.id === req.body.clientId) {
                                    res.send([false, "Vous ne pouvez pas vous enlever des admins vous même !"]);
                                    return;
                                }
                            }
                        }
                        if (main_1.channels[i].getAdmins().includes(req.body.user)) {
                            main_1.channels[i].removeAdmin(req.body.user);
                            res.send([true, ""]);
                        }
                        else
                            res.send([false, "L'utilisateur n'est pas admin !"]);
                    }
                    else
                        res.send([false, "L'utilisateur n'est pas dans le channel"]);
                }
                else
                    res.send([false, "Vous ne pouvez pas enlever le propriétaire des admins !"]);
                return;
            }
        }
        res.send([true, '']);
    }
    mute(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        if (!main_1.channels[i].getAdmins().includes(main_1.userArray[j].getUsername())) {
                            res.send([false, "Vous n'êtes pas un admin !"]);
                            return;
                        }
                    }
                }
                if (main_1.channels[i].getOwner() !== req.body.user) {
                    if (main_1.channels[i].getMembers().includes(req.body.user)) {
                        for (let j = 0; j < main_1.userArray.length; j++) {
                            if (main_1.userArray[j].getUsername() === req.body.user) {
                                if (main_1.userArray[j].socket.id === req.body.clientId) {
                                    res.send([false, "Vous ne pouvez pas vous mute vous même !"]);
                                    return;
                                }
                            }
                        }
                        if (!main_1.channels[i].getMuted().includes(req.body.user)) {
                            main_1.channels[i].muteMember(req.body.user);
                            res.send([true, ""]);
                        }
                        else
                            res.send([false, "L'utilisateur est déjà mute !"]);
                    }
                    else
                        res.send([false, "L'utilisateur n'est pas dans le channel"]);
                }
                else
                    res.send([false, "Vous ne pouvez pas mute le propriétaire !"]);
                return;
            }
        }
        res.send([true, '']);
    }
    unmute(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        if (!main_1.channels[i].getAdmins().includes(main_1.userArray[j].getUsername())) {
                            res.send([false, "Vous n'êtes pas un admin !"]);
                            return;
                        }
                    }
                }
                if (main_1.channels[i].getOwner() !== req.body.user) {
                    if (main_1.channels[i].getMembers().includes(req.body.user)) {
                        for (let j = 0; j < main_1.userArray.length; j++) {
                            if (main_1.userArray[j].getUsername() === req.body.user) {
                                if (main_1.userArray[j].socket.id === req.body.clientId) {
                                    res.send([false, "Vous ne pouvez pas vous unmute vous même !"]);
                                    return;
                                }
                            }
                        }
                        if (main_1.channels[i].getMuted().includes(req.body.user)) {
                            main_1.channels[i].unMuteMember(req.body.user);
                            res.send([true, ""]);
                        }
                        else
                            res.send([false, "L'utilisateur n'est pas mute !"]);
                    }
                    else
                        res.send([false, "L'utilisateur n'est pas dans le channel"]);
                }
                else
                    res.send([false, "L'utilisateur n'est pas mute !"]);
                return;
            }
        }
        res.send([true, '']);
    }
    pass(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        if (main_1.userArray[j].getUsername() !== main_1.channels[i].getOwner()) {
                            res.send([false, "Vous n'êtes pas le propriétaire !"]);
                            return;
                        }
                    }
                }
                main_1.channels[i].setPassword(req.body.password);
                main_1.channels[i].setType('protected');
            }
        }
        res.send([true, '']);
    }
    rmpass(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        if (main_1.userArray[j].getUsername() !== main_1.channels[i].getOwner()) {
                            res.send([false, "Vous n'êtes pas le propriétaire !"]);
                            return;
                        }
                    }
                }
                main_1.channels[i].setPassword('');
                main_1.channels[i].setType('public');
            }
        }
        res.send([true, '']);
    }
    quit(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        main_1.channels[i].removeMember(main_1.userArray[j].getUsername());
                    }
                }
            }
        }
        res.send('');
    }
    invite(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                if (main_1.channels[i].getType() !== 'private') {
                    res.send([false, "Le channel n'est pas privé !"]);
                    return;
                }
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        if (!main_1.channels[i].getAdmins().includes(main_1.userArray[j].getUsername())) {
                            res.send([false, "Vous n'êtes pas un admin !"]);
                            return;
                        }
                    }
                }
                if (!main_1.channels[i].getMembers().includes(req.body.user)) {
                    if (!main_1.channels[i].getInvited().includes(req.body.user)) {
                        main_1.channels[i].inviteMember(req.body.user);
                        res.send([true, ""]);
                    }
                    else
                        res.send([false, "L'utilisateur est déjà invité !"]);
                }
                else
                    res.send([false, "L'utilisateur est déjà dans le channel !"]);
            }
            return;
        }
        res.send([true, '']);
    }
    uninvite(req, res) {
        for (let i = 0; i < main_1.channels.length; i++) {
            if (main_1.channels[i].getName() === req.body.channelName) {
                if (main_1.channels[i].getType() !== 'private') {
                    res.send([false, "Le channel n'est pas privé !"]);
                    return;
                }
                for (let j = 0; j < main_1.userArray.length; j++) {
                    if (main_1.userArray[j].socket.id === req.body.clientId) {
                        if (!main_1.channels[i].getAdmins().includes(main_1.userArray[j].getUsername())) {
                            res.send([false, "Vous n'êtes pas un admin !"]);
                            return;
                        }
                    }
                }
                if (!main_1.channels[i].getMembers().includes(req.body.user)) {
                    if (main_1.channels[i].getInvited().includes(req.body.user)) {
                        main_1.channels[i].uninviteMember(req.body.user);
                        res.send([true, ""]);
                    }
                    else
                        res.send([false, "L'utilisateur n'est pas invité !"]);
                }
                else
                    res.send([false, "L'utilisateur est déjà dans le channel ! (pour le kick, utilisez la commande !kick)"]);
            }
            return;
        }
        res.send([true, '']);
    }
    unblock(req, res) {
        for (let i = 0; i < main_1.userArray.length; i++) {
            if (main_1.userArray[i].socket.id === req.body.clientId)
                main_1.userArray[i].getDataUser().unblock(req.body.user);
        }
    }
    block(req, res) {
        for (let i = 0; i < main_1.userArray.length; i++) {
            if (main_1.userArray[i].socket.id === req.body.clientId)
                main_1.userArray[i].getDataUser().block(req.body.user);
        }
    }
    unfriend(req, res) {
        let senderName;
        for (let i = 0; i < main_1.userArray.length; i++) {
            if (main_1.userArray[i].socket.id === req.body.clientId) {
                senderName = main_1.userArray[i].getUsername();
                main_1.userArray[i].getDataUser().unfriend(req.body.user);
            }
        }
        for (let i = 0; i < main_1.userArray.length; i++) {
            if (main_1.userArray[i].getUsername() === req.body.user) {
                main_1.userArray[i].getDataUser().unfriend(senderName);
                main_1.userArray[i].socket.emit('unfriend', senderName);
            }
        }
        res.send('');
    }
    async friend(req, res) {
        let senderName;
        let x = 0;
        for (x = 0; x < main_1.userArray.length; x++) {
            if (main_1.userArray[x].socket.id === req.body.clientId) {
                senderName = main_1.userArray[x].getUsername();
                main_1.userArray[x].getDataUser().friend(req.body.user);
            }
        }
        let i = 0;
        for (i = 0; i < main_1.userArray.length; i++) {
            if (main_1.userArray[i].getUsername() === req.body.user) {
                main_1.userArray[i].getDataUser().friend(senderName);
                main_1.userArray[i].socket.emit('friend', [senderName, main_1.userArray[i].getDataUser().getImage()]);
            }
        }
        const users = await (this.userService.findAll());
        if (i === main_1.userArray.length) {
            for (let y = 0; y < users.length; y++) {
                if (users[i].username === req.body.user) {
                    await (this.userService.addFriend(users[i].username, main_1.userArray[x].getUsername()));
                }
            }
        }
        res.send('');
    }
    async isBlocked(req, res) {
        const users = await (this.userService.findAll());
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === req.body.other) {
                res.send(users[i].blocked.includes(req.body.user));
                return;
            }
        }
        res.send(false);
    }
    async getImage(req, res) {
        const users = await (this.userService.findAll());
        for (let i = 0; i < main_1.userArray.length; i++) {
            if (main_1.userArray[i].getUsername() === req.body.user) {
                if (main_1.userArray[i].getIsInGame() === true) {
                    let tmp = [main_1.userArray[i].getDataUser().getImage(), "en partie"];
                    res.send(tmp);
                    return;
                }
                else {
                    let tmp = [main_1.userArray[i].getDataUser().getImage(), "en ligne"];
                    res.send(tmp);
                    return;
                }
            }
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === req.body.user) {
                let tmp = [users[i].image, "hors ligne"];
                res.send(tmp);
                return;
            }
        }
        res.send("/defaultAvt.jpg");
    }
};
__decorate([
    (0, common_1.Post)('fetchFriendData'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppChatController.prototype, "fetchFriendData", null);
__decorate([
    (0, common_1.Post)('friendImage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppChatController.prototype, "friendImage", null);
__decorate([
    (0, common_1.Post)('submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "submitMessage", null);
__decorate([
    (0, common_1.Post)('submitDM'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "submitDM", null);
__decorate([
    (0, common_1.Post)('channel'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "channel", null);
__decorate([
    (0, common_1.Post)('dm'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "dm", null);
__decorate([
    (0, common_1.Post)('kick'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "kick", null);
__decorate([
    (0, common_1.Post)('ban'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "ban", null);
__decorate([
    (0, common_1.Post)('admin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "admin", null);
__decorate([
    (0, common_1.Post)('unadmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "unadmin", null);
__decorate([
    (0, common_1.Post)('mute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "mute", null);
__decorate([
    (0, common_1.Post)('unmute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "unmute", null);
__decorate([
    (0, common_1.Post)('pass'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "pass", null);
__decorate([
    (0, common_1.Post)('rmpass'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "rmpass", null);
__decorate([
    (0, common_1.Post)('quit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "quit", null);
__decorate([
    (0, common_1.Post)('invite'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "invite", null);
__decorate([
    (0, common_1.Post)('uninvite'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "uninvite", null);
__decorate([
    (0, common_1.Post)('unblock'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "unblock", null);
__decorate([
    (0, common_1.Post)('block'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "block", null);
__decorate([
    (0, common_1.Post)('unfriend'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppChatController.prototype, "unfriend", null);
__decorate([
    (0, common_1.Post)('friend'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppChatController.prototype, "friend", null);
__decorate([
    (0, common_1.Post)('isBlocked'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppChatController.prototype, "isBlocked", null);
__decorate([
    (0, common_1.Post)('getImage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppChatController.prototype, "getImage", null);
exports.AppChatController = AppChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __param(0, (0, common_1.Inject)(game_gateway_1.EventsGateway)),
    __metadata("design:paramtypes", [game_gateway_1.EventsGateway,
        user_service_1.UserService,
        mail_service_1.MailService])
], AppChatController);
//# sourceMappingURL=app.controller.js.map