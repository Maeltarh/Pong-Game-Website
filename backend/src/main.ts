/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/04 12:22:26 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/03 19:30:37 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Request } from 'express';
import * as cors from 'cors';
import { user, Leaderboard, ladderData, userPending  } from './user';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import Channel from './Channel';
import DM from './DM';

export let userPendingArray: userPending[] = [];
export let userArray: user[] = [];
export let servIP = "";
export let leaderboard = new Leaderboard();
export let serverIP: string;
export let CLIENT_ID: string;
export let CLIENT_SECRET: string;
export let channels: Channel[] = [];
export let DMs: DM[] = [];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  serverIP = configService.get<string>('NESTJS_APP_SERVER_IP');
  CLIENT_ID = configService.get<string>('CLIENT_ID');
  CLIENT_SECRET = configService.get<string>('CLIENT_SECRET');
  servIP = serverIP;
  app.use(
    session({
      secret: 'clef', 
      resave: false,
      saveUninitialized: false,
    }),
  );
  
  app.use(cors({
    origin: 'http://' + serverIP + ':3000',
    credentials: true,
  }));
  await app.listen(3001);
}
bootstrap();
