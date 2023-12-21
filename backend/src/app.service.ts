/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.service.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/04 20:56:42 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/06 18:28:35 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import { userArray, leaderboard } from './main';
import { user } from './user';
import { Socket } from 'socket.io';
import { UserService } from './user.service';
import { HistoriqueService } from './histo.service';
import { channels, DMs } from './main';
import Message from './Message';
import Channel from './Channel';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private historiqueService: HistoriqueService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleLogin(socket: Socket, username: string, choixPseudo: string, defaultImage: string, bool: boolean)
  {
    let i = 0;
    while (i < userArray.length)
    {
      if (userArray[i].getDataUser().getLogin() === username)
      {
        socket.emit('dejaco');
        return;
      }
      i++;
    }
    if (bool === false)
    {
      defaultImage = "/defaultAvt.jpg";
    }
    userArray.push(new user({sock: socket, login: username, username: choixPseudo, img: defaultImage, guest: bool}));
    userArray[i].setDataUser(choixPseudo, username, defaultImage, bool);
    const users = await this.userService.findAll();
    const historiques = await this.historiqueService.findAll();
    let n = 0;
    let y = 0;
    let x = 0;
    for (y = 0; y < users.length; y++)
    {
      if (username === users[y].login)
      {
        n = 1;
        userArray[i].getDataUser().fetchUser(users[y]);
        userArray[i].getDataUser().setId(users[y].id);
        let z = 0;
        for (x = 0; x < historiques.length; x++)
        {
          if (username === historiques[x].login && z === historiques[x].index && bool === true)
          {
            userArray[i].getDataUser().getHistoriqueIndex(z).fetchHistorique(historiques[x]);
            z++;
            x = 0;
            if (z === 5)
            {
              break;
            }
          }
        }
        break;
      }
    }
    if (y === users.length && n === 0 && bool === true)
    {
      await (this.userService.create(userArray[i].getDataUser().toUser()));
      for (let h = 0; h < 5; h++)
      {
        await (this.historiqueService.create(userArray[i].getDataUser().getHistoriqueIndex(h).toHistoriqueData(), h));
      }
      userArray[i].getDataUser().setId(y);
    }
    if (bool === true)
      leaderboard.setLadderData(this.userService, userArray[i].getDataUser().getPseudo(), userArray[i].getDataUser().toUser());
    userArray[i].socket.emit("creatUser", userArray[i].getDataUser().getPseudo(), userArray[i].getDataUser());
  }


  quit(clientId: string, channelName: string, user: string)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === channelName)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === clientId)
          {
            if (channels[i].getOwner() === userArray[j].getUsername())
            {
              for (let k = 0; k < channels[i].getMembers().length; k++)
              {
                if (channels[i].getMembers()[k] !== userArray[j].getUsername())
                {
                  for (let l = 0; l < userArray.length; l++)
                  {
                    if (userArray[l].getUsername() === channels[i].getMembers()[k])
                      userArray[l].socket.emit('kick', channelName);
                  }
                }
              }
              channels.splice(i, 1);
              return ;
            }
            channels[i].removeMember(userArray[j].getUsername());
          }
        }
      }
    }
    let content: string = 'A quitté le channel';
    let channel: Channel;
    for (let i = 0; i < channels.length; i++)
      if (channels[i].getName() === channelName)
        channel = channels[i];
    if (!channel.getMuted().includes(user))
      channel.addMessage(new Message(user, content));
    else
      return ;
    for (let i = 0; i < userArray.length; i++)
    {
      if (clientId !== userArray[i].socket.id)
      {
        if (channel.getMembers().includes(userArray[i].getUsername()))
        {
          userArray[i].socket.emit('message', user, content, channel.getName());
        }
      }
    }
  }

  quitDM(userQuitting: string, user1: string, user2: string)
  {
    for (let i = 0; i < DMs.length; i++)
    {
      if (DMs[i].getUser1() === user1 && DMs[i].getUser2() === user2)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if ((userArray[j].getUsername() === user1 || userArray[j].getUsername() === user2) && userArray[j].getUsername() !== userQuitting)
          {
            userArray[j].socket.emit('quitDM', userQuitting);
          }
        }
        DMs.splice(i, 1);
      }
    }
  }

  async handleDisconnect(client: Socket)
  {
    let i = 0;
    while (i < userArray.length)
    {
      if (userArray[i].socket.id === client.id)
        break;
      i++;
    }
    if (i >= userArray.length)
      return;
    if (userArray[i].getIsInGame() === true)
    {
      let y = 0;
      while (y < userArray.length)
      {
        if (userArray[y].socket.id === userArray[i].getOppenent().socket.id)
          break;
        y++;
      }
      userArray[i].getDataUser().setGameCount();
      userArray[i].getDataUser().setWinRatio(0, 1);
      userArray[i].getDataUser().setProgressBar(5);
      userArray[i].getDataUser().setHistorique(userArray[i].getScore(), userArray[y].getScore(), userArray[i].getDataUser().getPP(), userArray[y].getUsername(), userArray[y].getDataUser().getPP(), "perdu", userArray[y].getDataUser().getImage());
      userArray[i].getDataUser().calcPPL(userArray[i].getDataUser().getPP(), userArray[y].getDataUser().getPP());
      userArray[y].getOpTmp().setValue(userArray[i].getUsername(), userArray[i].getScore(), userArray[i].getDataUser().getImage(), userArray[i].getDataUser().getPP())
      userArray[y].setIsInGane(false);
    }
    this.userService.updateUser(userArray[i].getDataUser().getLogin(), userArray[i].getDataUser().toUser());
    for (let y = 0; y < 5; y++)
    {
      await (this.historiqueService.updateHistoriqueByIndexAndUsername(y, userArray[i].getDataUser().getLogin(), userArray[i].getDataUser().getHistoriqueIndex(y).toHistoriqueData()));
    }
    for (let j = 0; j < channels.length; j++)
    {
      if (channels[j].getMembers().includes(userArray[i].getUsername()))
      {
        this.quit(userArray[i].socket.id, channels[j].getName(), userArray[i].getUsername());
      }
    }
    for (let j = 0; j < DMs.length; j++)
    {
      if (DMs[j].getUser1() === userArray[i].getUsername() || DMs[j].getUser2() === userArray[i].getUsername())
      {
        this.quitDM(userArray[i].getUsername(), DMs[j].getUser1(), DMs[j].getUser2());
      }
    }
    userArray.splice(i, 1);
  }
}
