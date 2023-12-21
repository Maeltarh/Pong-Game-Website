/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/04 20:56:34 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/06 17:20:12 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Socket } from "socket.io";
import { User } from "./entity";
import { Historique } from "./entity";
import { UserService } from './user.service';

export class Vector
{
	private w: number;
	private l: number;

	constructor(w: number, l: number)
	{
		this.w = w;
		this.l = l;
	}

	setW(value: number)
	{
		this.w = value;
	}
	getW()
	{
		return (this.w);
	}

	setL(value: number)
	{
		this.l = value;
	}
	getL()
	{
		return (this.l);
	}
}

export class historique
{
	private login: string;
	private	username: string;
	private score: Vector;
	private myPP: number;
	private oppenent: string;
	private oppenentImage: string;
	private hisPP: number;
	private gain: number;
	private result: string;

	constructor(login: string, username: string, myScore: number, hisScore: number, myPP: number, oppenent: string, hisPP: number, gain: number, result: string, opImage: string)
	{
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

	toHistoriqueData(): Partial<Historique> {
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

	fetchHistorique(data: Partial<Historique>) {
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
	
	getUsername()
	{
		return (this.username);
	}

	getScore()
	{
		return (this.score);
	}

	getMyPP(): number {
		return this.myPP;
	}

	getOppenent(): string {
		return this.oppenent;
	}

	getOppenentImage(): string {
		return (this.oppenentImage);
	}

	getHisPP(): number {
		return this.hisPP;
	}

	getGain(): number {
		return this.gain;
	}

	getResult(): string {
		return this.result;
	}
}

export class dataUser
{
	private padColor: string;
	private balleColor: string;
	private login: string;
	private	id: number;
	private idH: number;
	private username: string;
	private guest: boolean;
	private deuxFap: boolean;
	private email: string;
	private image: string;
	private lvl: number;
	private progressBar: number;
	private winRatio: Vector;
	private PP: number;
	private gain: number;
	private gameCount: number;
	private historiqueArray: historique[] = [];
	private blocked: string[] = [];
	private friends: string[] = [];

	constructor(login: string, pseudo: string, img: string, bool: boolean)
	{
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
		for (let i = 0; i < 5; i++)
		{
			let tmp = new historique(this.login, this.username, 0, 0, 0, "none", 0, 0, "none", "/defaultAvt.jpg");
			this.historiqueArray.push(tmp);
		}
	}

	toUser(): Partial<User>
	{
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

	fetchUser(data: Partial<User>)
	{
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

	getGameCount()
	{
		return (this.gameCount);
	}
	setGameCount()
	{
		this.gameCount += 1;
	}

	getPadColor()
	{
		return (this.padColor);
	}
	setPadColor(value: string)
	{
		this.padColor = value;
	}

	getBalleColor()
	{
		return (this.balleColor);
	}
	setBalleColor(value: string)
	{
		this.balleColor = value;
	}

	setLogin(value: string)
	{
		this.login = value;
	}
	getLogin()
	{
		return (this.login);
	}

	setId(value: number)
	{
		this.id = value;
	}
	getId()
	{
		return (this.id);
	}

	setIdh(value: number)
	{
		this.idH = value;
	}
	getIdh()
	{
		return (this.idH);
	}

	setImage(value: string)
	{
		this.image = value;
	}
	getImage()
	{
		return (this.image);
	}

	setPseudo(value: string)
	{
		this.username = value;
	}
	getPseudo()
	{
		return (this.username);
	}

	setEmail(value: string)
	{
		this.email = value;
	}
	getEmail()
	{
		return (this.email);
	}

	setDeuxFap(value: boolean)
	{
		this.deuxFap = value;
	}
	getDeuxFap()
	{
		return (this.deuxFap);
	}

	setLvl(value: number)
	{
		this.lvl = value;
	}
	getLvl()
	{
		return (this.lvl);
	}

	setProgressBar(value: number)
	{
		this.progressBar += value;
		if (this.progressBar === 100)
		{
			this.lvl += 1;
			this.progressBar = 0;
		}
		else if (this.progressBar >= 100)
		{
			this.lvl += 1;
			this.progressBar -= 100;
		}
	}
	getProgressBar()
	{
		return (this.progressBar);
	}

	setWinRatio(valueW: number, valueL: number)
	{
		this.winRatio.setW(this.winRatio.getW() + valueW);
		this.winRatio.setL(this.winRatio.getL() + valueL);
	}
	getWinRatio()
	{
		return (this.winRatio);
	}

	calcPPW(valueToi: number, valueLui: number)
	{
		let result = 0;
		result = 150 * (valueLui / valueToi);
		this.gain = result;
		result = result - (result % 1);
		this.setPP(this.getPP() + result);
	}
	calcPPL(valueToi: number, valueLui: number)
	{
		let result = 0;
		result = -1 * (150 * (valueToi / valueLui));
		result = result - (result % 1);
		this.setPP(this.getPP() + result);
	}

	setPP(value: number)
	{
		this.PP = value;
	}
	getPP()
	{
		return (this.PP);
	}

	setHistorique(myScore: number, hisScore: number, myPP: number, oppenent: string, hisPP: number, result: string, opImage: string)
	{
		if (myPP === this.historiqueArray[4].getMyPP())
		{
			return;
		}
		if (this.historiqueArray.length === 5)
		{
			this.historiqueArray.pop();
		}
		if (result === "gagné")
		{
			this.gain = 150 * (hisPP / myPP);
		}
		else
		{
			this.gain = -1 * (150 * (myPP / hisPP));
		}
		this.gain = this.gain - (this.gain % 1);
		let newHistorique = new historique(this.login, this.username, myScore, hisScore, myPP, oppenent, hisPP, this.gain, result, opImage);
		this.historiqueArray.unshift(newHistorique);
	}
	getHistorique()
	{
		return (this.historiqueArray);
	}
	getHistoriqueIndex(index: number)
	{
		return (this.historiqueArray[index]);
	}

	getBlocked()
	{
		return (this.blocked);
	}
	block(username: string)
	{
		if (!this.blocked.includes(username))
			this.blocked.push(username);
	}
	unblock(username: string)
	{
		if (this.blocked.includes(username))
			this.blocked.splice(this.blocked.indexOf(username), 1);
	}

	getFriends()
	{
		return (this.friends);
	}
	friend(username: string)
	{
		if (!this.friends.includes(username))
			this.friends.push(username);
	}
	unfriend(username: string)
	{
		if (this.friends.includes(username))
			this.friends.splice(this.friends.indexOf(username), 1);
	}
}

export class opTmp
{
	private username: string;
	private : string;
	private score: number;
	private image: string;
	private PP: number;

	constructor (username: string, score: number, image: string, PP: number)
	{
		this.username = username;
		this.score = score;
		this.image = image;
		this.PP = PP;
	}

	setValue(username: string, score: number, image: string, PP: number)
	{
		this.username = username;
		this.score = score;
		this.image = image;
		this.PP = PP;
	}

	getUsername()
	{
		return (this.username);
	}
	getScore()
	{
		return (this.score);
	}
	getImage()
	{
		return (this.image);
	}
	getPP()
	{
		return (this.PP);
	}
}

export class user
{
	public socket: Socket;
	private login: string;
	private username: string;
	private guest: boolean;
	private img: string
	private oppenent: user;
	private isInGame: boolean;
	private queue: boolean;
	private score: number;
	private value: number;
	private	winHeight: number;
	private	winWidht: number;
	private positionBarVer: number;
	private positionHorOfBalle: number;
	private positionVerOfBalle: number;
	private angOfBalle: number;
	private dirOfBalle: number;
	private	player: number;
	private winCondition: number;
	private dataUser: dataUser;
	private friendDataTmp: dataUser;
	private opTmp: opTmp;

	constructor(copyFrom?: user | {sock: Socket, login: string, username: string, img: string, guest: boolean})
	{
		if (copyFrom instanceof user)
		{
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
		else if (copyFrom)
		{
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

	getOpTmp()
	{
		return (this.opTmp);
	}

	getFriendDataTmp()
	{
		return (this.friendDataTmp);
	}

	setDataUser(login: string, username: string, img: string, bool: boolean)
	{
		let newDataUser = new dataUser(login, username, img, bool);
	}
	getDataUser()
	{
		return (this.dataUser);
	}

	setLogin(value: string)
	{
		this.login = value;
	}
	getLogin()
	{
		return (this.login);
	}

	setUsername(value: string)
	{
		this.username = value;
	}
	getUsername()
	{
		return (this.username);
	}

	getQueue()
	{
		return (this.queue);
	}
	setQueue(bool: boolean)
	{
		this.queue = bool;
	}

	getOppenent()
	{
		return (this.oppenent);
	}
	setOppenent(oppenent: user)
	{
		this.oppenent = oppenent;
	}

	getScore()
	{
		return (this.score);
	}
	setScore(score: number)
	{
		this.score = score;
	}

	getWinHeight()
	{
		return (this.winHeight);
	}
	setWinHeight(value: number)
	{
		this.winHeight = value;
	}

	getWinWidht()
	{
		return (this.winWidht);
	}
	setWinWidht(value: number)
	{
		this.winWidht = value;
	}

	getPositionBarVer()
	{
		return (this.positionBarVer);
	}
	setPositionBarVer(value: number)
	{
		this.positionBarVer = value;
	}

	getPositionHorOfBalle()
	{
		return (this.positionHorOfBalle);
	}
	setPositionHorOfBalle(value: number)
	{
		this.positionHorOfBalle = value;
	}

	getPositionVerOfBalle()
	{
		return (this.positionVerOfBalle);
	}
	setPositionVerOfBalle(value: number)
	{
		this.positionVerOfBalle = value;
	}

	getAngOfBalle()
	{
		return (this.angOfBalle);
	}
	setAngOfBalle(value: number)
	{
		this.angOfBalle = value;
	}

	getDirOfBalle()
	{
		return (this.dirOfBalle);
	}
	setDirOfBalle(value: number)
	{
		this.dirOfBalle = value;
	}

	getPlayer()
	{
		return (this.player);
	}
	setPlayer(value: number)
	{
		this.player = value;
	}

	getWinCondition()
	{
		return (this.winCondition);
	}
	setWinCondition(value: number)
	{
		this.winCondition = value;
	}

	getIsInGame()
	{
		return (this.isInGame);
	}
	setIsInGane(value: boolean)
	{
		this.isInGame = value;
	}

	getValue()
	{
		return (this.value);
	}
	setValue(value: number)
	{
		this.value = value;
	}

	setupValue()
	{
		this.positionBarVer = (((this.winHeight / 2.5) / this.winHeight) * 100);
		this.oppenent.positionBarVer = (((this.winHeight / 2.5) / this.winHeight) * 100);
		this.positionVerOfBalle = (((this.winHeight / 2.09) / this.winHeight) * 100);
		this.positionHorOfBalle = (((this.winWidht / 2.0253) / this.winWidht) * 100);
		this.dirOfBalle = this.value;
		this.angOfBalle = 0;
	}

	balleCalc()
	{
		let positionBarHor = (((this.winWidht / 180) / this.winWidht) * 100);
		let positionVsBarHor = (((this.winWidht / 1.014) / this.winWidht) * 100);
		const processLogic = () => 
		{
			if (this.isInGame !== true || this.oppenent.isInGame !== true)
			{
				clearInterval (intervalId);
				return;
			}
			if (((this.positionHorOfBalle - positionBarHor < 1) && ((this.positionVerOfBalle - this.positionBarVer > (((this.winHeight * -0.02) / this.winHeight) * 100))) && (this.positionVerOfBalle - this.positionBarVer < (((this.winHeight * 0.17) / this.winHeight) * 100))))
			{
				this.dirOfBalle = this.dirOfBalle * -1;
				if (this.positionVerOfBalle - this.positionBarVer < ((((this.winHeight * 0.15) / this.winHeight) * 100) / 2))
				{
				this.angOfBalle = (((((((this.winHeight * 0.15) / this.winHeight) * 100) / 2) - (this.positionVerOfBalle - this.positionBarVer)) * ((((this.winHeight * 0.19) / this.winHeight) * 100) / 2)) / 100) * -1
				}
				else if ((this.positionVerOfBalle - this.positionBarVer > ((((this.winHeight * 0.17) / this.winHeight) * 100) / 2)))
				{
				this.angOfBalle = ((((this.positionVerOfBalle - this.positionBarVer) - ((((this.winHeight * 0.17) / this.winHeight) * 100) / 2)) * ((((this.winHeight * 0.19) / this.winHeight) * 100) / 2)) / 100)
				}
			}
			if (((this.positionHorOfBalle + (((this.winWidht / 70) / this.winWidht) * 100) - positionVsBarHor > 0.1)) && ((this.positionVerOfBalle - this.oppenent.positionBarVer > (((this.winHeight * -0.02) / this.winHeight) * 100))) && (this.positionVerOfBalle - this.oppenent.positionBarVer < (((this.winHeight * 0.17) / this.winHeight) * 100)))
			{
				this.dirOfBalle = this.dirOfBalle * -1;
				if (this.positionVerOfBalle - this.oppenent.positionBarVer < ((((this.winHeight * 0.15) / this.winHeight) * 100) / 2))
				{
				this.angOfBalle = ((((((((this.winHeight * 0.15) / this.winHeight) * 100) / 2) - (this.positionVerOfBalle - this.oppenent.positionBarVer)) * ((((this.winHeight * 0.19) / this.winHeight) * 100) / 2)) / 100) * -1)
				}
				else if ((this.positionVerOfBalle - this.oppenent.positionBarVer > ((((this.winHeight * 0.17) / this.winHeight) * 100) / 2)))
				{
				this.angOfBalle = ((((this.positionVerOfBalle - this.oppenent.positionBarVer) - ((((this.winHeight * 0.17) / this.winHeight) * 100) / 2)) * ((((this.winHeight * 0.19) / this.winHeight) * 100) / 2)) / 100);
				}
			}
			if ((this.positionVerOfBalle < (((this.winHeight * 0.004) / this.winHeight) * 100)) && this.angOfBalle < 0)
			{
				this.angOfBalle = this.angOfBalle * -1;
			}
			if ((this.positionVerOfBalle > (((this.winHeight * 0.975) / this.winHeight) * 100)) && this.angOfBalle > 0)
			{
				this.angOfBalle = this.angOfBalle * -1;
			}
			this.positionHorOfBalle = this.positionHorOfBalle - ((this.dirOfBalle * ((((this.winHeight * 0.005) / this.winHeight) * 100))));
			this.positionVerOfBalle = this.positionVerOfBalle + this.angOfBalle;
		}
		const intervalId = setInterval(processLogic, 7.5);
	}
}

export class ladderData
{
	private username: string;
	private image: string;
	private PP: number;

	constructor (username: string, image: string, PP: number)
	{
		this.username = username;
		this.image = image;
		this.PP = PP;
	}

	setUsername(value: string)
	{
		this.username = value;
	}
	getUsername(): string
	{
		return (this.username);
	}

	setImage(value: string)
	{
		this.image = value;
	}

	setPP(value: number)
	{
		this.PP = value;
	}
	getPP(): number
	{
		return (this.PP);
	}
}

export class Leaderboard
{
	private ladderData: ladderData [] = [];

	constructor ()
	{
		for (let i = 0; i < 12; i++)
		{
			let tmp = new ladderData("none", "/defaultAvt.jpg", 0);
			this.ladderData.push(tmp);
		}
	}

	async setLadderData(userService: UserService, username: string, user: Partial<User>)
	{
		await (userService.updateUser(username, user));
		const users = await (userService.findAll());
		users.sort((a, b) => b.PP - a.PP);
		for (let i = 0; i < 12 && i < users.length; i++) {
			this.ladderData[i].setUsername(users[i].username);
			this.ladderData[i].setImage(users[i].image);
			this.ladderData[i].setPP(users[i].PP);
		}
	}	

	getLadderData()
	{
		return this.ladderData;
	}
}

export class userPending
{
	private username: string;
	private code: string;

	constructor(username: string, code: string)
	{
		this.username = username;
		this.code = code;
	}
}
