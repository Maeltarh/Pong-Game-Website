/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/09/12 10:54:13 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/05 16:29:11 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Channel from "./Channel";
import DM from "./DM";

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
	getW(value: number)
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
	private score: Vector;
	private myPP: number;
	private oppenent: string;
	private oppenentImage: string;
	private hisPP: number;
	private gain: number;
	private result: string;

	constructor(myScore: number, hisScore: number, myPP: number, oppenent: string, hisPP: number, gain: number, result: string, opImage: string)
	{
		this.score = new Vector(myScore, hisScore);
		this.myPP = myPP;
		this.oppenent = oppenent;
		this.oppenentImage = opImage;
		this.hisPP = hisPP;
		this.gain = gain;
		this.result = result;
	}


	setScoreW(value: number)
	{
		this.score.setW(value);
	}
	setScoreL(value: number)
	{
		this.score.setL(value);
	}
	getScore()
	{
		return (this.score);
	}
	
	setMyPP(value: number)
	{
		this.myPP = value;
	}
	getMyPP(): number {
        return this.myPP;
    }

	setOppenent(value: string)
	{
		this.oppenent = value;
	}
    getOppenent(): string {
        return this.oppenent;
    }

	setOppenentImage(value: string)
	{
		this.oppenentImage = value;
	}
	getOppenentImage(): string {
		return (this.oppenentImage);
	}

	setHisPP(value: number)
	{
		this.hisPP = value;
	}
    getHisPP(): number {
        return this.hisPP;
    }

	setGain(value: number)
	{
		this.gain = value;
	}
    getGain(): number {
        return this.gain;
    }

	setResult(value: string)
	{
		this.result = value;
	}
    getResult(): string {
        return this.result;
    }
}

export class User
{
	private image: String;
	private pseudo: String;
	private lvl: number;
	private progressBar: number;
	private winRatio: Vector;
	private PP: number;
	private gain: number;
	private gameCount: number;
	private historiqueArray: historique[] = [];
	private friends: string[][] = [];
	private friendsNames: string[] = [];
	private channels: Channel[] = [];
	private DMs: DM[] = [];
	private blocked: string[] = [];

	constructor(pseudo: string)
	{
		this.image = "/defaultAvt.jpg";
		this.pseudo = pseudo;
		this.lvl = 1;
		this.progressBar = 0;
		this.winRatio = new Vector(0, 0);
		this.PP = 1000;
		this.gain = 0;
		for (let i = 0; i < 5; i++)
		{
			let tmp = new historique(0, 0, 0, "none", 0, 0, "none", "/defaultAvt.jpg");
			this.historiqueArray.push(tmp);
		}
	}

	getGameCount()
	{
		return (this.gameCount);
	}
	setGameCount(value: number)
	{
		this.gameCount = value;
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
		this.pseudo = value;
	}
	getPseudo()
	{
		return (this.pseudo);
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
		this.progressBar = value;
	}
	getProgressBar()
	{
		return (this.progressBar);
	}

	setWinRatio(valueW: number, valueL: number)
	{
		this.winRatio.setW(valueW);
		this.winRatio.setL(valueL);
	}
	getWinRatio()
	{
		return (this.winRatio);
	}

	setPP(value: number)
	{
		this.PP = value;
	}
	getPP()
	{
		return (this.PP);
	}

	setHistorique(index: number, myScore: number, hisScore: number, myPP: number, oppenent: string, hisPP: number, gain: number,  result: string, opImage: string)
	{
		this.historiqueArray[index].setGain(gain);
		this.historiqueArray[index].setHisPP(hisPP);
		this.historiqueArray[index].setMyPP(myPP);
		this.historiqueArray[index].setOppenent(oppenent);
		this.historiqueArray[index].setOppenentImage(opImage);
		this.historiqueArray[index].setResult(result);
		this.historiqueArray[index].getScore().setW(myScore);
		this.historiqueArray[index].getScore().setL(hisScore);
	}
	getHistorique()
	{
		return (this.historiqueArray);
	}
	getHistoriqueIndex(index: number)
	{
		return (this.historiqueArray[index]);
	}

	addFriend(friend: string[])
	{
		if (!this.friends.includes(friend))
		{
			this.friends.push(friend);
			this.friendsNames.push(friend[0]);
		}
	}
	removeFriend(friend: string)
	{
		this.friends.forEach((element, index) => {
			if (element[0] === friend)
			{
				this.friends.splice(index, 1);
				this.friendsNames.splice(index, 1);
			}
		});
	}
	getFriends()
	{
		return (this.friends);
	}

	getChannels(): Channel[]
	{
		return (this.channels);
	}
	addChannel(channel: Channel)
	{
		this.channels.push(channel);
	}
	removeChannel(channelName: string)
	{
		for (let i = 0; i < this.channels.length; i++)
		{
			if (this.channels[i].name === channelName)
			{
				this.channels.splice(i, 1);
				return;
			}
		}
	}

	getDMs(): DM[]
	{
		return (this.DMs);
	}
	addDM(dm: DM)
	{
		this.DMs.push(dm);
	}
	removeDM(otherUser: string)
	{
		for (let i = 0; i < this.DMs.length; i++)
		{
			if (this.DMs[i].user1 === otherUser || this.DMs[i].user2 === otherUser)
			{
				this.DMs.splice(i, 1);
				return;
			}
		}
	}

	getBlocked()
	{
		return (this.blocked);
	}
	blockUser(username: string)
	{
		if (!this.blocked.includes(username))
			this.blocked.push(username);
	}
	unblockUser(username: string)
	{
		if (this.blocked.includes(username))
			this.blocked.splice(this.blocked.indexOf(username), 1);
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

	getUsername(): string
	{
		return (this.username);
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

	setLadderData(username: string, image: string, PP: number)
	{
		for (let i = 0; i < this.ladderData.length; i++)
		{
			if (username === this.ladderData[i].getUsername())
			{
				this.ladderData.splice(i, 1);
				for (let y = 0; y < this.ladderData.length; y++)
				{
					if (PP > this.ladderData[y].getPP())
					{
						let tmp = new ladderData(username, image, PP);
						this.ladderData.splice(y, 0, tmp);
						return;
					}
				}
			}
		}
		for (let i = 0; i < this.ladderData.length; i++)
		{
			if (PP > this.ladderData[i].getPP())
			{
				this.ladderData.splice(this.ladderData.length - 1, 1);
				let tmp = new ladderData(username, image, PP);
				this.ladderData.splice(i, 0, tmp);
				break;
			}
		}
	}

	getLadderData()
	{
		return (this.ladderData);
	}
}
