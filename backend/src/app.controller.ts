/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.controller.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: gsaile <gsaile@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/04 12:21:56 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/21 21:59:24 by gsaile           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Controller, Post, Req, Res, Inject, Get, Query, Param, Body, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { EventsGateway } from './game.gateway';
import { userArray, leaderboard, userPendingArray, channels, DMs, CLIENT_ID } from './main';
import { Api42Service } from './api42.service';
import { servIP } from './main';
import { Session } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity';
import { serverIP } from './main';
import { MailService } from './mail.service';
import { user, userPending } from './user';
import Channel from './Channel';
import Message from './Message';
import DM from './DM';

export let code: string;

/*
PPPPPPPPPPPPPPPPP                                                         
P::::::::::::::::P                                                        
P::::::PPPPPP:::::P                                                       
PP:::::P     P:::::P                                                      
  P::::P     P:::::P  ooooooooooo   nnnn  nnnnnnnn       ggggggggg   ggggg
  P::::P     P:::::Poo:::::::::::oo n:::nn::::::::nn    g:::::::::ggg::::g
  P::::PPPPPP:::::Po:::::::::::::::on::::::::::::::nn  g:::::::::::::::::g
  P:::::::::::::PP o:::::ooooo:::::onn:::::::::::::::ng::::::ggggg::::::gg
  P::::PPPPPPPPP   o::::o     o::::o  n:::::nnnn:::::ng:::::g     g:::::g 
  P::::P           o::::o     o::::o  n::::n    n::::ng:::::g     g:::::g 
  P::::P           o::::o     o::::o  n::::n    n::::ng:::::g     g:::::g 
  P::::P           o::::o     o::::o  n::::n    n::::ng::::::g    g:::::g 
PP::::::PP         o:::::ooooo:::::o  n::::n    n::::ng:::::::ggggg:::::g 
P::::::::P         o:::::::::::::::o  n::::n    n::::n g::::::::::::::::g 
P::::::::P          oo:::::::::::oo   n::::n    n::::n  gg::::::::::::::g 
PPPPPPPPPP            ooooooooooo     nnnnnn    nnnnnn    gggggggg::::::g 
                                                                  g:::::g 
                                                      gggggg      g:::::g 
                                                      g:::::gg   gg:::::g 
                                                       g::::::ggg:::::::g 
                                                        gg:::::::::::::g  
                                                          ggg::::::ggg    
                                                             gggggg       
*/

@Controller('game')
export class AppPosController {
  constructor(
    @Inject(EventsGateway) private eventsGateway: EventsGateway,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  @Post('noDefi')
  noDefi(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < userArray.length; i++)
    {
      if (req.body.pseudoDefi === userArray[i].getUsername())
      {
        userArray[i].socket.emit("defisRefusé");
        res.send(true);
        return;
      }
    }
    res.send(false);
  }

  @Post('yesDefi')
  yesDefi(@Req() req: Request, @Res() res: Response)
  {
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (req.body.pseudoDefi === userArray[i].getUsername())
      {
        userArray[i].socket.emit("defisAccepté");
        break;
      }
    }
    let y = 0;
    for (y = 0; y < userArray.length; y++)
    {
      if (req.body.clientId === userArray[y].socket.id)
      {
        userArray[y].socket.emit("defisAccepté");
        break;
      }
    }
    userArray[i].setWinHeight(req.body.winHeight);
    userArray[i].setWinWidht(req.body.winWidth);
    userArray[y].setWinHeight(req.body.winHeight);
    userArray[y].setWinWidht(req.body.winWidth);
    userArray[i].setOppenent(userArray[y]);
    userArray[y].setOppenent(userArray[i]);
    userArray[y].setQueue(false);
    userArray[i].setQueue(false);
    userArray[i].socket.emit("matchFound", 1);
    userArray[y].socket.emit("matchFound", 2);
    userArray[i].setValue(-1);
    userArray[i].setupValue();
    userArray[i].setPlayer(2);
    userArray[i].getOppenent().setPlayer(1);
    userArray[y].setValue(1);
    userArray[y].setupValue();
    userArray[y].setPlayer(1);
    userArray[y].getOppenent().setPlayer(2);
    userArray[i].setIsInGane(true);
    userArray[i].getOppenent().setIsInGane(true);
    userArray[y].setIsInGane(true);
    userArray[y].getOppenent().setIsInGane(true);
    userArray[i].balleCalc();
    userArray[y].balleCalc();
    res.send("Parce que c'est comme dans Harry Potter enfaite !");
    return;
  }
  
  @Post('defi')
  defi(@Req() req: Request, @Res() res: Response)
  {
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (req.body.user === userArray[i].getUsername())
      {
        for (let y = 0; y < userArray.length; y++)
        {
          if (req.body.clientId === userArray[y].socket.id)
          {
            let user = userArray[y].getUsername();
            userArray[i].socket.emit("demandeDefi", user);
            res.send(true);
            return;
          }
        }
      }
    }
    res.send(false);
    return;
  }

  @Post('pos')
  async pos(@Req() req: Request, @Res() res: Response)
  {
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (req.body.clientId === userArray[i].socket.id)
        break;
    }
    if (i >= userArray.length)
    {
      res.send("Parce que c'est comme dans Harry Potter enfaite !");
      return;
    }
    if (userArray[i].getIsInGame() === true)
    {
      let y = 0;
      for (y = 0; y < userArray.length; y++)
      {
        if (userArray[i].getOppenent().socket.id === userArray[y].socket.id)
          break;
      }
      userArray[i].setPositionBarVer(req.body.newPosition);
      userArray[y].getOppenent().setPositionBarVer(req.body.newPosition);
      userArray[y].socket.emit("barVS", userArray[i].getPositionBarVer());
      res.send("Parce que c'est comme dans Harry Potter enfaite !");
    }
    else if (userArray[i].getIsInGame() === false && userArray[i].getOpTmp().getUsername() !== "")
    {
      userArray[i].getDataUser().setWinRatio(1, 0);
      userArray[i].getDataUser().setProgressBar(25);
      let tmp = userArray[i].getDataUser().getPP();
      userArray[i].getDataUser().setHistorique(userArray[i].getScore(), userArray[i].getOpTmp().getScore(), userArray[i].getDataUser().getPP(), userArray[i].getOpTmp().getUsername(), userArray[i].getOpTmp().getPP(), "gagné", userArray[i].getOpTmp().getImage());
      userArray[i].getDataUser().calcPPW(userArray[i].getDataUser().getPP(), userArray[i].getOpTmp().getPP());
      userArray[i].getDataUser().setGameCount();
      userArray[i].socket.emit("end", userArray[i].getPlayer(), userArray[i].getScore(), userArray[i].getOpTmp().getScore(), userArray[i].getDataUser(), userArray[i].getDataUser().getHistorique());
      userArray[i].setOppenent(undefined);
      leaderboard.setLadderData(this.userService, userArray[i].getDataUser().getPseudo(), userArray[i].getDataUser().toUser());
      res.send("Parce que c'est comme dans Harry Potter enfaite !");
    }
  }

  @Post('matching')
  matching(@Req() req: Request, @Res() res: Response)
  {
    if (userArray.length <= 1)
    {
      userArray[0].setQueue(true);
      res.send("Parce que c'est comme dans Harry Potter enfaite !");
      return;
    }
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (req.body.clientId === userArray[i].socket.id)
        break;
    }
    if (i >= userArray.length)
    {
      res.send("Parce que c'est comme dans Harry Potter enfaite !");
      return;
    }
    let y = 0;
    for (y = 0; y < userArray.length; y++)
    {
      if (userArray[y].getQueue() === true && y != i)
      {
        userArray[i].setWinHeight(req.body.winHeight);
        userArray[i].setWinWidht(req.body.winWidth);
        userArray[y].setWinHeight(req.body.winHeight);
        userArray[y].setWinWidht(req.body.winWidth);
        userArray[i].setOppenent(userArray[y]);
        userArray[y].setOppenent(userArray[i]);
        userArray[y].setQueue(false);
        userArray[i].setQueue(false);
        userArray[i].socket.emit("matchFound", 1);
        userArray[y].socket.emit("matchFound", 2);
        userArray[i].setValue(-1);
        userArray[i].setupValue();
        userArray[i].setPlayer(2);
        userArray[i].getOppenent().setPlayer(1);
        userArray[y].setValue(1);
        userArray[y].setupValue();
        userArray[y].setPlayer(1);
        userArray[y].getOppenent().setPlayer(2);
        userArray[i].setIsInGane(true);
        userArray[i].getOppenent().setIsInGane(true);
        userArray[y].setIsInGane(true);
        userArray[y].getOppenent().setIsInGane(true);
        userArray[i].balleCalc();
        userArray[y].balleCalc();
        res.send("Parce que c'est comme dans Harry Potter enfaite !");
        return;
      }
    }
    userArray[i].setQueue(true);
    res.send("Parce que c'est comme dans Harry Potter enfaite !");
  }

  @Post('balle')
  async balle(@Req() req: Request, @Res() res: Response)
  {
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (req.body.clientId === userArray[i].socket.id)
        break;
    }
    if (i >= userArray.length)
    {
      res.send("Parce que c'est comme dans Harry Potter enfaite !");
      return;
    }
    if ((userArray[i].getIsInGame() === false && userArray[i].getOpTmp().getUsername() !== "")) 
    {
      userArray[i].getDataUser().setWinRatio(1, 0);
      userArray[i].getDataUser().setProgressBar(25);
      let tmp = userArray[i].getDataUser().getPP();
      userArray[i].getDataUser().setHistorique(userArray[i].getScore(), userArray[i].getOpTmp().getScore(), userArray[i].getDataUser().getPP(), userArray[i].getOpTmp().getUsername(), userArray[i].getOpTmp().getPP(), "gagné", userArray[i].getOpTmp().getImage());
      userArray[i].getDataUser().calcPPW(userArray[i].getDataUser().getPP(), userArray[i].getOpTmp().getPP());
      userArray[i].getDataUser().setGameCount();
      userArray[i].socket.emit("end", userArray[i].getPlayer(), userArray[i].getScore(), userArray[i].getOpTmp().getScore(), userArray[i].getDataUser(), userArray[i].getDataUser().getHistorique());
      userArray[i].setOppenent(undefined);
      userArray[i].getOpTmp().setValue("", 0, "", 0);
      leaderboard.setLadderData(this.userService, userArray[i].getDataUser().getPseudo(), userArray[i].getDataUser().toUser());
      res.send("Parce que c'est comme dans Harry Potter enfaite !");
      return;
    }
    else if (userArray[i].getIsInGame() === false && userArray[i].getOpTmp().getUsername() === "")
    {
      return;
    }
    let y = 0;
    for (y = 0; y < userArray.length; y++)
    {
      if (userArray[i].getOppenent().socket.id === userArray[y].socket.id)
        break;
    }
    userArray[i].getDataUser().setPadColor(req.body.padColor);
    if ((userArray[i].getPositionHorOfBalle() < 0))
    {
      let win = (userArray[i].getPositionHorOfBalle() > (((userArray[i].getWinWidht() / 2.09) / userArray[i].getWinWidht()) * 100) ? false : true);
      if (win === true)
      {
        userArray[i].getOppenent().setScore(userArray[i].getOppenent().getScore() + 1);
        userArray[i].socket.emit("scoreUpdate", userArray[i].getScore(), userArray[i].getOppenent().getScore());
        userArray[i].getOppenent().socket.emit("scoreUpdate", userArray[i].getOppenent().getScore(), userArray[i].getScore());
      }
      userArray[i].getPlayer() === 1 ? (userArray[i].setValue(1), userArray[y].setValue(-1)) : (userArray[i].setValue(1), userArray[y].setValue(-1));
      userArray[i].setupValue();
      userArray[y].setupValue();
      userArray[i].socket.emit("restart", userArray[i].getPositionBarVer(), userArray[i].getOppenent().getPositionBarVer());
      userArray[y].socket.emit("restart", userArray[y].getPositionBarVer(), userArray[y].getOppenent().getPositionBarVer());
    }
    if (userArray[i].getScore() >= userArray[i].getWinCondition())
    {
      userArray[i].getDataUser().setWinRatio(1, 0);
      userArray[y].getDataUser().setWinRatio(0, 1);
      userArray[i].getDataUser().setProgressBar(25);
      userArray[y].getDataUser().setProgressBar(5);
      let tmp = userArray[i].getDataUser().getPP();
      userArray[i].getDataUser().setHistorique(userArray[i].getScore(), userArray[y].getScore(), userArray[i].getDataUser().getPP(), userArray[y].getDataUser().getPseudo(), userArray[y].getDataUser().getPP(), "gagné", userArray[y].getDataUser().getImage());
      userArray[y].getDataUser().setHistorique(userArray[y].getScore(), userArray[i].getScore(), userArray[y].getDataUser().getPP(), userArray[i].getDataUser().getPseudo(), userArray[i].getDataUser().getPP(), "perdu", userArray[i].getDataUser().getImage());
      userArray[i].getDataUser().calcPPW(userArray[i].getDataUser().getPP(), userArray[y].getDataUser().getPP());
      userArray[y].getDataUser().calcPPL(userArray[y].getDataUser().getPP(), tmp);
      userArray[i].getDataUser().setGameCount();
      userArray[y].getDataUser().setGameCount();
      userArray[i].socket.emit("end", userArray[i].getPlayer(), userArray[i].getScore(), userArray[y].getScore(), userArray[i].getDataUser(), userArray[i].getDataUser().getHistorique());
      userArray[y].socket.emit("end", userArray[i].getPlayer(), userArray[y].getScore(), userArray[i].getScore(), userArray[y].getDataUser(), userArray[y].getDataUser().getHistorique());
      userArray[i].setScore(0);
      userArray[i].getOppenent().setScore(0);
      userArray[y].setScore(0);
      userArray[y].getOppenent().setScore(0);
      userArray[i].setIsInGane(false);
      userArray[y].setIsInGane(false);
      userArray[i].setOppenent(undefined);
      userArray[y].setOppenent(undefined);
      leaderboard.setLadderData(this.userService, userArray[i].getDataUser().getPseudo(), userArray[i].getDataUser().toUser());
      leaderboard.setLadderData(this.userService, userArray[y].getDataUser().getPseudo(), userArray[y].getDataUser().toUser());
    }
    userArray[i].socket.emit("balle", userArray[i].getPositionHorOfBalle(), userArray[i].getPositionVerOfBalle(), userArray[y].getDataUser().getPadColor());
    userArray[y].socket.emit("balle", userArray[y].getPositionHorOfBalle(), userArray[y].getPositionVerOfBalle(), userArray[i].getDataUser().getPadColor());
    res.send("Parce que c'est comme dans Harry Potter enfaite !");
  }

  @Post('responsive')
  responsive(@Req() req: Request, @Res() res: Response)
  {
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (req.body.clientId === userArray[i].socket.id)
        break;
    }
    if (i >= userArray.length)
    {
      res.send("Parce que c'est comme dans Harry Potter enfaite !");
      return;
    }
    userArray[i].setWinHeight(req.body.winHeight);
    userArray[i].setWinWidht(req.body.winWidth);
    res.send("Parce que c'est comme dans Harry Potter enfaite !");
  }

  @Post('ladder')
  ladder(@Req() req: Request, @Res() res: Response)
  {
    res.send(leaderboard.getLadderData());
  }

  @Post('image')
  image(@Req() req: Request, @Res() res: Response)
  {
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (req.body.clientId === userArray[i].socket.id)
        break;
    }
    userArray[i].getDataUser().setImage(req.body.valueImage);
    res.send("Parce que c'est comme dans Harry Potter enfaite !");
  }

  @Post('padColor')
  padColor(@Req() req: Request, @Res() res: Response)
  {
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (req.body.clientId === userArray[i].socket.id)
        break;
    }
    userArray[i].getDataUser().setPadColor(req.body.padColor);
    res.send("Parce que c'est comme dans Harry Potter enfaite !");
  }

  @Post('balleColor')
  balleColor(@Req() req: Request, @Res() res: Response)
  {
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (req.body.clientId === userArray[i].socket.id)
        break;
    }
    userArray[i].getDataUser().setBalleColor(req.body.balleColor);
    res.send("Parce que c'est comme dans Harry Potter enfaite !");
  }

  @Post('codeGen')
  async codeGen(@Req() req: Request, @Res() res: Response)
  {
    let tmp = 0;
    tmp = Math.floor(1000 + Math.random() * 9000);
    code = tmp.toString();
    await (this.mailService.sendEmail(req.body.email, 'Code de verification', code));
    res.send("Parce que c'est comme dans Harry Potter enfaite !");
  }

  @Post('codeVerif')
  codeVerif(@Req() req: Request, @Res() res: Response)
  {
    if (req.body.code === code)
    {
      let i = 0;
      for (i = 0; i < userArray.length; i++)
      {
        if (req.body.clientId === userArray[i].socket.id)
          break;
      }
      userArray[i].getDataUser().setEmail(req.body.email);
      userArray[i].getDataUser().setDeuxFap(true);
      console.log(userArray[i].getDataUser());
      res.send(true);
    }
    else
    {
      res.send(false);
    }
  }

  @Post('pseudoChange')
  async pseudoChange(@Req() req: Request, @Res() res: Response)
  {
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (req.body.clientId === userArray[i].socket.id)
        break;
    }
    const user = await (this.userService.findAll());
    let y = 0;
    for (y = 0; y < user.length; y++)
    {
      if (req.body.pseudoChange === user[y].username)
      {
        res.send("Pseudo déjà prit ! Choisis autre chose.")
        return;
      }
    }
    userArray[i].getDataUser().setPseudo(req.body.pseudoChange);
    res.send("Pseudo changé !");
  }

  @Post('isFirstLog')
  async isFirstLog(@Req() req: Request, @Res() res: Response)
  {
    const users = await (this.userService.findAll());
    for (let i = 0; i < users.length; i++)
    {
      if (users[i].login === req.body.username)
      {
        res.send(users[i].username);
        return;
      }
    }
    res.send("");
  }

  @Post('isNameTaken')
  async isNameTaken(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < userArray.length; i++)
    {
      if (userArray[i].getUsername() === req.body.choixPseudo)
      {
        res.send(false);
        return;
      }
    }
    const users = await (this.userService.findAll());
    for (let i = 0; i < users.length; i++)
    {
      if (users[i].login === req.body.choixPseudo)
      {
        res.send(false);
        return;
      }
    }
    res.send(true);
  }
}

  /*
               AAA               PPPPPPPPPPPPPPPPP   IIIIIIIIII
              A:::A              P::::::::::::::::P  I::::::::I
             A:::::A             P::::::PPPPPP:::::P I::::::::I
            A:::::::A            PP:::::P     P:::::PII::::::II
           A:::::::::A             P::::P     P:::::P  I::::I  
          A:::::A:::::A            P::::P     P:::::P  I::::I  
         A:::::A A:::::A           P::::PPPPPP:::::P   I::::I  
        A:::::A   A:::::A          P:::::::::::::PP    I::::I  
       A:::::A     A:::::A         P::::PPPPPPPPP      I::::I  
      A:::::AAAAAAAAA:::::A        P::::P              I::::I  
     A:::::::::::::::::::::A       P::::P              I::::I  
    A:::::AAAAAAAAAAAAA:::::A      P::::P              I::::I  
   A:::::A             A:::::A   PP::::::PP          II::::::II
  A:::::A               A:::::A  P::::::::P          I::::::::I
 A:::::A                 A:::::A P::::::::P          I::::::::I
AAAAAAA                   AAAAAAAPPPPPPPPPP          IIIIIIIIII
  */

@Controller('auth')
export class AppController {
  constructor(
    @Inject(EventsGateway) private eventsGateway: EventsGateway,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly api42Service: Api42Service
  ) {}

  @Get('login42config')
  login42config(@Session() session: any) {
    const baseURL = 'https://api.intra.42.fr/oauth/authorize';
    const clientId = CLIENT_ID;
    const redirectUri = 'http://'+ serverIP + ':3001/auth/callback';
    return { baseURL, clientId, redirectUri };
  }

  @Get('callback')
    async handleCallback(@Query('code') code: string, @Res() response: Response)
    {
      const token = await (this.api42Service.getAccessTokenFromCode(code));
      const userProfile = await (this.api42Service.getUserInfo(token));
      const user = await (this.userService.findOneByLogin(userProfile.login));
      if (user != undefined)
      {
        if (user.doubleFap === true)
        {
          let tmp = 0;
          let code: string;
          let userN: string;
          tmp = Math.floor(1000 + Math.random() * 9000);
          code = tmp.toString();
          userN = userProfile.login;
          await (this.mailService.sendEmail(user.email, 'Code de verification', code));
          userPendingArray.push(new userPending(userN, code));
          response.redirect(`http://${serverIP}:3000/?userCode=${code}&loginCodeVerif=${userProfile.login}&imageCodeVerif=${userProfile.image.versions.medium}`);
          return;
        }
      }
      response.redirect(`http://${serverIP}:3000/?login=${userProfile.login}&image=${userProfile.image.versions.medium}`);
    }
}

/*
DDDDDDDDDDDDD      BBBBBBBBBBBBBBBBB   
D::::::::::::DDD   B::::::::::::::::B  
D:::::::::::::::DD B::::::BBBBBB:::::B 
DDD:::::DDDDD:::::DBB:::::B     B:::::B
  D:::::D    D:::::D B::::B     B:::::B
  D:::::D     D:::::DB::::B     B:::::B
  D:::::D     D:::::DB::::BBBBBB:::::B 
  D:::::D     D:::::DB:::::::::::::BB  
  D:::::D     D:::::DB::::BBBBBB:::::B 
  D:::::D     D:::::DB::::B     B:::::B
  D:::::D     D:::::DB::::B     B:::::B
  D:::::D    D:::::D B::::B     B:::::B
DDD:::::DDDDD:::::DBB:::::BBBBBB::::::B
D:::::::::::::::DD B:::::::::::::::::B 
D::::::::::::DDD   B::::::::::::::::B  
DDDDDDDDDDDDD      BBBBBBBBBBBBBBBBB   
*/

/*
        CCCCCCCCCCCCChhhhhhh                                       tttt          
     CCC::::::::::::Ch:::::h                                    ttt:::t          
   CC:::::::::::::::Ch:::::h                                    t:::::t          
  C:::::CCCCCCCC::::Ch:::::h                                    t:::::t          
 C:::::C       CCCCCC h::::h hhhhh         aaaaaaaaaaaaa  ttttttt:::::ttttttt    
C:::::C               h::::hh:::::hhh      a::::::::::::a t:::::::::::::::::t    
C:::::C               h::::::::::::::hh    aaaaaaaaa:::::at:::::::::::::::::t    
C:::::C               h:::::::hhh::::::h            a::::atttttt:::::::tttttt    
C:::::C               h::::::h   h::::::h    aaaaaaa:::::a      t:::::t          
C:::::C               h:::::h     h:::::h  aa::::::::::::a      t:::::t          
C:::::C               h:::::h     h:::::h a::::aaaa::::::a      t:::::t          
 C:::::C       CCCCCC h:::::h     h:::::ha::::a    a:::::a      t:::::t    tttttt
  C:::::CCCCCCCC::::C h:::::h     h:::::ha::::a    a:::::a      t::::::tttt:::::t
   CC:::::::::::::::C h:::::h     h:::::ha:::::aaaa::::::a      tt::::::::::::::t
     CCC::::::::::::C h:::::h     h:::::h a::::::::::aa:::a       tt:::::::::::tt
        CCCCCCCCCCCCC hhhhhhh     hhhhhhh  aaaaaaaaaa  aaaa         ttttttttttt  
*/

@Controller('chat')
export class AppChatController {
  constructor(
    @Inject(EventsGateway) private eventsGateway: EventsGateway,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  blocked = false;

  @Post('fetchFriendData')
  async fetchFriendData(@Req() req: Request, @Res() res: Response)
  {
    const users = await (this.userService.findAll());
    for (let i = 0; i < users.length; i++)
    {
      console.log(req.body.popoverUser, users[i].username, userArray.length);
      if (req.body.popoverUser === users[i].username)
      {
        for (let y = 0; y < userArray.length; y++)
        {
          if (req.body.clientId === userArray[y].socket.id)
          {
            userArray[y].getFriendDataTmp().fetchUser(users[i]);
            userArray[y].socket.emit("friendFetch", req.body.popoverUser, userArray[y].getFriendDataTmp());
            res.send("succed");
            return;
          }
        }
      }
    }
    res.send("failed");
  }
  @Post('friendImage')
  async friendImage(@Req() req: Request, @Res() res: Response)
  {
    const users = await (this.userService.findAll());
    for (let i = 0; i < users.length; i++)
    {
      if (req.body.friend === users[i].username)
      {
        for (let y = 0; y < userArray.length; y++)
        {
          if (req.body.friend === userArray[y].getDataUser().getPseudo())
          {
            if (userArray[y].getIsInGame() === true)
            {
              let tmp = [users[i].image, "en partie"];
              res.send(tmp);
              return;
            }
            else
            {
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
  @Post('submit')
  submitMessage(@Req() req: Request, @Res() res: Response) {
    let user: string = req.body.user;
    let content: string = req.body.content;
    let channel: Channel;
    for (let i = 0; i < channels.length; i++)
      if (channels[i].getName() === req.body.channelName)
        channel = channels[i];
    if (channel === undefined)
    {
      res.send([false, false]);
      return ;
    }
    if (!channel.getMuted().includes(user))
      channel.addMessage(new Message(user, content));
    else
    {
      res.send([false, true]);
      return ;
    }
    for (let i = 0; i < userArray.length; i++)
    {
      if (req.body.clientId !== userArray[i].socket.id)
      {
        if (channel.getMembers().includes(userArray[i].getUsername()))
        {
          userArray[i].socket.emit('message', user, content, channel.getName());
        }
      }
    }
    res.send([true, true]);
  }

  @Post('submitDM')
  submitDM(@Req() req: Request, @Res() res: Response) {
    let user: string = req.body.user;
    let content: string = req.body.content;
    let channel: DM;
    for (let i = 0; i < DMs.length; i++)
      if ((DMs[i].getUser1() === req.body.user && DMs[i].getUser2() === req.body.otherUser) || (DMs[i].getUser1() === req.body.otherUser && DMs[i].getUser2() === req.body.user))
        channel = DMs[i];
    channel.addMessage(new Message(user, content));
    console.log(channel, channel.getMessages());
    for (let i = 0; i < userArray.length; i++)
    {
      if (req.body.clientId !== userArray[i].socket.id)
      {
        if (userArray[i].getUsername() === req.body.otherUser)
        {
          userArray[i].socket.emit('directMessage', user, content);
        }
      }
    }
    res.send(true);
  }

  @Post('channel')
  channel(@Req() req: Request, @Res() res: Response)
  {
    let chan: Channel;
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        if (channels[i].getType() !== req.body.channelType)
        {
          let message = '';
          if (channels[i].getType() === 'public')
            message = "Mais enfin ? C'est un channel public !";
          else if (channels[i].getType() === 'private')
            message = "Mais enfin ? C'est un channel privé !";
          else
            message = "Mais enfin ? Il faut un mot de passe !";
          res.send([false, message]);
          return ;
        }
        if (channels[i].getType() === 'private' && !channels[i].getInvited().includes(req.body.user))
          res.send([false, "Mais enfin ? T'es pas invité !"]);
        else if (channels[i].getBanned().includes(req.body.user))
          res.send([false, "Mais enfin ? T'es ban !"]);
        else if (channels[i].getPassword() !== req.body.channelPassword)
          res.send([false, "Mais enfin ? T'as pas le bon mot de passe !"]);
        else
        {
          channels[i].addMember(req.body.user);
          res.send([true, channels[i]]);
        }
        return ;
      }
    }
    chan = new Channel(req.body.channelName, req.body.channelType, req.body.user, req.body.channelPassword);
    channels.push(chan);
    res.send([true, chan])
  }

  @Post('dm')
  dm(@Req() req: Request, @Res() res: Response)
  {
    let dm: DM;
    dm = new DM(req.body.user, req.body.other);
    DMs.push(dm);
    for (let i = 0; i < userArray.length; i++)
    {
      if (userArray[i].getUsername() === req.body.other)
        userArray[i].socket.emit('dm', dm);
    }
    res.send(dm);
  }

  @Post('kick')
  kick(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
          {
            if (!channels[i].getAdmins().includes(userArray[j].getUsername()))
            {
              res.send([false, "Vous n'êtes pas un admin !"]);
              return ;
            }
          }
        }
        if (channels[i].getOwner() !== req.body.user)
        {
          if (channels[i].getMembers().includes(req.body.user))
          {
            for (let j = 0; j < userArray.length; j++)
            {
              if (userArray[j].getUsername() === req.body.user)
              {
                if (userArray[j].socket.id === req.body.clientId)
                {
                  res.send([false, "Vous ne pouvez pas vous kick vous même !"]);
                  return ;
                }
                userArray[j].socket.emit('kick', req.body.channelName);
              }
            }
            channels[i].removeMember(req.body.user);
            res.send([true, ""]);
          }
          else
            res.send([false, "L'utilisateur n'est pas dans le channel !"]);
        }
        else
          res.send([false, "Vous ne pouvez pas kick le propriétaire !"]);
        return ;
      }
    }
    res.send([true, ''])
  }

  @Post('ban')
  ban(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
          {
            if (!channels[i].getAdmins().includes(userArray[j].getUsername()))
            {
              res.send([false, "Vous n'êtes pas un admin !"]);
              return ;
            }
          }
        }
        if (channels[i].getOwner() !== req.body.user)
        {
          if (channels[i].getMembers().includes(req.body.user))
          {
            for (let j = 0; j < userArray.length; j++)
            {
              if (userArray[j].getUsername() === req.body.user)
              {
                if (userArray[j].socket.id === req.body.clientId)
                {
                  res.send([false, "Vous ne pouvez pas vous bannir vous même !"]);
                  return ;
                }
                userArray[j].socket.emit('kick', req.body.channelName);
              }
            }
            channels[i].banMember(req.body.user);
            res.send([true, ""]);
          }
          else
            res.send([false, "L'utilisateur n'est pas dans le channel"]);
        }
        else
          res.send([false, "Vous ne pouvez pas bannir le propriétaire !"]);
        return ;
      }
    }
    res.send([true, ''])
  }

  @Post('admin')
  admin(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
          {
            if (!channels[i].getAdmins().includes(userArray[j].getUsername()))
            {
              res.send([false, "Vous n'êtes pas un admin !"]);
              return ;
            }
          }
        }
        if (!channels[i].getAdmins().includes(req.body.user))
        {
          if (channels[i].getMembers().includes(req.body.user))
          {
            channels[i].addAdmin(req.body.user);
            res.send([true, ""]);
          }
          else
            res.send([false, "L'utilisateur n'est pas dans le channel"]);
        }
        else
          res.send([false, "L'utilisateur est déjà admin !"]);
        return ;
      }
    }
  }

  @Post('unadmin')
  unadmin(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
          {
            if (!channels[i].getAdmins().includes(userArray[j].getUsername()))
            {
              res.send([false, "Vous n'êtes pas un admin !"]);
              return ;
            }
          }
        }
        if (channels[i].getOwner() !== req.body.user)
        {
          if (channels[i].getMembers().includes(req.body.user))
          {
            for (let j = 0; j < userArray.length; j++)
            {
              if (userArray[j].getUsername() === req.body.user)
              {
                if (userArray[j].socket.id === req.body.clientId)
                {
                  res.send([false, "Vous ne pouvez pas vous enlever des admins vous même !"]);
                  return ;
                }
              }
            }
            if (channels[i].getAdmins().includes(req.body.user))
            {
              channels[i].removeAdmin(req.body.user);
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
        return ;
      }
    }
    res.send([true, ''])
  }

  @Post('mute')
  mute(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
          {
            if (!channels[i].getAdmins().includes(userArray[j].getUsername()))
            {
              res.send([false, "Vous n'êtes pas un admin !"]);
              return ;
            }
          }
        }
        if (channels[i].getOwner() !== req.body.user)
        {
          if (channels[i].getMembers().includes(req.body.user))
          {
            for (let j = 0; j < userArray.length; j++)
            {
              if (userArray[j].getUsername() === req.body.user)
              {
                if (userArray[j].socket.id === req.body.clientId)
                {
                  res.send([false, "Vous ne pouvez pas vous mute vous même !"]);
                  return ;
                }
              }
            }
            if (!channels[i].getMuted().includes(req.body.user))
            {
              channels[i].muteMember(req.body.user);
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
        return ;
      }
    }
    res.send([true, ''])
  }

  @Post('unmute')
  unmute(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
          {
            if (!channels[i].getAdmins().includes(userArray[j].getUsername()))
            {
              res.send([false, "Vous n'êtes pas un admin !"]);
              return ;
            }
          }
        }
        if (channels[i].getOwner() !== req.body.user)
        {
          if (channels[i].getMembers().includes(req.body.user))
          {
            for (let j = 0; j < userArray.length; j++)
            {
              if (userArray[j].getUsername() === req.body.user)
              {
                if (userArray[j].socket.id === req.body.clientId)
                {
                  res.send([false, "Vous ne pouvez pas vous unmute vous même !"]);
                  return ;
                }
              }
            }
            if (channels[i].getMuted().includes(req.body.user))
            {
              channels[i].unMuteMember(req.body.user);
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
        return ;
      }
    }
    res.send([true, ''])
  }

  @Post('pass')
  pass(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
          {
            if (userArray[j].getUsername() !== channels[i].getOwner())
            {
              res.send([false, "Vous n'êtes pas le propriétaire !"]);
              return ;
            }
          }
        }
        channels[i].setPassword(req.body.password);
        channels[i].setType('protected');
      }
    }
    res.send([true, '']);
  }

  @Post('rmpass')
  rmpass(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
          {
            if (userArray[j].getUsername() !== channels[i].getOwner())
            {
              res.send([false, "Vous n'êtes pas le propriétaire !"]);
              return ;
            }
          }
        }
        channels[i].setPassword('');
        channels[i].setType('public');
      }
    }
    res.send([true, '']);
  }

  @Post('quit')
  quit(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
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
                      userArray[l].socket.emit('kick', req.body.channelName);
                  }
                }
              }
              channels.splice(i, 1);
              res.send('');
              return ;
            }
            channels[i].removeMember(userArray[j].getUsername());
          }
        }
      }
    }
    res.send('');
  }

  @Post('invite')
  invite(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        if (channels[i].getType() !== 'private')
        {
          res.send([false, "Le channel n'est pas privé !"]);
          return ;
        }
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
          {
            if (!channels[i].getAdmins().includes(userArray[j].getUsername()))
            {
              res.send([false, "Vous n'êtes pas un admin !"]);
              return ;
            }
          }
        }
        if (!channels[i].getMembers().includes(req.body.user))
        {
          if (!channels[i].getInvited().includes(req.body.user))
          {
            channels[i].inviteMember(req.body.user);
            res.send([true, ""]);
            return ;
          }
          else
          {
            res.send([false, "L'utilisateur est déjà invité !"]);
            return ;
          }
        }
        else
        {
          res.send([false, "L'utilisateur est déjà dans le channel !"]);
          return ;
        }
      }
    }
    res.send([true, '']);
  }

  @Post('uninvite')
  uninvite(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < channels.length; i++)
    {
      if (channels[i].getName() === req.body.channelName)
      {
        if (channels[i].getType() !== 'private')
        {
          res.send([false, "Le channel n'est pas privé !"]);
          return ;
        }
        for (let j = 0; j < userArray.length; j++)
        {
          if (userArray[j].socket.id === req.body.clientId)
          {
            if (!channels[i].getAdmins().includes(userArray[j].getUsername()))
            {
              res.send([false, "Vous n'êtes pas un admin !"]);
              return ;
            }
          }
        }
        if (!channels[i].getMembers().includes(req.body.user))
        {
          if (channels[i].getInvited().includes(req.body.user))
          {
            channels[i].uninviteMember(req.body.user);
            res.send([true, ""]);
            return ;
          }
          else
          {
            res.send([false, "L'utilisateur n'est pas invité !"]);
            return ;
          }
        }
        else
        {
          res.send([false, "L'utilisateur est déjà dans le channel ! (pour le kick, utilisez la commande !kick)"]);
          return ;
        }
      }
    }
    res.send([true, ''])
  }

  @Post('unblock')
  unblock(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < userArray.length; i++)
    {
      if (userArray[i].socket.id === req.body.clientId)
        userArray[i].getDataUser().unblock(req.body.user);
    }
  }

  @Post('block')
  block(@Req() req: Request, @Res() res: Response)
  {
    for (let i = 0; i < userArray.length; i++)
    {
      if (userArray[i].socket.id === req.body.clientId)
        userArray[i].getDataUser().block(req.body.user);
    }
  }

  @Post('unfriend')
  unfriend(@Req() req: Request, @Res() res: Response)
  {
    let senderName;
    for (let i = 0; i < userArray.length; i++)
    {
      if (userArray[i].socket.id === req.body.clientId)
      {
        senderName = userArray[i].getUsername();
        userArray[i].getDataUser().unfriend(req.body.user);
      }
    }
    for (let i = 0; i < userArray.length; i++)
    {
      if (userArray[i].getUsername() === req.body.user)
      {
        userArray[i].getDataUser().unfriend(senderName);
        userArray[i].socket.emit('unfriend', senderName);
      }
    }
    res.send('');
  }

  @Post('friend')
  async friend(@Req() req: Request, @Res() res: Response)
  {
    let senderName;
    let x = 0;
    for (x = 0; x < userArray.length; x++)
    {
      if (userArray[x].socket.id === req.body.clientId)
      {
        senderName = userArray[x].getUsername();
        userArray[x].getDataUser().friend(req.body.user);
      }
    }
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (userArray[i].getUsername() === req.body.user)
      {
        userArray[i].getDataUser().friend(senderName);
        userArray[i].socket.emit('friend', [senderName, userArray[i].getDataUser().getImage()]);
      }
    }
    const users = await (this.userService.findAll());
    if (i === userArray.length)
    {
      for (let y = 0; y < users.length; y++)
      {
        if (users[y].username === req.body.user)
        {
          await (this.userService.addFriend(users[y].username, senderName));
        }
      }
    }
    res.send('');
  }

  @Post('isBlocked')
  async isBlocked(@Req() req: Request, @Res() res: Response)
  {
    const users = await (this.userService.findAll());
    for (let i = 0; i < users.length; i++)
    {
      if (users[i].username === req.body.other)
      {
        res.send(users[i].blocked.includes(req.body.user));
        return;
      }
    }
    res.send(false);
  }

  @Post('isLogged')
  isLogged(@Req() req: Request, @Res() res: Response)
  {
    let i;
    for (i = 0; i < userArray.length; i++)
    {
      if (userArray[i].getUsername() === req.body.user)
        break ;
    }
    if (i === userArray.length)
      res.send(false);
    else
      res.send(true);
  }

  @Post('getImage')
  async getImage(@Req() req: Request, @Res() res: Response)
  {
    const users = await (this.userService.findAll());
    for (let i = 0; i < userArray.length; i++)
    {
      if (userArray[i].getUsername() === req.body.user)
      {
        if (userArray[i].getIsInGame() === true)
        {
          let tmp = [userArray[i].getDataUser().getImage(), "en partie"];
          res.send(tmp);
          return ;
        }
        else
        {
          let tmp = [userArray[i].getDataUser().getImage(), "en ligne"];
          res.send(tmp);
          return ;
        }
      }
    }
    for (let i = 0; i < users.length; i++)
    {
      if (users[i].username === req.body.user)
      {
        let tmp = [users[i].image, "hors ligne"];
        res.send(tmp);
        return ;
      }
    }
    res.send("/defaultAvt.jpg");
  }
}
