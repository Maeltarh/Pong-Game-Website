"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPending = exports.Leaderboard = exports.ladderData = exports.user = exports.opTmp = exports.dataUser = exports.historique = exports.Vector = void 0;
class Vector {
    constructor(w, l) {
        this.w = w;
        this.l = l;
    }
    setW(value) {
        this.w = value;
    }
    getW() {
        return (this.w);
    }
    setL(value) {
        this.l = value;
    }
    getL() {
        return (this.l);
    }
}
exports.Vector = Vector;
class historique {
    constructor(login, username, myScore, hisScore, myPP, oppenent, hisPP, gain, result, opImage) {
        this.login = login;
        this.username = username;
        this.score = new Vector(myScore, hisScore);
        this.myPP = Math.round(myPP);
        this.oppenent = oppenent;
        this.oppenentImage = opImage;
        this.hisPP = Math.round(hisPP);
        this.gain = Math.round(gain);
        this.result = result;
    }
    toHistoriqueData() {
        return {
            login: this.login,
            username: this.username,
            scoreToi: this.score.getW(),
            scoreLui: this.score.getL(),
            myPP: this.myPP,
            oppenent: this.oppenent,
            oppenentImage: this.oppenentImage,
            hisPP: this.hisPP,
            gain: this.gain,
            result: this.result
        };
    }
    fetchHistorique(data) {
        this.login = data.login;
        this.username = data.username;
        this.score.setW(data.scoreToi);
        this.score.setL(data.scoreLui);
        this.myPP = data.myPP;
        this.oppenent = data.oppenent;
        this.oppenentImage = data.oppenentImage;
        this.hisPP = data.hisPP;
        this.gain = data.gain;
        this.result = data.result;
    }
    getUsername() {
        return (this.username);
    }
    getScore() {
        return (this.score);
    }
    getMyPP() {
        return this.myPP;
    }
    getOppenent() {
        return this.oppenent;
    }
    getOppenentImage() {
        return (this.oppenentImage);
    }
    getHisPP() {
        return this.hisPP;
    }
    getGain() {
        return this.gain;
    }
    getResult() {
        return this.result;
    }
}
exports.historique = historique;
class dataUser {
    constructor(login, pseudo, img, bool) {
        this.historiqueArray = [];
        this.blocked = [];
        this.friends = [];
        this.login = login;
        this.image = img;
        this.username = pseudo;
        this.guest = bool;
        this.deuxFap = false;
        this.email = '';
        this.lvl = 1;
        this.progressBar = 0;
        this.winRatio = new Vector(0, 0);
        this.PP = 1000;
        this.id = 0;
        this.idH = 0;
        this.gameCount = 0;
        this.padColor = "rgba(195, 171, 195, 0.989)";
        this.balleColor = "rgba(195, 171, 195, 0.989)";
        for (let i = 0; i < 5; i++) {
            let tmp = new historique(this.login, this.username, 0, 0, 0, "none", 0, 0, "none", "/defaultAvt.jpg");
            this.historiqueArray.push(tmp);
        }
    }
    toUser() {
        return {
            login: this.login,
            username: this.username,
            email: this.email,
            doubleFap: this.deuxFap,
            image: this.image,
            lvl: this.lvl,
            progressBar: this.progressBar,
            winRatioW: this.winRatio ? this.winRatio.getW() : null,
            winRatioL: this.winRatio ? this.winRatio.getL() : null,
            PP: this.PP,
            padColor: this.padColor,
            balleColor: this.balleColor,
            gameCount: this.gameCount,
            friends: this.friends,
            blocked: this.blocked,
        };
    }
    fetchUser(data) {
        this.login = data.login;
        this.username = data.username;
        this.email = data.email;
        this.deuxFap = data.doubleFap;
        this.image = data.image;
        this.lvl = data.lvl;
        this.progressBar = data.progressBar;
        this.winRatio.setW(data.winRatioW);
        this.winRatio.setL(data.winRatioL);
        this.PP = data.PP;
        this.padColor = data.padColor;
        this.balleColor = data.balleColor;
        this.gameCount = data.gameCount;
        this.friends = data.friends;
        this.blocked = data.blocked;
    }
    getGameCount() {
        return (this.gameCount);
    }
    setGameCount() {
        this.gameCount += 1;
    }
    getPadColor() {
        return (this.padColor);
    }
    setPadColor(value) {
        this.padColor = value;
    }
    getBalleColor() {
        return (this.balleColor);
    }
    setBalleColor(value) {
        this.balleColor = value;
    }
    setLogin(value) {
        this.login = value;
    }
    getLogin() {
        return (this.login);
    }
    setId(value) {
        this.id = value;
    }
    getId() {
        return (this.id);
    }
    setIdh(value) {
        this.idH = value;
    }
    getIdh() {
        return (this.idH);
    }
    setImage(value) {
        this.image = value;
    }
    getImage() {
        return (this.image);
    }
    setPseudo(value) {
        this.username = value;
    }
    getPseudo() {
        return (this.username);
    }
    setEmail(value) {
        this.email = value;
    }
    getEmail() {
        return (this.email);
    }
    setDeuxFap(value) {
        this.deuxFap = value;
    }
    getDeuxFap() {
        return (this.deuxFap);
    }
    setLvl(value) {
        this.lvl = value;
    }
    getLvl() {
        return (this.lvl);
    }
    setProgressBar(value) {
        this.progressBar += value;
        if (this.progressBar === 100) {
            this.lvl += 1;
            this.progressBar = 0;
        }
        else if (this.progressBar >= 100) {
            this.lvl += 1;
            this.progressBar -= 100;
        }
    }
    getProgressBar() {
        return (this.progressBar);
    }
    setWinRatio(valueW, valueL) {
        this.winRatio.setW(this.winRatio.getW() + valueW);
        this.winRatio.setL(this.winRatio.getL() + valueL);
    }
    getWinRatio() {
        return (this.winRatio);
    }
    calcPPW(valueToi, valueLui) {
        let result = 0;
        result = 150 * (valueLui / valueToi);
        this.gain = result;
        result = result - (result % 1);
        this.setPP(this.getPP() + result);
    }
    calcPPL(valueToi, valueLui) {
        let result = 0;
        result = -1 * (150 * (valueToi / valueLui));
        result = result - (result % 1);
        this.setPP(this.getPP() + result);
    }
    setPP(value) {
        this.PP = value;
    }
    getPP() {
        return (this.PP);
    }
    setHistorique(myScore, hisScore, myPP, oppenent, hisPP, result, opImage) {
        if (myPP === this.historiqueArray[4].getMyPP()) {
            return;
        }
        if (this.historiqueArray.length === 5) {
            this.historiqueArray.pop();
        }
        if (result === "gagné") {
            this.gain = 150 * (hisPP / myPP);
        }
        else {
            this.gain = -1 * (150 * (myPP / hisPP));
        }
        this.gain = this.gain - (this.gain % 1);
        let newHistorique = new historique(this.login, this.username, myScore, hisScore, myPP, oppenent, hisPP, this.gain, result, opImage);
        this.historiqueArray.unshift(newHistorique);
    }
    getHistorique() {
        return (this.historiqueArray);
    }
    getHistoriqueIndex(index) {
        return (this.historiqueArray[index]);
    }
    getBlocked() {
        return (this.blocked);
    }
    block(username) {
        if (!this.blocked.includes(username))
            this.blocked.push(username);
    }
    unblock(username) {
        if (this.blocked.includes(username))
            this.blocked.splice(this.blocked.indexOf(username), 1);
    }
    getFriends() {
        return (this.friends);
    }
    friend(username) {
        if (!this.friends.includes(username))
            this.friends.push(username);
    }
    unfriend(username) {
        if (this.friends.includes(username))
            this.friends.splice(this.friends.indexOf(username), 1);
    }
}
exports.dataUser = dataUser;
class opTmp {
    constructor(username, score, image, PP) {
        this.username = username;
        this.score = score;
        this.image = image;
        this.PP = PP;
    }
    setValue(username, score, image, PP) {
        this.username = username;
        this.score = score;
        this.image = image;
        this.PP = PP;
    }
    getUsername() {
        return (this.username);
    }
    getScore() {
        return (this.score);
    }
    getImage() {
        return (this.image);
    }
    getPP() {
        return (this.PP);
    }
}
exports.opTmp = opTmp;
class user {
    constructor(copyFrom) {
        if (copyFrom instanceof user) {
            this.socket = copyFrom.socket;
            this.login = copyFrom.login;
            this.username = copyFrom.username;
            this.img = copyFrom.img;
            this.isInGame = false;
            this.queue = false;
            this.score = 0;
            this.winCondition = 5;
            this.player = 0;
            this.dataUser = new dataUser(this.login, this.username, copyFrom.img, copyFrom.guest);
            this.friendDataTmp = new dataUser("", "", "", false);
            this.opTmp = new opTmp("", 0, "", 0);
        }
        else if (copyFrom) {
            this.socket = copyFrom.sock;
            this.login = copyFrom.login;
            this.username = copyFrom.username;
            this.img = copyFrom.img;
            this.isInGame = false;
            this.queue = false;
            this.score = 0;
            this.winCondition = 5;
            this.player = 0;
            this.dataUser = new dataUser(this.login, this.username, copyFrom.img, copyFrom.guest);
            this.friendDataTmp = new dataUser("", "", "", false);
            this.opTmp = new opTmp("", 0, "", 0);
        }
    }
    getOpTmp() {
        return (this.opTmp);
    }
    getFriendDataTmp() {
        return (this.friendDataTmp);
    }
    setDataUser(login, username, img, bool) {
        let newDataUser = new dataUser(login, username, img, bool);
    }
    getDataUser() {
        return (this.dataUser);
    }
    setLogin(value) {
        this.login = value;
    }
    getLogin() {
        return (this.login);
    }
    setUsername(value) {
        this.username = value;
    }
    getUsername() {
        return (this.username);
    }
    getQueue() {
        return (this.queue);
    }
    setQueue(bool) {
        this.queue = bool;
    }
    getOppenent() {
        return (this.oppenent);
    }
    setOppenent(oppenent) {
        this.oppenent = oppenent;
    }
    getScore() {
        return (this.score);
    }
    setScore(score) {
        this.score = score;
    }
    getWinHeight() {
        return (this.winHeight);
    }
    setWinHeight(value) {
        this.winHeight = value;
    }
    getWinWidht() {
        return (this.winWidht);
    }
    setWinWidht(value) {
        this.winWidht = value;
    }
    getPositionBarVer() {
        return (this.positionBarVer);
    }
    setPositionBarVer(value) {
        this.positionBarVer = value;
    }
    getPositionHorOfBalle() {
        return (this.positionHorOfBalle);
    }
    setPositionHorOfBalle(value) {
        this.positionHorOfBalle = value;
    }
    getPositionVerOfBalle() {
        return (this.positionVerOfBalle);
    }
    setPositionVerOfBalle(value) {
        this.positionVerOfBalle = value;
    }
    getAngOfBalle() {
        return (this.angOfBalle);
    }
    setAngOfBalle(value) {
        this.angOfBalle = value;
    }
    getDirOfBalle() {
        return (this.dirOfBalle);
    }
    setDirOfBalle(value) {
        this.dirOfBalle = value;
    }
    getPlayer() {
        return (this.player);
    }
    setPlayer(value) {
        this.player = value;
    }
    getWinCondition() {
        return (this.winCondition);
    }
    setWinCondition(value) {
        this.winCondition = value;
    }
    getIsInGame() {
        return (this.isInGame);
    }
    setIsInGane(value) {
        this.isInGame = value;
    }
    getValue() {
        return (this.value);
    }
    setValue(value) {
        this.value = value;
    }
    setupValue() {
        this.positionBarVer = (((this.winHeight / 2.5) / this.winHeight) * 100);
        this.oppenent.positionBarVer = (((this.winHeight / 2.5) / this.winHeight) * 100);
        this.positionVerOfBalle = (((this.winHeight / 2.09) / this.winHeight) * 100);
        this.positionHorOfBalle = (((this.winWidht / 2.0253) / this.winWidht) * 100);
        this.dirOfBalle = this.value;
        this.angOfBalle = 0;
    }
    balleCalc() {
        let positionBarHor = (((this.winWidht / 180) / this.winWidht) * 100);
        let positionVsBarHor = (((this.winWidht / 1.014) / this.winWidht) * 100);
        const processLogic = () => {
            if (this.isInGame !== true || this.oppenent.isInGame !== true) {
                clearInterval(intervalId);
                return;
            }
            if (((this.positionHorOfBalle - positionBarHor < 1) && ((this.positionVerOfBalle - this.positionBarVer > (((this.winHeight * -0.02) / this.winHeight) * 100))) && (this.positionVerOfBalle - this.positionBarVer < (((this.winHeight * 0.17) / this.winHeight) * 100)))) {
                this.dirOfBalle = this.dirOfBalle * -1;
                if (this.positionVerOfBalle - this.positionBarVer < ((((this.winHeight * 0.15) / this.winHeight) * 100) / 2)) {
                    this.angOfBalle = (((((((this.winHeight * 0.15) / this.winHeight) * 100) / 2) - (this.positionVerOfBalle - this.positionBarVer)) * ((((this.winHeight * 0.19) / this.winHeight) * 100) / 2)) / 100) * -1;
                }
                else if ((this.positionVerOfBalle - this.positionBarVer > ((((this.winHeight * 0.17) / this.winHeight) * 100) / 2))) {
                    this.angOfBalle = ((((this.positionVerOfBalle - this.positionBarVer) - ((((this.winHeight * 0.17) / this.winHeight) * 100) / 2)) * ((((this.winHeight * 0.19) / this.winHeight) * 100) / 2)) / 100);
                }
            }
            if (((this.positionHorOfBalle + (((this.winWidht / 70) / this.winWidht) * 100) - positionVsBarHor > 0.1)) && ((this.positionVerOfBalle - this.oppenent.positionBarVer > (((this.winHeight * -0.02) / this.winHeight) * 100))) && (this.positionVerOfBalle - this.oppenent.positionBarVer < (((this.winHeight * 0.17) / this.winHeight) * 100))) {
                this.dirOfBalle = this.dirOfBalle * -1;
                if (this.positionVerOfBalle - this.oppenent.positionBarVer < ((((this.winHeight * 0.15) / this.winHeight) * 100) / 2)) {
                    this.angOfBalle = ((((((((this.winHeight * 0.15) / this.winHeight) * 100) / 2) - (this.positionVerOfBalle - this.oppenent.positionBarVer)) * ((((this.winHeight * 0.19) / this.winHeight) * 100) / 2)) / 100) * -1);
                }
                else if ((this.positionVerOfBalle - this.oppenent.positionBarVer > ((((this.winHeight * 0.17) / this.winHeight) * 100) / 2))) {
                    this.angOfBalle = ((((this.positionVerOfBalle - this.oppenent.positionBarVer) - ((((this.winHeight * 0.17) / this.winHeight) * 100) / 2)) * ((((this.winHeight * 0.19) / this.winHeight) * 100) / 2)) / 100);
                }
            }
            if ((this.positionVerOfBalle < (((this.winHeight * 0.004) / this.winHeight) * 100)) && this.angOfBalle < 0) {
                this.angOfBalle = this.angOfBalle * -1;
            }
            if ((this.positionVerOfBalle > (((this.winHeight * 0.975) / this.winHeight) * 100)) && this.angOfBalle > 0) {
                this.angOfBalle = this.angOfBalle * -1;
            }
            this.positionHorOfBalle = this.positionHorOfBalle - ((this.dirOfBalle * ((((this.winHeight * 0.005) / this.winHeight) * 100))));
            this.positionVerOfBalle = this.positionVerOfBalle + this.angOfBalle;
        };
        const intervalId = setInterval(processLogic, 7.5);
    }
}
exports.user = user;
class ladderData {
    constructor(username, image, PP) {
        this.username = username;
        this.image = image;
        this.PP = PP;
    }
    setUsername(value) {
        this.username = value;
    }
    getUsername() {
        return (this.username);
    }
    setImage(value) {
        this.image = value;
    }
    setPP(value) {
        this.PP = value;
    }
    getPP() {
        return (this.PP);
    }
}
exports.ladderData = ladderData;
class Leaderboard {
    constructor() {
        this.ladderData = [];
        for (let i = 0; i < 12; i++) {
            let tmp = new ladderData("none", "/defaultAvt.jpg", 0);
            this.ladderData.push(tmp);
        }
    }
    async setLadderData(userService, username, user) {
        await (userService.updateUser(username, user));
        const users = await (userService.findAll());
        users.sort((a, b) => b.PP - a.PP);
        for (let i = 0; i < 12 && i < users.length; i++) {
            this.ladderData[i].setUsername(users[i].username);
            this.ladderData[i].setImage(users[i].image);
            this.ladderData[i].setPP(users[i].PP);
        }
    }
    getLadderData() {
        return this.ladderData;
    }
}
exports.Leaderboard = Leaderboard;
class userPending {
    constructor(username, code) {
        this.username = username;
        this.code = code;
    }
}
exports.userPending = userPending;
//# sourceMappingURL=user.js.map