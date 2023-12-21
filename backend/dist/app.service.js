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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const main_1 = require("./main");
const user_1 = require("./user");
const user_service_1 = require("./user.service");
const histo_service_1 = require("./histo.service");
let AppService = exports.AppService = class AppService {
    constructor(userService, historiqueService) {
        this.userService = userService;
        this.historiqueService = historiqueService;
    }
    getHello() {
        return 'Hello World!';
    }
    async handleLogin(socket, username, choixPseudo, defaultImage, bool) {
        let i = 0;
        while (i < main_1.userArray.length) {
            if (main_1.userArray[i].getDataUser().getLogin() === username) {
                socket.emit('dejaco');
                return;
            }
            i++;
        }
        if (bool === false) {
            defaultImage = "/defaultAvt.jpg";
        }
        main_1.userArray.push(new user_1.user({ sock: socket, login: username, username: choixPseudo, img: defaultImage, guest: bool }));
        main_1.userArray[i].setDataUser(choixPseudo, username, defaultImage, bool);
        const users = await this.userService.findAll();
        const historiques = await this.historiqueService.findAll();
        let n = 0;
        let y = 0;
        let x = 0;
        for (y = 0; y < users.length; y++) {
            if (username === users[y].login) {
                n = 1;
                main_1.userArray[i].getDataUser().fetchUser(users[y]);
                main_1.userArray[i].getDataUser().setId(users[y].id);
                let z = 0;
                for (x = 0; x < historiques.length; x++) {
                    if (username === historiques[x].login && z === historiques[x].index && bool === true) {
                        main_1.userArray[i].getDataUser().getHistoriqueIndex(z).fetchHistorique(historiques[x]);
                        z++;
                        x = 0;
                        if (z === 5) {
                            break;
                        }
                    }
                }
                break;
            }
        }
        if (y === users.length && n === 0 && bool === true) {
            await (this.userService.create(main_1.userArray[i].getDataUser().toUser()));
            for (let h = 0; h < 5; h++) {
                await (this.historiqueService.create(main_1.userArray[i].getDataUser().getHistoriqueIndex(h).toHistoriqueData(), h));
            }
            main_1.userArray[i].getDataUser().setId(y);
        }
        if (bool === true)
            main_1.leaderboard.setLadderData(this.userService, main_1.userArray[i].getDataUser().getPseudo(), main_1.userArray[i].getDataUser().toUser());
        main_1.userArray[i].socket.emit("creatUser", main_1.userArray[i].getDataUser().getPseudo(), main_1.userArray[i].getDataUser());
    }
    async handleDisconnect(client) {
        let i = 0;
        while (i < main_1.userArray.length) {
            if (main_1.userArray[i].socket.id === client.id)
                break;
            i++;
        }
        if (i >= main_1.userArray.length)
            return;
        if (main_1.userArray[i].getIsInGame() === true) {
            let y = 0;
            while (y < main_1.userArray.length) {
                if (main_1.userArray[y].socket.id === main_1.userArray[i].getOppenent().socket.id)
                    break;
                y++;
            }
            main_1.userArray[i].getDataUser().setGameCount();
            main_1.userArray[i].getDataUser().setWinRatio(0, 1);
            main_1.userArray[i].getDataUser().setProgressBar(5);
            main_1.userArray[i].getDataUser().setHistorique(main_1.userArray[i].getScore(), main_1.userArray[y].getScore(), main_1.userArray[i].getDataUser().getPP(), main_1.userArray[y].getUsername(), main_1.userArray[y].getDataUser().getPP(), "perdu", main_1.userArray[y].getDataUser().getImage());
            main_1.userArray[i].getDataUser().calcPPL(main_1.userArray[i].getDataUser().getPP(), main_1.userArray[y].getDataUser().getPP());
            main_1.userArray[y].getOpTmp().setValue(main_1.userArray[i].getUsername(), main_1.userArray[i].getScore(), main_1.userArray[i].getDataUser().getImage(), main_1.userArray[i].getDataUser().getPP());
            main_1.userArray[y].setIsInGane(false);
        }
        this.userService.updateUser(main_1.userArray[i].getDataUser().getLogin(), main_1.userArray[i].getDataUser().toUser());
        for (let y = 0; y < 5; y++) {
            await (this.historiqueService.updateHistoriqueByIndexAndUsername(y, main_1.userArray[i].getDataUser().getLogin(), main_1.userArray[i].getDataUser().getHistoriqueIndex(y).toHistoriqueData()));
        }
        main_1.userArray.splice(i, 1);
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        histo_service_1.HistoriqueService])
], AppService);
//# sourceMappingURL=app.service.js.map